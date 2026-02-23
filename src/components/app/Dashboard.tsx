import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Landmark, Layers, Calendar, Sparkles, ChevronRight, Bell } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
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

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Total Value", value: formatCurrency(totalValue), icon: Landmark, color: "text-primary" },
          { label: "Total ROI", value: `+${totalROI}%`, icon: TrendingUp, color: "text-teal" },
          { label: "Rental Income", value: formatCurrency(rentalIncome), icon: ArrowUpRight, color: "text-primary" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-2xl bg-card border border-border ${i === 2 ? "col-span-2" : ""}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <card.icon className={`w-4 h-4 ${card.color}`} />
              <span className="text-[11px] text-muted-foreground">{card.label}</span>
            </div>
            <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Health Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4"
      >
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="2.5" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5"
              strokeDasharray={`${healthScore} ${100 - healthScore}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{healthScore}</span>
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
          <p className="text-xs text-muted-foreground">Wealth Over Time</p>
          <div className="flex gap-1">
            {(["today", "month", "year"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${period === p ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
                {p === "today" ? "Today" : p === "month" ? "Month" : "Year"}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(28, 40%, 64%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(28, 40%, 64%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="hsl(28, 40%, 64%)" strokeWidth={2} fill="url(#goldGrad)" activeDot={{ r: 5, fill: "hsl(28, 40%, 64%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Layers, label: "Properties", value: propertiesOwned },
          { icon: Layers, label: "Fragments", value: fragmentsHeld },
          { icon: Calendar, label: "Next Payout", value: new Date(nextPayoutDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) },
        ].map(stat => (
          <div key={stat.label} className="p-3 rounded-xl bg-card border border-border text-center">
            <stat.icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{stat.value}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="p-4 rounded-2xl bg-primary/5 border border-primary/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary">{aiInsight.title}</span>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed">{aiInsight.text}</p>
      </motion.div>

      {/* Recent Income */}
      <div>
        <p className="text-xs text-muted-foreground mb-3">Recent Income</p>
        <div className="space-y-2">
          {recentIncome.slice(0, 3).map(item => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
              <div>
                <p className="text-xs font-medium text-foreground">{item.property}</p>
                <p className="text-[10px] text-muted-foreground">{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
              </div>
              <span className="text-sm font-semibold text-teal">+{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* My Fragments Quick Access */}
      <div>
        <p className="text-xs text-muted-foreground mb-3">My Fragments</p>
        <div className="space-y-2">
          {userFragments.slice(0, 3).map(f => (
            <button
              key={f.id}
              onClick={() => onNavigate("fragmentDetail", f.id)}
              className="flex items-center justify-between p-3 rounded-xl bg-card border border-border w-full text-left"
            >
              <div>
                <p className="text-xs font-medium text-foreground">{f.propertyName}</p>
                <p className="text-[10px] text-muted-foreground">{f.percentageOwned}% owned · {f.fragmentIds.length} fragments</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
