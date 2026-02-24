import { ArrowLeft, Building, Target, Users, Mail, Phone, MapPin } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const AboutUs = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => (
  <div className="px-4 pb-6 space-y-5">
    <div className="flex items-center gap-3 pt-2">
      <button onClick={() => onNavigate("profile")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
        <ArrowLeft className="w-4 h-4 text-foreground" />
      </button>
      <h1 className="text-base font-display font-bold text-foreground">About Us</h1>
    </div>

    <div className="flex justify-center">
      <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center glow-gold">
        <span className="text-2xl font-display font-bold text-white">O</span>
      </div>
    </div>

    <div className="text-center">
      <h2 className="text-lg font-display font-bold text-foreground">One Property</h2>
      <p className="text-xs text-muted-foreground mt-1">Luxury Fractional Real Estate Platform</p>
    </div>

    <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
      <div className="flex items-start gap-3">
        <Building className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-foreground">Who We Are</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">One Property is India's premier fractional real estate investment platform, making luxury property ownership accessible through blockchain-powered tokenization. Founded in 2024, we've democratized access to premium real estate across India's top markets.</p>
        </div>
      </div>
    </div>

    <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
      <div className="flex items-start gap-3">
        <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-foreground">Our Mission</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">To democratize luxury real estate investment by enabling fractional ownership with full transparency, legal protection through Power of Attorney, and blockchain-verified trust.</p>
        </div>
      </div>
    </div>

    <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
      <div className="flex items-start gap-3">
        <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-foreground">Leadership</p>
          <div className="mt-2 space-y-2">
            {[
              { name: "Arjun Mehta", role: "CEO & Co-Founder" },
              { name: "Priya Sharma", role: "CTO & Co-Founder" },
              { name: "Vikram Reddy", role: "Head of Investments" },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">{p.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">{p.name}</p>
                  <p className="text-[9px] text-muted-foreground">{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
      <p className="text-xs font-semibold text-foreground">Contact</p>
      <div className="space-y-1.5">
        <p className="text-[11px] text-muted-foreground flex items-center gap-2"><Mail className="w-3 h-3" /> support@oneproperty.in</p>
        <p className="text-[11px] text-muted-foreground flex items-center gap-2"><Phone className="w-3 h-3" /> +91 80 1234 5678</p>
        <p className="text-[11px] text-muted-foreground flex items-center gap-2"><MapPin className="w-3 h-3" /> HSR Layout, Bangalore 560102</p>
      </div>
    </div>
  </div>
);

export default AboutUs;
