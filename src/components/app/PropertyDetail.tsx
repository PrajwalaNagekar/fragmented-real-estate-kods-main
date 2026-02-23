import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, TrendingUp, Users, BarChart3, Navigation, TreePine, GraduationCap, Heart, Building } from "lucide-react";
import { AreaChart, Area, XAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { properties, neighborhoodData, formatCurrency } from "@/data/mockData";
import type { AppScreen } from "@/pages/Index";

const PropertyDetail = ({ propertyId, onNavigate }: { propertyId: string; onNavigate: (s: AppScreen, id?: string) => void }) => {
  const property = properties.find(p => p.id === propertyId) || properties[0];
  const [shares, setShares] = useState(1);

  // Mock fragment grid (10x10)
  const ownedFragments = [14, 15, 22, 23, 24];
  const soldFragments = Array.from({ length: property.soldFragments }, (_, i) => i + 1).filter(f => !ownedFragments.includes(f));

  return (
    <div className="pb-6">
      {/* Hero */}
      <div className="relative h-[200px]">
        <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <button onClick={() => onNavigate("marketplace")} className="absolute top-3 left-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
      </div>

      <div className="px-4 -mt-8 relative z-10 space-y-5">
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">{property.name}</h1>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{property.location}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Per Share", value: formatCurrency(property.pricePerFragment), icon: BarChart3 },
            { label: "Exp. Yield", value: `${property.expectedYield}%`, icon: TrendingUp },
            { label: "Occupancy", value: `${property.occupancyRate}%`, icon: Users },
          ].map(m => (
            <div key={m.label} className="p-3 rounded-xl bg-card border border-border text-center">
              <m.icon className="w-3.5 h-3.5 text-primary mx-auto mb-1" />
              <p className="text-xs font-bold text-foreground">{m.value}</p>
              <p className="text-[9px] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-foreground/70 leading-relaxed">{property.description}</p>

        {/* Interactive Fragment Blueprint */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          <p className="text-xs text-muted-foreground mb-3">Fragment Blueprint</p>
          <div className="grid grid-cols-10 gap-[3px]">
            {Array.from({ length: 100 }, (_, i) => i + 1).map(f => {
              const isOwned = ownedFragments.includes(f);
              const isSold = soldFragments.includes(f);
              return (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.3 }}
                  className={`aspect-square rounded-[3px] text-[6px] flex items-center justify-center transition-colors ${
                    isOwned ? "bg-primary text-primary-foreground glow-gold" :
                    isSold ? "bg-muted-foreground/30" : "bg-accent border border-border hover:border-primary/50"
                  }`}
                >
                  {isOwned && "★"}
                </motion.button>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-primary" /> Yours</span>
            <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/30" /> Sold</span>
            <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-accent border border-border" /> Available</span>
          </div>
        </div>

        {/* Buy Fragment CTA */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">Fragments to buy</span>
            <span className="text-sm font-bold text-primary">{shares}</span>
          </div>
          <input
            type="range" min={1} max={10} value={shares} onChange={e => setShares(Number(e.target.value))}
            className="w-full accent-[hsl(43,96%,56%)] mb-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground mb-3">
            <span>Total: {formatCurrency(property.pricePerFragment * shares)}</span>
            <span>{property.totalFragments - property.soldFragments} available</span>
          </div>
          <button className="w-full py-3 rounded-xl gradient-gold text-primary-foreground font-semibold text-sm glow-gold active:scale-[0.98] transition-transform">
            Buy {shares} Fragment{shares > 1 ? "s" : ""}
          </button>
        </div>

        {/* Neighborhood Insights */}
        <div className="p-4 rounded-2xl bg-card border border-border">
          <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-primary" /> Neighborhood Insights
          </p>

          {/* Walkability */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--muted))" strokeWidth="2" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--teal))" strokeWidth="2"
                  strokeDasharray={`${neighborhoodData.walkabilityScore} ${100 - neighborhoodData.walkabilityScore}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-teal">{neighborhoodData.walkabilityScore}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Walkability Score</p>
              <p className="text-[10px] text-muted-foreground">Very Walkable</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {neighborhoodData.amenities.map(a => (
              <span key={a} className="px-2 py-1 rounded-lg bg-accent text-[10px] text-foreground/80 border border-border">{a}</span>
            ))}
          </div>

          {/* Growth Trend */}
          <p className="text-[10px] text-muted-foreground mb-2">Area Growth Trend (%)</p>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={neighborhoodData.growthTrend}>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 9 }} />
                <Bar dataKey="growth" fill="hsl(174, 72%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
