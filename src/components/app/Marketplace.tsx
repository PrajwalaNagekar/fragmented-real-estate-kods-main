import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Flame, ChevronRight, TrendingUp } from "lucide-react";
import { properties, formatCurrency } from "@/data/mockData";
import type { AppScreen } from "@/pages/Index";

const riskColor = { Low: "text-teal bg-teal/10", Medium: "text-primary bg-primary/10", High: "text-rose bg-rose/10" };
const sortOptions = ["Trending", "Highest Yield", "Newest"];

const Marketplace = ({ onNavigate }: { onNavigate: (s: AppScreen, id?: string) => void }) => {
  const [sort, setSort] = useState("Trending");
  const hotProperties = properties.filter(p => p.trending);

  return (
    <div className="px-4 pb-6 space-y-5">
      <div className="pt-2">
        <h1 className="text-lg font-display font-bold text-foreground">Marketplace</h1>
        <p className="text-xs text-muted-foreground">Premium investment opportunities</p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search properties..." className="w-full bg-accent rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors" />
        </div>
        <button className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Sort */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {sortOptions.map(s => (
          <button key={s} onClick={() => setSort(s)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${sort === s ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Hot Properties Carousel */}
      {hotProperties.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Flame className="w-4 h-4 text-rose" />
            <span className="text-xs font-semibold text-foreground">Hot Properties</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {hotProperties.map(p => (
              <motion.button
                key={p.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate("propertyDetail", p.id)}
                className="min-w-[200px] rounded-2xl overflow-hidden bg-card border border-border flex-shrink-0 text-left"
              >
                <div className="relative h-[100px]">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose/90 text-[9px] font-bold text-white flex items-center gap-1">
                    <Flame className="w-2.5 h-2.5" /> HOT
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-foreground">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-primary">{p.yieldPercent}% yield</span>
                    <span className="text-[10px] text-muted-foreground">{Math.round((p.soldFragments / p.totalFragments) * 100)}% sold</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* All Properties */}
      <div className="space-y-3">
        {properties.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("propertyDetail", p.id)}
            className="w-full rounded-2xl overflow-hidden bg-card border border-border text-left"
          >
            <div className="relative h-[140px]">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${riskColor[p.riskLevel]}`}>
                {p.riskLevel} Risk
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.location}</p>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-sm font-bold">{p.yieldPercent}%</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{formatCurrency(p.pricePerFragment)} / fragment</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${riskColor[p.riskLevel]}`}>{p.type}</span>
              </div>
              {/* Fragment availability meter */}
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>{p.soldFragments}/{p.totalFragments} sold</span>
                  <span>{p.totalFragments - p.soldFragments} available</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(p.soldFragments / p.totalFragments) * 100}%` }} />
                </div>
              </div>
              <button className="w-full mt-3 py-2 rounded-xl gradient-gold text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1">
                Buy Fraction <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
