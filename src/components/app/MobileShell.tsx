import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Store, Briefcase, Menu, User, Settings, ShoppingBag, HelpCircle, Info, FileText, LogOut, X, Palette, Edit3, Wifi, AlertTriangle } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

type Tab = "home" | "marketplace" | "portfolio";

interface MobileShellProps {
  children: ReactNode;
  hideChrome?: boolean;
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
  theme?: "light" | "dark";
  onThemeChange?: (t: "light" | "dark") => void;
  onNavigate?: (s: AppScreen) => void;
}

const MobileShell = ({ children, hideChrome, activeTab = "home", onTabChange, theme, onThemeChange, onNavigate }: MobileShellProps) => {
  const [sideOpen, setSideOpen] = useState(false);
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false });

  const tabs: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "marketplace", icon: Store, label: "Market" },
    { id: "portfolio", icon: Briefcase, label: "Portfolio" },
  ];

  const handleMenuNav = (screen: AppScreen) => {
    setSideOpen(false);
    onNavigate?.(screen);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-2 sm:p-4">
      <div className="relative w-full max-w-[393px] h-[852px] bg-background rounded-[44px] overflow-hidden border-8 border-black shadow-[0_20px_70px_-10px_rgba(0,0,0,0.15),0_0_1px_1px_rgba(0,0,0,0.05)]">        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-[#000] rounded-b-[18px] z-50" />

        {/* Status Bar */}
        <div className="relative z-40 flex items-center justify-between px-8 pt-[14px] pb-1 text-[12px] font-semibold text-foreground">
          <span>{timeStr}</span>
          <div className="w-[126px]" />
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <div className="flex items-end gap-[1px]">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-[2px] bg-foreground rounded-sm"
                  style={{ height: `${4 + i * 1.5}px` }}
                />
              ))}
            </div>
            {/* WiFi icon */}
            <Wifi className="w-3.5 h-3.5 text-foreground" />
            <span className="text-[10px]">5G</span>
            {/* Battery */}
            <div className="w-[22px] h-[10px] rounded-[2px] border border-foreground/60 ml-0.5 relative">
              <div className="absolute inset-[1px] right-[3px] bg-primary rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Hamburger menu button */}
        {!hideChrome && (
          <button
            onClick={() => setSideOpen(true)}
            className="absolute top-[52px] left-4 z-40 p-2 rounded-full hover:bg-accent transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground/70" />
          </button>
        )}

        {/* Content area */}
        <div className={`overflow-y-auto ${hideChrome ? "h-[calc(100%-48px)] pt-1" : "h-[calc(100%-48px-80px)] pt-10"}`} style={{ scrollbarWidth: "none" }}>
          {children}
        </div>

        {/* Bottom Navigation - 3 tabs */}
        {!hideChrome && (
          <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-background/90 backdrop-blur-xl border-t border-border/50 flex items-start pt-2 px-6 z-40">
            {tabs.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className="flex-1 flex flex-col items-center gap-0.5 py-1"
                >
                  <div className={`p-1.5 rounded-xl transition-all ${active ? "bg-primary/15" : ""}`}>
                    <tab.icon className={`w-5 h-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>{tab.label}</span>
                </button>
              );
            })}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-foreground/20 rounded-full" />
          </div>
        )}

        {/* Side Panel - Profile/Hamburger Menu */}
        <AnimatePresence>
          {sideOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 z-50"
                onClick={() => setSideOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute left-0 top-0 bottom-0 w-[280px] bg-card z-50 rounded-r-3xl shadow-2xl"
              >
                <div className="pt-16 px-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                        <span className="text-lg font-bold text-white">RK</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Welcome,</p>
                        <p className="font-semibold text-foreground text-sm">Rahul Kapoor</p>
                        <p className="text-[10px] text-primary font-medium">Premium Investor</p>
                      </div>
                    </div>
                    <button onClick={() => setSideOpen(false)}>
                      <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="space-y-0.5">
                    <button onClick={() => handleMenuNav("editProfile")} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm text-foreground/80">
                      <Edit3 className="w-4 h-4 text-muted-foreground" />
                      Edit Profile
                    </button>
                    <button onClick={() => handleMenuNav("secondaryMarket")} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm text-foreground/80">
                      <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                      Secondary Market
                    </button>
                    <button onClick={() => handleMenuNav("settings")} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm text-foreground/80">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      Settings
                    </button>
                    <button onClick={() => handleMenuNav("aboutUs")} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm text-foreground/80">
                      <Info className="w-4 h-4 text-muted-foreground" />
                      About Us
                    </button>
                    <button onClick={() => handleMenuNav("terms")} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm text-foreground/80">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      Terms & Conditions
                    </button>
                    <button onClick={() => handleMenuNav("helpFaq")} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-accent transition-colors text-sm text-foreground/80">
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      Help & FAQ
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <button onClick={() => handleMenuNav("accountDeletion")} className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-destructive/10 transition-colors text-sm text-destructive/70">
                      <AlertTriangle className="w-4 h-4" />
                      Request Account Deletion
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-destructive/10 transition-colors text-sm text-destructive">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileShell;
