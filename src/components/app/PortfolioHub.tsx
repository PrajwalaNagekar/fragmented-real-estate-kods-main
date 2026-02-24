import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, List, MapPin, ShieldCheck, Eye, EyeOff, Home as HomeIcon, Tag, DollarSign, FileCheck, Download, X, Database, FileDown, FileSpreadsheet, Store } from "lucide-react";
import { userFragments, kycDocuments, formatCurrency } from "@/data/mockData";
import type { AppScreen } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";

type PortfolioTab = "fragments" | "documents" | "listed" | "export";

const PortfolioHub = ({ onNavigate }: { onNavigate: (s: AppScreen, id?: string) => void }) => {
  const [tab, setTab] = useState<PortfolioTab>("fragments");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [showTokens, setShowTokens] = useState<Record<string, boolean>>({});
  const [rentModal, setRentModal] = useState<string | null>(null);
  const [sellModal, setSellModal] = useState<string | null>(null);
  const [rentPrice, setRentPrice] = useState("");
  const [rentDuration, setRentDuration] = useState("12 months");
  const [rentTerms, setRentTerms] = useState("");
  const [rentDesc, setRentDesc] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellDesc, setSellDesc] = useState("");

  const toggleToken = (id: string) => setShowTokens(prev => ({ ...prev, [id]: !prev[id] }));

  const handleRent = () => {
    toast({ title: "Fragment Listed for Rent", description: `Submitted for verification at ₹${rentPrice}/month. Status: Verification Pending` });
    setRentModal(null); setRentPrice(""); setRentTerms(""); setRentDesc("");
  };

  const handleSell = () => {
    toast({ title: "Fragment Listed for Sale", description: `Submitted for verification at ₹${sellPrice}. Status: Verification Pending` });
    setSellModal(null); setSellPrice(""); setSellDesc("");
  };

  const handleExport = (type: string) => {
    toast({ title: `${type} Export Started`, description: "Your data will be ready for download shortly." });
  };

  const mapPinData = userFragments.map((f, i) => ({
    ...f,
    x: 20 + (i % 3) * 30 + Math.random() * 15,
    y: 20 + Math.floor(i / 3) * 35 + Math.random() * 15,
  }));

  const listedForRent = [
    { id: "lr-1", name: "Sky Villas, Gurgaon", price: "₹32,500/mo", status: "Verification Pending", stage: "Under Review" },
  ];
  const listedForSale = [
    { id: "ls-1", name: "Coorg Hill Retreat", price: "₹2,80,000", status: "Active", stage: "Published" },
  ];

  const tabs: { id: PortfolioTab; label: string }[] = [
    { id: "fragments", label: "Fragments" },
    { id: "documents", label: "Docs" },
    { id: "listed", label: "Listed" },
    { id: "export", label: "Export" },
  ];

  return (
    <div className="px-4 pb-6 space-y-4">
      <div className="pt-2">
        <h1 className="text-lg font-display font-bold text-foreground">Portfolio</h1>
        <p className="text-xs text-muted-foreground">Your investments & documents</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1.5">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-xl text-[11px] font-semibold transition-all ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Rent & Sell Bar */}
      {tab === "fragments" && (
        <div className="flex gap-2">
          <button onClick={() => setRentModal(userFragments[0]?.id || null)}
            className="flex-1 py-2.5 rounded-xl bg-teal/10 border border-teal/20 text-xs font-semibold text-teal flex items-center justify-center gap-1.5">
            <HomeIcon className="w-3.5 h-3.5" /> Rent Fragment
          </button>
          <button onClick={() => setSellModal(userFragments[0]?.id || null)}
            className="flex-1 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary flex items-center justify-center gap-1.5">
            <Tag className="w-3.5 h-3.5" /> Sell Fragment
          </button>
        </div>
      )}

      {tab === "fragments" && (
        <>
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

          {viewMode === "map" && (
            <div className="relative h-[220px] rounded-2xl bg-card border border-border overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23888' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-primary/5" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-card/90 backdrop-blur border border-border">
                <p className="text-[9px] text-muted-foreground font-medium">📍 India · Properties Map</p>
              </div>
              {mapPinData.map(pin => (
                <motion.button key={pin.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                  onClick={() => onNavigate("fragmentDetail", pin.id)} className="absolute group" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
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

          <div className="space-y-3">
            {userFragments.map((f, i) => (
              <motion.div key={f.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="relative h-[80px]">
                  <img src={f.propertyImage} alt={f.propertyName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <p className="text-xs font-semibold text-white">{f.propertyName}</p>
                    <p className="text-[10px] text-white/70">{f.percentageOwned}% owned · {f.fragmentIds.length} fragments</p>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  {f.poaIssued && (
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-teal/10 border border-teal/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal" />
                      <span className="text-[10px] font-medium text-teal">✔ Power of Attorney Issued – Owner Verified</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Token ID</span>
                    <button onClick={() => toggleToken(f.id)} className="flex items-center gap-1 text-[10px] text-primary font-medium">
                      {showTokens[f.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {showTokens[f.id] ? "Hide" : "Show"} Token
                    </button>
                  </div>
                  <AnimatePresence>
                    {showTokens[f.id] && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="bg-accent rounded-lg p-2 font-mono text-[11px] text-foreground text-center">
                        {f.tokenId} · {f.chainStatus}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex gap-2">
                    <button onClick={() => onNavigate("fragmentDetail", f.id)} className="flex-1 py-2 rounded-xl bg-accent text-xs font-medium text-foreground text-center">View</button>
                    <button onClick={() => setRentModal(f.id)} className="py-2 px-3 rounded-xl bg-teal/10 text-xs font-medium text-teal flex items-center gap-1"><HomeIcon className="w-3 h-3" /> Rent</button>
                    <button onClick={() => setSellModal(f.id)} className="py-2 px-3 rounded-xl bg-primary/10 text-xs font-medium text-primary flex items-center gap-1"><Tag className="w-3 h-3" /> Sell</button>
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
            <motion.div key={doc.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{doc.name}</p>
                <p className="text-[10px] text-muted-foreground">{doc.type} · {new Date(doc.uploadDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal/10 text-teal font-medium">✓ {doc.status}</span>
                <button className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center"><Download className="w-3.5 h-3.5 text-muted-foreground" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "listed" && (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5"><HomeIcon className="w-3.5 h-3.5 text-teal" /> Listed for Rent</p>
            {listedForRent.map(l => (
              <div key={l.id} className="p-4 rounded-2xl bg-card border border-border">
                <p className="text-xs font-semibold text-foreground">{l.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-teal">{l.price}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{l.status}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Stage: {l.stage}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5"><Store className="w-3.5 h-3.5 text-primary" /> Listed for Sale</p>
            {listedForSale.map(l => (
              <div key={l.id} className="p-4 rounded-2xl bg-card border border-border">
                <p className="text-xs font-semibold text-foreground">{l.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-primary">{l.price}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal/10 text-teal font-medium">{l.status}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Stage: {l.stage}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "export" && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
            <p className="text-xs font-semibold text-foreground flex items-center gap-2"><Database className="w-4 h-4 text-primary" /> Data Management</p>
            <p className="text-[10px] text-muted-foreground">Export and backup your investment data</p>
            {["Owned Fragment Details", "Transaction History", "Rental/Sale Listings", "Power of Attorney Documents", "KYC Documents"].map(item => (
              <button key={item} onClick={() => handleExport(item)} className="w-full py-2.5 rounded-xl bg-accent text-xs font-medium text-foreground text-center hover:bg-accent/80 transition-colors">
                Export {item}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleExport("PDF")} className="flex-1 py-3 rounded-xl bg-primary/10 text-xs font-semibold text-primary flex items-center justify-center gap-1.5">
              <FileDown className="w-3.5 h-3.5" /> Export as PDF
            </button>
            <button onClick={() => handleExport("Excel")} className="flex-1 py-3 rounded-xl bg-teal/10 text-xs font-semibold text-teal flex items-center justify-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Export as Excel
            </button>
          </div>
          <p className="text-[9px] text-muted-foreground text-center">Includes: Fragment details, Ownership docs, KYC, POA</p>
        </div>
      )}

      {/* Rent Modal */}
      <AnimatePresence>
        {rentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setRentModal(null)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative bg-card rounded-2xl p-6 w-[320px] shadow-2xl border border-border max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-display font-bold text-foreground">Rent Fragment</h3>
                <button onClick={() => setRentModal(null)}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <p className="text-[10px] text-muted-foreground mb-3">Select: {userFragments.find(f => f.id === rentModal)?.propertyName}</p>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground">Monthly Rent (₹)</label>
                  <input value={rentPrice} onChange={e => setRentPrice(e.target.value)} placeholder="e.g. 15000" className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Duration</label>
                  <select value={rentDuration} onChange={e => setRentDuration(e.target.value)} className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border">
                    <option>6 months</option><option>12 months</option><option>24 months</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Terms</label>
                  <input value={rentTerms} onChange={e => setRentTerms(e.target.value)} placeholder="e.g. No pets, furnished" className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Description</label>
                  <textarea value={rentDesc} onChange={e => setRentDesc(e.target.value)} placeholder="Describe your listing..." className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary h-16 resize-none" />
                </div>
                <button onClick={handleRent} className="w-full py-3 rounded-xl gradient-gold text-white text-sm font-semibold">Submit for Review</button>
                <p className="text-[9px] text-muted-foreground text-center">One Property team will review and approve your listing</p>
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
              <p className="text-[10px] text-muted-foreground mb-3">Select: {userFragments.find(f => f.id === sellModal)?.propertyName}</p>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted-foreground">Selling Price (₹)</label>
                  <input value={sellPrice} onChange={e => setSellPrice(e.target.value)} placeholder="e.g. 500000" className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Description</label>
                  <textarea value={sellDesc} onChange={e => setSellDesc(e.target.value)} placeholder="Why are you selling..." className="w-full mt-1 bg-accent rounded-xl px-3 py-2.5 text-sm text-foreground outline-none border border-border focus:border-primary h-16 resize-none" />
                </div>
                <button onClick={handleSell} className="w-full py-3 rounded-xl gradient-gold text-white text-sm font-semibold">Submit for Review</button>
                <p className="text-[9px] text-muted-foreground text-center">One Property validates before publishing</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioHub;
