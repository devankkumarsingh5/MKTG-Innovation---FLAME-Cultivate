import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Flame, Building2, GraduationCap, TrendingUp, ChevronRight } from "lucide-react";
import { OnboardingModal } from "./OnboardingModal";

const HERO_IMAGE = "https://images.unsplash.com/photo-1758270705087-76e81a5117bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyeSUyMGV4cGVydCUyMHVuaXZlcnNpdHklMjB0ZWFjaGluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzY1ODA5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const stats = [
  { icon: GraduationCap, value: "24", label: "Partner Universities", color: "#d4a017" },
  { icon: Building2, value: "180+", label: "Courses Delivered", color: "#1e3a5f" },
  { icon: TrendingUp, value: "3,400", label: "Students Placed", color: "#d4a017" },
];

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("arjun.mehta@infosys.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOnboarding(true);
    }, 800);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel – Hero */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Industry Expert Teaching"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1e3a5f]/75" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline">
              <span className="text-white text-xl" style={{ fontWeight: 700 }}>FLAME</span>
              <span className="text-[#d4a017] text-xl ml-1.5" style={{ fontWeight: 600 }}>Cultivate</span>
            </div>
          </div>

          {/* Hero text */}
          <div>
            <h1 className="text-white mb-4" style={{ fontSize: "2.75rem", lineHeight: 1.1, fontWeight: 700 }}>
              Design. Deliver.<br />Discover Talent.
            </h1>
            <p className="text-white/70 text-lg max-w-sm" style={{ lineHeight: 1.6 }}>
              The platform that connects industry experts with universities to co-design curriculum and fast-track graduate recruitment.
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Icon className="w-5 h-5 text-[#d4a017] mb-2" />
                    <div className="text-white text-2xl" style={{ fontWeight: 700 }}>{stat.value}</div>
                    <div className="text-white/60 text-xs mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-white/40 text-xs">
            © 2026 FLAME Cultivate. Industry Expert Portal.
          </p>
        </div>
      </div>

      {/* Right Panel – Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 bg-white">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-[#d4a017] rounded-lg flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline">
            <span className="text-[#1e3a5f] text-lg" style={{ fontWeight: 700 }}>FLAME</span>
            <span className="text-[#d4a017] text-lg ml-1" style={{ fontWeight: 600 }}>Cultivate</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-[#1e3a5f]" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              Industry Expert Portal
            </h2>
            <p className="text-[#4a5568] mt-2 text-sm">
              Sign in to manage your courses, sessions, and recruitment pipeline.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-sm text-[#1e3a5f] mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[#1e3a5f] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm text-[#1e3a5f] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[#1e3a5f] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa] pr-12 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#1e3a5f] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-10 h-5 rounded-full transition-all flex items-center px-0.5 ${
                    remember ? "bg-[#d4a017]" : "bg-[#e2e8f0]"
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-all ${
                    remember ? "translate-x-5" : "translate-x-0"
                  }`} />
                </div>
                <span className="text-sm text-[#4a5568]">Remember me</span>
              </label>
              <button type="button" className="text-sm text-[#d4a017] hover:text-[#b8891a] transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8891a] transition-all text-sm disabled:opacity-70"
              style={{ fontWeight: 600 }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Context note */}
          <div className="mt-6 p-4 bg-[#f0f4f9] rounded-xl border border-[#e2e8f0]">
            <p className="text-xs text-[#4a5568] leading-relaxed">
              <span className="text-[#1e3a5f]" style={{ fontWeight: 600 }}>Access is invitation-only.</span>{" "}
              Access is granted upon completion of your university partnership agreement. Contact{" "}
              <span className="text-[#d4a017]">partnerships@flamecultivate.in</span> to get started.
            </p>
          </div>
        </div>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingComplete}
        />
      )}
    </div>
  );
}
