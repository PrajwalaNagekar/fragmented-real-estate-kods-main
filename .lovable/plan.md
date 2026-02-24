# One Property — Phase 3: Major Feature & Design Update

This plan applies structured feature additions, flow improvements, and a complete color palette overhaul to the existing prototype. No redesign from scratch.

---

## Color Palette Overhaul (Blue Theme)  
[https://media-fast.be/](https://media-fast.be/)   
and  
 [https://www.gulftainer.com/](https://www.gulftainer.com/)  
Also use this web link colors to make it look premium

Replace the current gold/teal palette with the uploaded blue gradient palette:


| Token                  | Old Value          | New Value                              |
| ---------------------- | ------------------ | -------------------------------------- |
| `--primary`            | `#D0A476` (gold)   | `#5555ED` (mid blue)                   |
| `--primary-foreground` | white              | white                                  |
| `--teal` (accent)      | `#1A7A7A`          | `#2323D8` (deep blue)                  |
| `--rose` (highlight)   | pink               | `#8282F3` (light blue)                 |
| Light background       | cream `30 20% 96%` | clean white `240 10% 97%`              |
| Dark background        | `0 0% 5%`          | `240 30% 4%` (`#050544` based)         |
| Accent surfaces        | warm beige         | `#DADAFB` / `#AEAEF8` tints            |
| gradient-gold class    | gold gradient      | blue gradient (`#5555ED` to `#2323D8`) |
| glow-gold class        | gold glow          | blue glow                              |


**Files:** `src/index.css`, `tailwind.config.ts`

---

## iPhone 16 Design Update (MobileShell.tsx)

- Change the **notch** to a **Dynamic Island** pill shape (wider, shorter, pill-shaped cutout matching iPhone 16)
- Adjust border radius and frame dimensions to match iPhone 16 proportions
- Keep status bar with time, signal, WiFi, battery visible at all times (including splash)
- show front camera

---

## Navigation Restructure

Current: Home | Market | Portfolio (3 tabs) + Hamburger menu

New: Home | Market | Portfolio | Profile (4 bottom tabs)

- **Remove hamburger menu entirely** (three-line icon removed)
- **Add "Profile" tab** with User icon as the 4th bottom tab
- Profile tab opens the profile/account screen directly (not a side panel)

**Profile screen contains:**

- User info header (Welcome, Rahul Kapoor)
- Edit Profile
- KYC Section (new)
- Blockchain Education (new)
- Settings
- Help & FAQ
- About Us
- Terms & Conditions
- Account Deletion / Exit
- Logout
- Remove Secondary Market from profile and keep it in Market section.

**Files:** `MobileShell.tsx`, `Index.tsx` (new screen type "profile"), new `ProfileScreen.tsx`

---

## New Features & Screens

### 1. Blockchain Education Page (new: `BlockchainEducation.tsx`)

Accessed from Profile. Premium educational content:

- "How Blockchain Protects Your Property" header
- Visual 5-step process with icons and animations:
  1. Property Tokenized
  2. Ownership Recorded
  3. Token Issued
  4. Power of Attorney Generated
  5. Blockchain Validation
- Simple explanations of tokenization, dynamic token verification, and ledger anchoring
- Premium card-based layout matching existing design language

### 2. KYC Section (new: `KYCFlow.tsx`)

Accessed from Profile. Full 4-step KYC flow:

- **Banner**: "KYC Pending - Complete Now" (if incomplete) with option to skip
- **Step 1 - Personal Details**: Full Name, Email, Primary Phone, Additional Phones, Occupation, Address, Place of Birth, Family Member Details
- **Step 2 - Document Upload**: Aadhaar/PAN, Address Proof, Photo Upload with checklist and upload status
- **Step 3 - Video KYC**: Instructions screen, start verification button, simulated video flow
- **Step 4 - Verification Status**: "Verification in progress" message, "Approval within 24 hours", after approval shows KYC Verified badge
- Progress bar across top showing completion percentage

### 3. Login/Signup System Update (`OnboardingFlow.tsx`)

Replace current single-flow onboarding with two entry paths:

- **Entry screen**: Two buttons - "Sign In" and "Sign Up"
- **Sign In**: Phone+OTP, Email+OTP, or Password login -> Dashboard directly
- **Sign Up**: Full onboarding (Name, Phone, Email -> OTP -> Document upload -> Profile creation)
- KYC can be completed later from Account -> KYC section
- "Complete Later" option during onboarding KYC step

### 4. Buy Fragment Flow Update (`PropertyDetail.tsx`)

Replace simple "Buy Fragment" button with structured multi-step flow:

- Step 1: Select fragment on blueprint
- Step 2: Price breakdown display (fragment price, platform fee, GST, total)
- Step 3: Two CTAs - "Create Request" and "Submit Enquiry"
- Step 4: Confirmation - "One Property team will contact you within 24 hours"
- Show next steps: Site Visit, Agreement Signing, POA Transfer, Final Documentation

### 5. Purchase Journey Tracker (new: `PurchaseTracker.tsx`)

After request creation, show visual tracker:

- Six steps with check/pending icons:
  1. Request Created (completed)
  2. Verification in Progress (pending)
  3. Site Visit Scheduling (pending)
  4. Documentation Preparation (pending)
  5. Power of Attorney Issuance (pending)
  6. Final Payment & Registration (pending)
- Progress bar visualization
- After completion: "All documents have been emailed to you"

### 6. Portfolio Updates (`PortfolioHub.tsx`)

Add new sub-sections:

**Data Management tab** (moved from Settings):

- Export owned fragment details
- Export transaction history
- Export rental/sale listings
- Export POA documents
- Export KYC documents
- PDF and Excel export buttons

**My Listed Properties tab**:

- Two sections: "Listed for Rent" and "Listed for Sale"
- Each shows: map preview, status, price, verification stage
- Mock data for listed properties

**Rent & Sell bar/section**:

- Prominent "Rent & Sell" section in Portfolio
- **Rent Flow**: Select owned property -> Enter rental price, duration, terms, description -> Submit -> "Verification Pending" status
- **Sell Flow**: Select owned property -> Show map location -> Set selling price, description -> Submit -> "Verification Pending" status

Portfolio sub-tabs become: My Fragments | Documents | Listed | Data Export

### 7. Splash Screen Fix (`SplashScreen.tsx`)

- Make background image cover entire screen edge-to-edge (remove any padding/margins)
- Image extends behind status bar area
- Status bar icons remain visible on top of the image
- Smooth transition to login screen

### 8. Settings Update (`SettingsPage.tsx`)

- **Remove** Data Management section (moved to Portfolio)
- Keep: Appearance (Light/Dark), Notifications, Security, Regional Settings

### 9. Help & FAQ Update (`HelpFaq.tsx`)

Add contact information section:

- Support Email: [support@oneproperty.in](mailto:support@oneproperty.in)
- Customer Support: +91 80 1234 5678
- Investment Support: +91 80 9876 5432
- Emergency Assistance: +91 80 5555 1234

### 10. Secondary Market Enhancement (`SecondaryMarket.tsx`)

Add more comprehensive data:

- Market depth indicators
- Recent trades feed
- Fragment quality scores
- Seller verification badges
- More detailed listing cards with verification stage

---

---

## Files Changed Summary


| File                                                  | Action | Description                                                     |
| ----------------------------------------------------- | ------ | --------------------------------------------------------------- |
| `src/index.css`                                       | Edit   | Blue palette, updated CSS variables                             |
| `tailwind.config.ts`                                  | Edit   | Update color tokens                                             |
| `src/pages/Index.tsx`                                 | Edit   | Add new screen types, 4-tab nav, new routes                     |
| `src/components/app/MobileShell.tsx`                  | Edit   | iPhone 16 Dynamic Island, 4 tabs with Profile, remove hamburger |
| `src/components/app/SplashScreen.tsx`                 | Edit   | Full-bleed background                                           |
| `src/components/app/OnboardingFlow.tsx`               | Edit   | Sign In / Sign Up split, skip KYC option                        |
| `src/components/app/Dashboard.tsx`                    | Edit   | Blue color references                                           |
| `src/components/app/PortfolioHub.tsx`                 | Edit   | Add Listed Properties, Data Management, Rent/Sell flows         |
| `src/components/app/PropertyDetail.tsx`               | Edit   | Buy fragment multi-step flow                                    |
| `src/components/app/FragmentDetail.tsx`               | Edit   | Color updates                                                   |
| `src/components/app/SecondaryMarket.tsx`              | Edit   | Enhanced market data                                            |
| `src/components/app/SettingsPage.tsx`                 | Edit   | Remove Data Management                                          |
| `src/components/app/HelpFaq.tsx`                      | Edit   | Add contact numbers                                             |
| `src/data/mockData.ts`                                | Edit   | Add listed properties data, purchase tracker data               |
| **New:** `src/components/app/ProfileScreen.tsx`       | Create | Profile/Account hub screen                                      |
| **New:** `src/components/app/BlockchainEducation.tsx` | Create | Blockchain education page                                       |
| **New:** `src/components/app/KYCFlow.tsx`             | Create | Full KYC step flow                                              |
| **New:** `src/components/app/PurchaseTracker.tsx`     | Create | Purchase journey tracker                                        |
| **New:** `src/pages/Admin.tsx`                        | Create | Admin panel page                                                |
| `src/App.tsx`                                         | Edit   | Add /admin route                                                |


---

## Implementation Order

1. Color palette and theme (CSS + Tailwind config)
2. MobileShell (iPhone 16 + 4-tab nav + remove hamburger)
3. ProfileScreen (new hub for all account features)
4. Index.tsx routing updates
5. Splash screen + Login system
6. KYC Flow
7. Blockchain Education
8. Portfolio updates (Data Management, Listed Properties, Rent/Sell)
9. Buy Fragment flow + Purchase Tracker
10. Settings, Help/FAQ, Secondary Market updates
11. All component color updates
12. Admin panel