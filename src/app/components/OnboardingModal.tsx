import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, Briefcase, BookOpen, Zap, Check } from "lucide-react";

interface OnboardingModalProps {
  onComplete: () => void;
  onSkip: () => void;
}

const expertiseOptions = [
  "B2B Marketing", "Sales & Key Account Management", "Business Strategy",
  "Finance & Investment", "Brand Management", "Operations & Supply Chain",
  "Consulting & Advisory", "Entrepreneurship & Innovation", "Human Resources", "International Business"
];

export function OnboardingModal({ onComplete, onSkip }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [bio, setBio] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [courseConfirmed, setCourseConfirmed] = useState(false);

  const maxBio = 280;

  const toggleExpertise = (tag: string) => {
    setSelectedExpertise(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const steps = [
    { number: 1, label: "Your Expertise", icon: Briefcase },
    { number: 2, label: "Course Details", icon: BookOpen },
    { number: 3, label: "First Session", icon: Zap },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#1e3a5f] px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">Step {step} of 3</span>
              </div>
              <button onClick={onSkip} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Progress bar */}
            <div className="flex gap-2 mb-4">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className="h-1 flex-1 rounded-full overflow-hidden bg-white/20"
                >
                  <div
                    className="h-full bg-[#d4a017] rounded-full transition-all duration-500"
                    style={{ width: step >= s.number ? "100%" : "0%" }}
                  />
                </div>
              ))}
            </div>
            <h2 className="text-white text-xl">{steps[step - 1].label}</h2>
            <p className="text-white/60 text-sm mt-1">
              {step === 1 && "Tell us about your professional background"}
              {step === 2 && "Confirm the course details from your partnership agreement"}
              {step === 3 && "You're almost ready to deliver your first session"}
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-[#1e3a5f] mb-2">Select your expertise areas</label>
                  <div className="flex flex-wrap gap-2">
                    {expertiseOptions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleExpertise(tag)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          selectedExpertise.includes(tag)
                            ? "bg-[#d4a017] border-[#d4a017] text-white"
                            : "bg-white border-[#e2e8f0] text-[#4a5568] hover:border-[#d4a017]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#1e3a5f] mb-2">
                    Professional Bio
                    <span className="float-right text-[#4a5568]">{bio.length}/{maxBio}</span>
                  </label>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value.slice(0, maxBio))}
                    placeholder="Describe your background, industry focus, and what you bring to students..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-[#e2e8f0] text-[#1e3a5f] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#d4a017] bg-[#f8f9fa]"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-[#f8f9fa] rounded-xl p-4 border border-[#e2e8f0]">
                  <p className="text-xs text-[#4a5568] uppercase tracking-wide mb-3">From your partnership agreement</p>
                  <div className="space-y-3">
                    {[
                      { label: "Course Title", value: "Strategic B2B Marketing: Automotive Sector" },
                      { label: "University", value: "FLAME University, Pune" },
                      { label: "Programme", value: "MBA – Marketing & Strategy" },
                      { label: "Sessions Agreed", value: "8 sessions × 90 min" },
                      { label: "Cohort Size", value: "32 students" },
                      { label: "Start Date", value: "May 6, 2026" },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center">
                        <span className="text-sm text-[#4a5568]">{item.label}</span>
                        <span className="text-sm text-[#1e3a5f]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-[#e2e8f0] hover:bg-[#fef3c7]/40 transition-colors">
                  <div
                    onClick={() => setCourseConfirmed(!courseConfirmed)}
                    className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${
                      courseConfirmed ? "bg-[#d4a017] border-[#d4a017]" : "border-[#e2e8f0]"
                    }`}
                  >
                    {courseConfirmed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-[#1e3a5f]">I confirm these details match my partnership agreement</span>
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-[#fef3c7] rounded-xl p-5 border border-[#d4a017]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#d4a017] rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#1e3a5f] text-sm">Session 1 is waiting for you</p>
                      <p className="text-[#4a5568] text-xs">Introduction to Industry Mindset</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#4a5568]">
                    Head to the Course Builder to add your agenda, key topics, and any materials for Session 1. It takes about 5 minutes.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { emoji: "📋", title: "Course Builder", desc: "Add session details" },
                    { emoji: "🎯", title: "Session Hub", desc: "Day-of delivery screen" },
                    { emoji: "👥", title: "Talent Board", desc: "View enrolled students" },
                    { emoji: "🔁", title: "Pipeline", desc: "Track recruitment" },
                  ].map(item => (
                    <div key={item.title} className="p-3 rounded-lg border border-[#e2e8f0] bg-[#f8f9fa]">
                      <span className="text-lg">{item.emoji}</span>
                      <p className="text-sm text-[#1e3a5f] mt-1">{item.title}</p>
                      <p className="text-xs text-[#4a5568]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-6 flex items-center justify-between">
            <button
              onClick={onSkip}
              className="text-sm text-[#4a5568] hover:text-[#1e3a5f] transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  onComplete();
                }
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8891a] transition-colors text-sm"
            >
              {step < 3 ? "Next" : "Go to Dashboard"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
