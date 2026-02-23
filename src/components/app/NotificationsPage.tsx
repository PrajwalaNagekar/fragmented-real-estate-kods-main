import { motion } from "framer-motion";
import { ArrowLeft, Bell, TrendingUp, DollarSign, ShieldCheck, Store } from "lucide-react";
import { notifications } from "@/data/mockData";
import type { AppScreen } from "@/pages/Index";

const typeIcon: Record<string, typeof Bell> = { income: DollarSign, market: Store, alert: TrendingUp, kyc: ShieldCheck };

const NotificationsPage = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => (
  <div className="px-4 pb-6 space-y-4">
    <div className="flex items-center gap-3 pt-2">
      <button onClick={() => onNavigate("dashboard")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
        <ArrowLeft className="w-4 h-4 text-foreground" />
      </button>
      <h1 className="text-base font-display font-bold text-foreground">Notifications</h1>
    </div>

    <div className="space-y-2">
      {notifications.map((n, i) => {
        const Icon = typeIcon[n.type] || Bell;
        return (
          <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`p-4 rounded-2xl border ${n.read ? "bg-card border-border" : "bg-primary/5 border-primary/20"}`}>
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${n.read ? "bg-accent" : "bg-primary/10"}`}>
                <Icon className={`w-4 h-4 ${n.read ? "text-muted-foreground" : "text-primary"}`} />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-semibold ${n.read ? "text-foreground/80" : "text-foreground"}`}>{n.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-[9px] text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-1 flex-shrink-0" />}
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default NotificationsPage;
