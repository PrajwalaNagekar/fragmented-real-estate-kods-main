import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Upload, Video, CheckCircle2, Phone, Mail, MapPin, Briefcase, Users, Calendar, FileCheck, Camera, Shield, Building2 } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const KYCFlow = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => {
  const [step, setStep] = useState(0);
  const [docs, setDocs] = useState({ aadhaar: false, pan: false, address: false, photo: false });
  const [showBankDetails, setShowBankDetails] = useState(true);
  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="px-4 pb-6 space-y-4">
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => step > 0 ? setStep(step - 1) : onNavigate("profile")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground">KYC Verification</h1>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
          <span>Step {step + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>
        <div className="flex gap-1 mt-2">
          {["Personal", "Documents", "Video KYC", "Status"].map((s, i) => (
            <div key={s} className={`flex-1 text-center text-[9px] font-medium ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          {step === 0 && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Enter your personal details</p>
              {[
                { icon: User, label: "Full Name", placeholder: "Rahul Kapoor", type: "text" },
                { icon: Mail, label: "Email", placeholder: "rahul@example.com", type: "email" },
                { icon: Phone, label: "Primary Phone", placeholder: "+91 98765 43210", type: "tel" },
                { icon: Phone, label: "Additional Phone (Optional)", placeholder: "+91 ...", type: "tel" },
                { icon: Briefcase, label: "Occupation", placeholder: "Software Engineer", type: "text" },
                { icon: MapPin, label: "Address", placeholder: "HSR Layout, Bangalore", type: "text" },
                { icon: Calendar, label: "Place of Birth", placeholder: "Bangalore, India", type: "text" },
                { icon: Users, label: "Add Nominee (Spouse / Parents / Children)", placeholder: "Nominee name & relationship", type: "text" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[10px] text-muted-foreground mb-1 block">{f.label}</label>
                  <div className="relative">
                    <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input type={f.type} placeholder={f.placeholder} defaultValue={f.placeholder.includes("+91") ? "" : f.placeholder}
                      className="w-full bg-accent rounded-xl pl-9 pr-3 py-2.5 text-xs text-foreground outline-none border border-border focus:border-primary transition-colors" />
                  </div>
                </div>
              ))}

              {/* Bank Details */}
              <div className="p-3 rounded-2xl bg-card border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-foreground flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-primary" /> Bank Details
                  </p>
                  <button onClick={() => setShowBankDetails(!showBankDetails)} className="text-[9px] text-primary underline">
                    {showBankDetails ? "Hide" : "Show"}
                  </button>
                </div>
                {showBankDetails ? (
                  <div className="space-y-2">
                    {[
                      { label: "Bank Name", placeholder: "e.g. State Bank of India" },
                      { label: "Account Number", placeholder: "e.g. 1234567890" },
                      { label: "IFSC Code", placeholder: "e.g. SBIN0001234" },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="text-[9px] text-muted-foreground mb-0.5 block">{f.label}</label>
                        <input placeholder={f.placeholder}
                          className="w-full bg-accent rounded-lg px-3 py-2 text-xs text-foreground outline-none border border-border focus:border-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-muted-foreground">You can complete bank details later during buy/sell process.</p>
                )}
                <button onClick={() => setShowBankDetails(false)} className="text-[9px] text-muted-foreground underline w-full text-center">
                  Skip - Complete Later
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Upload required documents</p>
              {[
                { key: "aadhaar" as const, name: "Aadhaar Card", desc: "Government ID" },
                { key: "pan" as const, name: "PAN Card", desc: "Tax ID" },
                { key: "address" as const, name: "Address Proof", desc: "Utility Bill / Bank Statement" },
                { key: "photo" as const, name: "Passport Photo", desc: "Recent photograph" },
              ].map(doc => (
                <button key={doc.key} onClick={() => setDocs(p => ({ ...p, [doc.key]: !p[doc.key] }))}
                  className="w-full p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${docs[doc.key] ? "bg-teal/10" : "bg-primary/10"}`}>
                    {docs[doc.key] ? <FileCheck className="w-5 h-5 text-teal" /> : <Upload className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold text-foreground">{doc.name}</p>
                    <p className="text-[10px] text-muted-foreground">{doc.desc}</p>
                  </div>
                  {docs[doc.key] ? (
                    <span className="text-[10px] text-teal font-medium px-2 py-0.5 rounded-full bg-teal/10">✓ Uploaded</span>
                  ) : (
                    <Camera className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              ))}
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-[10px] text-primary text-center">{Object.values(docs).filter(Boolean).length}/4 documents uploaded</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 pt-4 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Video className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-sm font-display font-bold text-foreground">Video KYC Verification</h3>
              <p className="text-[11px] text-muted-foreground max-w-[280px] mx-auto">A brief video verification is required to confirm your identity. Please ensure good lighting and a clear background.</p>
              <div className="space-y-2 text-left p-4 rounded-2xl bg-card border border-border">
                <p className="text-xs font-semibold text-foreground">Instructions:</p>
                {["Keep your face clearly visible", "Hold your Aadhaar/PAN card next to your face", "Speak your full name clearly", "The session takes ~2 minutes"].map((inst, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">{i + 1}</div>
                    <p className="text-[11px] text-muted-foreground">{inst}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl gradient-gold text-white text-sm font-semibold glow-gold">
                Start Video Verification
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 pt-8 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}
                className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto">
                <Shield className="w-10 h-10 text-teal" />
              </motion.div>
              <h3 className="text-sm font-display font-bold text-foreground">Verification in Progress</h3>
              <p className="text-[11px] text-muted-foreground max-w-[280px] mx-auto">Your documents and video verification are being reviewed. Approval will be granted within 24 hours.</p>
              <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
                {["Personal Details", "Document Upload", "Video KYC", "Approval"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    {i < 3 ? <CheckCircle2 className="w-4 h-4 text-teal" /> : (
                      <div className="w-4 h-4 rounded-full border-2 border-primary animate-spin border-t-transparent" />
                    )}
                    <span className={`text-xs ${i < 3 ? "text-teal" : "text-primary"}`}>{s}</span>
                    {i < 3 && <span className="text-[9px] text-teal ml-auto">Complete</span>}
                    {i === 3 && <span className="text-[9px] text-primary ml-auto">In Progress</span>}
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-[10px] text-primary">✉ You will receive a confirmation email once approved</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation - no duplicate button for step 2 */}
      {step < 2 && (
        <div className="flex gap-3 pt-2">
          {step === 0 && (
            <button onClick={() => onNavigate("profile")} className="flex-1 py-3 rounded-xl bg-accent text-sm font-medium text-foreground text-center">
              Complete Later
            </button>
          )}
          <button onClick={() => setStep(step + 1)}
            className={`${step === 0 ? "flex-1" : "w-full"} py-3 rounded-xl gradient-gold text-white text-sm font-semibold glow-gold`}>
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <button onClick={() => onNavigate("profile")} className="w-full py-3 rounded-xl bg-accent text-sm font-medium text-foreground text-center">
          Back to Profile
        </button>
      )}
    </div>
  );
};

export default KYCFlow;
