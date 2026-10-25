import React from 'react';
import { X, CheckCircle2, Circle, RotateCcw, Award, CheckSquare, Sparkles } from 'lucide-react';
import { GUIDE_LESSONS } from '../data/guideData';

interface AllCheckpointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedChecklist: Record<string, boolean>;
  onToggleCheckItem: (key: string) => void;
  onResetAllChecks: () => void;
  onJumpToStep: (stepId: string) => void;
}

export const AllCheckpointsModal: React.FC<AllCheckpointsModalProps> = ({
  isOpen,
  onClose,
  completedChecklist,
  onToggleCheckItem,
  onResetAllChecks,
  onJumpToStep
}) => {
  if (!isOpen) return null;

  // Compute total checklist items across all lessons
  let totalCount = 0;
  let checkedCount = 0;

  GUIDE_LESSONS.forEach(l => {
    l.steps.forEach(st => {
      st.checklist.forEach((_, idx) => {
        totalCount++;
        if (completedChecklist[`${st.id}-${idx}`]) {
          checkedCount++;
        }
      });
    });
  });

  const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                전체 실습 점검표 종합 현황판
              </h3>
              <p className="text-xs text-slate-500">
                1교시부터 4교시까지의 실습 수행 및 핵심 체크 항목을 한눈에 점검합니다
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Overall Progress Banner */}
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500">전체 달성률</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black tabular-nums text-slate-900">{percentage}%</span>
                <span className="text-xs text-slate-500 tabular-nums">({checkedCount} / {totalCount} 항목 완료)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onResetAllChecks}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>체크 초기화</span>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Scrollable Checkpoints List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {GUIDE_LESSONS.map((lesson) => {
            return (
              <div key={lesson.id} className="rounded-xl border border-slate-200 p-4 bg-white shadow-2xs">
                <div className="flex items-center justify-between border-b pb-2 mb-3">
                  <h4 className="text-sm font-bold text-slate-900">
                    {lesson.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      onJumpToStep(`${lesson.id}-1`);
                      onClose();
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    해당 교시로 이동 →
                  </button>
                </div>

                <div className="space-y-4">
                  {lesson.steps.map((st) => (
                    <div key={st.id} className="space-y-1.5 pl-1">
                      <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span>{st.stepTitle}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5 pl-3">
                        {st.checklist.map((chk, idx) => {
                          const itemKey = `${st.id}-${idx}`;
                          const isChecked = !!completedChecklist[itemKey];

                          return (
                            <label
                              key={idx}
                              className={`flex items-start gap-2.5 rounded-lg border p-2 text-xs transition-all cursor-pointer ${
                                isChecked
                                  ? 'border-emerald-200 bg-emerald-50/50 text-slate-800'
                                  : 'border-slate-100 bg-slate-50/40 text-slate-600 hover:border-slate-200'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => onToggleCheckItem(itemKey)}
                                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <span className={isChecked ? 'line-through text-slate-400' : ''}>
                                {chk}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>체크 상태는 브라우저 로컬 저장소(localStorage)에 안전하게 보존됩니다.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
