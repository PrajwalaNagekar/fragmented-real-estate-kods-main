import { useState } from "react";
import { ArrowLeft, Sun, Moon, Bell, Lock, Globe } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

const SettingsPage = ({ onNavigate, theme, onThemeChange }: { onNavigate: (s: AppScreen) => void; theme: "light" | "dark"; onThemeChange: (t: "light" | "dark") => void }) => {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [alerts, setAlerts] = useState({ investment: true, rental: true, market: false, security: true });
  const [twoFA, setTwoFA] = useState(false);
  const [language, setLanguage] = useState("English");
  const [region, setRegion] = useState("India");

  return (
    <div className="px-4 pb-6 space-y-5">
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onNavigate("profile")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground">Settings</h1>
      </div>

      {/* Appearance */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <p className="text-xs font-semibold text-foreground flex items-center gap-2"><Sun className="w-4 h-4 text-primary" /> Appearance</p>
        <div className="flex gap-2">
          <button onClick={() => onThemeChange("light")}
            className={`flex-1 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${theme === "light" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
            <Sun className="w-4 h-4" /> Light
          </button>
          <button onClick={() => onThemeChange("dark")}
            className={`flex-1 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${theme === "dark" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
            <Moon className="w-4 h-4" /> Dark
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-foreground flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Notifications</p>
          <button onClick={() => setNotificationsOn(!notificationsOn)}
            className={`w-10 h-6 rounded-full transition-all relative ${notificationsOn ? "bg-primary" : "bg-muted"}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notificationsOn ? "left-5" : "left-1"}`} />
          </button>
        </div>
        {notificationsOn && (
          <div className="space-y-2 pt-1">
            {[
              { key: "investment", label: "Investment Alerts" },
              { key: "rental", label: "Rental Payouts" },
              { key: "market", label: "Market Updates" },
              { key: "security", label: "Security Alerts" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-foreground/80">{item.label}</span>
                <button onClick={() => setAlerts(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                  className={`w-9 h-5 rounded-full transition-all relative ${alerts[item.key as keyof typeof alerts] ? "bg-teal" : "bg-muted"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${alerts[item.key as keyof typeof alerts] ? "left-4" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <p className="text-xs font-semibold text-foreground flex items-center gap-2"><Lock className="w-4 h-4 text-primary" /> Security</p>
        <button className="w-full py-2.5 rounded-xl bg-accent text-xs font-medium text-foreground text-center">Change Password</button>
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground/80">Two-Factor Authentication</span>
          <button onClick={() => setTwoFA(!twoFA)}
            className={`w-10 h-6 rounded-full transition-all relative ${twoFA ? "bg-primary" : "bg-muted"}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${twoFA ? "left-5" : "left-1"}`} />
          </button>
        </div>
      </div>

      {/* Regional */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <p className="text-xs font-semibold text-foreground flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Regional Settings</p>
        <div>
          <label className="text-[10px] text-muted-foreground">Language</label>
          <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-xs text-foreground outline-none border border-border">
            <option>English</option><option>Hindi</option><option>Kannada</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] text-muted-foreground">Region</label>
          <select value={region} onChange={e => setRegion(e.target.value)} className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-xs text-foreground outline-none border border-border">
            <option>India</option><option>UAE</option><option>Singapore</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
