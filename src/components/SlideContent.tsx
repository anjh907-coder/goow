import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  Key, 
  Target, 
  CheckCircle2, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StepItem } from '../data/guideData';
import { 
  SmartChipWidget, 
  RegexTesterWidget, 
  FilterFormulaWidget, 
  MailPreviewWidget 
} from './InteractiveWidgets';

interface SlideContentProps {
  step: StepItem;
  completedChecklist: Record<string, boolean>;
  onToggleCheckItem: (key: string) => void;
  onNextSlide: () => void;
  isLastSlide: boolean;
}

export const SlideContent: React.FC<SlideContentProps> = ({
  step,
  completedChecklist,
  onToggleCheckItem,
  onNextSlide,
  isLastSlide
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // Count step checklist completion
  const totalChecks = step.checklist.length;
  const checkedCount = step.checklist.filter((_, idx) => completedChecklist[`${step.id}-${idx}`]).length;
  const isAllChecked = totalChecks > 0 && checkedCount === totalChecks;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Main Slide Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
        {/* Header Kicker & Title */}
        <div className="border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
              <span className="bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                {step.lessonTitle}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-600 font-medium">{step.badge}</span>
            </div>

            {totalChecks > 0 && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">실습 달성도:</span>
                <span className={`font-bold tabular-nums ${isAllChecked ? 'text-emerald-700' : 'text-indigo-600'}`}>
                  {checkedCount} / {totalChecks} 완료
                </span>
              </div>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {step.stepTitle}
          </h2>

          {/* Goal / Objective Box */}
          <div className="mt-4 flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs sm:text-sm text-slate-700">
            <Target className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">실습 목표</span>
              <span>{step.objective}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="pt-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Detailed Description */}
          <p className="text-base text-slate-800 font-normal leading-relaxed">
            {step.description}
          </p>

          {/* Interactive Simulator (if available for this step) */}
          {step.interactiveWidget === 'smartchip' && <SmartChipWidget />}
          {step.interactiveWidget === 'regex' && <RegexTesterWidget />}
          {step.interactiveWidget === 'filter' && <FilterFormulaWidget />}
          {step.interactiveWidget === 'mailpreview' && <MailPreviewWidget />}

          {/* Table (if present) */}
          {step.table && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 tracking-wide flex items-center gap-1.5">
                <span>📋 {step.table.title}</span>
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                      {step.table.headers.map((h, i) => (
                        <th key={i} className="px-3.5 py-2.5 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {step.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td 
                            key={cIdx} 
                            className={`px-3.5 py-2.5 ${cIdx === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Code Block (Monokai / VS Code Dark Style) */}
          {step.codeBlock && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>💻</span>
                  <span>{step.codeBlock.title}</span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  {step.codeBlock.language}
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-slate-900 text-slate-100 border border-slate-800 shadow-md">
                {/* Code Header Bar with Copy Button */}
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400">
                      {step.codeBlock.language === 'javascript' ? 'AppsScript.gs' : 'Formula'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(step.codeBlock!.code)}
                    className="flex items-center gap-1.5 rounded-md bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-slate-400" />
                        <span>코드 복사</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Content */}
                <pre className="overflow-x-auto p-4 text-xs font-mono leading-relaxed text-emerald-300">
                  <code>{step.codeBlock.code}</code>
                </pre>
              </div>

              {step.codeBlock.explanation && (
                <p className="text-xs text-slate-500 pt-1">
                  💡 <strong>코드 해설:</strong> {step.codeBlock.explanation}
                </p>
              )}
            </div>
          )}

          {/* Callout Boxes */}
          {step.callouts && (
            <div className="space-y-3 pt-2">
              {step.callouts.map((callout, idx) => {
                let borderColor = 'border-blue-200';
                let bgColor = 'bg-blue-50/60';
                let iconColor = 'text-blue-600';
                let titleColor = 'text-blue-900';
                let IconComponent = Lightbulb;

                if (callout.type === 'warning') {
                  borderColor = 'border-amber-200';
                  bgColor = 'bg-amber-50/60';
                  iconColor = 'text-amber-600';
                  titleColor = 'text-amber-900';
                  IconComponent = AlertTriangle;
                } else if (callout.type === 'key') {
                  borderColor = 'border-indigo-200';
                  bgColor = 'bg-indigo-50/60';
                  iconColor = 'text-indigo-600';
                  titleColor = 'text-indigo-900';
                  IconComponent = Key;
                }

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 rounded-xl border ${borderColor} ${bgColor} p-4 text-xs sm:text-sm`}
                  >
                    <IconComponent className={`h-5 w-5 shrink-0 ${iconColor} mt-0.5`} />
                    <div className="space-y-1">
                      <span className={`font-bold block ${titleColor}`}>
                        {callout.title}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {callout.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Interactive Step Checklist */}
          {step.checklist.length > 0 && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/70 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {step.type === 'checkpoint' ? '교시 달성도 평가 체크리스트' : '직접 따라 해보는 실습 체크리스트'}
                  </h4>
                </div>
                <span className="text-[11px] text-slate-500">
                  완료 시 클릭하면 자동 저장됩니다
                </span>
              </div>

              <div className="space-y-2">
                {step.checklist.map((item, idx) => {
                  const itemKey = `${step.id}-${idx}`;
                  const isChecked = !!completedChecklist[itemKey];

                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 rounded-lg border p-3 text-xs sm:text-sm transition-all cursor-pointer ${
                        isChecked
                          ? 'border-emerald-300 bg-emerald-50/60 text-slate-800'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCheckItem(itemKey)}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={isChecked ? 'line-through text-slate-500' : 'font-medium'}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Checkpoint congratulations card */}
              {step.type === 'checkpoint' && isAllChecked && (
                <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-amber-300 shrink-0" />
                    <div>
                      <h5 className="font-bold text-sm">축하합니다! 이번 교시의 모든 실습을 통과했습니다.</h5>
                      <p className="text-xs text-emerald-100">다음 단계로 넘어가서 스마트 워크 기술을 계속 확장하세요.</p>
                    </div>
                  </div>
                  {!isLastSlide && (
                    <button
                      type="button"
                      onClick={onNextSlide}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors shrink-0"
                    >
                      <span>다음 교시로</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
