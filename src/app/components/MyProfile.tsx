import { useState } from "react";
import { toast } from "sonner";
import { Copy, ExternalLink, ToggleLeft, ToggleRight, Plus, Check, Camera } from "lucide-react";

const AVATAR_URL = "https://images.unsplash.com/photo-1771898343647-bd979ad8cca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBleGVjdXRpdmUlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3NjU4MDk1NXww&ixlib=rb-4.1.0&q=80&w=200";

const sectorOptions = ["Fintech", "SaaS", "Deep Tech", "E-commerce", "Healthtech", "EdTech", "Consulting", "Manufacturing", "Media", "Energy"];
const expertiseOptions = ["Talent Strategy", "Brand Management", "Data Leadership", "B2B Marketing", "AI & ML", "Agile Delivery", "Business Development", "Engineering Leadership"];

const pastCourses = [
  { title: "Digital Product Strategy", university: "IIM Bangalore", year: "2025", students: 28, rating: 4.8 },
  { title: "Data-Driven Organisations", university: "XLRI Jamshedpur", year: "2024", students: 35, rating: 4.6 },
  { title: "Tech Leadership for MBAs", university: "FLAME University", year: "2024", students: 30, rating: 4.9 },
];

const PROFILE_URL = "https://cultivate.flame.edu.in/p/arjun-mehta-infosys";

export function MyProfile() {
  const [name, setName] = useState("Arjun Mehta");
  const [role, setRole] = useState("VP, Talent Strategy");
  const [company, setCompany] = useState("Infosys Limited");
  const [email, setEmail] = useState("arjun.mehta@infosys.com");
  const [phone, setPhone] = useState("+91 98200 34512");
  const [bio, setBio] = useState("Seasoned technology and talent strategy leader with 15+ years at Infosys, driving graduate recruitment and industry-academia partnerships across 12 universities. I believe the best talent pipelines are built in classrooms, not on job boards.");
  const [sectors, setSectors] = useState<string[]>(["Fintech", "SaaS", "Deep Tech"]);
  const [expertise, setExpertise] = useState<string[]>(["Talent Strategy", "Data Leadership", "Engineering Leadership"]);
  const [openToPartner, setOpenToPartner] = useState(true);
  const [saved, setSaved] = useState(false);

  const maxBio = 400;

  const toggleSector = (s: string) => {
    setSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };
  const toggleExpertise = (e: string) => {
    setExpertise(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);
  };

  const saveProfile = () => {
    setSaved(true);
    toast.success("Profile saved successfully ✓");
    setTimeout(() => setSaved(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(PROFILE_URL).catch(() => {});
    toast.success("Profile link copied to clipboard");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#1e3a5f]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>My Course Profile</h1>
          <p className="text-[#4a5568] text-sm">Your professional presence on FLAME Cultivate</p>
        </div>
        <button
          onClick={saveProfile}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all ${
            saved
              ? "bg-green-500 text-white"
              : "bg-[#d4a017] text-white hover:bg-[#b8891a]"
          }`}
          style={{ fontWeight: 600 }}
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="space-y-5">
          {/* Avatar + shareable card */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={AVATAR_URL}
                alt="Arjun Mehta"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#fef3c7] mx-auto"
              />
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#d4a017] rounded-full flex items-center justify-center shadow">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <h3 className="text-[#1e3a5f]" style={{ fontWeight: 700 }}>{name}</h3>
            <p className="text-sm text-[#4a5568]">{role}</p>
            <p className="text-sm text-[#4a5568]">{company}</p>

            {/* Open to partnerships toggle */}
            <div className="mt-4 flex items-center justify-between p-3 bg-[#f8f9fa] rounded-lg">
              <span className="text-xs text-[#4a5568]">Open to new partnerships</span>
              <button onClick={() => setOpenToPartner(!openToPartner)} className="transition-colors">
                {openToPartner
                  ? <ToggleRight className="w-6 h-6 text-[#d4a017]" />
                  : <ToggleLeft className="w-6 h-6 text-[#4a5568]" />}
              </button>
            </div>
          </div>

          {/* Shareable link & QR */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <p className="text-xs text-[#4a5568] uppercase tracking-wide mb-3" style={{ fontWeight: 600 }}>Shareable Profile</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 px-2.5 py-1.5 bg-[#f8f9fa] rounded-lg text-xs text-[#1e3a5f] truncate border border-[#e2e8f0]">
                cultivate.flame.edu.in/p/arjun-mehta
              </div>
              <button onClick={copyLink} className="p-2 border border-[#e2e8f0] rounded-lg text-[#4a5568] hover:bg-[#f8f9fa] transition-colors">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Mock QR code */}
            <div className="bg-white border border-[#e2e8f0] rounded-lg p-3 flex items-center justify-center">
              <div className="w-28 h-28 relative">
                {/* SVG QR-like pattern */}
                <svg viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="29" height="29" fill="white"/>
                  {/* Top-left finder */}
                  <rect x="1" y="1" width="7" height="7" fill="#1e3a5f"/>
                  <rect x="2" y="2" width="5" height="5" fill="white"/>
                  <rect x="3" y="3" width="3" height="3" fill="#1e3a5f"/>
                  {/* Top-right finder */}
                  <rect x="21" y="1" width="7" height="7" fill="#1e3a5f"/>
                  <rect x="22" y="2" width="5" height="5" fill="white"/>
                  <rect x="23" y="3" width="3" height="3" fill="#1e3a5f"/>
                  {/* Bottom-left finder */}
                  <rect x="1" y="21" width="7" height="7" fill="#1e3a5f"/>
                  <rect x="2" y="22" width="5" height="5" fill="white"/>
                  <rect x="3" y="23" width="3" height="3" fill="#1e3a5f"/>
                  {/* Data bits */}
                  {[
                    [9,1],[11,1],[13,1],[15,1],[17,1],
                    [10,3],[12,3],[14,3],[16,3],
                    [9,5],[13,5],[17,5],
                    [10,7],[14,7],
                    [9,9],[10,9],[11,9],[12,9],[13,9],[14,9],[15,9],[16,9],[17,9],[18,9],[19,9],
                    [1,9],[3,9],[5,9],[7,9],
                    [1,11],[5,11],[9,11],[13,11],[17,11],[21,11],
                    [3,13],[7,13],[11,13],[15,13],[19,13],[23,13],
                    [1,15],[5,15],[9,15],[13,15],[17,15],[21,15],
                    [3,17],[7,17],[11,17],[15,17],[19,17],
                    [9,19],[11,19],[13,19],[15,19],[17,19],
                    [21,19],[23,19],[25,19],[27,19],
                    [9,21],[13,21],[21,21],[25,21],
                    [11,23],[15,23],[23,23],[27,23],
                    [9,25],[13,25],[21,25],[25,25],
                    [10,27],[12,27],[14,27],[22,27],[24,27],[26,27],
                  ].map(([x, y], i) => (
                    <rect key={i} x={x} y={y} width="1" height="1" fill="#d4a017"/>
                  ))}
                </svg>
              </div>
            </div>
            <button className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-[#d4a017] hover:text-[#b8891a] transition-colors">
              <ExternalLink className="w-3.5 h-3.5" /> View public profile
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Personal details */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <h3 className="text-sm text-[#1e3a5f] mb-4" style={{ fontWeight: 600 }}>Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: name, setter: setName },
                { label: "Job Title", value: role, setter: setRole },
                { label: "Company / Organisation", value: company, setter: setCompany },
                { label: "Work Email", value: email, setter: setEmail },
                { label: "Phone", value: phone, setter: setPhone },
              ].map(field => (
                <div key={field.label} className={field.label === "Company / Organisation" ? "sm:col-span-2" : ""}>
                  <label className="block text-xs text-[#4a5568] mb-1.5">{field.label}</label>
                  <input
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-[#1e3a5f]" style={{ fontWeight: 600 }}>Professional Bio</h3>
              <span className="text-xs text-[#4a5568]">{bio.length}/{maxBio}</span>
            </div>
            <div className="h-1.5 bg-[#f1f3f5] rounded-full mb-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(bio.length / maxBio) * 100}%`,
                  background: bio.length > maxBio * 0.9 ? "#ef4444" : "#d4a017"
                }}
              />
            </div>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value.slice(0, maxBio))}
              rows={4}
              className="w-full px-3 py-2 text-sm rounded-lg border border-[#e2e8f0] text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa] resize-none"
              placeholder="Tell universities and students about your background and industry focus..."
            />
          </div>

          {/* Sector tags */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <h3 className="text-sm text-[#1e3a5f] mb-3" style={{ fontWeight: 600 }}>Sector Focus</h3>
            <div className="flex flex-wrap gap-2">
              {sectorOptions.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSector(s)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                    sectors.includes(s)
                      ? "bg-[#1e3a5f] border-[#1e3a5f] text-white"
                      : "bg-white border-[#e2e8f0] text-[#4a5568] hover:border-[#1e3a5f]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Expertise areas */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
            <h3 className="text-sm text-[#1e3a5f] mb-3" style={{ fontWeight: 600 }}>Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {expertiseOptions.map(e => (
                <button
                  key={e}
                  onClick={() => toggleExpertise(e)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                    expertise.includes(e)
                      ? "bg-[#d4a017] border-[#d4a017] text-white"
                      : "bg-white border-[#e2e8f0] text-[#4a5568] hover:border-[#d4a017]"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Past Courses Log */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <h3 className="text-sm text-[#1e3a5f]" style={{ fontWeight: 600 }}>Past Courses</h3>
              <button className="flex items-center gap-1 text-xs text-[#d4a017] hover:text-[#b8891a] transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add course
              </button>
            </div>
            <div className="divide-y divide-[#f1f3f5]">
              {pastCourses.map((course, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm text-[#1e3a5f]">{course.title}</p>
                    <p className="text-xs text-[#4a5568]">{course.university} · {course.year}</p>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className="text-xs text-[#4a5568]">{course.students} students</p>
                      <div className="flex items-center gap-1 justify-end">
                        <span className="text-[#d4a017]">★</span>
                        <span className="text-xs text-[#1e3a5f]">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}