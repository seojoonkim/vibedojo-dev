"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ActivityData {
  date: string; // YYYY-MM-DD
  count: number;
}

interface ActivityHeatmapProps {
  activities: ActivityData[];
  className?: string;
}

export function ActivityHeatmap({ activities, className }: ActivityHeatmapProps) {
  const { weeks, activityMap, totalActivities, currentStreak } = useMemo(() => {
    // Use local date to avoid timezone issues
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const activityMap = new Map<string, number>();

    // Build activity map
    activities.forEach(({ date, count }) => {
      activityMap.set(date, (activityMap.get(date) || 0) + count);
    });

    // Calculate current streak (including today or starting from yesterday)
    let currentStreak = 0;

    // Format today's date as YYYY-MM-DD
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const todayStr = formatDate(today);
    const hasActivityToday = activityMap.has(todayStr) && activityMap.get(todayStr)! > 0;

    // Start checking from today if has activity, otherwise from yesterday
    const startOffset = hasActivityToday ? 0 : 1;

    for (let i = startOffset; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = formatDate(checkDate);

      if (activityMap.has(dateStr) && activityMap.get(dateStr)! > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Generate weeks array (52 weeks like GitHub)
    const weeksCount = 53;
    const weeks: { date: Date; dateStr: string }[][] = [];

    // Start from today and go back weeksCount weeks
    // Align to end on today's column
    const endDate = new Date(today);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (weeksCount * 7) + (6 - today.getDay()) + 1);

    let currentWeek: { date: Date; dateStr: string }[] = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = formatDate(d);
      currentWeek.push({ date: new Date(d), dateStr });

      if (d.getDay() === 6) { // Saturday = end of week
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    const totalActivities = activities.reduce((sum, a) => sum + a.count, 0);

    return { weeks, activityMap, totalActivities, currentStreak };
  }, [activities]);

  const getIntensity = (count: number) => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  };

  // GitHub exact colors
  const intensityColors = [
    "bg-[#161b22]", // 0 - no activity (dark bg)
    "bg-[#0e4429]", // 1 - low
    "bg-[#006d32]", // 2 - medium-low
    "bg-[#26a641]", // 3 - medium-high
    "bg-[#39d353]", // 4 - high
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get month labels for the weeks
  const monthLabels = useMemo(() => {
    const labels: { month: string; colStart: number; colSpan: number }[] = [];
    let lastMonth = -1;
    let lastMonthStart = 0;

    weeks.forEach((week, weekIndex) => {
      // Use the first day of the week that's in the new month
      const firstDay = week.find(d => {
        const month = d.date.getMonth();
        return month !== lastMonth;
      }) || week[0];

      if (firstDay) {
        const month = firstDay.date.getMonth();
        if (month !== lastMonth) {
          if (lastMonth !== -1) {
            labels[labels.length - 1].colSpan = weekIndex - lastMonthStart;
          }
          labels.push({ month: months[month], colStart: weekIndex, colSpan: 1 });
          lastMonth = month;
          lastMonthStart = weekIndex;
        }
      }
    });

    // Set last month's colspan
    if (labels.length > 0) {
      labels[labels.length - 1].colSpan = weeks.length - lastMonthStart;
    }

    return labels;
  }, [weeks]);

  // Format today for comparison
  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const now = new Date();
  const todayStr = formatDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));

  return (
    <div className={cn("", className)}>
      {/* Header - GitHub style */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#e6edf3]">{totalActivities} contributions in the last year</span>
        </div>
        {currentStreak > 0 && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#238636]/20 rounded-md border border-[#238636]/30">
            <span className="text-xs text-[#3fb950] font-medium">🔥 {currentStreak} day streak</span>
          </div>
        )}
      </div>

      {/* Heatmap Container */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels row */}
          <div className="flex mb-1" style={{ paddingLeft: '32px' }}>
            {monthLabels.map(({ month, colStart, colSpan }, i) => (
              <div
                key={i}
                className="text-[11px] text-[#8b949e]"
                style={{
                  width: `${colSpan * 14}px`,
                  flexShrink: 0,
                }}
              >
                {colSpan >= 2 && month}
              </div>
            ))}
          </div>

          {/* Grid container */}
          <div className="flex">
            {/* Day labels column */}
            <div className="flex flex-col gap-[3px] mr-1 pt-0" style={{ width: '28px' }}>
              {days.map((day, i) => (
                <div
                  key={i}
                  className="h-[11px] text-[11px] text-[#8b949e] leading-[11px] text-right pr-1"
                >
                  {i % 2 === 1 ? day : ""}
                </div>
              ))}
            </div>

            {/* Weeks grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {/* Fill empty days at the start of first week */}
                  {weekIndex === 0 && week[0] && Array(week[0].date.getDay()).fill(null).map((_, i) => (
                    <div key={`empty-start-${i}`} className="w-[11px] h-[11px]" />
                  ))}

                  {week.map(({ dateStr, date }, dayIndex) => {
                    const count = activityMap.get(dateStr) || 0;
                    const intensity = getIntensity(count);
                    const isToday = dateStr === todayStr;

                    return (
                      <div
                        key={dayIndex}
                        className={cn(
                          "w-[11px] h-[11px] rounded-[2px] outline-offset-[-1px]",
                          intensityColors[intensity],
                          isToday && "outline outline-1 outline-[#e6edf3]",
                          "hover:outline hover:outline-1 hover:outline-[#8b949e] cursor-pointer"
                        )}
                        title={`${count} contributions on ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                      />
                    );
                  })}

                  {/* Fill empty days at the end of last week */}
                  {weekIndex === weeks.length - 1 && week.length > 0 && Array(6 - week[week.length - 1].date.getDay()).fill(null).map((_, i) => (
                    <div key={`empty-end-${i}`} className="w-[11px] h-[11px]" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend - GitHub style */}
          <div className="flex items-center justify-end gap-1 mt-2 text-[11px] text-[#8b949e]">
            <span>Less</span>
            {intensityColors.map((color, i) => (
              <div
                key={i}
                className={cn(
                  "w-[11px] h-[11px] rounded-[2px]",
                  color
                )}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
