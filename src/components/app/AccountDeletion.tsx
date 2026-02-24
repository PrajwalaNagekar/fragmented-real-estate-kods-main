import { useState } from "react";
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const steps = [
  "Review your owned fragments and pending payouts",
  "Transfer or sell remaining fragments",
  "Sign the account closure agreement",
  "Submit final deletion request",
];

const AccountDeletion = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="px-4 pb-6 pt-12 flex flex-col items-center text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-teal" />
        <h2 className="text-lg font-display font-bold text-foreground">Request Submitted</h2>
        <p className="text-xs text-muted-foreground max-w-[280px]">Your account deletion request has been submitted. Our team will review and process it within 7-10 business days.</p>
        <button onClick={() => onNavigate("profile")} className="mt-4 py-3 px-8 rounded-xl bg-accent text-sm font-medium text-foreground">Back to Profile</button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-6 space-y-5">
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onNavigate("profile")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground">Account Deletion</h1>
      </div>

      <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-destructive">This action is irreversible</p>
          <p className="text-[11px] text-muted-foreground mt-1">Deleting your account will permanently remove all your data, fragments, and documents from One Property.</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <p className="text-xs font-semibold text-foreground">Deletion Process</p>
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">{i + 1}</div>
            <p className="text-[11px] text-foreground/80">{step}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-card border border-border">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded accent-destructive" />
          <span className="text-[11px] text-foreground/80 leading-relaxed">I understand that this action is permanent. I have reviewed my fragments, transferred my assets, and agree to the account closure terms.</span>
        </label>
      </div>

      <button onClick={() => setSubmitted(true)} disabled={!agreed}
        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${agreed ? "bg-destructive text-white" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
        Submit Deletion Request
      </button>
    </div>
  );
};

export default AccountDeletion;
