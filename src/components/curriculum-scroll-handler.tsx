"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function CurriculumScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");

    if (scrollTo) {
      // 약간의 딜레이 후 스크롤 (페이지 렌더링 완료 대기)
      const timer = setTimeout(() => {
        const element = document.getElementById(`chapter-${scrollTo}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return null;
}
