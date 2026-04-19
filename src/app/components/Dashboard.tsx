import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Clock, CheckCircle, Users, BookOpen, ChevronRight,
  AlertCircle, Zap, Calendar, Star, ArrowRight
} from "lucide-react";

const sessionDates = [
  { session: 1, title: "B2B vs B2C Mindset", date: "May 6", status: "completed" },
  { session: 2, title: "Customer Value Mapping", date: "May 13", status: "completed" },
  { session: 3, title: "Automotive Sector Deep Dive", date: "May 20", status: "upcoming-next" },
  { session: 4, title: "Strategic Account Management", date: "May 27", status: "upcoming" },
  { session: 5, title: "Pricing & Negotiation", date: "Jun 3", status: "upcoming" },
  { session: 6, title: "Sales Funnel & CRM", date: "Jun 10", status: "upcoming" },
  { session: 7, title: "Brand Equity in B2B", date: "Jun 17", status: "upcoming" },
  { session: 8, title: "CXO Fireside Chat", date: "Jun 24", status: "upcoming" },
];

const actions = [
  {
    id: 1,
    priority: "high",
    title: "Confirm Session 3 agenda",
    desc: "Due May 19 · Automotive Sector Deep Dive needs your run sheet",
    icon: AlertCircle,
    action: "Confirm Now",
    resolved: false,
  },
  {
    id: 2,
    priority: "high",
    title: "Review 4 new student profiles",
    desc: "Rahul Verma and 3 others enrolled since your last visit",
    icon: Users,
    action: "View Students",
    resolved: false,
  },
  {
    id: 3,
    priority: "medium",
    title: "Complete your Course Builder",
    desc: "Sessions 4–8 are missing agenda details — readiness at 54%",
    icon: BookOpen,
    action: "Open Builder",
    resolved: false,
  },
  {
    id: 4,
    priority: "medium",
    title: "Priya Sharma moved to Shortlisted",
    desc: "Update pipeline status to keep your recruiter in sync",
    icon: Star,
    action: "View Pipeline",
    resolved: false,
  },
];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

const nextSession = new Date("2026-05-20T10:00:00");

export function Dashboard() {
  const [resolvedActions, setResolvedActions] = useState<number[]>([]);
  const countdown = useCountdown(nextSession);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const resolveAction = (id: number, label: string) => {
    setResolvedActions(prev => [...prev, id]);
    toast.success(`${label} — marked complete`);
  };

  const pendingActions = actions.filter(a => !resolvedActions.includes(a.id));

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-[#1e3a5f]" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
          {greeting}, Arjun. 👋
        </h1>
        <p className="text-[#4a5568] text-sm mt-1">Here's your course overview for this week.</p>
      </div>

      <div className="bg-[#1e3a5f] rounded-2xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-[#d4a017]" />
            <span className="text-white/60 text-sm">Next Session</span>
          </div>
          <p className="text-white" style={{ fontWeight: 600 }}>Session 3 · Automotive Sector Deep Dive</p>
          <p className="text-white/50 text-xs mt-0.5">May 20, 2026 · 10:00 AM · FLAME University, Pune</p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hrs" },
            { value: countdown.minutes, label: "Min" },
            { value: countdown.seconds, label: "Sec" },
          ].map((t, i) => (
            <div key={t.label} className="text-center">
              <div className="bg-[#d4a017] rounded-lg px-3 py-2 min-w-[3rem]">
                <span className="text-white text-xl" style={{ fontWeight: 700 }}>{String(t.value).padStart(2, "0")}</span>
              </div>
              <p className="text-white/50 text-xs mt-1">{t.label}</p>
              {i < 3 && <span className="sr-only">:</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-[#e2e8f0]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-[#4a5568] uppercase tracking-wide">Course Readiness</p>
              <p className="text-[#1e3a5f] text-sm mt-0.5">Strategic B2B Marketing</p>
            </div>
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
                <circle cx="28" cy="28" r="22" fill="none" stroke="#f1f3f5" strokeWidth="5" />
                <circle
                  cx="28" cy="28" r="22" fill="none"
                  stroke="#d4a017" strokeWidth="5"
                  strokeDasharray={`${2 * Math.PI * 22 * 0.54} ${2 * Math.PI * 22}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[#1e3a5f] text-xs" style={{ fontWeight: 700 }}>54%</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-[#4a5568]">
              <span>Sessions configured</span><span className="text-[#1e3a5f]">4 / 8</span>
            </div>
            <div className="flex justify-between text-xs text-[#4a5568]">
              <span>Materials uploaded</span><span className="text-[#1e3a5f]">2 / 8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#e2e8f0]">
          <p className="text-xs text-[#4a5568] uppercase tracking-wide mb-4">Session Confirmation</p>
          <div className="space-y-2">
            {sessionDates.slice(0, 4).map(s => (
              <div key={s.session} className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  s.status === "completed" ? "bg-green-500" :
                  s.status === "upcoming-next" ? "bg-[#d4a017]" : "bg-[#e2e8f0]"
                }`}>
                  {s.status === "completed" && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  {s.status === "upcoming-next" && <Clock className="w-3 h-3 text-white" />}
                  {s.status === "upcoming" && <span className="w-2 h-2 bg-[#4a5568] rounded-full" />}
                </div>
                <span className="text-xs text-[#1e3a5f]">S{s.session} · {s.title}</span>
                <span className="text-xs text-[#4a5568] ml-auto">{s.date}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs text-[#d4a017] hover:text-[#b8891a] flex items-center gap-1">
            View all sessions <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#e2e8f0]">
          <p className="text-xs text-[#4a5568] uppercase tracking-wide mb-3">Talent Tracker</p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[#1e3a5f]" style={{ fontSize: "2.5rem", fontWeight: 700 }}>32</span>
            <span className="text-[#4a5568] text-sm">enrolled students</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Watching", count: 14, color: "#6b7280" },
              { label: "Shortlisted", count: 9, color: "#1e3a5f" },
              { label: "Interview", count: 5, color: "#d4a017" },
              { label: "Offer Ext.", count: 2, color: "#16a34a" },
            ].map(item => (
              <div key={item.label} className="bg-[#f8f9fa] rounded-lg p-2.5">
                <div className="text-xs text-[#4a5568]">{item.label}</div>
                <div className="text-[#1e3a5f] text-lg" style={{ fontWeight: 700, color: item.color }}>{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <h3 className="text-[#1e3a5f] text-sm" style={{ fontWeight: 600 }}>Prioritised Next Actions</h3>
              <span className="text-xs text-[#4a5568] bg-[#f8f9fa] px-2 py-0.5 rounded-full">
                {pendingActions.length} pending
              </span>
            </div>
            <div className="divide-y divide-[#e2e8f0]">
              {pendingActions.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-[#1e3a5f]">All caught up!</p>
                  <p className="text-xs text-[#4a5568] mt-1">No pending actions. Great work, Arjun.</p>
                </div>
              ) : (
                pendingActions.map(action => {
                  const Icon = action.icon;
                  return (
                    <div key={action.id} className="flex items-start gap-4 px-5 py-4 hover:bg-[#fafafa] transition-colors">
                      <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        action.priority === "high" ? "bg-red-50" : "bg-[#fef3c7]"
                      }`}>
                        <Icon className={`w-4 h-4 ${action.priority === "high" ? "text-red-500" : "text-[#d4a017]"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1e3a5f]" style={{ fontWeight: 500 }}>{action.title}</p>
                        <p className="text-xs text-[#4a5568] mt-0.5 truncate">{action.desc}</p>
                      </div>
                      <button
                        onClick={() => resolveAction(action.id, action.title)}
                        className="shrink-0 flex items-center gap-1 px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1e3a5f] hover:bg-[#fef3c7] hover:border-[#d4a017] transition-all"
                      >
                        {action.action} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#d4a017]" />
              <h3 className="text-sm text-[#1e3a5f]" style={{ fontWeight: 600 }}>May · June 2026</h3>
            </div>
            <div className="space-y-1.5">
              {sessionDates.map(s => (
                <div key={s.session} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs ${
                  s.status === "upcoming-next" ? "bg-[#fef3c7] border border-[#d4a017]/30" : "hover:bg-[#f8f9fa]"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    s.status === "completed" ? "bg-green-500" :
                    s.status === "upcoming-next" ? "bg-[#d4a017]" : "bg-[#e2e8f0]"
                  }`} />
                  <span className="text-[#4a5568] shrink-0">{s.date}</span>
                  <span className="text-[#1e3a5f] truncate">{s.title}</span>
                  {s.status === "upcoming-next" && (
                    <span className="ml-auto shrink-0 text-[#d4a017]" style={{ fontWeight: 600 }}>Next</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-[#e2e8f0] p-5">
        <h3 className="text-sm text-[#1e3a5f] mb-4" style={{ fontWeight: 600 }}>Course Timeline</h3>
        <div className="relative">
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-[#e2e8f0] z-0" />
          <div
            className="absolute top-5 left-5 h-0.5 bg-[#d4a017] z-0 transition-all"
            style={{ width: `calc(${(2 / 7) * 100}% - 0px)` }}
          />
          <div className="relative flex justify-between">
            {sessionDates.map(s => (
              <div key={s.session} className="flex flex-col items-center gap-2" style={{ width: `${100 / 8}%` }}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs z-10 shrink-0 transition-all ${
                  s.status === "completed"
                    ? "bg-green-500 border-green-500 text-white"
                    : s.status === "upcoming-next"
                    ? "bg-[#d4a017] border-[#d4a017] text-white shadow-lg shadow-[#d4a017]/30"
                    : "bg-white border-[#e2e8f0] text-[#4a5568]"
                }`} style={{ fontWeight: 600 }}>
                  {s.status === "completed" ? "✓" : s.session}
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#1e3a5f] hidden sm:block leading-tight" style={{ maxWidth: 64 }}>{s.title}</p>
                  <p className="text-xs text-[#4a5568] mt-0.5">{s.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
