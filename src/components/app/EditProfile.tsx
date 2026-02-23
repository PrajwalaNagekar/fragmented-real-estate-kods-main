import { useState } from "react";
import { ArrowLeft, Camera, User, Phone, Mail, Briefcase } from "lucide-react";
import type { AppScreen } from "@/pages/Index";
import { toast } from "@/hooks/use-toast";

const EditProfile = ({ onNavigate }: { onNavigate: (s: AppScreen) => void }) => {
  const [name, setName] = useState("Rahul Kapoor");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("rahul@example.com");
  const [profession, setProfession] = useState("Software Engineer");

  return (
    <div className="px-4 pb-6 space-y-5">
      <div className="flex items-center gap-3 pt-2">
        <button onClick={() => onNavigate("dashboard")} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-base font-display font-bold text-foreground">Edit Profile</h1>
      </div>

      {/* Avatar */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center">
            <span className="text-2xl font-bold text-white">RK</span>
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Camera className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { icon: User, label: "Full Name", value: name, onChange: setName },
          { icon: Phone, label: "Phone Number", value: phone, onChange: setPhone },
          { icon: Mail, label: "Email", value: email, onChange: setEmail },
          { icon: Briefcase, label: "Profession", value: profession, onChange: setProfession },
        ].map(field => (
          <div key={field.label}>
            <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
            <div className="relative">
              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={field.value} onChange={e => field.onChange(e.target.value)}
                className="w-full bg-accent rounded-xl pl-10 pr-4 py-3 text-sm text-foreground outline-none border border-border focus:border-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onNavigate("dashboard")} className="flex-1 py-3 rounded-xl bg-accent text-sm font-medium text-foreground text-center">
          Cancel
        </button>
        <button onClick={() => { toast({ title: "Profile Updated" }); onNavigate("dashboard"); }}
          className="flex-1 py-3 rounded-xl gradient-gold text-white text-sm font-semibold">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
