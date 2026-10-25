import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, CheckCircle2 } from 'lucide-react';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/workspace_guide.html');
      const htmlText = await response.text();
      const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '구글_워크스페이스_AppsScript_실습가이드.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      const response = await fetch('/workspace_guide.html');
      const htmlText = await response.text();
      await navigator.clipboard.writeText(htmlText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                단일 HTML 파일 다운로드 및 코드 복사
              </h3>
              <p className="text-xs text-slate-500">
                외부 빌드 도구 없이 더블클릭하면 모든 브라우저에서 바로 열리는 순수 단일 파일입니다
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

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="rounded-xl bg-indigo-50/70 border border-indigo-100 p-4 text-xs sm:text-sm text-indigo-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-900">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              <span>100% 무설치 단일 HTML5 파일 특징</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs text-indigo-900/80">
              <li>인터넷 브라우저(크롬, 엣지, 사파리, 웨일 등)에서 더블클릭하면 즉시 실행</li>
              <li>Tailwind CSS, FontAwesome, Pretendard 폰트가 CDN으로 모두 내장</li>
              <li>1~4교시 전체 슬라이드 20개, 키보드 단축키, 코드 복사, localStorage 체크리스트 완벽 지원</li>
              <li>인터랙티브 전화번호 정규식 테스터, 스마트 칩, 수식 및 Apps Script 미리보기 내장</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>{isDownloading ? '다운로드 중...' : '단일 HTML 파일 다운로드'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-700">전체 코드 복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-slate-500" />
                  <span>HTML 소스 전체 복사</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-center text-slate-400 pt-2">
            Tip: 다운로드한 <code>.html</code> 파일을 학생들에게 공유하거나 LMS(구글 클래스룸 등)에 첨부하여 배포할 수 있습니다.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-3 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
