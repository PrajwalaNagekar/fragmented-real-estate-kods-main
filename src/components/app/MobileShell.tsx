import { type ReactNode } from "react";
import { Home, Store, Briefcase, User, Wifi } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

type Tab = "home" | "marketplace" | "portfolio" | "profile";

interface MobileShellProps {
  children: ReactNode;
  hideChrome?: boolean;
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
  theme?: "light" | "dark";
  onThemeChange?: (t: "light" | "dark") => void;
  onNavigate?: (s: AppScreen) => void;
}

const MobileShell = ({ children, hideChrome, activeTab = "home", onTabChange }: MobileShellProps) => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false });

  const tabs: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "marketplace", icon: Store, label: "Market" },
    { id: "portfolio", icon: Briefcase, label: "Portfolio" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4" style={{ background: "#FFF" }}>
      {/* iPhone 16 Pro frame */}
      <div
        className="relative w-full max-w-[393px] h-[852px] bg-background overflow-hidden"
        style={{
          borderRadius: "55px",
          border: "6px solid #2a2a2e",
          // boxShadow: "0 0 0 1px #1a1a1e, 0 0 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04), 0 25px 60px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Titanium side buttons - left (silent switch + volume) */}
        <div className="absolute -left-[3.5px] top-[140px] w-[3px] h-[28px] rounded-l-sm" style={{ background: "#3a3a3e" }} />
        <div className="absolute -left-[3.5px] top-[190px] w-[3px] h-[55px] rounded-l-sm" style={{ background: "#3a3a3e" }} />
        <div className="absolute -left-[3.5px] top-[255px] w-[3px] h-[55px] rounded-l-sm" style={{ background: "#3a3a3e" }} />
        {/* Right - power button */}
        <div className="absolute -right-[3.5px] top-[210px] w-[3px] h-[70px] rounded-r-sm" style={{ background: "#3a3a3e" }} />

        {/* Dynamic Island - iPhone 16 Pro style pill */}
        <div
          className="absolute top-[10px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-3"
          style={{
            width: "126px",
            height: "37px",
            background: "#000",
            borderRadius: "22px",
          }}
        >
          {/* Front camera lens */}
          <div className="relative ml-auto" style={{ width: "12px", height: "12px" }}>
            <div className="absolute inset-0 rounded-full" style={{ background: "#0c0c14", border: "1px solid #222" }} />
            <div className="absolute rounded-full" style={{ top: "2px", left: "2px", width: "8px", height: "8px", background: "radial-gradient(circle at 35% 35%, #1a1a3a 0%, #080810 100%)" }} />
            <div className="absolute rounded-full" style={{ top: "3px", left: "3px", width: "2px", height: "2px", background: "rgba(100,130,255,0.25)" }} />
          </div>
        </div>

        {/* Status Bar */}
        <div className="relative z-40 flex items-center justify-between px-8 pt-[16px] pb-1 text-[12px] font-semibold text-foreground">
          <span style={{ fontFeatureSettings: "'tnum'" }}>{timeStr}</span>
          <div className="w-[126px]" />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-[2px] items-end">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-[3px] rounded-sm bg-foreground" style={{ height: `${4 + i * 2.5}px` }} />
              ))}
            </div>
            <Wifi className="w-3.5 h-3.5 text-foreground" />
            <span className="text-[10px]">5G</span>
            {/* Battery - green fill */}
            <div className="flex items-center ml-0.5">
              <div className="w-[22px] h-[10px] rounded-[2.5px] border border-foreground/50 relative">
                <div className="absolute inset-[1.5px] right-[3px] rounded-[1px]" style={{ background: "#34C759" }} />
              </div>
              <div className="w-[1.5px] h-[4px] rounded-r-sm bg-foreground/40 ml-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className={`overflow-y-auto ${hideChrome ? "h-[calc(100%-50px)] pt-1" : "h-[calc(100%-50px-80px)] pt-4"}`} style={{ scrollbarWidth: "none" }}>
          {children}
        </div>

        {/* Bottom Navigation - 4 tabs */}
        {!hideChrome && (
          <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-background/90 backdrop-blur-xl border-t border-border/50 flex items-start pt-2 px-4 z-40">
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
            {/* Home indicator bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-foreground/20 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileShell;
