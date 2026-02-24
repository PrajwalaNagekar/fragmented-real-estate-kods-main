import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Mail } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const trackerSteps = [
  { label: "Request Created", status: "done" as const },
  { label: "Verification in Progress", status: "active" as const },
  { label: "Site Visit Scheduling", status: "pending" as const },
  { label: "Documentation Preparation", status: "pending" as const },
  { label: "Power of Attorney Issuance", status: "pending" as const },
  { label: "Final Payment & Registration", status: "pending" as const },
];

const PurchaseTracker = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => {
  const completedCount = trackerSteps.filter(s => s.status === "done").length;
  const progress = (completedCount / trackerSteps.length) * 100;

  return (
    <div className="px-4 pb-6 space-y-5">
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onNavigate("marketplace")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground">Purchase Journey</h1>
      </div>

      {/* Progress Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <div className="flex justify-between text-[10px] text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }} />
        </div>
      </div>

      {/* Steps */}
      <div className="relative">
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-border" />
        <div className="space-y-4">
          {trackerSteps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 relative"
            >
              <div className="z-10">
                {step.status === "done" ? (
                  <CheckCircle2 className="w-10 h-10 text-teal" />
                ) : step.status === "active" ? (
                  <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-border bg-card flex items-center justify-center">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className={`flex-1 p-3 rounded-xl border ${step.status === "done" ? "bg-teal/5 border-teal/20" : step.status === "active" ? "bg-primary/5 border-primary/20" : "bg-card border-border"}`}>
                <p className={`text-xs font-semibold ${step.status === "done" ? "text-teal" : step.status === "active" ? "text-primary" : "text-muted-foreground"}`}>
                  {step.label}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {step.status === "done" ? "✓ Completed" : step.status === "active" ? "⏳ In Progress" : "⏳ Pending"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
        <p className="text-xs font-semibold text-foreground">What happens next?</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">Our One Property team will connect with you for:</p>
        <div className="space-y-1">
          {["Site visit scheduling", "Agreement signing", "Power of Attorney transfer", "Final documentation"].map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[11px] text-foreground/80">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-xl bg-teal/5 border border-teal/20 flex items-center gap-2">
        <Mail className="w-4 h-4 text-teal" />
        <span className="text-[10px] text-teal">All documents will be emailed upon completion</span>
      </div>
    </div>
  );
};

export default PurchaseTracker;
