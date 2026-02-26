import { motion } from "framer-motion";
import { Edit3, ShieldCheck, Link2, Settings, HelpCircle, Info, FileText, AlertTriangle, LogOut, ChevronRight, CheckCircle2 } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const ProfileScreen = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => {
  const kycComplete = true; // mock

  const menuItems = [
    { icon: Edit3, label: "Edit Profile", screen: "editProfile" as AppScreen },
    { icon: ShieldCheck, label: "KYC Verification", screen: "kyc" as AppScreen, badge: kycComplete ? "Verified" : "Pending" },
    { icon: Link2, label: "Blockchain Protected System", screen: "blockchainEducation" as AppScreen },
    { icon: Settings, label: "Settings", screen: "settings" as AppScreen },
    { icon: HelpCircle, label: "Help & FAQ", screen: "helpFaq" as AppScreen },
    { icon: Info, label: "About Us", screen: "aboutUs" as AppScreen },
    { icon: FileText, label: "Terms & Conditions", screen: "terms" as AppScreen },
  ];

  return (
    <div className="px-4 pb-6 space-y-5">
      {/* User Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="pt-2 flex items-center gap-4"
      >
        <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center glow-gold">
          <span className="text-xl font-bold text-white">RK</span>
        </div>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Welcome,</p>
          <h1 className="text-lg font-display font-bold text-foreground">Rahul Kapoor</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-semibold text-primary">Premium Investor</div>
            {kycComplete && (
              <div className="flex items-center gap-0.5 text-[10px] text-teal font-medium">
                <CheckCircle2 className="w-3 h-3" /> KYC
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* KYC Banner */}
      {!kycComplete && (
        <motion.button
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          onClick={() => onNavigate("kyc")}
          className="w-full p-4 rounded-2xl bg-destructive/5 border border-destructive/20 flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <div className="flex-1 text-left">
            <p className="text-xs font-semibold text-destructive">KYC Pending</p>
            <p className="text-[10px] text-muted-foreground">Complete your verification to unlock all features</p>
          </div>
          <ChevronRight className="w-4 h-4 text-destructive" />
        </motion.button>
      )}

      {/* Menu Items */}
      <div className="space-y-1">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onNavigate(item.screen)}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl hover:bg-accent transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <span className="flex-1 text-sm text-foreground text-left">{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.badge === "Verified" ? "bg-teal/10 text-teal" : "bg-destructive/10 text-destructive"}`}>
                {item.badge}
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Danger zone */}
      <div className="pt-2 border-t border-border space-y-1">
        <button onClick={() => onNavigate("accountDeletion")}
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl hover:bg-destructive/5 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-destructive/70" />
          </div>
          <span className="text-sm text-destructive/70">Request Account Deletion</span>
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl hover:bg-destructive/5 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-destructive" />
          </div>
          <span className="text-sm text-destructive">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
