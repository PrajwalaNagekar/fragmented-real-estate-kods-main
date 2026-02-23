import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Award, QrCode, Link2, Shield, Calendar, Wallet, TrendingUp, Eye, EyeOff, ShieldCheck, Home as HomeIcon, Tag, X } from "lucide-react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { userFragments, incomeHistory, formatCurrency } from "@/data/mockData";
import type { AppScreen } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";

const FragmentDetail = ({ fragmentId, onNavigate }: { fragmentId: string; onNavigate: (s: AppScreen) => void }) => {
  const fragment = userFragments.find(f => f.id === fragmentId) || userFragments[0];
  const [showCert, setShowCert] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [rentPrice, setRentPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs font-semibold text-teal">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-4 pb-6 space-y-4">
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onNavigate("portfolio")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground">Fragment Details</h1>
      </div>

      {/* Ownership Summary */}
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <p className="text-sm font-semibold text-foreground">{fragment.propertyName}</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Owned", value: `${fragment.percentageOwned}%`, icon: Wallet },
            { label: "Fragments", value: fragment.fragmentIds.length, icon: Shield },
            { label: "Cost Basis", value: formatCurrency(fragment.costBasis), icon: TrendingUp },
            { label: "Income", value: formatCurrency(fragment.incomeReceived), icon: TrendingUp },
          ].map(item => (
            <div key={item.label} className="p-3 rounded-xl bg-accent border border-border">
              <item.icon className="w-3.5 h-3.5 text-primary mb-1" />
              <p className="text-xs font-bold text-foreground">{item.value}</p>
              <p className="text-[9px] text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>Purchased: {new Date(fragment.purchaseDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary">
          <Calendar className="w-3 h-3" />
          <span>Next Payout: {new Date(fragment.nextPayout).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      {/* POA Badge */}
      {fragment.poaIssued && (
        <div className="p-3 rounded-xl bg-teal/5 border border-teal/20 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal" />
          <span className="text-xs font-medium text-teal">✔ Power of Attorney Issued – Owner Verified</span>
        </div>
      )}

      {/* Rent/Sell Buttons */}
      <div className="flex gap-2">
        <button onClick={() => setRentModal(true)}
          className="flex-1 py-3 rounded-xl bg-teal/10 border border-teal/20 text-sm font-semibold text-teal flex items-center justify-center gap-2">
          <HomeIcon className="w-4 h-4" /> Rent Fragment
        </button>
        <button onClick={() => setSellModal(true)}
          className="flex-1 py-3 rounded-xl bg-primary/10 border border-primary/20 text-sm font-semibold text-primary flex items-center justify-center gap-2">
          <Tag className="w-4 h-4" /> Sell Fragment
        </button>
      </div>

      {/* Ownership Certificate */}
      <button onClick={() => setShowCert(!showCert)}
        className="w-full p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-3">
        <Award className="w-6 h-6 text-primary" />
        <div className="text-left flex-1">
          <p className="text-sm font-semibold text-foreground">Ownership Certificate</p>
          <p className="text-[10px] text-muted-foreground">Digital POA document</p>
        </div>
      </button>

      {showCert && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="p-5 rounded-2xl border-2 border-primary/30 bg-card relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-30" />
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 rounded-full gradient-gold mx-auto mb-3 flex items-center justify-center">
              <span className="text-lg font-display font-bold text-white">O</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Certificate of Ownership</p>
            <p className="text-base font-display font-bold text-primary mt-1">{fragment.propertyName}</p>
            <div className="w-16 h-[1px] bg-primary/30 mx-auto my-3" />
            <p className="text-xs text-foreground">This certifies that <strong>Rahul Kapoor</strong> owns <strong>{fragment.percentageOwned}%</strong> ({fragment.fragmentIds.length} fragments) of the above property.</p>
            <p className="text-[10px] text-muted-foreground mt-2">Issued: {fragment.issuanceDate}</p>
          </div>
        </motion.div>
      )}

      {/* Blockchain Trust Badge - Token Hidden by Default */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
              <Link2 className="w-5 h-5 text-teal" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Blockchain Verified</p>
              <p className="text-[10px] text-teal">Status: {fragment.chainStatus}</p>
            </div>
          </div>
          <button onClick={() => setShowToken(!showToken)} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent text-[10px] font-medium text-primary">
            {showToken ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showToken ? "Hide" : "Show"} Token
          </button>
        </div>
        <AnimatePresence>
          {showToken && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="mt-2 bg-accent rounded-xl p-3 font-mono text-[11px] text-foreground text-center flex items-center justify-between">
              <span>{fragment.tokenId}</span>
              <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center">
                <QrCode className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Income History */}
      <div className="p-4 rounded-2xl bg-card border border-border">
        <p className="text-xs text-muted-foreground mb-3">Monthly Income</p>
        <div className="h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={incomeHistory}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174, 60%, 35%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(174, 60%, 35%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" stroke="hsl(174, 60%, 35%)" strokeWidth={2} fill="url(#tealGrad)" activeDot={{ r: 4, fill: "hsl(174, 60%, 35%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rent Modal */}
      <AnimatePresence>
        {rentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setRentModal(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative bg-card rounded-2xl p-6 w-[320px] shadow-2xl border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-display font-bold text-foreground">Rent Fragment</h3>
                <button onClick={() => setRentModal(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground">Monthly Rent (₹)</label>
                  <input value={rentPrice} onChange={e => setRentPrice(e.target.value)} placeholder="e.g. 15000" className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary" />
                </div>
                <button onClick={() => { toast({ title: "Listed for Rent" }); setRentModal(false); }} className="w-full py-3 rounded-xl gradient-gold text-white text-sm font-semibold">
                  Confirm Listing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sell Modal */}
      <AnimatePresence>
        {sellModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSellModal(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative bg-card rounded-2xl p-6 w-[320px] shadow-2xl border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-display font-bold text-foreground">Sell Fragment</h3>
                <button onClick={() => setSellModal(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground">Asking Price (₹)</label>
                  <input value={sellPrice} onChange={e => setSellPrice(e.target.value)} placeholder="e.g. 500000" className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary" />
                </div>
                <button onClick={() => { toast({ title: "Listed for Sale" }); setSellModal(false); }} className="w-full py-3 rounded-xl gradient-gold text-white text-sm font-semibold">
                  List for Sale
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FragmentDetail;
