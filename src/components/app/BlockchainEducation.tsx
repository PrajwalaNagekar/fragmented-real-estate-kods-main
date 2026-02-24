import { motion } from "framer-motion";
import { ArrowLeft, Building, FileCheck, Coins, Scale, Shield, ChevronRight } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const steps = [
  { icon: Building, title: "Property Tokenized", desc: "The real estate property is legally verified and converted into digital ownership tokens on the blockchain. Each token (fragment) represents a proportional stake." },
  { icon: FileCheck, title: "Ownership Recorded", desc: "Your purchase is permanently recorded on an immutable blockchain ledger. This creates a tamper-proof record of ownership that cannot be altered or disputed." },
  { icon: Coins, title: "Token Issued", desc: "A unique digital token is minted and assigned to your wallet. This token contains your ownership details, fragment IDs, and verification hash." },
  { icon: Scale, title: "Power of Attorney Generated", desc: "A legally-binding Power of Attorney (POA) document is generated and backed by your blockchain record, giving you verifiable legal rights over your property fraction." },
  { icon: Shield, title: "Blockchain Validation", desc: "Continuous validation ensures your ownership remains secure. Dynamic token verification cross-references the blockchain ledger in real-time to protect against fraud." },
];

const BlockchainProtection = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => (
  <div className="px-4 pb-6 space-y-5">
    <div className="flex items-center gap-3 pt-2">
      <button onClick={() => onNavigate("profile")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
        <ArrowLeft className="w-4 h-4 text-foreground" />
      </button>
      <h1 className="text-base font-display font-bold text-foreground">Blockchain Protection</h1>
    </div>

    <div className="text-center py-2">
      <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mx-auto mb-3 glow-gold">
        <Shield className="w-7 h-7 text-white" />
      </div>
      <h2 className="text-sm font-display font-bold text-foreground">How Blockchain Protects Your Property</h2>
      <p className="text-[11px] text-muted-foreground mt-1 max-w-[300px] mx-auto">Your ownership is secured through tokenization — converting real-world property rights into verifiable digital assets on an immutable ledger.</p>
    </div>

    {/* Steps */}
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-primary/20" />

      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex gap-4 relative"
          >
            <div className="w-[46px] h-[46px] rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 z-10">
              <step.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 p-4 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Step {i + 1}</span>
              </div>
              <p className="text-xs font-semibold text-foreground">{step.title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Key concepts */}
    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
      <p className="text-xs font-semibold text-foreground">Key Concepts</p>
      {[
        { term: "Tokenization", def: "Converting property ownership into digital tokens that can be bought, sold, and verified." },
        { term: "Dynamic Token Verification", def: "Real-time cross-referencing of your token against the blockchain ledger to ensure authenticity." },
        { term: "Ledger Anchoring", def: "Proof hashes of ownership records permanently stored on a public blockchain." },
      ].map(item => (
        <div key={item.term} className="flex items-start gap-2">
          <ChevronRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-[11px] font-semibold text-foreground">{item.term}: </span>
            <span className="text-[11px] text-muted-foreground">{item.def}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BlockchainProtection;
