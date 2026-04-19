import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Star, FileText, Check, Clock, Users, Zap, ChevronRight, MessageSquare, X } from "lucide-react";

const SESSION_TARGET = new Date("2026-05-20T10:00:00");
const SESSION_END = new Date("2026-05-20T11:30:00");

const runSheetItems = [
  { id: 1, time: "09:45", task: "Join meeting room and test screen share", done: true },
  { id: 2, time: "09:55", task: "Open slide deck — check all links are live", done: true },
  { id: 3, time: "10:00", task: "Welcome students and introduce yourself", done: false },
  { id: 4, time: "10:05", task: "Set context: automotive B2B marketing challenge", done: false },
  { id: 5, time: "10:20", task: "Main content: OEM supply chain & marketing channels", done: false },
  { id: 6, time: "10:45", task: "Group activity: build a key account strategy (15 min)", done: false },
  { id: 7, time: "11:00", task: "Debrief and class discussion", done: false },
  { id: 8, time: "11:15", task: "Q&A open floor", done: false },
  { id: 9, time: "11:25", task: "Wrap-up: preview next session + homework", done: false },
  { id: 10, time: "11:28", task: "Share session resources link in chat", done: false },
];

const students = [
  { id: 1, name: "Devank K Singh", avatar: "DKS", present: true, starred: false, track: "Marketing Student", note: "" },
  { id: 2, name: "Shreeya Ahuja", avatar: "SA", present: true, starred: false, track: "Marketing Student", note: "" },
  { id: 3, name: "Ria Shah", avatar: "RS", present: true, starred: true, track: "Marketing Student", note: "Sharp strategic thinking in Q2" },
  { id: 4, name: "Nishika Gupte", avatar: "NG", present: false, starred: false, track: "Marketing Student", note: "" },
  { id: 5, name: "Maanya Pant", avatar: "MP", present: true, starred: false, track: "Marketing Student", note: "" },
  { id: 6, name: "Aalika Irfan Pabaney", avatar: "AIP", present: true, starred: true, track: "Marketing Student", note: "Strong client management instincts" },
  { id: 7, name: "Rohan Dua", avatar: "RD", present: true, starred: false, track: "Marketing Student", note: "" },
  { id: 8, name: "Principal Pahuja", avatar: "PP", present: false, starred: false, track: "Entrepreneur", note: "" },
  { id: 9, name: "Arash Barve", avatar: "AB", present: true, starred: false, track: "Marketing Student", note: "" },
  { id: 10, name: "Jenay Devan Joshi", avatar: "JDJ", present: true, starred: false, track: "Marketing Student", note: "" },
  { id: 11, name: "Anushi Thakker", avatar: "AT", present: true, starred: false, track: "Marketing Student", note: "" },
  { id: 12, name: "Sanat Kapur", avatar: "SK", present: false, starred: false, track: "Marketing Student", note: "" },
];

function useSessionTimer() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const toStart = SESSION_TARGET.getTime() - now.getTime();
  const elapsed = now.getTime() - SESSION_TARGET.getTime();
  const total = SESSION_END.getTime() - SESSION_TARGET.getTime();

  if (toStart > 0) {
    const h = Math.floor(toStart / 3600000);
    const m = Math.floor((toStart % 3600000) / 60000);
    const s = Math.floor((toStart % 60000) / 1000);
    return { mode: "countdown" as const, h, m, s, progress: 0 };
  } else if (elapsed <= total) {
    const h = Math.floor(elapsed / 3600000);
    const m = Math.floor((elapsed % 3600000) / 60000);
    const s = Math.floor((elapsed % 60000) / 1000);
    return { mode: "live" as const, h, m, s, progress: (elapsed / total) * 100 };
  } else {
    return { mode: "ended" as const, h: 0, m: 0, s: 0, progress: 100 };
  }
}

export function SessionHub() {
  const [checklist, setChecklist] = useState(runSheetItems);
  const [roster, setRoster] = useState(students);
  const [noteId, setNoteId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const timer = useSessionTimer();

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
    const item = checklist.find(i => i.id === id);
    if (item && !item.done) toast.success(`"${item.task}" — checked off`);
  };

  const toggleStar = (id: number) => {
    setRoster(prev => prev.map(s =>
      s.id === id ? { ...s, starred: !s.starred } : s
    ));
    const student = roster.find(s => s.id === id);
    if (student) toast.success(
      student.starred ? `${student.name} unstarred` : `${student.name} ★ starred for follow-up`
    );
  };

  const saveNote = (id: number) => {
    setRoster(prev => prev.map(s => s.id === id ? { ...s, note: noteText } : s));
    setNoteId(null);
    setNoteText("");
    toast.success("Note saved");
  };

  const present = roster.filter(s => s.present).length;
  const checked = checklist.filter(i => i.done).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#1e3a5f]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Session Hub</h1>
        <p className="text-[#4a5568] text-sm">Session 3 · Automotive Sector Deep Dive · May 20, 2026</p>
      </div>

      {/* Timer bar */}
      <div className={`rounded-2xl p-6 mb-6 ${
        timer.mode === "live" ? "bg-[#1e3a5f]" : "bg-[#f0f4f9] border border-[#e2e8f0]"
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {timer.mode === "live" && (
                <span className="flex items-center gap-1.5 text-xs text-red-400">
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" /> LIVE
                </span>
              )}
              {timer.mode === "countdown" && <Clock className="w-4 h-4 text-[#4a5568]" />}
              <span className={`text-sm ${timer.mode === "live" ? "text-white/60" : "text-[#4a5568]"}`}>
                {timer.mode === "countdown" ? "Session starts in" : timer.mode === "live" ? "Session in progress" : "Session ended"}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              {[
                { val: timer.h, label: "H" },
                { val: timer.m, label: "M" },
                { val: timer.s, label: "S" },
              ].map((t, i) => (
                <span key={t.label} className="flex items-baseline gap-1">
                  <span className={`text-5xl tabular-nums ${timer.mode === "live" ? "text-white" : "text-[#1e3a5f]"}`} style={{ fontWeight: 700 }}>
                    {String(t.val).padStart(2, "0")}
                  </span>
                  <span className={`text-xs ${timer.mode === "live" ? "text-white/40" : "text-[#4a5568]"}`}>{t.label}</span>
                  {i < 2 && <span className={`text-3xl ${timer.mode === "live" ? "text-white/30" : "text-[#e2e8f0]"}`}>:</span>}
                </span>
              ))}
            </div>
          </div>
          {/* Progress */}
          {timer.mode === "live" && (
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-xs text-white/50 mb-1.5">
                <span>10:00</span><span>11:30</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#d4a017] rounded-full transition-all" style={{ width: `${timer.progress}%` }} />
              </div>
              <p className="text-xs text-white/50 mt-1.5 text-right">{Math.round(timer.progress)}% elapsed</p>
            </div>
          )}
          {/* Status chips */}
          <div className="flex gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${timer.mode === "live" ? "bg-white/10" : "bg-white border border-[#e2e8f0]"}`}>
              <Users className={`w-4 h-4 ${timer.mode === "live" ? "text-white/60" : "text-[#4a5568]"}`} />
              <span className={`text-sm ${timer.mode === "live" ? "text-white" : "text-[#1e3a5f]"}`} style={{ fontWeight: 600 }}>{present}</span>
              <span className={`text-xs ${timer.mode === "live" ? "text-white/50" : "text-[#4a5568]"}`}>present</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${timer.mode === "live" ? "bg-white/10" : "bg-white border border-[#e2e8f0]"}`}>
              <Zap className={`w-4 h-4 ${timer.mode === "live" ? "text-[#d4a017]" : "text-[#d4a017]"}`} />
              <span className={`text-sm ${timer.mode === "live" ? "text-white" : "text-[#1e3a5f]"}`} style={{ fontWeight: 600 }}>{checked}/{checklist.length}</span>
              <span className={`text-xs ${timer.mode === "live" ? "text-white/50" : "text-[#4a5568]"}`}>done</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Run Sheet Checklist */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#e2e8f0]">
            <h3 className="text-sm text-[#1e3a5f]" style={{ fontWeight: 600 }}>Run Sheet</h3>
            <p className="text-xs text-[#4a5568] mt-0.5">{checked} of {checklist.length} tasks complete</p>
          </div>
          <div className="divide-y divide-[#f1f3f5]">
            {checklist.map(item => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors group ${
                  item.done ? "bg-green-50/50" : "hover:bg-[#fafafa]"
                }`}
                onClick={() => toggleCheck(item.id)}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  item.done ? "bg-green-500 border-green-500" : "border-[#e2e8f0] group-hover:border-[#d4a017]"
                }`}>
                  {item.done && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs text-[#4a5568] shrink-0 tabular-nums w-10">{item.time}</span>
                <span className={`text-sm flex-1 ${item.done ? "line-through text-[#4a5568]" : "text-[#1e3a5f]"}`}>
                  {item.task}
                </span>
                {item.done && <ChevronRight className="w-3.5 h-3.5 text-green-400 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Student Roster */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
            <div>
              <h3 className="text-sm text-[#1e3a5f]" style={{ fontWeight: 600 }}>Live Student Roster</h3>
              <p className="text-xs text-[#4a5568] mt-0.5">{present} present · {roster.length - present} absent</p>
            </div>
          </div>
          <div className="divide-y divide-[#f1f3f5] max-h-[420px] overflow-y-auto">
            {roster.map(student => (
              <div key={student.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#fafafa] transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  student.present ? "bg-[#1e3a5f] text-white" : "bg-[#f1f3f5] text-[#4a5568]"
                }`} style={{ fontWeight: 600 }}>
                  {student.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className={`text-sm ${student.present ? "text-[#1e3a5f]" : "text-[#4a5568]"}`}>{student.name}</p>
                    {!student.present && <span className="text-xs text-red-400">· Absent</span>}
                  </div>
                  <p className="text-xs text-[#4a5568]">{student.track}</p>
                  {student.note && <p className="text-xs text-[#d4a017] mt-0.5 truncate">{student.note}</p>}
                </div>
                {/* Quick actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleStar(student.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      student.starred
                        ? "bg-[#fef3c7] text-[#d4a017]"
                        : "text-[#cbd5e0] hover:text-[#d4a017] hover:bg-[#fef3c7]"
                    }`}
                    title="Star for follow-up"
                  >
                    <Star className="w-3.5 h-3.5" fill={student.starred ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => {
                      setNoteId(student.id);
                      setNoteText(student.note);
                    }}
                    className="p-1.5 rounded-lg text-[#cbd5e0] hover:text-[#1e3a5f] hover:bg-[#f8f9fa] transition-colors"
                    title="Add note"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note modal */}
      {noteId !== null && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#d4a017]" />
                <h4 className="text-sm text-[#1e3a5f]" style={{ fontWeight: 600 }}>
                  Note for {roster.find(s => s.id === noteId)?.name}
                </h4>
              </div>
              <button onClick={() => setNoteId(null)} className="text-[#4a5568] hover:text-[#1e3a5f]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Quick observation about this student..."
              rows={3}
              autoFocus
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa] resize-none"
            />
            <div className="flex gap-2 mt-3">
              <button onClick={() => setNoteId(null)} className="flex-1 py-2 text-sm border border-[#e2e8f0] rounded-lg text-[#4a5568] hover:bg-[#f8f9fa] transition-colors">
                Cancel
              </button>
              <button
                onClick={() => saveNote(noteId)}
                className="flex-1 py-2 text-sm bg-[#d4a017] text-white rounded-lg hover:bg-[#b8891a] transition-colors"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
