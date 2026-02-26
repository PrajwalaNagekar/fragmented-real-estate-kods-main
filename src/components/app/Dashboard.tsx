import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Landmark, Layers, Calendar, Sparkles, ChevronRight, Bell, Building2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { portfolioSummary, wealthOverTime, recentIncome, aiInsight, formatCurrency, userFragments } from "@/data/mockData";
import type { AppScreen } from "@/pages/Index";

type Period = "today" | "month" | "year";

const Dashboard = ({ onNavigate }: { onNavigate: (s: AppScreen, id?: string) => void }) => {
  const { totalValue, totalROI, rentalIncome, propertiesOwned, fragmentsHeld, nextPayoutDate, healthScore } = portfolioSummary;
  const [period, setPeriod] = useState<Period>("year");
  const chartData = wealthOverTime[period];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs font-semibold text-primary">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-4 pb-6 space-y-5">
      {/* Greeting + Notification */}
      <div className="pt-2 flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Welcome back,</p>
          <h1 className="text-lg font-display font-bold text-foreground">Rahul Kapoor</h1>
        </div>
        <button onClick={() => onNavigate("notifications")} className="relative p-2 rounded-full hover:bg-accent transition-colors mt-1">
          <Bell className="w-5 h-5 text-foreground/70" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </button>
      </div>

      {/* Summary Cards - Colorful */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Value - Indigo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="p-4 rounded-2xl bg-card border border-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-[0.07]" style={{ background: "hsl(220, 80%, 50%)" }} />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "hsl(220, 80%, 50%, 0.12)" }}>
              <Landmark className="w-3.5 h-3.5" style={{ color: "hsl(220, 80%, 50%)" }} />
            </div>
            <span className="text-[11px] text-muted-foreground">Total Value</span>
          </div>
          <p className="text-lg font-bold text-foreground">{formatCurrency(totalValue)}</p>
        </motion.div>

        {/* Total ROI - Emerald */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-2xl bg-card border border-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-[0.07]" style={{ background: "hsl(160, 84%, 39%)" }} />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "hsl(160, 84%, 39%, 0.12)" }}>
              <TrendingUp className="w-3.5 h-3.5" style={{ color: "hsl(160, 84%, 39%)" }} />
            </div>
            <span className="text-[11px] text-muted-foreground">Total ROI</span>
          </div>
          <p className="text-lg font-bold" style={{ color: "hsl(160, 84%, 39%)" }}>+{totalROI}%</p>
        </motion.div>

        {/* Rental Income - Orange/Amber - Full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-2 p-4 rounded-2xl bg-card border border-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-[0.06]" style={{ background: "hsl(220, 80%, 50%)" }} />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "hsl(220, 80%, 50%, 0.12)" }}>
              <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "hsl(220, 80%, 50%)" }} />
            </div>
            <span className="text-[11px] text-muted-foreground">Rental Income</span>
          </div>
          <p className="text-lg font-bold text-foreground">{formatCurrency(rentalIncome)}</p>
        </motion.div>
      </div>

      {/* Health Score - with colored ring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4"
      >
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="2.8" />
            {/* Gradient arc */}
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(220, 80%, 50%)" />
                <stop offset="100%" stopColor="hsl(160, 84%, 39%)" />
              </linearGradient>
            </defs>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#healthGrad)" strokeWidth="2.8"
              strokeDasharray={`${healthScore} ${100 - healthScore}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold" style={{ color: "hsl(220, 80%, 50%)" }}>{healthScore}</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Portfolio Health Score</p>
          <p className="text-xs text-muted-foreground mt-0.5">Good diversification across {propertiesOwned} properties</p>
        </div>
      </motion.div>

      {/* Wealth Chart with Period Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="p-4 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground font-medium">Wealth Over Time</p>
          <div className="flex gap-1">
            {(["today", "month", "year"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${period === p ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
                {p === "today" ? "Today" : p === "month" ? "Month" : "Year"}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220, 80%, 50%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(220, 80%, 50%)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="hsl(220, 80%, 50%)" strokeWidth={2.5} fill="url(#blueGrad)" dot={{ r: 3, fill: "hsl(220, 80%, 50%)", strokeWidth: 0 }} activeDot={{ r: 6, fill: "hsl(220, 80%, 50%)", stroke: "white", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Stats - Colorful icons */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Building2, label: "Properties", value: propertiesOwned, iconColor: "hsl(220, 80%, 50%)", bgColor: "hsl(220, 80%, 50%, 0.1)" },
          { icon: Layers, label: "Fragments", value: fragmentsHeld, iconColor: "hsl(280, 70%, 55%)", bgColor: "hsl(280, 70%, 55%, 0.1)" },
          { icon: Calendar, label: "Next Payout", value: new Date(nextPayoutDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }), iconColor: "hsl(340, 75%, 55%)", bgColor: "hsl(340, 75%, 55%, 0.1)" },
        ].map(stat => (
          <div key={stat.label} className="p-3 rounded-xl bg-card border border-border text-center">
            <div className="w-8 h-8 rounded-lg mx-auto mb-1.5 flex items-center justify-center" style={{ background: stat.bgColor }}>
              <stat.icon className="w-4 h-4" style={{ color: stat.iconColor }} />
            </div>
            <p className="text-xs font-bold text-foreground">{stat.value}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* AI Insight - Gradient accent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="p-4 rounded-2xl border relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(220, 80%, 50%, 0.08), hsl(280, 70%, 55%, 0.06))", borderColor: "hsl(220, 80%, 50%, 0.2)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "hsl(280, 70%, 55%, 0.15)" }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: "hsl(280, 70%, 55%)" }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: "hsl(280, 70%, 55%)" }}>{aiInsight.title}</span>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed">{aiInsight.text}</p>
      </motion.div>

      {/* Recent Income */}
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-medium">Recent Income</p>
        <div className="space-y-2">
          {recentIncome.slice(0, 3).map((item, i) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(160, 84%, 39%, 0.1)" }}>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "hsl(160, 84%, 39%)" }} />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{item.property}</p>
                  <p className="text-[10px] text-muted-foreground">{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                </div>
              </div>
              <span className="text-sm font-semibold" style={{ color: "hsl(160, 84%, 39%)" }}>+{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My Fragments Quick Access */}
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-medium">My Fragments</p>
        <div className="space-y-2">
          {userFragments.slice(0, 3).map((f, i) => {
            const colors = [
              { icon: "hsl(220, 80%, 50%)", bg: "hsl(220, 80%, 50%, 0.1)" },
              { icon: "hsl(340, 75%, 55%)", bg: "hsl(340, 75%, 55%, 0.1)" },
              { icon: "hsl(30, 90%, 50%)", bg: "hsl(30, 90%, 50%, 0.1)" },
            ];
            const c = colors[i % colors.length];
            return (
              <button
                key={f.id}
                onClick={() => onNavigate("fragmentDetail", f.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg }}>
                    <Building2 className="w-3.5 h-3.5" style={{ color: c.icon }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{f.propertyName}</p>
                    <p className="text-[10px] text-muted-foreground">{f.percentageOwned}% owned · {f.fragmentIds.length} fragments</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
