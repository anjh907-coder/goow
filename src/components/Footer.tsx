import React from 'react';
import { ArrowLeft, ArrowRight, Award, Keyboard } from 'lucide-react';

interface FooterProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenCheckpoints: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentSlideIndex,
  totalSlides,
  onPrev,
  onNext,
  onOpenCheckpoints
}) => {
  const isFirst = currentSlideIndex === 0;
  const isLast = currentSlideIndex === totalSlides - 1;
  const progressPercent = Math.round(((currentSlideIndex + 1) / totalSlides) * 100);

  return (
    <footer className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top micro progress bar */}
      <div className="h-1 w-full bg-slate-100">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Previous Button */}
        <div>
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>이전</span>
          </button>
        </div>

        {/* Center: Keyboard hint */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <Keyboard className="h-4 w-4 text-slate-400" />
          <span>키보드 <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[11px] text-slate-700">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[11px] text-slate-700">→</kbd> 또는 <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[11px] text-slate-700">PageUp/Down</kbd>으로 넘길 수 있어요</span>
        </div>

        {/* Right: Next Button or Final Trophy */}
        <div>
          {isLast ? (
            <button
              type="button"
              onClick={onOpenCheckpoints}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:from-emerald-700 hover:to-teal-700 transition-all cursor-pointer"
            >
              <Award className="h-4 w-4 text-amber-300" />
              <span>전체 과정 완주! 종합 점검</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <span>다음</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
