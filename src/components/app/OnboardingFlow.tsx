import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Upload, Check, Phone, Mail, User, Building, ShieldCheck, Lock, Eye } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type AuthMode = "entry" | "signin" | "signup";

const OnboardingFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [authMode, setAuthMode] = useState<AuthMode>("entry");
  const [step, setStep] = useState(0);
  const [loginMethod] = useState<"contact">("contact");
  const [otp, setOtp] = useState("");
  const [forgotFlow, setForgotFlow] = useState(false);
  const [forgotContact, setForgotContact] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [signInOtpSent, setSignInOtpSent] = useState(false);
  const [forgotOtpSent, setForgotOtpSent] = useState(false);

  const signupSteps = ["Register", "Verify", "Documents", "Profile", "Welcome"];

  const handleSignIn = () => onComplete();

  const next = () => {
    if (step < signupSteps.length - 1) setStep(step + 1);
    else onComplete();
  };

  // Entry Screen
  if (authMode === "entry") {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl gradient-gold flex items-center justify-center mb-6 glow-gold">
            <span className="text-3xl font-display font-bold text-white">O</span>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-2xl font-display font-bold text-foreground mb-2">One Property</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-sm text-muted-foreground mb-12">Luxury Fractional Real Estate</motion.p>

          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="w-full space-y-3">
            <button onClick={() => setAuthMode("signin")}
              className="w-full py-3.5 rounded-2xl gradient-gold text-primary-foreground font-semibold text-sm glow-gold">
              Sign In
            </button>
            <button onClick={() => setAuthMode("signup")}
              className="w-full py-3.5 rounded-2xl bg-accent border border-border text-foreground font-semibold text-sm">
              Create Account
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Sign In
  if (authMode === "signin") {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex-1 px-6 pt-14">
          <h2 className="text-xl font-display font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-muted-foreground mb-8">Sign in to your account</p>

          <div className="flex gap-1.5 mb-6">
            <button
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-medium bg-primary text-primary-foreground`}
            >
              <Mail className="w-3.5 h-3.5" />
              Email / Phone number
            </button>
          </div>

          {!forgotFlow ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="you@example.com or +91 98765 43210"
                className="w-full bg-accent rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary"
                onChange={() => setSignInOtpSent(false)}
              />

              {!signInOtpSent ? (
                <div className="flex items-center justify-between">
                  <button onClick={() => setSignInOtpSent(true)} className="text-sm text-primary">Send OTP</button>
                  <button onClick={() => setForgotFlow(true)} className="text-xs text-muted-foreground">Forgot Password?</button>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-muted-foreground mb-3">Enter OTP sent to your contact</p>
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      {[0,1,2,3,4,5].map(i => (
                        <InputOTPSlot key={i} index={i} className="w-10 h-11 rounded-lg bg-accent border-border text-foreground text-lg" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <button className="mt-3 text-xs text-primary" onClick={() => setSignInOtpSent(false)}>Resend Code</button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-xs text-muted-foreground mb-1 block">Enter Email or Phone</label>
              <input value={forgotContact} onChange={e => setForgotContact(e.target.value)}
                placeholder="you@example.com or +91 98765 43210"
                className="w-full bg-accent rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary" />

              {!forgotOtpSent ? (
                <div className="flex items-center justify-between">
                  <button onClick={() => setForgotOtpSent(true)} className="text-sm text-primary">Send OTP</button>
                  <button onClick={() => setForgotFlow(false)} className="text-xs text-muted-foreground">Cancel</button>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-muted-foreground mb-3">Enter OTP sent to your contact</p>
                  <InputOTP maxLength={6} value={forgotOtp} onChange={setForgotOtp}>
                    <InputOTPGroup>
                      {[0,1,2,3,4,5].map(i => (
                        <InputOTPSlot key={i} index={i} className="w-10 h-11 rounded-lg bg-accent border-border text-foreground text-lg" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <button className="mt-3 text-xs text-primary" onClick={() => setForgotOtpSent(false)}>Resend Code</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-6 pb-8 pt-4 space-y-3">
          <button onClick={handleSignIn}
            className="w-full py-3.5 rounded-2xl gradient-gold text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 glow-gold">
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => setAuthMode("entry")} className="w-full text-center text-xs text-muted-foreground">← Back</button>
        </div>
      </div>
    );
  }

  // Sign Up flow
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-6 pt-14 pb-4">
        <div className="flex gap-1.5">
          {signupSteps.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
              <div className={`h-1 w-full rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-muted"}`} />
              <span className={`text-[9px] font-medium transition-colors ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {step === 0 && (
              <div className="pt-4 space-y-3">
                <h2 className="text-xl font-display font-bold mb-1">Create Account</h2>
                <p className="text-sm text-muted-foreground mb-4">Start your investment journey</p>
                {[
                  { icon: User, label: "Full Name", placeholder: "Your Name", type: "text" },
                  { icon: Phone, label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
                  { icon: Mail, label: "Email", placeholder: "you@example.com", type: "email" },
                ].map(field => (
                  <div key={field.label}>
                    <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                    <div className="relative">
                      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type={field.type} placeholder={field.placeholder}
                        className="w-full bg-accent rounded-xl pl-10 pr-4 py-3 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="pt-8 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-display font-bold mb-2">Verify OTP</h2>
                <p className="text-sm text-muted-foreground mb-8">Enter the 6-digit code</p>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0,1,2,3,4,5].map(i => (
                      <InputOTPSlot key={i} index={i} className="w-11 h-12 rounded-lg bg-accent border-border text-foreground text-lg" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <button className="mt-6 text-xs text-primary">Resend Code</button>
              </div>
            )}

            {step === 2 && (
              <div className="pt-8">
                <h2 className="text-xl font-display font-bold mb-2">Document Verification</h2>
                <p className="text-sm text-muted-foreground mb-6">Upload your identity documents for KYC</p>
                {[{ name: "Aadhaar Card", desc: "Government ID" }, { name: "PAN Card", desc: "Tax ID" }].map(doc => (
                  <div key={doc.name} className="mb-4 p-4 rounded-2xl bg-accent border border-border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Upload className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                ))}
                <button onClick={() => setStep(3)} className="mt-2 text-xs text-muted-foreground w-full text-center underline">Complete KYC Later</button>
              </div>
            )}

            {step === 3 && (
              <div className="pt-8">
                <h2 className="text-xl font-display font-bold mb-2">Complete Profile</h2>
                <p className="text-sm text-muted-foreground mb-6">Tell us about yourself</p>
                <div className="space-y-3">
                  {[
                    { icon: User, label: "Full Name", placeholder: "Rahul Kapoor" },
                    { icon: Phone, label: "Contact", placeholder: "+91 98765 43210" },
                    { icon: Building, label: "Investor Type", placeholder: "Individual" },
                  ].map(field => (
                    <div key={field.label}>
                      <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                      <div className="relative">
                        <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input placeholder={field.placeholder} defaultValue={field.placeholder}
                          className="w-full bg-accent rounded-xl pl-10 pr-4 py-3 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Risk Profile</label>
                    <div className="flex gap-2">
                      {["Conservative", "Moderate", "Aggressive"].map(r => (
                        <button key={r} className={`flex-1 py-2.5 rounded-xl text-xs font-medium ${r === "Moderate" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground border border-border"}`}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="pt-12 flex flex-col items-center text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mb-6 glow-gold">
                  <Check className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold mb-3">You're All Set!</h2>
                <p className="text-sm text-muted-foreground mb-8 max-w-[260px]">Welcome to One Property. Your gateway to luxury fractional real estate investment.</p>
                <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
                  {[
                    { label: "Invest", desc: "Buy fractions" },
                    { label: "Track", desc: "Monitor portfolio" },
                    { label: "Earn", desc: "Rental income" },
                  ].map(f => (
                    <div key={f.label} className="p-3 rounded-xl bg-accent border border-border text-center">
                      <p className="text-xs font-semibold text-primary">{f.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-8 pt-4 space-y-2">
        <button onClick={next}
          className="w-full py-3.5 rounded-2xl gradient-gold text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 glow-gold active:scale-[0.98] transition-transform">
          {step === 4 ? "Enter Dashboard" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </button>
        {step === 0 && <button onClick={() => setAuthMode("entry")} className="w-full text-center text-xs text-muted-foreground">← Back</button>}
      </div>
    </div>
  );
};

export default OnboardingFlow;
