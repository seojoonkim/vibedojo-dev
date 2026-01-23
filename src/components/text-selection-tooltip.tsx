"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { MessageSquarePlus } from "lucide-react";

interface TextSelectionTooltipProps {
  containerSelector: string;
  onAskQuestion: (selection: {
    text: string;
    contextBefore: string;
    contextAfter: string;
  }) => void;
}

export function TextSelectionTooltip({
  containerSelector,
  onAskQuestion,
}: TextSelectionTooltipProps) {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    text: string;
    contextBefore: string;
    contextAfter: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    text: "",
    contextBefore: "",
    contextAfter: "",
  });

  const selectionDataRef = useRef<{
    text: string;
    contextBefore: string;
    contextAfter: string;
  } | null>(null);

  const updateTooltipPosition = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selectionDataRef.current) {
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // 선택 영역이 화면에 보이는지 확인
      if (rect.width === 0 && rect.height === 0) {
        setTooltip((prev) => ({ ...prev, visible: false }));
        return;
      }

      const x = rect.right + 8;
      const y = rect.top + rect.height / 2;

      setTooltip((prev) => ({
        ...prev,
        x,
        y,
      }));
    } catch {
      // 선택이 해제된 경우
      setTooltip((prev) => ({ ...prev, visible: false }));
      selectionDataRef.current = null;
    }
  }, []);

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setTooltip((prev) => ({ ...prev, visible: false }));
      selectionDataRef.current = null;
      return;
    }

    const text = selection.toString().trim();
    if (text.length < 3) {
      setTooltip((prev) => ({ ...prev, visible: false }));
      selectionDataRef.current = null;
      return;
    }

    // 선택된 텍스트가 콘텐츠 영역 내에 있는지 확인
    const contentArea = document.querySelector(containerSelector);
    if (!contentArea) {
      setTooltip((prev) => ({ ...prev, visible: false }));
      selectionDataRef.current = null;
      return;
    }

    const range = selection.getRangeAt(0);
    if (!contentArea.contains(range.commonAncestorContainer)) {
      setTooltip((prev) => ({ ...prev, visible: false }));
      selectionDataRef.current = null;
      return;
    }

    // 컨텍스트 추출 (앞뒤 50자)
    const fullText = contentArea.textContent || "";
    const selectedIndex = fullText.indexOf(text);

    if (selectedIndex === -1) {
      setTooltip((prev) => ({ ...prev, visible: false }));
      selectionDataRef.current = null;
      return;
    }

    // 선택된 텍스트를 포함하는 전체 문장 추출
    const getSentenceContaining = (fullText: string, selectedText: string, selectedIdx: number): string => {
      // 문장 구분자: 마침표, 물음표, 느낌표 + 공백 또는 줄바꿈
      const sentenceEndPattern = /[.!?。！？]\s|\n\n|\n/g;

      // 선택된 텍스트 앞에서 가장 가까운 문장 끝 찾기
      let sentenceStart = 0;
      let match;
      const beforeText = fullText.slice(0, selectedIdx);
      let lastEnd = 0;
      const tempPattern = /[.!?。！？]\s|\n\n|\n/g;
      while ((match = tempPattern.exec(beforeText)) !== null) {
        lastEnd = match.index + match[0].length;
      }
      sentenceStart = lastEnd;

      // 선택된 텍스트 뒤에서 가장 가까운 문장 끝 찾기
      const afterStartIdx = selectedIdx + selectedText.length;
      const afterText = fullText.slice(afterStartIdx);
      sentenceEndPattern.lastIndex = 0;
      match = sentenceEndPattern.exec(afterText);
      const sentenceEnd = match
        ? afterStartIdx + match.index + 1  // 마침표 포함
        : fullText.length;

      return fullText.slice(sentenceStart, sentenceEnd).trim();
    };

    const fullSentence = getSentenceContaining(fullText, text, selectedIndex);

    const contextBefore = fullText.slice(
      Math.max(0, selectedIndex - 50),
      selectedIndex
    );
    const contextAfter = fullText.slice(
      selectedIndex + text.length,
      selectedIndex + text.length + 50
    );

    // 선택 데이터 저장 (전체 문장 사용)
    selectionDataRef.current = { text: fullSentence, contextBefore, contextAfter };

    // 툴팁 위치 계산 - 선택 영역의 오른쪽 끝에 표시
    const rect = range.getBoundingClientRect();
    const x = rect.right + 8;
    const y = rect.top + rect.height / 2;

    setTooltip({
      visible: true,
      x,
      y,
      text: fullSentence,
      contextBefore,
      contextAfter,
    });
  }, [containerSelector]);

  const handleClick = useCallback(() => {
    if (tooltip.visible && tooltip.text) {
      onAskQuestion({
        text: tooltip.text,
        contextBefore: tooltip.contextBefore,
        contextAfter: tooltip.contextAfter,
      });
      setTooltip((prev) => ({ ...prev, visible: false }));
      selectionDataRef.current = null;
      window.getSelection()?.removeAllRanges();
    }
  }, [tooltip, onAskQuestion]);

  useEffect(() => {
    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keyup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keyup", handleSelection);
    };
  }, [handleSelection]);

  // 스크롤 시 툴팁 위치 업데이트
  useEffect(() => {
    const handleScroll = () => {
      if (tooltip.visible && selectionDataRef.current) {
        updateTooltipPosition();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [tooltip.visible, updateTooltipPosition]);

  // 선택 해제 감지
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setTooltip((prev) => ({ ...prev, visible: false }));
        selectionDataRef.current = null;
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  if (!tooltip.visible) return null;

  // 화면 밖으로 나가지 않도록 조정 - 오른쪽에 표시
  const tooltipStyle: React.CSSProperties = {
    position: "fixed",
    left: Math.min(tooltip.x, window.innerWidth - 100),
    top: tooltip.y,
    transform: "translateY(-50%)",
    zIndex: 9999,
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium rounded-full shadow-lg shadow-violet-500/30 cursor-pointer transition-all animate-in fade-in zoom-in-95 duration-150"
      style={tooltipStyle}
    >
      <MessageSquarePlus className="h-3.5 w-3.5" />
      질문하기
    </button>
  );
}
