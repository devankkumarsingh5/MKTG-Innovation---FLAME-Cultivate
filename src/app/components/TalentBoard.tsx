import { useState } from "react";
import { toast } from "sonner";
import { Search, Star, ChevronDown } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const statusOptions = ["Watching", "Shortlisted", "Interview Requested", "Offer Extended"];

interface Student {
  id: number;
  name: string;
  initials: string;
  track: string;
  gpa: string;
  attendance: boolean[];
  status: string;
  starred: boolean;
  skills: { subject: string; value: number }[];
  tags: string[];
  imgUrl?: string;
}

const students: Student[] = [
  {
    name: "Devank K Singh", initials: "DKS", track: "Marketing Student",
    gpa: "8/10", attendance: [true, true, true, false, true, true, false, false],
    status: "Shortlisted", starred: true,
    skills: [
      {subject: "Strategic Thinking", value: 92}, {subject: "Communication", value: 88},
      {subject: "Financial Acumen", value: 74}, {subject: "Leadership", value: 70},
      {subject: "Client Management", value: 85}, {subject: "Problem Solving", value: 90},
    ],
    tags: ["B2B Marketing", "CRM", "Market Research"],
    id: 0
  },
  {
    name: "Shreeya Ahuja", initials: "SA", track: "Marketing Student",
    gpa: "8.5/10", attendance: [true, true, false, true, true, false, true, false],
    status: "Watching", starred: false,
    skills: [
      {subject: "Strategic Thinking", value: 80}, {subject: "Communication", value: 92},
      {subject: "Financial Acumen", value: 68}, {subject: "Leadership", value: 88},
      {subject: "Client Management", value: 90}, {subject: "Problem Solving", value: 82},
    ],
    tags: ["Key Account Mgmt", "Negotiation", "Salesforce"],
    id: 0
  },
  {
    name: "Ria Shah", initials: "RS", track: "Marketing Student",
    gpa: "9.2/10", attendance: [true, true, true, true, true, true, false, false],
    status: "Interview Requested", starred: true,
    skills: [
      {subject: "Strategic Thinking", value: 90}, {subject: "Communication", value: 80},
      {subject: "Financial Acumen", value: 95}, {subject: "Leadership", value: 72},
      {subject: "Client Management", value: 78}, {subject: "Problem Solving", value: 92},
    ],
    tags: ["Financial Modelling", "Consulting Frameworks", "Excel"],
    id: 0
  },
  {
    name: "Nishika Gupte", initials: "NG", track: "Advertising Student",
    gpa: "8.8/10", attendance: [true, false, true, true, false, true, true, false],
    status: "Watching", starred: false,
    skills: [
      {subject: "Strategic Thinking", value: 78}, {subject: "Communication", value: 72},
      {subject: "Financial Acumen", value: 80}, {subject: "Leadership", value: 65},
      {subject: "Client Management", value: 70}, {subject: "Problem Solving", value: 85},
    ],
    tags: ["Logistics", "Process Mapping", "ERP"],
    id: 0
  },
  {
    id: 5, name: "Maanya Pant", initials: "MN", track: "Econmics and Marketing Student",
    gpa: "9.9/10", attendance: [true, true, true, true, true, false, false, false],
    status: "Selected", starred: false,
    skills: [
      { subject: "Strategic Thinking", value: 82 }, { subject: "Communication", value: 95 },
      { subject: "Financial Acumen", value: 65 }, { subject: "Leadership", value: 78 },
      { subject: "Client Management", value: 88 }, { subject: "Problem Solving", value: 80 },
    ],
    tags: ["Brand Strategy", "Content", "Stakeholder Mgmt"],
  },
  {
    id: 6, name: "Aalika Irfan Pabaney", initials: "AIP", track: "Marketing and IR Student",
    gpa: "9.5/10", attendance: [true, true, true, true, true, true, true, false],
    status: "Shortlisted", starred: true,
    skills: [
      { subject: "Strategic Thinking", value: 95 }, { subject: "Communication", value: 82 },
      { subject: "Financial Acumen", value: 78 }, { subject: "Leadership", value: 90 },
      { subject: "Client Management", value: 80 }, { subject: "Problem Solving", value: 92 },
    ],
    tags: ["Business Dev", "Go-to-Market", "Pitching"],
  },
  {
    id: 7, name: "Rohan Dua", initials: "RD", track: "Marketing Student",
    gpa: "9.2/10", attendance: [true, true, true, true, true, true, false, false],
    status: "Offer Extended", starred: true,
    skills: [
      { subject: "Strategic Thinking", value: 96 }, { subject: "Communication", value: 90 },
      { subject: "Financial Acumen", value: 82 }, { subject: "Leadership", value: 88 },
      { subject: "Client Management", value: 92 }, { subject: "Problem Solving", value: 95 },
    ],
    tags: ["Marketing Analytics", "CRM", "Strategy"],
  },
  {
    id: 8, name: "Principal Pahuja", initials: "PP", track: "Entrepreneur",
    gpa: "10/10", attendance: [false, true, true, false, true, true, true, false],
    status: "Selected", starred: false,
    skills: [
      { subject: "Strategic Thinking", value: 72 }, { subject: "Communication", value: 85 },
      { subject: "Financial Acumen", value: 60 }, { subject: "Leadership", value: 80 },
      { subject: "Client Management", value: 75 }, { subject: "Problem Solving", value: 70 },
    ],
    tags: ["People Management", "Org Design", "Talent Acq."],
  },
];

function AttendancePips({ sessions }: { sessions: boolean[] }) {
  return (
    <div className="flex gap-1">
      {sessions.map((present, i) => (
        <div key={i} title={`Session ${i + 1}: ${present ? "Present" : "Absent"}`}
          className={`w-3 h-3 rounded-full border ${
            present ? "bg-[#d4a017] border-[#d4a017]" :
            i < 3 ? "bg-[#f1f3f5] border-[#e2e8f0]" : "bg-[#f8f9fa] border-[#f1f3f5]"
          }`} />
      ))}
    </div>
  );
}

const statusColors: Record<string, string> = {
  "Watching": "bg-[#f1f3f5] text-[#4a5568]",
  "Shortlisted": "bg-[#1e3a5f] text-white",
  "Interview Requested": "bg-[#fef3c7] text-[#b8891a]",
  "Offer Extended": "bg-green-50 text-green-700",
};

export function TalentBoard() {
  const [search, setSearch] = useState("");
  const [studentList, setStudentList] = useState<Student[]>(students);
  const [filter, setFilter] = useState("All");

  const updateStatus = (id: number, status: string) => {
    setStudentList(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    const student = studentList.find(s => s.id === id);
    toast.success(`${student?.name} moved to ${status}`);
  };

  const toggleStar = (id: number) => {
    setStudentList(prev => prev.map(s => s.id === id ? { ...s, starred: !s.starred } : s));
  };

  const filtered = studentList.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.track.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1e3a5f]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Talent Board</h1>
          <p className="text-[#4a5568] text-sm">{studentList.length} enrolled students · Strategic B2B Marketing</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..."
              className="pl-9 pr-4 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-white w-52" />
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", ...statusOptions].map(opt => (
          <button key={opt} onClick={() => setFilter(opt)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
              filter === opt ? "bg-[#d4a017] border-[#d4a017] text-white" : "bg-white border-[#e2e8f0] text-[#4a5568] hover:border-[#d4a017]"
            }`}>
            {opt}
            {opt !== "All" && <span className="ml-1.5 opacity-70">({studentList.filter(s => s.status === opt).length})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[#e2e8f0]">
          <p className="text-[#1e3a5f] mb-2">No students match your filter</p>
          <p className="text-sm text-[#4a5568]">Try clearing your search or changing the status filter.</p>
          <button onClick={() => { setSearch(""); setFilter("All"); }} className="mt-3 text-sm text-[#d4a017] hover:text-[#b8891a]">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(student => (
            <div key={student.id} className="bg-white rounded-xl border border-[#e2e8f0] p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {student.imgUrl ? (
                    <img src={student.imgUrl} alt={student.name} className="w-10 h-10 rounded-full object-cover border border-[#e2e8f0]" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-sm" style={{ fontWeight: 600 }}>{student.initials}</div>
                  )}
                  <div>
                    <p className="text-sm text-[#1e3a5f]" style={{ fontWeight: 600 }}>{student.name}</p>
                    <p className="text-xs text-[#4a5568]">{student.track}</p>
                  </div>
                </div>
                <button onClick={() => toggleStar(student.id)} className={`p-1.5 rounded-lg transition-colors ${student.starred ? "text-[#d4a017]" : "text-[#cbd5e0] hover:text-[#d4a017]"}`}>
                  <Star className="w-4 h-4" fill={student.starred ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="h-36 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={student.skills} cx="50%" cy="50%" outerRadius={52}>
                    <PolarGrid stroke="#f1f3f5" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "#4a5568" }} />
                    <Radar name={student.name} dataKey="value" stroke="#d4a017" fill="#d4a017" fillOpacity={0.2} strokeWidth={1.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mb-3">
                <p className="text-xs text-[#4a5568] mb-1.5">Session Attendance</p>
                <AttendancePips sessions={student.attendance} />
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {student.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-[#f0f4f9] text-[#1e3a5f] rounded-full border border-[#e2e8f0]">{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#f1f3f5]">
                <span className="text-xs text-[#4a5568]">GPA <span className="text-[#1e3a5f]" style={{ fontWeight: 600 }}>{student.gpa}</span></span>
                <div className="relative">
                  <select value={student.status} onChange={e => updateStatus(student.id, e.target.value)}
                    className={`appearance-none pl-2 pr-6 py-1 text-xs rounded-full cursor-pointer border-0 outline-none ${statusColors[student.status]}`}>
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
