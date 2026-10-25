import React from 'react';
import { Menu, ChevronLeft, ChevronRight, Maximize2, Minimize2, CheckSquare, Download } from 'lucide-react';
import { StepItem } from '../data/guideData';

interface HeaderProps {
  currentSlideIndex: number;
  totalSlides: number;
  currentStep: StepItem;
  onPrev: () => void;
  onNext: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenCheckpoints: () => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlideIndex,
  totalSlides,
  currentStep,
  onPrev,
  onNext,
  onToggleSidebar,
  isFullscreen,
  onToggleFullscreen,
  onOpenCheckpoints,
  onOpenExportModal
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md sm:px-6">
      {/* Left zone: Brand and hamburger */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="사이드바 열기/닫기"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-xs">
            G
          </span>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
              구글 워크스페이스 & Apps Script
            </h1>
            <p className="text-[11px] font-medium text-slate-500">실습 가이드 북</p>
          </div>
        </div>
      </div>

      {/* Middle zone: Navigation & Current step breadcrumbs */}
      <div className="flex items-center gap-3 overflow-hidden px-2 text-center">
        {/* Step Navigation [<] 1 / 20 [>] */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentSlideIndex === 0}
            aria-label="이전 슬라이드"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-2 text-xs font-semibold tabular-nums text-slate-800 whitespace-nowrap">
            {currentSlideIndex + 1} <span className="text-slate-400">/</span> {totalSlides}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={currentSlideIndex === totalSlides - 1}
            aria-label="다음 슬라이드"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Current Lesson / Step Breadcrumb Title */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 truncate max-w-md">
          <span className="font-semibold text-indigo-700 whitespace-nowrap">
            {currentStep.lessonTitle.split(':')[0]}
          </span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-800 font-medium truncate">
            {currentStep.stepTitle}
          </span>
        </div>
      </div>

      {/* Right zone: Checkpoints summary, Export HTML & Fullscreen */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onOpenCheckpoints}
          title="체크포인트 종합 현황 보기"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 transition-colors"
        >
          <CheckSquare className="h-3.5 w-3.5 text-indigo-600" />
          <span>체크포인트 모음</span>
        </button>

        <button
          type="button"
          onClick={onOpenExportModal}
          title="단일 HTML 파일 다운로드 및 코드 복사"
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">단일 HTML 받기</span>
          <span className="sm:hidden">HTML</span>
        </button>

        <button
          type="button"
          onClick={onToggleFullscreen}
          title={isFullscreen ? "전체화면 종료" : "전체화면 모드"}
          aria-label="전체화면 토글"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};
