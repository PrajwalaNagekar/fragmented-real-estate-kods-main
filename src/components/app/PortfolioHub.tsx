import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, List, MapPin, ShieldCheck, Eye, EyeOff, Home as HomeIcon, Tag, DollarSign, FileCheck, Download, X } from "lucide-react";
import { userFragments, kycDocuments, formatCurrency } from "@/data/mockData";
import type { AppScreen } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";

const PortfolioHub = ({ onNavigate }: { onNavigate: (s: AppScreen, id?: string) => void }) => {
  const [tab, setTab] = useState<"fragments" | "documents">("fragments");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  const [rentModal, setRentModal] = useState<string | null>(null);
  const [sellModal, setSellModal] = useState<string | null>(null);
  const [rentPrice, setRentPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");

  const toggleToken = (id: string) => {
    setShowTokens(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRent = (id: string) => {
    toast({ title: "Fragment Listed for Rent", description: `Fragment listed at ₹${rentPrice}/month` });
    setRentModal(null);
    setRentPrice("");
  };

  const handleSell = (id: string) => {
    toast({ title: "Fragment Listed for Sale", description: `Fragment listed at ₹${sellPrice}` });
    setSellModal(null);
    setSellPrice("");
  };

  // Map pin positions (normalized to fit in a styled map container)
  const mapPinData = userFragments.map((f, i) => ({
    ...f,
    x: 20 + (i % 3) * 30 + Math.random() * 15,
    y: 20 + Math.floor(i / 3) * 35 + Math.random() * 15,
  }));

  return (
    <div className="px-4 pb-6 space-y-4">
      <div className="pt-2">
        <h1 className="text-lg font-display font-bold text-foreground">Portfolio</h1>
        <p className="text-xs text-muted-foreground">Your investments & documents</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2">
        <button onClick={() => setTab("fragments")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${tab === "fragments" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
          My Fragments
        </button>
        <button onClick={() => setTab("documents")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${tab === "documents" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
          Document Vault
        </button>
      </div>

      {tab === "fragments" && (
        <>
          {/* Map/List Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{userFragments.length} owned fragments</p>
            <div className="flex gap-1">
              <button onClick={() => setViewMode("map")} className={`p-2 rounded-lg transition-all ${viewMode === "map" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
                <Map className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Map View */}
          {viewMode === "map" && (
            <div className="relative h-[220px] rounded-2xl bg-card border border-border overflow-hidden">
              {/* Styled map background */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23888' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-primary/5" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-card/90 backdrop-blur border border-border">
                <p className="text-[9px] text-muted-foreground font-medium">📍 India · Properties Map</p>
              </div>
              {mapPinData.map((pin) => (
                <motion.button
                  key={pin.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => onNavigate("fragmentDetail", pin.id)}
                  className="absolute group"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  <div className="relative">
                    <MapPin className="w-6 h-6 text-primary drop-shadow-lg" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-lg bg-card border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] font-semibold text-foreground">{pin.propertyName}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Fragment Cards */}
          <div className="space-y-3">
            {userFragments.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                {/* Image + overlay */}
                <div className="relative h-[80px]">
                  <img src={f.propertyImage} alt={f.propertyName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <p className="text-xs font-semibold text-white">{f.propertyName}</p>
                    <p className="text-[10px] text-white/70">{f.percentageOwned}% owned · {f.fragmentIds.length} fragments</p>
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  {/* POA Badge */}
                  {f.poaIssued && (
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-teal/10 border border-teal/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                      <span className="text-[10px] font-medium text-teal">✔ Power of Attorney Issued – Owner Verified</span>
                    </div>
                  )}

                  {/* Token - Hidden by default */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Token ID</span>
                    <button onClick={() => toggleToken(f.id)} className="flex items-center gap-1 text-[10px] text-primary font-medium">
                      {showTokens[f.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {showTokens[f.id] ? "Hide" : "Show"} Token
                    </button>
                  </div>
                  <AnimatePresence>
                    {showTokens[f.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-accent rounded-lg p-2 font-mono text-[11px] text-foreground text-center"
                      >
                        {f.tokenId} · {f.chainStatus}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => onNavigate("fragmentDetail", f.id)}
                      className="flex-1 py-2 rounded-xl bg-accent text-xs font-medium text-foreground text-center">
                      View Details
                    </button>
                    <button onClick={() => setRentModal(f.id)}
                      className="py-2 px-3 rounded-xl bg-teal/10 text-xs font-medium text-teal flex items-center gap-1">
                      <HomeIcon className="w-3 h-3" /> Rent
                    </button>
                    <button onClick={() => setSellModal(f.id)}
                      className="py-2 px-3 rounded-xl bg-primary/10 text-xs font-medium text-primary flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Sell
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {tab === "documents" && (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-teal/5 border border-teal/20 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal" />
            <span className="text-xs text-teal">All documents verified & encrypted</span>
          </div>
          {kycDocuments.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{doc.name}</p>
                <p className="text-[10px] text-muted-foreground">{doc.type} · {new Date(doc.uploadDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal/10 text-teal font-medium">✓ {doc.status}</span>
                <button className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Rent Modal */}
      <AnimatePresence>
        {rentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setRentModal(null)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-card rounded-2xl p-6 w-[320px] shadow-2xl border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-display font-bold text-foreground">Rent Fragment</h3>
                <button onClick={() => setRentModal(null)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground">Monthly Rent (₹)</label>
                  <input value={rentPrice} onChange={e => setRentPrice(e.target.value)} placeholder="e.g. 15000" className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Minimum Lease Period</label>
                  <select className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border">
                    <option>6 months</option>
                    <option>12 months</option>
                    <option>24 months</option>
                  </select>
                </div>
                <button onClick={() => handleRent(rentModal)} className="w-full py-3 rounded-xl gradient-gold text-white text-sm font-semibold">
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
            <div className="absolute inset-0 bg-black/50" onClick={() => setSellModal(null)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-card rounded-2xl p-6 w-[320px] shadow-2xl border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-display font-bold text-foreground">Sell Fragment</h3>
                <button onClick={() => setSellModal(null)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground">Asking Price (₹)</label>
                  <input value={sellPrice} onChange={e => setSellPrice(e.target.value)} placeholder="e.g. 500000" className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary" />
                </div>
                <button onClick={() => handleSell(sellModal)} className="w-full py-3 rounded-xl gradient-gold text-white text-sm font-semibold">
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

export default PortfolioHub;
