import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/app/SplashScreen";
import OnboardingFlow from "@/components/app/OnboardingFlow";
import MobileShell from "@/components/app/MobileShell";
import Dashboard from "@/components/app/Dashboard";
import Marketplace from "@/components/app/Marketplace";
import PropertyDetail from "@/components/app/PropertyDetail";
import FragmentDetail from "@/components/app/FragmentDetail";
import PortfolioHub from "@/components/app/PortfolioHub";
import SecondaryMarket from "@/components/app/SecondaryMarket";
import SettingsPage from "@/components/app/SettingsPage";
import EditProfile from "@/components/app/EditProfile";
import AboutUs from "@/components/app/AboutUs";
import TermsConditions from "@/components/app/TermsConditions";
import HelpFaq from "@/components/app/HelpFaq";
import NotificationsPage from "@/components/app/NotificationsPage";
import AccountDeletion from "@/components/app/AccountDeletion";
import ProfileScreen from "@/components/app/ProfileScreen";
import BlockchainEducation from "@/components/app/BlockchainEducation";
import KYCFlow from "@/components/app/KYCFlow";
import PurchaseTracker from "@/components/app/PurchaseTracker";

export type AppScreen =
  | "splash"
  | "onboarding"
  | "dashboard"
  | "marketplace"
  | "portfolio"
  | "propertyDetail"
  | "fragmentDetail"
  | "secondaryMarket"
  | "settings"
  | "editProfile"
  | "aboutUs"
  | "terms"
  | "helpFaq"
  | "notifications"
  | "accountDeletion"
  | "profile"
  | "blockchainEducation"
  | "kyc"
  | "purchaseTracker";

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");
  const [selectedFragmentId, setSelectedFragmentId] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("onboarding"), 2800);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  useEffect(() => {
    document.documentElement.className = "";
    if (theme === "dark") document.documentElement.classList.add("theme-dark");
  }, [theme]);

  const navigate = (s: AppScreen, id?: string) => {
    if (id && s === "propertyDetail") setSelectedPropertyId(id);
    if (id && s === "fragmentDetail") setSelectedFragmentId(id);
    setScreen(s);
  };

  if (screen === "splash") return <MobileShell hideChrome><SplashScreen /></MobileShell>;
  if (screen === "onboarding") return <MobileShell hideChrome><OnboardingFlow onComplete={() => setScreen("dashboard")} /></MobileShell>;

  const renderScreen = () => {
    switch (screen) {
      case "dashboard":
        return <Dashboard onNavigate={navigate} />;
      case "marketplace":
        return <Marketplace onNavigate={navigate} />;
      case "portfolio":
        return <PortfolioHub onNavigate={navigate} />;
      case "propertyDetail":
        return <PropertyDetail propertyId={selectedPropertyId} onNavigate={navigate} />;
      case "fragmentDetail":
        return <FragmentDetail fragmentId={selectedFragmentId} onNavigate={navigate} />;
      case "secondaryMarket":
        return <SecondaryMarket onNavigate={navigate} />;
      case "settings":
        return <SettingsPage onNavigate={navigate} theme={theme} onThemeChange={setTheme} />;
      case "editProfile":
        return <EditProfile onNavigate={navigate} />;
      case "aboutUs":
        return <AboutUs onNavigate={navigate} />;
      case "terms":
        return <TermsConditions onNavigate={navigate} />;
      case "helpFaq":
        return <HelpFaq onNavigate={navigate} />;
      case "notifications":
        return <NotificationsPage onNavigate={navigate} />;
      case "accountDeletion":
        return <AccountDeletion onNavigate={navigate} />;
      case "profile":
        return <ProfileScreen onNavigate={navigate} />;
      case "blockchainEducation":
        return <BlockchainEducation onNavigate={navigate} />;
      case "kyc":
        return <KYCFlow onNavigate={navigate} />;
      case "purchaseTracker":
        return <PurchaseTracker onNavigate={navigate} />;
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  type Tab = "home" | "marketplace" | "portfolio" | "profile";

  const getActiveTab = (): Tab => {
    if (screen === "dashboard" || screen === "notifications") return "home";
    if (screen === "marketplace" || screen === "propertyDetail" || screen === "secondaryMarket" || screen === "purchaseTracker") return "marketplace";
    if (screen === "portfolio" || screen === "fragmentDetail") return "portfolio";
    if (screen === "profile" || screen === "editProfile" || screen === "settings" || screen === "aboutUs" || screen === "terms" || screen === "helpFaq" || screen === "accountDeletion" || screen === "blockchainEducation" || screen === "kyc") return "profile";
    return "home";
  };

  return (
    <MobileShell
      activeTab={getActiveTab()}
      onTabChange={(tab) => {
        if (tab === "home") navigate("dashboard");
        else if (tab === "marketplace") navigate("marketplace");
        else if (tab === "portfolio") navigate("portfolio");
        else if (tab === "profile") navigate("profile");
      }}
      theme={theme}
      onThemeChange={setTheme}
      onNavigate={navigate}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={screen + selectedPropertyId + selectedFragmentId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </MobileShell>
  );
};

export default Index;
