import React from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  ChevronsLeft, 
  CheckCircle2, 
  Circle, 
  Layers, 
  CheckSquare, 
  FolderTree, 
  ListChecks, 
  TableCellsMerge, 
  Zap, 
  HelpCircle 
} from 'lucide-react';
import { GUIDE_LESSONS, StepItem } from '../data/guideData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentStepId: string;
  onSelectStep: (stepId: string) => void;
  expandedLessons: number[];
  onToggleLessonAccordion: (lessonId: number) => void;
  completedChecklist: Record<string, boolean>;
  onOpenCheckpoints: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentStepId,
  onSelectStep,
  expandedLessons,
  onToggleLessonAccordion,
  completedChecklist,
  onOpenCheckpoints
}) => {
  // Helper to get lesson icon
  const getLessonIcon = (id: number) => {
    switch (id) {
      case 1:
        return <FolderTree className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 2:
        return <ListChecks className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 3:
        return <TableCellsMerge className="w-4 h-4 text-blue-600 shrink-0" />;
      case 4:
        return <Zap className="w-4 h-4 text-amber-600 shrink-0" />;
      default:
        return <Layers className="w-4 h-4 text-slate-600 shrink-0" />;
    }
  };

  // Calculate completion percentage per lesson
  const getLessonProgress = (lessonId: number) => {
    const lesson = GUIDE_LESSONS.find(l => l.id === lessonId);
    if (!lesson) return 0;
    let totalItems = 0;
    let checkedItems = 0;
    lesson.steps.forEach(st => {
      st.checklist.forEach((_, idx) => {
        totalItems++;
        if (completedChecklist[`${st.id}-${idx}`]) {
          checkedItems++;
        }
      });
    });
    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-76 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:z-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">실습 가이드 목차</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="목차 접기"
            title="목차 닫기 («)"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <ChevronsLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Accordion Lesson List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {GUIDE_LESSONS.map((lesson) => {
            const isExpanded = expandedLessons.includes(lesson.id);
            const progress = getLessonProgress(lesson.id);

            return (
              <div 
                key={lesson.id} 
                className="rounded-xl border border-slate-200/80 bg-slate-50/50 overflow-hidden transition-colors"
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => onToggleLessonAccordion(lesson.id)}
                  className="flex w-full items-center justify-between p-3 text-left hover:bg-slate-100/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 shadow-2xs">
                      {getLessonIcon(lesson.id)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {lesson.title.split(':')[0]}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate font-medium">
                        {lesson.title.split(':')[1]?.trim() || lesson.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {progress > 0 && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        progress === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {progress}%
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Sub-steps */}
                {isExpanded && (
                  <div className="border-t border-slate-200/60 bg-white p-1.5 space-y-1">
                    {lesson.steps.map((step) => {
                      const isActive = step.id === currentStepId;
                      const isCheckpoint = step.type === 'checkpoint';
                      
                      // Count checks for this step
                      const stepChecks = step.checklist.map((_, i) => completedChecklist[`${step.id}-${i}`]);
                      const isAllChecked = stepChecks.length > 0 && stepChecks.every(Boolean);

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => {
                            onSelectStep(step.id);
                            if (window.innerWidth < 1024) onClose();
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-all ${
                            isActive
                              ? 'bg-indigo-50 font-bold text-indigo-700 shadow-2xs ring-1 ring-indigo-200'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {isAllChecked ? (
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            ) : (
                              <Circle className="h-3 w-3 shrink-0 text-slate-300" />
                            )}
                            <span className="truncate">
                              {isCheckpoint ? (
                                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                                  <span>🏁</span> {step.shortTitle}
                                </span>
                              ) : (
                                step.stepTitle.replace('Step ', 'S')
                              )}
                            </span>
                          </div>

                          {isActive && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer with Checkpoints Button */}
        <div className="border-t border-slate-200 p-3 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              onOpenCheckpoints();
              if (window.innerWidth < 1024) onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all cursor-pointer"
          >
            <CheckSquare className="h-4 w-4 text-indigo-600" />
            <span>체크포인트 모음 바로가기</span>
          </button>
        </div>
      </aside>
    </>
  );
};
