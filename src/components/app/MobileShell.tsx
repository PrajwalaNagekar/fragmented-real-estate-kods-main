import React, { useState, useEffect } from "react";
import { Home, Store, Briefcase, User, Wifi, Battery, SignalHigh, Search, Bell } from "lucide-react";

// Localized types for the standalone prototype
type Tab = "home" | "marketplace" | "portfolio" | "profile";

interface MobileShellProps {
  children: React.ReactNode;
  hideChrome?: boolean;
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
  theme?: "light" | "dark";
}

const MobileShell = ({
  children,
  hideChrome,
  activeTab = "home",
  onTabChange,
  theme = "light",
}: MobileShellProps) => {
  const [timeStr, setTimeStr] = useState("");

  // Real-time clock hook
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const tabs: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "marketplace", icon: Store, label: "Market" },
    { id: "portfolio", icon: Briefcase, label: "Portfolio" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 font-sans">
      {/* Outer Hardware Device wrapper */}
      <div className="relative group">

        {/* Hardware Buttons */}
        <div className="absolute -left-[3px] top-[110px] h-[26px] w-[3px] bg-neutral-700 rounded-l-md" /> {/* Action Button */}
        <div className="absolute -left-[3px] top-[160px] h-[54px] w-[3px] bg-neutral-700 rounded-l-md" /> {/* Volume Up */}
        <div className="absolute -left-[3px] top-[230px] h-[54px] w-[3px] bg-neutral-700 rounded-l-md" /> {/* Volume Down */}
        <div className="absolute -right-[3px] top-[180px] h-[74px] w-[3px] bg-neutral-700 rounded-r-md" /> {/* Power Button */}

        {/* Device Screen Container */}
        <div
          className={`relative mx-auto ${isDark ? "bg-black text-white" : "bg-gray-50 text-black"
            } rounded-[55px] overflow-hidden shadow-2xl ring-[14px] ring-neutral-800 border-[6px] border-black select-none`}
          style={{ width: 'min(92vw, 393px)', height: 'min(95vh, 852px)' }}
        >
          {/* Dynamic Island (iPhone 16 Style) */}
          <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-[24px] z-50 flex items-center justify-end px-2 shadow-sm">
            {/* Front Camera & Sensors */}
            <div className="w-[12px] h-[12px] rounded-full bg-[#0d0d1a] border border-[#1a1a2e] relative mr-1">
              <div className="absolute top-[3px] left-[3px] w-[2px] h-[2px] rounded-full bg-blue-500/40 blur-[0.5px]" />
            </div>
          </div>

          {/* Status Bar */}
          <div className="absolute top-0 w-full z-40 flex items-center justify-between px-7 pt-[14px] pb-1 text-[14px] font-semibold tracking-tight">
            <span className={`w-[54px] text-center ${isDark ? "text-white" : "text-black"}`}>
              {timeStr}
            </span>
            <div className="flex items-center gap-[6px]">
              <SignalHigh className={`w-[15px] h-[15px] ${isDark ? "text-white" : "text-black"}`} strokeWidth={2.5} />
              <Wifi className={`w-4 h-4 ${isDark ? "text-white" : "text-black"}`} strokeWidth={2.5} />
              {/* Custom Battery Icon */}
              <div className={`w-[23px] h-[11px] rounded-[3px] border-[1px] ${isDark ? "border-white/40" : "border-black/40"} ml-0.5 relative flex items-center p-[1px]`}>
                <div className={`h-full w-[80%] rounded-[1px] ${isDark ? "bg-white" : "bg-black"}`} />
                <div className={`absolute -right-[4px] top-[2.5px] w-[2.5px] h-[4px] rounded-r-[1px] ${isDark ? "bg-white/40" : "bg-black/40"}`} />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div
            className={`w-full overflow-y-auto ${hideChrome ? "h-full pt-12" : "h-[calc(100%-80px)] pt-12 pb-6"
              }`}
            style={{ scrollbarWidth: "none" }}
          >
            {children}
          </div>

          {/* Bottom Navigation */}
          {!hideChrome && (
            <div
              className={`absolute bottom-0 left-0 right-0 h-[88px] ${isDark ? "bg-black/80 border-white/10" : "bg-white/80 border-black/5"
                } backdrop-blur-xl border-t flex items-start justify-around pt-2 px-2 z-40 pb-6`}
            >
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange?.(tab.id)}
                    className="flex-1 flex flex-col items-center justify-center gap-1 py-1 px-2"
                  >
                    <div
                      className={`p-1.5 rounded-2xl transition-all duration-300 ${active && isDark
                          ? "bg-white/10"
                          : active && !isDark
                            ? "bg-black/5"
                            : "bg-transparent"
                        }`}
                    >
                      <tab.icon
                        className={`w-[22px] h-[22px] transition-colors ${active
                            ? isDark ? "text-white" : "text-black"
                            : isDark ? "text-white/40" : "text-black/40"
                          }`}
                        strokeWidth={active ? 2.5 : 2}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-medium tracking-wide transition-colors ${active
                          ? isDark ? "text-white" : "text-black"
                          : isDark ? "text-white/40" : "text-black/40"
                        }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}

              {/* iOS Home Indicator */}
              <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] rounded-full ${isDark ? "bg-white" : "bg-black"}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Demo Prototype Application ---

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>("home");

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <div className="px-5 py-4 flex flex-col gap-6 animate-in fade-in duration-300">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-60">Good morning,</p>
                <h1 className="text-2xl font-bold">Alex Carter</h1>
              </div>
              <button className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                <Bell className="w-5 h-5" />
              </button>
            </header>

            {/* Quick Actions Card */}
            <div className="p-5 rounded-3xl shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="opacity-80">Total Balance</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">USD</span>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight">$12,450.00</h2>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-white text-black py-2.5 rounded-xl font-medium text-sm">Transfer</button>
                <button className="flex-1 py-2.5 rounded-xl font-medium text-sm bg-blue-700/50 text-white">Request</button>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Recent Activity</h3>
                <button className="text-sm text-blue-500 font-medium">See all</button>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { title: "Apple Store", amount: "-$120.00", time: "Today, 10:24 AM", icon: Store },
                  { title: "Freelance Client", amount: "+$850.00", time: "Yesterday, 2:00 PM", icon: Briefcase },
                  { title: "Coffee Shop", amount: "-$4.50", time: "Yesterday, 8:15 AM", icon: Home },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gray-100">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs opacity-60">{item.time}</p>
                      </div>
                    </div>
                    <span className={`font-semibold text-sm ${item.amount.startsWith('+') ? 'text-green-500' : ''}`}>{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "marketplace":
        return (
          <div className="px-5 py-4 flex flex-col gap-6 animate-in fade-in duration-300">
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-gray-100">
              <Search className="w-5 h-5 opacity-50" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none w-full text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-3 rounded-2xl flex flex-col gap-2 bg-white shadow-sm border border-gray-100">
                  <div className="w-full aspect-square rounded-xl bg-gray-200 flex items-center justify-center">
                    <Store className="w-8 h-8 opacity-20" />
                  </div>
                  <h4 className="font-medium text-sm mt-1">Item Product {i}</h4>
                  <p className="text-blue-500 font-semibold">${(i * 24.99).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "portfolio":
      case "profile":
        return (
          <div className="flex-1 flex flex-col items-center justify-center h-[60vh] gap-4 opacity-60">
            {currentTab === 'portfolio' ? <Briefcase className="w-12 h-12" /> : <User className="w-12 h-12" />}
            <p className="text-lg font-medium capitalize">{currentTab} Screen</p>
            <p className="text-sm">Content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      <MobileShell
        activeTab={currentTab}
        onTabChange={setCurrentTab}
        theme="light"
      >
        {renderContent()}
      </MobileShell>
    </div>
  );
}