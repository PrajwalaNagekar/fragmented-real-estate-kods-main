# One Property — Product Corrections & Feature Update Plan

This plan applies targeted corrections and new features to the existing prototype. No redesign from scratch — all changes layer onto the current architecture.

---

## Color & Font Adjustments (from reference site + uploaded palette)

- Update primary gold from `hsl(43, 96%, 56%)` to `#D0A476` (warm muted gold from the uploaded palette)
- Update teal accent to match the deep teal `#1A7A7A` from the reference site
- Keep `Playfair Display` for headings (matches the reference serif style)
- Theme system simplified to **Light** (default, cream/white background) and **Dark** (deep black like reference site)
- Remove "Mid-Dark" theme, replace with clean Light + Dark toggle

---

## 1. Navigation Restructure

**Bottom tabs change from 4 to 3 main tabs:**

- **Home** (Dashboard)
- **Market** (Marketplace)
- **Portfolio** (My Fragments + Document Vault combined)

**Everything else moves under the hamburger/profile menu:**

- Secondary Market
- Help & FAQ
- Settings
- About Us
- Terms & Conditions

**Hamburger menu (three-line icon) replaces three-dot icon** on top-left.

---

## 2. Home Screen Updates

- **Notification bell icon** placed at **top-right** of the Home screen header (next to the greeting)
- Remove notifications from the More/Profile section
- **Welcome message**: "Welcome back, Rahul" instead of just "Good evening"
- **Graphs with touch interactivity**: Add `Tooltip` from Recharts to the Wealth Over Time chart so finger-dragging shows values
- **Time period filter**: Add "Today / Month / Year" toggle buttons above the wealth chart for analytics switching
- **Status bar fix**: Replace signal bars with proper signal icon + WiFi icon next to "5G"

---

## 3. Portfolio Tab (Combined Screen)

The Portfolio tab becomes a hub with sub-sections:

### My Fragments (default view)

- **Map View as default**: Show a styled map placeholder with property pins at Indian locations (Sakleshpur, Bangalore, Goa, Hampi, Coorg, Mangalore, Udupi)
- Toggle between Map View and List View
- Each fragment card shows property photo, ownership %, and a **Power of Attorney badge**: "Power of Attorney Issued - Owner Verified"
- **Rent/Sell Fragment buttons** on each fragment card (functional modal with price input and action confirmation)

### Document Vault (sub-tab within Portfolio)

- Move Document Vault from More into Portfolio as a tab
- Keep existing document list with verification badges

### Token Visibility Change

- Token ID / blockchain hash **hidden by default**
- "Show Token" button reveals the token details with a smooth expand animation
- Maintains privacy-first, secure appearance

---

## 4. Property & Fragment Data Expansion

Add diverse property types with Karnataka/South India locations:

- **Sakleshpur Coffee Estate** (Land/Estate)
- **Whitefield Tech Park, Bangalore** (Commercial)
- **Calangute Beach Villa, Goa** (Holiday Property)
- **Heritage Site View, Hampi** (Cabin/Heritage)
- **Bangalore Rural Farmhouse** (Land)
- **Coorg Hill Retreat** (Cabin/Holiday)
- **Mangalore Coastal Property** (Villa)
- **Udupi Temple Town Residence** (Apartment)

Property types now include: Villa, Apartment, Tower, Land, Estate, Cabin, Commercial, Holiday Property.

---

## 5. Profile / Hamburger Menu Overhaul

The side panel becomes a full profile hub:

### Header

- Welcome message: "Welcome, Rahul Kapoor"
- Profile avatar with edit icon
- "Premium Investor" badge

### Edit Profile Section

- Editable fields: Name, Phone, Email, Profile Photo, Profession
- Save/Cancel buttons

### Menu Items

- **Secondary Market** (moved here from bottom nav)
- **Settings** (opens structured settings page)
- **About Us** (One Property company info)
- **Terms & Conditions**
- **Help & FAQ** (moved from More tab)
- **Logout**

---

## 6. Settings Page (Enterprise-Level Structure)

A dedicated Settings screen accessed from the profile menu:

### Appearance

- Light / Dark theme toggle (replaces 3-theme system)

### Notification Preferences

- Master toggle on/off
- Category toggles: Investment Alerts, Rental Payouts, Market Updates, Security Alerts

### Security

- Change Password (form with current/new/confirm fields)
- Two-Factor Authentication toggle

### Regional Settings

- Language selector (English, Hindi, Kannada)
- Region selector (India, etc.)

### Data Management (Critical Feature)

- **Backup Fragments Data** button
- **Backup Uploaded Documents** button
- **Backup One Property Documents** button
- **Export Options**: PDF and Excel buttons
- Export includes: Fragment details, Ownership documents, KYC documents, Power of Attorney documents
- Each export triggers a toast notification confirming the action

---

## 7. Secondary Market Enhancement

Move to profile menu access. Add richer content:

- Market statistics header (total volume, active listings, avg. price change)
- Detailed listing cards with property photos, seller rating, listing duration
- Price history chart with Recharts Tooltip for touch interaction
- Market trends section with buyer/seller ratio
- Fragment condition/quality indicators

---

## 8. Splash Screen Update

- Add a **luxury real estate background video/image** — use a high-quality Unsplash image of a luxury property with a dark overlay
- Animated gradient overlay for the vibrant luxury feel
- Keep the "O" logo and shimmer animation on top

---

## 9. Graph Interactivity

All charts across the app get:

- **Recharts `Tooltip**` component so touching/hovering shows exact values
- **Active dot** indicator on line/area charts
- **Time period selector** (Today / Month / Year) on Dashboard wealth chart with different mock data per period

---

## 10. Rent/Sell Fragment Feature

Inside My Fragments detail view:

- Two action buttons: "Rent Fragment" and "Sell Fragment"
- **Rent modal**: Set monthly rent amount, minimum lease period, confirm listing
- **Sell modal**: Set asking price, choose fragments to sell, confirm listing
- Both show a confirmation toast on success

---

11. **Add a Account deletion/Exit from One Property request button at last in the profile inside more option, which will navigate to approval and sign off agreement process**

## 12. About Us & Terms Pages

### About Us

- One Property company description
- Mission statement
- Team/founding info (mock)
- Contact details

### Terms & Conditions

- Standard T&C content for a real estate tokenization platform
- Scrollable text view

---

## Technical Implementation Summary

All changes will be implemented in a single consolidated update to the existing files:  
And make all the code avaible in one single file. or a downloadable file.


| File                                                | Changes                                                                                                                                             |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.css`                                     | Update color variables for new gold (#D0A476), teal, Light/Dark themes                                                                              |
| `src/data/mockData.ts`                              | Add 8 new properties with South India locations, expanded secondary market data, time-period wealth data                                            |
| `src/pages/Index.tsx`                               | Update AppScreen types, restructure navigation to 3 tabs, add new screen routes (settings, aboutUs, terms, editProfile, notifications)              |
| `src/components/app/MobileShell.tsx`                | Change to hamburger icon, 3 bottom tabs, WiFi icon in status bar, notification bell on home                                                         |
| `src/components/app/Dashboard.tsx`                  | Add notification icon top-right, welcome message, Tooltip on charts, Today/Month/Year toggle                                                        |
| `src/components/app/BlockchainPage.tsx`             | Convert to Portfolio hub with tabs (My Fragments / Documents), hide token by default with Show Token button, POA badge, map view, Rent/Sell buttons |
| `src/components/app/FragmentDetail.tsx`             | Add POA badge, hide token by default, add Rent/Sell Fragment buttons with modals                                                                    |
| `src/components/app/SecondaryMarket.tsx`            | Enhanced with more market data, statistics, Tooltip on charts                                                                                       |
| `src/components/app/SplashScreen.tsx`               | Add luxury background image with overlay                                                                                                            |
| `src/components/app/MoreTab.tsx`                    | Remove (functionality redistributed to Profile menu and Portfolio)                                                                                  |
| `src/components/app/DocumentVault.tsx`              | Stays but accessed from Portfolio tab                                                                                                               |
| **New:** `src/components/app/SettingsPage.tsx`      | Full structured settings with Appearance, Notifications, Security, Regional, Data Management                                                        |
| **New:** `src/components/app/EditProfile.tsx`       | Profile editing form                                                                                                                                |
| **New:** `src/components/app/AboutUs.tsx`           | Company info page                                                                                                                                   |
| **New:** `src/components/app/TermsConditions.tsx`   | T&C page                                                                                                                                            |
| **New:** `src/components/app/NotificationsPage.tsx` | Notifications list page                                                                                                                             |
