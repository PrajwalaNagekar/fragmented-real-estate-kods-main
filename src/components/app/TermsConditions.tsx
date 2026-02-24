import { ArrowLeft } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing and using One Property's platform, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of the platform immediately." },
  { title: "2. Fractional Ownership", content: "One Property enables fractional ownership of real estate properties through tokenized fragments. Each fragment represents a proportional ownership stake in the underlying property, legally backed by a Power of Attorney (POA) issued in the investor's name." },
  { title: "3. Investment Risks", content: "Real estate investments carry inherent risks including market fluctuations, illiquidity, and potential loss of capital. Past performance does not guarantee future returns. All projected yields are estimates and may vary." },
  { title: "4. KYC Requirements", content: "All investors must complete Know Your Customer (KYC) verification including valid government-issued ID (Aadhaar/PAN), address proof, and bank account details before making any investments." },
  { title: "5. Token & Blockchain", content: "Ownership tokens are minted on a private ledger with proof hashes anchored to a public blockchain. Tokens represent legal ownership rights and can be transferred through the secondary market subject to applicable regulations." },
  { title: "6. Secondary Market", content: "Fragments may be listed for sale or rent on the secondary market. One Property charges a 2% transaction fee on all secondary market trades. Listing prices are set by sellers and are not guaranteed." },
  { title: "7. Rental Income", content: "Rental income is distributed proportionally to fragment owners on a monthly basis. Distribution dates may vary based on property management timelines and tenant payment schedules." },
  { title: "8. Data Privacy", content: "Your personal data is collected, processed, and stored in compliance with applicable data protection laws. We implement industry-standard encryption and security measures to protect your information." },
  { title: "9. Account Termination", content: "Users may request account deletion. Upon deletion, all owned fragments must be sold or transferred. One Property reserves the right to suspend accounts that violate these terms." },
  { title: "10. Governing Law", content: "These terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka." },
];

const TermsConditions = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => (
  <div className="px-4 pb-6 space-y-4">
    <div className="flex items-center gap-3 pt-2">
      <button onClick={() => onNavigate("profile")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
        <ArrowLeft className="w-4 h-4 text-foreground" />
      </button>
      <h1 className="text-base font-display font-bold text-foreground">Terms & Conditions</h1>
    </div>

    <p className="text-[10px] text-muted-foreground">Last updated: February 2026</p>

    <div className="space-y-4">
      {sections.map(s => (
        <div key={s.title} className="p-4 rounded-2xl bg-card border border-border">
          <p className="text-xs font-semibold text-foreground mb-1.5">{s.title}</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">{s.content}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TermsConditions;
