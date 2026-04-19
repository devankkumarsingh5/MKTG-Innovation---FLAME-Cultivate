import { useState } from "react";
import { toast } from "sonner";
import {
  GripVertical, Plus, Trash2, ChevronDown, ChevronUp,
  Lock, CheckCircle, Upload, AlertCircle, Send
} from "lucide-react";

interface Session {
  id: number;
  title: string;
  duration: string;
  objective: string;
  keyTopics: string;
  materials: string;
  confirmed: boolean;
}

const initialSessions: Session[] = [
  { id: 1, title: "B2B vs B2C Mindset", duration: "90 min", objective: "Help students understand how B2B purchasing decisions differ from consumer behaviour", keyTopics: "Buying committees, longer sales cycles, relationship-driven deals, rational vs emotional triggers", materials: "Deck uploaded", confirmed: true },
  { id: 2, title: "Customer Value Mapping", duration: "90 min", objective: "Teach students how to identify and articulate value propositions for business customers", keyTopics: "Value chain analysis, stakeholder mapping, benefit laddering, competitive differentiation", materials: "Case study: Bosch India Distribution Strategy", confirmed: true },
  { id: 3, title: "Automotive Sector Deep Dive", duration: "90 min", objective: "Apply B2B marketing frameworks to the automotive supply chain context", keyTopics: "OEM relationships, tier-1 suppliers, after-market channels, procurement cycles", materials: "", confirmed: false },
  { id: 4, title: "Strategic Account Management", duration: "90 min", objective: "", keyTopics: "", materials: "", confirmed: false },
  { id: 5, title: "Pricing & Negotiation in B2B", duration: "90 min", objective: "", keyTopics: "", materials: "", confirmed: false },
  { id: 6, title: "Sales Funnel & CRM Strategy", duration: "90 min", objective: "", keyTopics: "", materials: "", confirmed: false },
  { id: 7, title: "Brand Equity in B2B Markets", duration: "90 min", objective: "", keyTopics: "", materials: "", confirmed: false },
  { id: 8, title: "CXO Fireside Chat", duration: "90 min", objective: "Close the course with a real industry leader conversation on careers and market outlook", keyTopics: "Career journeys, sector trends, Q&A with students", materials: "", confirmed: false },
];

const universityModules = [
  { code: "MKT 301", title: "Marketing Management", credits: 3, relevance: "High" },
  { code: "MKT 410", title: "B2B Marketing", credits: 3, relevance: "High" },
  { code: "STR 201", title: "Business Strategy", credits: 3, relevance: "Medium" },
  { code: "SAL 305", title: "Sales & Distribution", credits: 2, relevance: "Medium" },
  { code: "MBA 401", title: "Consumer Behaviour", credits: 3, relevance: "Low" },
];

function ReadinessScore({ sessions }: { sessions: Session[] }) {
  const confirmed = sessions.filter(s => s.confirmed).length;
  const hasObjective = sessions.filter(s => s.objective.trim()).length;
  const score = Math.round(((confirmed + hasObjective) / (sessions.length * 2)) * 100);
  const color = score >= 75 ? "#16a34a" : score >= 50 ? "#d4a017" : "#ef4444";

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#e2e8f0] shadow-sm">
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 40 40" className="w-10 h-10 -rotate-90">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#f1f3f5" strokeWidth="4" />
          <circle
            cx="20" cy="20" r="16" fill="none"
            stroke={color} strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 16 * score / 100} ${2 * Math.PI * 16}`}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs" style={{ fontWeight: 700, color }}>{score}%</span>
      </div>
      <div>
        <p className="text-xs text-[#4a5568]">Readiness Score</p>
        <p className="text-xs text-[#1e3a5f]" style={{ fontWeight: 600 }}>
          {score >= 75 ? "On Track" : score >= 50 ? "Needs Attention" : "Action Required"}
        </p>
      </div>
    </div>
  );
}

export function CourseBuilder() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [expandedId, setExpandedId] = useState<number | null>(3);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const updateSession = (id: number, field: keyof Session, value: string | boolean) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const toggleConfirm = (id: number) => {
    const session = sessions.find(s => s.id === id);
    if (!session) return;
    const newVal = !session.confirmed;
    updateSession(id, "confirmed", newVal);
    toast.success(newVal ? `Session ${id} confirmed ✓` : `Session ${id} unconfirmed`);
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => { e.preventDefault(); setDragOverIndex(index); };
  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    const reordered = [...sessions];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    setSessions(reordered);
    setDragIndex(null); setDragOverIndex(null);
    toast.success("Session order updated");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1e3a5f]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Course Builder</h1>
          <p className="text-[#4a5568] text-sm mt-0.5">Strategic B2B Marketing · FLAME University · MBA cohort</p>
        </div>
        <ReadinessScore sessions={sessions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden sticky top-24">
            <div className="px-4 py-3 bg-[#f0f4f9] border-b border-[#e2e8f0] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#4a5568]" />
              <span className="text-xs text-[#4a5568] uppercase tracking-wide" style={{ fontWeight: 600 }}>University Context</span>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-[#4a5568]">These are the university modules your course aligns with. Provided for context only.</p>
              <div className="space-y-2.5">
                {universityModules.map(m => (
                  <div key={m.code} className="bg-[#f8f9fa] rounded-lg p-2.5">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs text-[#4a5568]">{m.code}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        m.relevance === "High" ? "bg-[#fef3c7] text-[#b8891a]" :
                        m.relevance === "Medium" ? "bg-blue-50 text-blue-600" :
                        "bg-[#f1f3f5] text-[#4a5568]"
                      }`}>{m.relevance}</span>
                    </div>
                    <p className="text-xs text-[#1e3a5f]">{m.title}</p>
                    <p className="text-xs text-[#4a5568]">{m.credits} credits</p>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#e2e8f0] text-xs text-[#4a5568] leading-relaxed">
                Programme: MBA – Marketing & Strategy<br />
                Cohort: 32 students · 2026 batch
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#4a5568]">Drag to reorder · Click to expand and edit</p>
            <button
              onClick={() => {
                const newId = Math.max(...sessions.map(s => s.id)) + 1;
                setSessions(prev => [...prev, { id: newId, title: `Session ${newId}`, duration: "90 min", objective: "", keyTopics: "", materials: "", confirmed: false }]);
                toast.success("New session added");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1e3a5f] hover:bg-[#f8f9fa] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Session
            </button>
          </div>

          {sessions.map((session, index) => (
            <div
              key={session.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={e => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
              className={`bg-white rounded-xl border transition-all ${
                dragOverIndex === index ? "border-[#d4a017] shadow-md" :
                session.confirmed ? "border-green-200" : "border-[#e2e8f0]"
              } ${dragIndex === index ? "opacity-50" : ""}`}
            >
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer" onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}>
                <GripVertical className="w-4 h-4 text-[#cbd5e0] cursor-grab shrink-0" />
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  session.confirmed ? "bg-green-500 text-white" : "bg-[#f1f3f5] text-[#4a5568]"
                }`} style={{ fontWeight: 600 }}>
                  {session.confirmed ? "✓" : session.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1e3a5f] truncate" style={{ fontWeight: 500 }}>{session.title}</p>
                  <p className="text-xs text-[#4a5568]">{session.duration}
                    {session.objective && ` · ${session.objective.slice(0, 50)}...`}
                    {!session.objective && !session.confirmed && <span className="text-amber-500 ml-1">· Needs details</span>}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!session.objective && <AlertCircle className="w-4 h-4 text-amber-400" />}
                  {expandedId === session.id ? <ChevronUp className="w-4 h-4 text-[#4a5568]" /> : <ChevronDown className="w-4 h-4 text-[#4a5568]" />}
                </div>
              </div>

              {expandedId === session.id && (
                <div className="px-4 pb-4 space-y-4 border-t border-[#e2e8f0]">
                  <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#1e3a5f] mb-1.5" style={{ fontWeight: 600 }}>Session Title</label>
                      <input value={session.title} onChange={e => updateSession(session.id, "title", e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa]" />
                    </div>
                    <div>
                      <label className="block text-xs text-[#1e3a5f] mb-1.5" style={{ fontWeight: 600 }}>Duration</label>
                      <select value={session.duration} onChange={e => updateSession(session.id, "duration", e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa]">
                        {["60 min", "90 min", "120 min", "180 min"].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#1e3a5f] mb-1.5" style={{ fontWeight: 600 }}>What will students walk away knowing?</label>
                    <textarea value={session.objective} onChange={e => updateSession(session.id, "objective", e.target.value)}
                      placeholder="State the one main outcome in plain language..." rows={2}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa] resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#1e3a5f] mb-1.5" style={{ fontWeight: 600 }}>Key Topics to Cover</label>
                    <textarea value={session.keyTopics} onChange={e => updateSession(session.id, "keyTopics", e.target.value)}
                      placeholder="List the main topics, comma separated..." rows={2}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa] resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#1e3a5f] mb-1.5" style={{ fontWeight: 600 }}>Materials & Resources</label>
                    <div className="flex gap-2">
                      <input value={session.materials} onChange={e => updateSession(session.id, "materials", e.target.value)}
                        placeholder="Link, filename, or description..."
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa]" />
                      <button className="px-3 py-2 border border-[#e2e8f0] rounded-lg text-[#4a5568] hover:bg-[#f8f9fa] transition-colors"><Upload className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <button onClick={() => { setSessions(prev => prev.filter(s => s.id !== session.id)); toast.success("Session removed"); }}
                      className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Remove Session
                    </button>
                    <div className="flex gap-2">
                      <button onClick={() => toast.success(`Session ${session.id} saved`)}
                        className="px-3 py-1.5 text-xs border border-[#e2e8f0] rounded-lg text-[#1e3a5f] hover:bg-[#f8f9fa] transition-colors">Save</button>
                      <button onClick={() => toggleConfirm(session.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                          session.confirmed ? "bg-green-500 text-white hover:bg-green-600" : "bg-[#d4a017] text-white hover:bg-[#b8891a]"
                        }`}>
                        <CheckCircle className="w-3.5 h-3.5" />
                        {session.confirmed ? "Confirmed" : "Mark as Ready"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="pt-2">
            <button onClick={() => toast.success("Course plan submitted for review ✓")}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#d4a017] text-white rounded-xl hover:bg-[#b8891a] transition-all text-sm shadow-lg shadow-[#d4a017]/20"
              style={{ fontWeight: 600 }}>
              <Send className="w-4 h-4" />
              Submit Course Plan to FLAME University
            </button>
            <p className="text-center text-xs text-[#4a5568] mt-2">
              Your course plan will be shared with the programme coordinator for final review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
