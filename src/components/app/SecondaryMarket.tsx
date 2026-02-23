import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, ArrowUpRight, ShoppingCart, Tag, Star, Clock, BarChart3, Users } from "lucide-react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { secondaryListings, fragmentPriceHistory, formatCurrency, userFragments, marketStats } from "@/data/mockData";
import type { AppScreen } from "@/pages/Index";

const SecondaryMarket = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => {
  const [tab, setTab] = useState<"buy" | "sell">("buy");

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
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onNavigate("dashboard")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground">Secondary Market</h1>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total Volume", value: marketStats.totalVolume, icon: BarChart3 },
          { label: "Active Listings", value: marketStats.activeListings, icon: Tag },
          { label: "Avg. Change", value: marketStats.avgPriceChange, icon: TrendingUp },
        ].map(s => (
          <div key={s.label} className="p-3 rounded-xl bg-card border border-border text-center">
            <s.icon className="w-3.5 h-3.5 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-foreground">{s.value}</p>
            <p className="text-[9px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Market Trends */}
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-xs text-foreground">Buyer/Seller Ratio: <strong className="text-primary">{marketStats.buyerSellerRatio}</strong></span>
        </div>
        <span className="text-[10px] text-muted-foreground">{marketStats.totalTradesThisMonth} trades this month</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["buy", "sell"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${tab === t ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
            {t === "buy" ? <ShoppingCart className="w-3.5 h-3.5" /> : <Tag className="w-3.5 h-3.5" />}
            {t === "buy" ? "Browse Listings" : "List for Sale"}
          </button>
        ))}
      </div>

      {/* Price History Chart */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground">Fragment Price Trend</p>
          <span className="text-xs font-semibold text-teal flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +9.4%
          </span>
        </div>
        <div className="h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fragmentPriceHistory}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(28, 40%, 64%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(28, 40%, 64%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="price" stroke="hsl(28, 40%, 64%)" strokeWidth={2} fill="url(#priceGrad)" activeDot={{ r: 4, fill: "hsl(28, 40%, 64%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {tab === "buy" ? (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Available Listings</p>
          {secondaryListings.map((listing, i) => {
            const gain = ((listing.price - listing.originalPrice) / listing.originalPrice * 100).toFixed(1);
            return (
              <motion.div key={listing.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="flex">
                  <img src={listing.propertyImage} alt={listing.propertyName} className="w-20 h-20 object-cover" />
                  <div className="p-3 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold text-foreground">{listing.propertyName}</p>
                        <p className="text-[10px] text-muted-foreground">Fragment #{listing.fragmentId}</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal/10 text-teal font-medium">+{gain}%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 text-primary fill-primary" />
                        <span className="text-[9px] text-muted-foreground">{listing.sellerRating}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                        <span className="text-[9px] text-muted-foreground">{listing.daysListed}d listed</span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent text-muted-foreground">{listing.condition}</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Ask Price</p>
                    <p className="text-sm font-bold text-primary">{formatCurrency(listing.price)}</p>
                  </div>
                  <button className="px-4 py-2 rounded-xl gradient-gold text-white text-xs font-semibold">Buy Now</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Select fragment to list</p>
          {userFragments.map(f => (
            <div key={f.id} className="p-4 rounded-2xl bg-card border border-border">
              <p className="text-sm font-semibold text-foreground mb-1">{f.propertyName}</p>
              <p className="text-[10px] text-muted-foreground mb-3">Fragments: {f.fragmentIds.join(", ")}</p>
              <div className="flex gap-2">
                <input placeholder="Set price" className="flex-1 bg-accent rounded-xl px-3 py-2 text-xs text-foreground outline-none border border-border" />
                <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">List</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondaryMarket;
