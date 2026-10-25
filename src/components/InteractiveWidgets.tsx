import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, Send, User, Calendar, Tag } from 'lucide-react';

export const SmartChipWidget: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<'대기' | '진행중' | '완료'>('진행중');
  const [date, setDate] = useState('2026-11-15');
  const [person, setPerson] = useState('홍길동 (기획 담당)');

  return (
    <div className="my-6 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">@</span>
          <h4 className="text-sm font-bold text-slate-800">스마트 칩 실시간 클릭 체험기</h4>
        </div>
        <span className="text-xs text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full font-medium">체험 모드</span>
      </div>
      <p className="text-xs text-slate-600 mb-4">
        구글 문서 본문에서 <kbd className="px-1.5 py-0.5 bg-slate-200 border border-slate-300 rounded text-slate-700 font-mono text-[11px]">@</kbd>를 누르면 아래와 같은 살아있는 스마트 칩이 문서에 심어집니다. 버튼을 직접 눌러 진행 상태를 바꿔보세요!
      </p>

      {/* Mock Document Canvas */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-inner space-y-3">
        <div className="text-xs text-slate-400 font-mono flex items-center justify-between border-b pb-1.5">
          <span>📄 행사 기획서_홍길동.gdoc</span>
          <span>Google Docs 화면</span>
        </div>

        <div className="space-y-3 pt-1 text-sm text-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">프로젝트 담당자:</span>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>{person}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">행사 예정 일자:</span>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-medium text-blue-800 hover:bg-blue-100 transition-colors cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{date} (D-Day)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">현재 기획 상태:</span>
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all">
              <button
                type="button"
                onClick={() => setSelectedStatus(prev => prev === '대기' ? '진행중' : prev === '진행중' ? '완료' : '대기')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  selectedStatus === '대기'
                    ? 'bg-slate-100 text-slate-700 border-slate-300'
                    : selectedStatus === '진행중'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                <Tag className="w-3 h-3" />
                <span>상태: {selectedStatus} (클릭시 변경)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegexTesterWidget: React.FC = () => {
  const [inputVal, setInputVal] = useState('01012345678');
  const regex = /^01[0-9]{8,9}$/;
  const isValid = regex.test(inputVal.trim());

  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h4 className="text-sm font-bold text-slate-800">구글 설문지 전화번호 입력 규칙 검사 체험기</h4>
        </div>
        <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          입력 규칙: ^01[0-9]&#123;8,9&#125;$
        </span>
      </div>

      <p className="text-xs text-slate-600 mb-3">
        참가자가 설문지에 전화번호를 적을 때, 하이픈(-) 없이 10~11자리 숫자만 정확히 통과시키는 원리를 직접 타이핑해보며 확인해보세요.
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            휴대전화 번호 직접 입력해보기:
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="예: 01012345678"
              className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-all focus:outline-none ${
                isValid
                  ? 'border-emerald-400 bg-emerald-50/20 text-slate-900 focus:ring-2 focus:ring-emerald-500'
                  : 'border-rose-400 bg-rose-50/20 text-slate-900 focus:ring-2 focus:ring-rose-500'
              }`}
            />
            <div className="absolute right-3 top-3">
              {isValid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-500" />
              )}
            </div>
          </div>
        </div>

        {/* Validation Result Feedback */}
        {isValid ? (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span><strong>입력 규칙 통과!</strong> 올바른 전화번호 형식입니다. 구글 시트에 깨끗하고 통일된 원본 데이터로 저장됩니다.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <div>
              <span className="font-semibold">[오류 경고 문구 출력]: </span>
              <span>'-' 없이 올바른 10~11자리 휴대폰 번호를 입력해주세요. (하이픈, 글자, 자릿수 오류 차단)</span>
            </div>
          </div>
        )}

        {/* Quick Test Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
          <span>빠른 테스트:</span>
          <button
            type="button"
            onClick={() => setInputVal('01012345678')}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
          >
            정상 11자리 (01012345678)
          </button>
          <button
            type="button"
            onClick={() => setInputVal('010-1234-5678')}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
          >
            오류: 하이픈 포함 (010-1234-5678)
          </button>
          <button
            type="button"
            onClick={() => setInputVal('010123')}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
          >
            오류: 자릿수 부족 (010123)
          </button>
        </div>
      </div>
    </div>
  );
};

export const FilterFormulaWidget: React.FC = () => {
  const [filterType, setFilterType] = useState<'전체' | '일반 참가자' | '발표자'>('일반 참가자');

  const rawRows = [
    { email: 'kim@gmail.com', name: '김민수', phone: '010-9876-5432', type: '일반 참가자', session: 'A: AI 워크스페이스', checked: true },
    { email: 'park@gmail.com', name: '박지은', phone: '010-3333-4444', type: '발표자', session: '기조연설 (Keynote)', checked: true },
    { email: 'lee@gmail.com', name: '이동현', phone: '010-5555-6666', type: '일반 참가자', session: 'B: 커리어 네트워킹', checked: false },
    { email: 'choi@gmail.com', name: '최수진', phone: '010-7777-8888', type: '일반 참가자', session: 'A: AI 워크스페이스', checked: true },
    { email: 'jung@gmail.com', name: '정태우', phone: '010-1111-2222', type: '발표자', session: 'B: 커리어 발표', checked: false },
  ];

  const filtered = filterType === '전체' 
    ? rawRows 
    : rawRows.filter(r => r.type === filterType);

  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <span>📊 저절로 늘어나는 FILTER 수식 체험기 (Google Sheets)</span>
        </h4>
        <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
          자동 확장 (스스로 펼쳐짐)
        </span>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs font-medium text-slate-600">추출할 참가자 조건 선택:</span>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['일반 참가자', '발표자', '전체'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filterType === t 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700 font-semibold border-b">
            <tr>
              <th className="px-3 py-2">줄</th>
              <th className="px-3 py-2">이메일 (B열)</th>
              <th className="px-3 py-2">이름 (C열)</th>
              <th className="px-3 py-2">전화번호 (자동 변환 H열)</th>
              <th className="px-3 py-2">참가 유형 (D열)</th>
              <th className="px-3 py-2">신청 세션 (E열)</th>
              <th className="px-3 py-2 text-center">출석 체크 (G열)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((row, idx) => (
              <tr 
                key={idx}
                className={row.checked ? 'bg-emerald-50/60 font-medium' : 'hover:bg-slate-50'}
              >
                <td className="px-3 py-2 text-slate-400 font-mono">{idx + 1}</td>
                <td className="px-3 py-2 text-slate-800">{row.email}</td>
                <td className="px-3 py-2 font-semibold text-slate-900">{row.name}</td>
                <td className="px-3 py-2 text-slate-600 font-mono">{row.phone}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    row.type === '일반 참가자' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {row.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-700">{row.session}</td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                    row.checked ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {row.checked ? '출석 완료' : '미체크'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        💡 <code>=FILTER(...)</code> 함수는 조건에 맞는 사람만 자동으로 뽑아주며, 출석 완료 시 조건부 서식에 의해 한 줄 전체가 초록색으로 바뀝니다.
      </p>
    </div>
  );
};

export const MailPreviewWidget: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sampleRecipients = [
    { name: '김민수', email: 'minsu.kim@example.com', session: 'A: AI 워크스페이스' },
    { name: '이영희', email: 'younghee.lee@example.com', session: 'B: 커리어 네트워킹' },
    { name: '박준호', email: 'junho.park@example.com', session: 'A: AI 워크스페이스' }
  ];

  const current = sampleRecipients[selectedIndex];
  const subject = `[안내] ${current.name}님, 2026 청년 네트워킹 데이 신청이 완료되었습니다.`;
  const body = `안녕하세요, ${current.name}님!

신청하신 [${current.session}] 세션의 접수가 성공적으로 확인되었습니다.
행사 당일 뵙겠습니다!

- 행사 운영팀 드림 -`;

  return (
    <div className="my-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Send className="w-4 h-4 text-indigo-600" />
          <span>Apps Script <code>GmailApp.sendEmail()</code> 개인 맞춤 메일 발송 체험기</span>
        </h4>
        <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded border border-indigo-200">
          사람마다 이름 자동 변경
        </span>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <span className="text-xs font-medium text-slate-600">발송 대상자 줄 선택:</span>
        <div className="flex gap-1.5">
          {sampleRecipients.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                selectedIndex === i
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {r.name} ({r.session.slice(0, 4)})
            </button>
          ))}
        </div>
      </div>

      {/* Mock Gmail Envelope */}
      <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 font-sans text-xs space-y-2.5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500 font-medium">받는 사람 (To):</span>
          <span className="font-mono text-indigo-700 font-semibold">{current.email}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <span className="text-slate-500 font-medium">메일 제목:</span>
          <span className="font-semibold text-slate-900">{subject}</span>
        </div>
        <div>
          <span className="text-slate-500 font-medium block mb-1">메일 본문 내용 미리보기:</span>
          <div className="bg-white p-3 rounded border border-slate-200 whitespace-pre-line text-slate-800 leading-relaxed font-sans">
            {body}
          </div>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        ✨ 15줄의 자바스크립트 반복문이 시트에 적힌 참가자 명단을 돌며, 각 사람에게 딱 맞는 이름과 세션 정보를 10초 만에 정확하게 전송합니다.
      </p>
    </div>
  );
};
