import { useState } from "react";
import { toast } from "sonner";
import { X, Star, Users, Calendar } from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer
} from "recharts";

const COLUMNS = ["Watching", "Shortlisted", "Interview Requested", "Offer Extended"] as const;
type Column = typeof COLUMNS[number];

interface PipelineStudent {
  id: number;
  name: string;
  initials: string;
  track: string;
  gpa: string;
  column: Column;
  starred: boolean;
  attendance: number; // %
  lastSession: string;
  skills: { subject: string; value: number }[];
  bio: string;
  tags: string[];
  imgUrl?: string;
}

const initialStudents: PipelineStudent[] = [
  {
    id: 1, name: "Devank K Singh", initials: "DKS", track: "Marketing Student", gpa: "8",
    column: "Shortlisted", starred: true, attendance: 70, lastSession: "Session 2",
    skills: [
      { subject: "Strat. Thinking", value: 92 }, { subject: "Communication", value: 88 },
      { subject: "Fin. Acumen", value: 74 }, { subject: "Leadership", value: 70 }, { subject: "Client Mgmt", value: 85 },
    ],
    bio: "Top performer in B2B marketing modules. Sharp strategic thinker with strong CRM knowledge and excellent communication skills.",
    tags: ["B2B Marketing", "CRM", "Market Research"],
  },
  {
    id: 2, name: "Shreeya Ahuja", initials: "SA", track: "Marketing Student", gpa: "8.5",
    column: "Watching", starred: false, attendance: 90, lastSession: "Session 2",
    skills: [
      { subject: "Strat. Thinking", value: 80 }, { subject: "Communication", value: 92 },
      { subject: "Fin. Acumen", value: 65 }, { subject: "Leadership", value: 88 }, { subject: "Client Mgmt", value: 90 },
    ],
    bio: "Natural leader with strong business development instincts. Prior internship in B2B sales at a mid-cap firm.",
    tags: ["Key Account Mgmt", "Negotiation", "Salesforce"],
  },
  {
    id: 3, name: "Ria Shah", initials: "RS", track: "Marketing Student", gpa: "9.2",
    column: "Interview Requested", starred: true, attendance: 80, lastSession: "Session 2",
    skills: [
      { subject: "Strat. Thinking", value: 90 }, { subject: "Communication", value: 80 },
      { subject: "Fin. Acumen", value: 95 }, { subject: "Leadership", value: 72 }, { subject: "Client Mgmt", value: 78 },
    ],
    bio: "Exceptional finance and consulting aptitude. Strong in financial modelling and case-based problem solving.",
    tags: ["Financial Modelling", "Consulting Frameworks", "Excel"],
  },
  {
    id: 4, name: "Nishika Gupte", initials: "NG", track: "Advertising Student", gpa: "8.8",
    column: "Watching", starred: false, attendance: 80, lastSession: "Session 1",
    skills: [
      { subject: "Strat. Thinking", value: 78 }, { subject: "Communication", value: 72 },
      { subject: "Fin. Acumen", value: 80 }, { subject: "Leadership", value: 65 }, { subject: "Client Mgmt", value: 70 },
    ],
    bio: "Solid operations foundation. Strong in process mapping, logistics coordination, and supply chain optimisation.",
    tags: ["Logistics", "Process Mapping", "ERP"],
  },
  {
    id: 5, name: "Maanya Pant", initials: "MP", track: "Marketing and Econ Student", gpa: "9.9",
    column: "Shortlisted", starred: false, attendance: 95, lastSession: "Session 2",
    skills: [
      { subject: "Strat. Thinking", value: 82 }, { subject: "Communication", value: 95 },
      { subject: "Fin. Acumen", value: 65 }, { subject: "Leadership", value: 78 }, { subject: "Client Mgmt", value: 88 },
    ],
    bio: "Exceptional brand instincts with strong stakeholder communication skills. Background in content strategy and B2B brand positioning.",
    tags: ["Brand Strategy", "Content", "Stakeholder Mgmt"],
  },
  {
    id: 6, name: "Aalika Irfan Pabaney", initials: "AIP", track: "Marketing and IR Student", gpa: "9.5",
    column: "Shortlisted", starred: true, attendance: 85, lastSession: "Session 2",
    skills: [
      { subject: "Strat. Thinking", value: 95 }, { subject: "Communication", value: 82 },
      { subject: "Fin. Acumen", value: 78 }, { subject: "Leadership", value: 90 }, { subject: "Client Mgmt", value: 80 },
    ],
    bio: "Perfect attendance. Strong entrepreneurial mindset with proven go-to-market and business development skills.",
    tags: ["Business Dev", "Go-to-Market", "Pitching"],
  },
  {
    id: 7, name: "Rohan Dua", initials: "RD", track: "Marketing Student", gpa: "9.2",
    column: "Offer Extended", starred: true, attendance: 80, lastSession: "Session 2",
    skills: [
      { subject: "Strat. Thinking", value: 96 }, { subject: "Communication", value: 90 },
      { subject: "Fin. Acumen", value: 82 }, { subject: "Leadership", value: 88 }, { subject: "Client Mgmt", value: 92 },
    ],
    bio: "Outstanding strategic marketing talent. Top academic performer with strong analytics and client management skills.",
    tags: ["Marketing Analytics", "CRM", "Strategy"],
  },
  {
    id: 8, name: "Principal Pahuja", initials: "PP", track: "Entrepreneur", gpa: "10",
    column: "Watching", starred: false, attendance: 75, lastSession: "Session 1",
    skills: [
      { subject: "Strat. Thinking", value: 72 }, { subject: "Communication", value: 85 },
      { subject: "Fin. Acumen", value: 60 }, { subject: "Leadership", value: 80 }, { subject: "Client Mgmt", value: 75 },
    ],
    bio: "Strong people management fundamentals. Experienced in organisational behaviour and talent acquisition strategies.",
    tags: ["People Management", "Org Design", "Talent Acq."],
  },
];

const colColors: Record<Column, { bg: string; badge: string; text: string }> = {
  "Watching": { bg: "bg-[#f8f9fa]", badge: "bg-[#e2e8f0] text-[#4a5568]", text: "text-[#4a5568]" },
  "Shortlisted": { bg: "bg-[#f0f4f9]", badge: "bg-[#1e3a5f] text-white", text: "text-[#1e3a5f]" },
  "Interview Requested": { bg: "bg-[#fef9ec]", badge: "bg-[#fef3c7] text-[#b8891a]", text: "text-[#b8891a]" },
  "Offer Extended": { bg: "bg-[#f0fdf4]", badge: "bg-green-100 text-green-700", text: "text-green-700" },
};

export function Pipeline() {
  const [students, setStudents] = useState<PipelineStudent[]>(initialStudents);
  const [dragging, setDragging] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dragOverCol, setDragOverCol] = useState<Column | null>(null);

  const selectedStudent = students.find(s => s.id === selectedId);

  const moveStudent = (id: number, col: Column) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, column: col } : s));
    const student = students.find(s => s.id === id);
    toast.success(`${student?.name} → ${col}`);
  };

  const requestInterview = (student: PipelineStudent) => {
    moveStudent(student.id, "Interview Requested");
    setSelectedId(null);
    toast.success(`Interview requested for ${student.name} ✓`);
  };

  return (
    <div className="px-6 py-8 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#1e3a5f]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Recruitment Pipeline</h1>
          <p className="text-[#4a5568] text-sm">Drag students between stages · Click a card to view profile</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#4a5568] bg-white border border-[#e2e8f0] rounded-lg px-3 py-2">
          <Users className="w-4 h-4" />
          <span>{students.length} total</span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: 500 }}>
        {COLUMNS.map(col => {
          const colStudents = students.filter(s => s.column === col);
          const colors = colColors[col];
          return (
            <div
              key={col}
              className={`flex-1 min-w-[220px] max-w-[280px] rounded-xl ${colors.bg} border border-[#e2e8f0] p-3 transition-all ${
                dragOverCol === col ? "ring-2 ring-[#d4a017]" : ""
              }`}
              onDragOver={e => { e.preventDefault(); setDragOverCol(col); }}
              onDrop={() => {
                if (dragging !== null) {
                  moveStudent(dragging, col);
                  setDragging(null);
                  setDragOverCol(null);
                }
              }}
              onDragLeave={() => setDragOverCol(null)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs text-[#1e3a5f]" style={{ fontWeight: 600 }}>{col}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge}`}>{colStudents.length}</span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {colStudents.length === 0 ? (
                  <div className="text-center py-8 text-xs text-[#4a5568] border-2 border-dashed border-[#e2e8f0] rounded-lg">
                    Drop students here
                  </div>
                ) : (
                  colStudents.map(student => (
                    <div
                      key={student.id}
                      draggable
                      onDragStart={() => setDragging(student.id)}
                      onDragEnd={() => { setDragging(null); setDragOverCol(null); }}
                      onClick={() => setSelectedId(student.id)}
                      className={`bg-white rounded-lg border border-[#e2e8f0] p-3 cursor-pointer hover:shadow-md hover:border-[#d4a017]/40 transition-all ${
                        dragging === student.id ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {student.imgUrl ? (
                          <img src={student.imgUrl} alt={student.name} className="w-7 h-7 rounded-full object-cover border border-[#e2e8f0]" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs shrink-0" style={{ fontWeight: 600 }}>
                            {student.initials}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#1e3a5f] truncate" style={{ fontWeight: 600 }}>{student.name}</p>
                          <p className="text-xs text-[#4a5568] truncate">{student.track}</p>
                        </div>
                        {student.starred && <Star className="w-3 h-3 text-[#d4a017] shrink-0" fill="currentColor" />}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#4a5568]">GPA <span className="text-[#1e3a5f]">{student.gpa}</span></span>
                        <span className="text-xs text-[#4a5568]">{student.attendance}% att.</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {student.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 text-xs bg-[#f0f4f9] text-[#1e3a5f] rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setSelectedId(null)} />
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            {/* Drawer header */}
            <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-sm text-[#1e3a5f]" style={{ fontWeight: 600 }}>Student Profile</h3>
              <button onClick={() => setSelectedId(null)} className="p-1.5 rounded-lg text-[#4a5568] hover:bg-[#f8f9fa] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-5 space-y-5">
              {/* Profile */}
              <div className="flex items-center gap-4">
                {selectedStudent.imgUrl ? (
                  <img src={selectedStudent.imgUrl} alt={selectedStudent.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#e2e8f0]" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-lg" style={{ fontWeight: 700 }}>
                    {selectedStudent.initials}
                  </div>
                )}
                <div>
                  <h4 className="text-[#1e3a5f]" style={{ fontWeight: 700 }}>{selectedStudent.name}</h4>
                  <p className="text-sm text-[#4a5568]">{selectedStudent.track}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colColors[selectedStudent.column].badge}`}>
                      {selectedStudent.column}
                    </span>
                    {selectedStudent.starred && <Star className="w-3.5 h-3.5 text-[#d4a017]" fill="currentColor" />}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "GPA", value: selectedStudent.gpa + "/10" },
                  { label: "Attendance", value: selectedStudent.attendance + "%" },
                  { label: "Last Session", value: selectedStudent.lastSession },
                ].map(stat => (
                  <div key={stat.label} className="bg-[#f8f9fa] rounded-lg p-2.5 text-center">
                    <p className="text-xs text-[#4a5568]">{stat.label}</p>
                    <p className="text-sm text-[#1e3a5f] mt-0.5" style={{ fontWeight: 600 }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Radar chart */}
              <div>
                <p className="text-xs text-[#4a5568] mb-2" style={{ fontWeight: 600 }}>Skill Profile</p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={selectedStudent.skills} cx="50%" cy="50%" outerRadius={65}>
                      <PolarGrid stroke="#f1f3f5" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#4a5568" }} />
                      <Radar dataKey="value" stroke="#d4a017" fill="#d4a017" fillOpacity={0.25} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bio */}
              <div>
                <p className="text-xs text-[#4a5568] mb-1.5" style={{ fontWeight: 600 }}>Bio</p>
                <p className="text-sm text-[#1e3a5f] leading-relaxed">{selectedStudent.bio}</p>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs text-[#4a5568] mb-1.5" style={{ fontWeight: 600 }}>Skills & Tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-xs bg-[#f0f4f9] text-[#1e3a5f] rounded-full border border-[#e2e8f0]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Move stage */}
              <div>
                <p className="text-xs text-[#4a5568] mb-2" style={{ fontWeight: 600 }}>Move Stage</p>
                <div className="grid grid-cols-2 gap-2">
                  {COLUMNS.filter(c => c !== selectedStudent.column).map(col => (
                    <button
                      key={col}
                      onClick={() => { moveStudent(selectedStudent.id, col); setSelectedId(null); }}
                      className="px-2 py-2 text-xs border border-[#e2e8f0] rounded-lg text-[#4a5568] hover:bg-[#f8f9fa] transition-colors text-left"
                    >
                      → {col}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Request Interview CTA */}
            <div className="p-5 border-t border-[#e2e8f0] sticky bottom-0 bg-white">
              <button
                onClick={() => requestInterview(selectedStudent)}
                disabled={selectedStudent.column === "Interview Requested" || selectedStudent.column === "Offer Extended"}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#d4a017] text-white rounded-xl hover:bg-[#b8891a] transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontWeight: 600 }}
              >
                <Calendar className="w-4 h-4" />
                {selectedStudent.column === "Interview Requested" ? "Interview Already Requested" :
                 selectedStudent.column === "Offer Extended" ? "Offer Already Extended" :
                 "Request Interview"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}