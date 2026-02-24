import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const faqs = [
  { q: "What is fractional real estate ownership?", a: "Fractional ownership allows multiple investors to own portions of a property. Each investor holds a tokenized 'fragment' representing their proportional stake, legally backed by a Power of Attorney." },
  { q: "How do I earn returns?", a: "Returns come from two sources: monthly rental income distributed proportionally, and capital appreciation of your property fragments which can be realized through the secondary market." },
  { q: "Is my investment legally protected?", a: "Yes. Each fragment purchase includes a Power of Attorney (POA) issued in your name, giving you legal ownership rights. All transactions are blockchain-verified for transparency." },
  { q: "How do I sell my fragments?", a: "You can list fragments for sale on the secondary market at your desired price. Buyers browse listings and complete transactions with a 2% platform fee." },
  { q: "What documents do I need for KYC?", a: "You need a valid Aadhaar Card, PAN Card, address proof (utility bill), and bank account details. All documents are verified within 24-48 hours." },
  { q: "How secure is my data?", a: "We use industry-standard AES-256 encryption, blockchain verification, and two-factor authentication to protect your investment data and personal information." },
  { q: "Can I rent my fragment instead of selling?", a: "Yes! You can list your fragment for rent, setting monthly rental rates and minimum lease periods. Rental income is deposited directly to your account." },
];

const HelpFaq = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="px-4 pb-6 space-y-5">
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onNavigate("profile")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground">Help & FAQ</h1>
      </div>

      {/* Contact Information */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <p className="text-xs font-semibold text-foreground">Contact Us</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-accent">
            <Mail className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Support Email</p>
              <p className="text-xs font-medium text-foreground">support@oneproperty.in</p>
            </div>
          </div>
          {[
            { label: "Customer Support", number: "+91 80 1234 5678" },
            { label: "Investment Support", number: "+91 80 9876 5432" },
            { label: "Emergency Assistance", number: "+91 80 5555 1234" },
          ].map(c => (
            <div key={c.label} className="flex items-center gap-3 p-2.5 rounded-xl bg-accent">
              <Phone className="w-4 h-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground">{c.label}</p>
                <p className="text-xs font-medium text-foreground">{c.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <button key={i} onClick={() => setOpen(open === i ? null : i)} className="w-full text-left p-4 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground pr-4">{faq.q}</p>
              {open === i ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
            </div>
            {open === i && (
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-2 pt-2 border-t border-border">{faq.a}</p>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
        <p className="text-xs font-semibold text-foreground">Still need help?</p>
        <div className="flex gap-2">
          <button className="flex-1 py-2.5 rounded-xl bg-accent text-xs font-medium text-foreground flex items-center justify-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" /> Live Chat
          </button>
          <button className="flex-1 py-2.5 rounded-xl bg-accent text-xs font-medium text-foreground flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Email Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpFaq;
