# पुष्पम् (Pushpam) — Complete Build Plan

## What is Pushpam?

A mobile-first Progressive Web App (PWA) where users ask a yes/no question and receive a divine signal through a falling flower. The flower falls from a sacred image — left side means "no" (नहीं), right side means "yes" (हाँ). It digitizes a real temple practice that millions of Indians already believe in.

**Core emotion:** This is a sacred space, not an app. Every design decision, every word, every animation should feel like stepping into a quiet temple — not opening a tech product.

**Domain:** pushpam.in (or alternative if taken)

---

## Product Rules (Non-Negotiable)

1. **Never use the word "free" anywhere in the app.** No "free asks", "free tier", "free version." This is a sacred product, not a freemium app.
2. **No ads during the ritual or answer screen.** Ads appear only on the home screen, and must be tasteful.
3. **No personal information in share cards.** The share card invites others to use Pushpam — it never reveals what the user asked or what answer they received.
4. **The daily limit messaging must feel spiritual, not restrictive.** Example: "The divine has spoken today. Return tomorrow with a still mind 🙏" — never "You've used your 2 asks."
5. **The lifetime unlock must feel like an offering, not a purchase.** Example: "Seek guidance whenever your heart calls. One offering, forever." — never "Buy premium."
6. **No specific deity on the default screen.** Default aesthetic is sacred geometry / floral / diya. Deity selection is private, in settings only.
7. **No deity image appears in share cards.** Share cards use the floral/sacred aesthetic only.
8. **Respect all faiths.** The default experience should feel universally spiritual, not Hindu-specific. The Ishta Devta feature is opt-in personalization.

---

## User Flow (Step by Step)

### First Visit:
1. User opens pushpam.in on mobile browser
2. **Language selection screen** → Pick from 8 languages
3. **Brief intro** (2 screens max):
   - Screen 1: "Hold a question in your heart. The divine will answer through a sacred flower."
   - Screen 2: "The flower falls left for नहीं (no), right for हाँ (yes). Trust what you receive."
4. → Straight to home screen

### Regular Visit:
1. **Home screen** — Sacred aesthetic with diya, soft glow, question input
2. **Type question** — Label says "Hold your question in your heart"
3. **Tap "प्रार्थना करें" (Pray)** — Ritual begins
4. **Ritual sequence** (6-8 seconds total):
   - Bell rings (animation + sound if audio enabled)
   - Mantra text appears briefly (ॐ गं गणपतये नमः or equivalent)
   - Brief stillness — "The divine listens..."
   - Flower appears at top of deity/sacred image
   - Flower falls — left or right (natural, slightly swaying animation)
5. **Answer reveals** — Text appears: "हाँ — Proceed with faith" or "नहीं — Wait"
   - Sub-message appears below (spiritual, gentle)
   - Share button: "Help someone seek their answer too 🌺"
   - "Ask again" button (if asks remain today)
6. **After 2 asks in a day:**
   - Show: "The divine has spoken today. Return tomorrow with a still mind 🙏"
   - Below that: "Seek guidance whenever your heart calls. One offering, forever." → Lifetime unlock

### Lifetime User Visit:
- Same flow, no daily limit, no ads anywhere
- Small 🪷 icon or subtle indicator showing lifetime status

---

## Screens Spec

### 1. Language Selection (first visit only)
- Grid of 8 language options
- Each shown in its own script: English, हिन्दी, தமிழ், తెలుగు, ಕನ್ನಡ, मराठी, বাংলা, ગુજરાતી
- Saved to localStorage + synced to backend after login
- User can change language anytime in Settings

### 2. Home Screen
- Sacred background (dark, warm — deep maroon/saffron tones)
- Central deity area: sacred geometry / floral mandala by default, or chosen Ishta Devta
- Animated diyas on either side (subtle flame flicker)
- Light incense smoke particle effect
- Question input field (textarea, centered, elegant)
- "प्रार्थना करें" button (pray button) — saffron/gold gradient
- Small tasteful ad banner at bottom (not during ritual, not for lifetime users)
- "नहीं" label on left, "हाँ" label on right (subtle, appears during/after ritual)

### 3. Ritual Screen
- Full screen takeover (no UI elements visible)
- Bell animation (swinging bell icon)
- Mantra text fades in and out
- Stillness moment (just the deity/sacred image, breathing glow)
- Flower appears at top center of sacred image
- Flower falls with natural physics (slight sway, rotation, not perfectly straight)
- Falls clearly to left or right side
- Total duration: 6-8 seconds

### 4. Answer Screen
- Answer text in large script: "हाँ — Yes" (green tint) or "नहीं — Not now" (soft red tint)
- Sub-message below in smaller text (randomized from a pool of spiritual messages)
- Share button (styled as invitation, not "share your result")
- "Ask again" button (if asks remain)
- Subtle, reverent design — no celebration animation for yes, no sad animation for no

### 5. Daily Complete Screen
- Shows when 2 asks are used for the day
- Message: "The divine has spoken today. Return tomorrow with a still mind 🙏"
- Below: Lifetime unlock prompt with spiritual framing
- Maybe a daily shloka or blessing here (V2 feature)

### 6. Settings Screen
- **Language** — change display language
- **Ishta Devta** — choose deity for personal screen (Ganesha, Lakshmi, Shiva, Krishna, Durga, or default OM/sacred geometry)
- **Sound** — toggle audio on/off (bell, ambient)
- **Lifetime status** — if not purchased, show unlock option; if purchased, show 🪷 confirmation
- **About Pushpam** — link to About page
- **Sign out** — if signed in

### 7. About Page
- Brief explanation of what Pushpam is
- The real-world temple practice it's based on
- Intention behind the product (keep it honest and simple)
- Creator credit (decide: named or anonymous)

### 8. Sign-In Prompt (appears contextually)
- Triggered when: user hits daily limit OR taps lifetime unlock
- "Sign in to save your progress across devices"
- Google One-Tap sign-in button
- Skip option (but explain: "Without signing in, your progress may be lost if you clear browser data")

---

## Multilingual Support

### Languages (V1):

| Code | Language | Script |
|------|----------|--------|
| en | English | Latin |
| hi | Hindi | Devanagari |
| ta | Tamil | Tamil |
| te | Telugu | Telugu |
| kn | Kannada | Kannada |
| mr | Marathi | Devanagari |
| bn | Bengali | Bengali |
| gu | Gujarati | Gujarati |

### Implementation:
- Single JSON file per language in `/locales/` folder
- All UI strings referenced by key, never hardcoded
- The app has very few strings (~30-40 total), so translation is lightweight
- Answer phrases and sub-messages also need per-language pools
- RTL not needed (none of these languages are RTL)

### String Categories:
- UI labels (buttons, headers, settings)
- Ritual messages (mantra, "the divine listens", etc.)
- Answer phrases (yes variants, no variants)
- Sub-messages (spiritual messages below answers)
- Daily complete message
- Lifetime unlock messaging
- Onboarding text
- Share card text

---

## Deity / Sacred Image System

### Default:
- Sacred geometry pattern / floral mandala / OM symbol
- Warm gold on dark background
- Animated subtle glow/breathing effect
- Universal — not tied to any specific religion

### Ishta Devta Options (selected in Settings):
1. **OM (ॐ)** — default
2. **Ganesha** — obstacle remover, most universally accepted
3. **Lakshmi** — prosperity, wealth questions
4. **Shiva** — transformation, difficult questions
5. **Krishna** — guidance, relationship questions
6. **Durga** — strength, courage questions

### Implementation Notes:
- Each deity needs a tasteful illustration or symbol (not a photo — illustrations are safer legally and aesthetically)
- SVG illustrations preferred (scalable, small file size, can be animated)
- Deity selection stored in user profile (backend) and localStorage (offline)
- The mantra text during ritual can change based on deity selection
- Share cards NEVER show the deity — always use the default sacred aesthetic

---

## Share System

### Share Card Content:
```
🌺 पुष्पम् — Ask the Divine
"Seek your answer from the divine. One question. One flower. One truth."
pushpam.in
```

### Rules:
- NO information about what the user asked
- NO information about the answer received
- NO deity image
- The share positions it as GIVING a gift to someone, not showing off
- Share via: WhatsApp (primary), copy link, native share sheet

### Implementation:
- Web Share API for native share sheet
- WhatsApp deep link as primary: `https://wa.me/?text=...`
- Generate a simple OG image for link previews (static, sacred aesthetic with 🌺 and app name)

---

## Backend Architecture

### Auth:
- **Google Sign-In** (One-Tap on Android)
- Sign-in is NOT required upfront
- Triggered only when:
  - User hits daily limit (prompt to save progress)
  - User wants to purchase lifetime
- First 2 asks work without sign-in (stored in localStorage)
- After sign-in, localStorage data migrates to backend

### Database (Firebase Firestore or Supabase):

**Table: users**
| Field | Type | Description |
|-------|------|-------------|
| user_id | string | Google auth UID |
| email | string | Google email |
| is_lifetime | boolean | Has purchased lifetime access |
| payment_id | string | Razorpay payment ID (if paid) |
| language | string | Preferred language code |
| deity | string | Selected Ishta Devta |
| sound_enabled | boolean | Audio preference |
| created_at | timestamp | Account creation |

**Table: daily_asks**
| Field | Type | Description |
|-------|------|-------------|
| user_id | string | Google auth UID |
| date | string | YYYY-MM-DD (IST) |
| ask_count | integer | Number of asks today (max 2 for non-lifetime) |

**Table: payments**
| Field | Type | Description |
|-------|------|-------------|
| payment_id | string | Razorpay payment ID |
| user_id | string | Google auth UID |
| amount | number | Amount paid |
| status | string | success / failed / refunded |
| created_at | timestamp | Payment timestamp |

### API Endpoints (minimal):

1. `POST /api/ask` — Check if user can ask (returns allowed: true/false + remaining count)
2. `POST /api/ask/record` — Record that user made an ask
3. `POST /api/payment/verify` — Razorpay webhook to verify payment and update user
4. `GET /api/user/status` — Get user's lifetime status, language, deity preference
5. `PUT /api/user/settings` — Update language, deity, sound preference

### Offline Behavior:
- If offline, use localStorage for everything
- Sync to backend when connection restores
- Lifetime status cached locally after first verification

---

## Payment Integration (Razorpay)

### Flow:
1. User taps lifetime unlock
2. If not signed in → prompt Google sign-in first
3. Open Razorpay checkout (₹XX — price TBD)
4. Payment options: UPI, cards, net banking, wallets
5. On success → Razorpay webhook hits `/api/payment/verify`
6. Backend updates `is_lifetime = true` for user
7. Frontend refreshes status → ads disappear, daily limit removed
8. Confirmation screen: "Your offering has been received 🪷 Seek guidance anytime."

### Important:
- Razorpay test mode for development
- Switch to live mode only before launch
- Store payment_id for refund handling if ever needed
- No subscription — one-time payment only

---

## Ads Integration

### Rules:
- Ads appear ONLY on the home screen (bottom banner)
- NEVER during ritual, answer, or daily complete screens
- NEVER for lifetime users
- Google AdSense for web / AdMob for PWA
- Keep ad size small and non-intrusive
- If ad fails to load, show nothing (don't break the experience)

---

## PWA Configuration

### manifest.json:
```json
{
  "name": "पुष्पम् — Ask the Divine",
  "short_name": "Pushpam",
  "description": "Seek your answer from the divine",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#3D0F18",
  "theme_color": "#3D0F18",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Service Worker:
- Cache static assets (HTML, CSS, JS, images, sounds)
- App works offline after first visit
- Cache-first strategy for assets, network-first for API calls

### Install Prompt:
- Show custom "Add to Home Screen" banner after first completed ritual
- Timing matters: let them FEEL the product before asking to install

---

## Tech Stack (Final)

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React + Vite | Fast build, PWA plugin available, component-based |
| Styling | Tailwind CSS + custom CSS for animations | Utility classes + sacred aesthetic needs custom work |
| PWA | vite-plugin-pwa | Easy service worker + manifest generation |
| Auth | Firebase Auth (Google provider) | Free tier, one-tap sign-in, handles everything |
| Database | Firebase Firestore | Free tier (50K reads/day, 20K writes/day), NoSQL fits this data |
| Hosting | Firebase Hosting or Vercel | Free tier, global CDN, HTTPS |
| Payments | Razorpay | Indian-first, UPI support, simple integration |
| Ads | Google AdSense | Standard, works with PWA |
| Analytics | Firebase Analytics or Plausible | Lightweight, privacy-respecting |
| Animations | Framer Motion | Smooth flower fall, ritual transitions |
| i18n | react-i18next | Industry standard, JSON-based, simple |
| Audio | Howler.js or Web Audio API | Bell sounds, ambient audio |

---

## Design Tokens

### Colors:
```css
--saffron: #E8801A;
--deep-saffron: #C4600C;
--gold: #D4A843;
--gold-light: #F0D68A;
--maroon: #6B1D2A;
--deep-maroon: #3D0F18;
--cream: #FFF8ED;
--warm-white: #FFFDF7;
--temple-brown: #4A2C1A;
--diya-glow: #FFB347;
--answer-yes: #7ECA9C;
--answer-no: #E88D8D;
```

### Typography:
- **Devanagari / Hindi:** Tiro Devanagari Hindi (Google Fonts)
- **English / Latin:** Cormorant Garamond (Google Fonts) — elegant, serif, temple-appropriate
- **Regional scripts:** Noto Sans [Script] family (Google Fonts) — covers Tamil, Telugu, Kannada, Bengali, Gujarati

### Animation Principles:
- Everything moves slowly and gently — no snappy UI animations
- Flame flicker: subtle, continuous, never stops
- Flower fall: 2.5-3 seconds, natural physics with slight sway and rotation
- Text reveals: fade in with slight upward drift, 0.5-1s duration
- Screen transitions: cross-fade, 0.4s, ease-in-out
- No bounce effects, no elastic easing — this is a temple, not an app

---

## Build Phases

### Phase 1: Core Experience (Build First)
- [ ] Project setup (React + Vite + Tailwind)
- [ ] PWA configuration (manifest, service worker)
- [ ] Home screen with sacred aesthetic (default OM/geometry)
- [ ] Question input
- [ ] Ritual animation sequence (bell, mantra, stillness, flower fall)
- [ ] Answer reveal screen
- [ ] Randomized answer phrases and sub-messages (English + Hindi)
- [ ] Basic flower fall physics (left/right, natural sway)
- [ ] Daily limit logic (localStorage, 2/day, midnight IST reset)
- [ ] Daily complete screen with spiritual messaging
- [ ] Mobile-responsive (portrait-only, max-width 480px)

### Phase 2: Multilingual + Settings
- [ ] i18n setup with react-i18next
- [ ] All 8 language JSON files with translated strings
- [ ] Language selection screen (first visit)
- [ ] Settings screen (language, sound toggle)
- [ ] Language switcher persisted in localStorage

### Phase 3: Deity System
- [ ] SVG illustrations or symbols for each deity option
- [ ] Ishta Devta selector in Settings
- [ ] Deity-specific mantra during ritual
- [ ] Deity preference persisted in localStorage
- [ ] Default sacred geometry for unset preference

### Phase 4: Audio
- [ ] Bell sound effect (short, temple bell)
- [ ] Optional ambient track (soft, looping temple atmosphere)
- [ ] Sound toggle in settings
- [ ] Audio loads on first interaction (browser autoplay policy)
- [ ] Graceful fallback if audio fails

### Phase 5: Backend + Auth
- [ ] Firebase project setup
- [ ] Google Sign-In integration (one-tap)
- [ ] Firestore database (users, daily_asks, payments tables)
- [ ] API logic: check ask limit, record ask, get user status
- [ ] Migrate localStorage data to backend on first sign-in
- [ ] Sign-in prompt at daily limit and lifetime unlock points
- [ ] Offline fallback to localStorage when no connection

### Phase 6: Payments
- [ ] Razorpay integration (test mode)
- [ ] Lifetime unlock flow (sign in → pay → verify → activate)
- [ ] Razorpay webhook for payment verification
- [ ] Lifetime status reflected in UI (no ads, no limit, 🪷 indicator)
- [ ] Payment confirmation screen with spiritual messaging
- [ ] Switch to Razorpay live mode before launch

### Phase 7: Ads
- [ ] Google AdSense setup
- [ ] Ad placement on home screen only (bottom banner)
- [ ] Ad hidden during ritual, answer, daily complete screens
- [ ] Ad hidden for lifetime users
- [ ] Fallback: show nothing if ad fails to load

### Phase 8: Share System
- [ ] Share card design (static OG image for link previews)
- [ ] WhatsApp share deep link
- [ ] Web Share API for native share sheet
- [ ] Share button on answer screen
- [ ] Share text in user's selected language

### Phase 9: Polish + Launch Prep
- [ ] Onboarding flow (2 screens, first visit only)
- [ ] Custom "Add to Home Screen" prompt (after first ritual)
- [ ] About page
- [ ] OG meta tags for social sharing preview
- [ ] Performance optimization (Lighthouse audit, target 90+)
- [ ] Cross-browser testing (Chrome Android, Safari iOS, Samsung Internet)
- [ ] Domain setup + SSL
- [ ] Final review of all spiritual messaging in all 8 languages
- [ ] Launch

### Phase 10: Post-Launch (V2 Ideas)
- [ ] Daily shloka/blessing on home screen
- [ ] Streak counter ("30 days of seeking guidance 🪷")
- [ ] Festival-themed visuals (Diwali, Navratri, Pongal)
- [ ] Android home screen widget
- [ ] Play Store listing via TWA wrapper
- [ ] User feedback mechanism

---

## Answer Phrase Pools (English — translate for other languages)

### Yes Answers:
- "हाँ — Yes"
- "हाँ — The path is open"
- "हाँ — Proceed with faith"
- "हाँ — Trust this feeling"
- "हाँ — The time is right"
- "हाँ — Move forward"

### No Answers:
- "नहीं — Not now"
- "नहीं — Wait"
- "नहीं — Let this pass"
- "नहीं — Be still"
- "नहीं — The time will come"
- "नहीं — Trust the delay"

### Sub-messages (Yes):
- "The flower blesses your right side"
- "Trust what you feel"
- "The signal is clear"
- "Walk this path with confidence"
- "What is meant for you will not pass you"

### Sub-messages (No):
- "Patience reveals the way"
- "Stillness is also an answer"
- "Not every closed door is denial"
- "What waits for you is worth the wait"
- "The divine protects through delay"

---

## File Structure (Expected)

```
pushpam/
├── public/
│   ├── icons/           # PWA icons (192, 512)
│   ├── sounds/          # bell.mp3, ambient.mp3
│   ├── og-image.png     # Social share preview image
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── HomeScreen.jsx
│   │   ├── RitualScreen.jsx
│   │   ├── AnswerScreen.jsx
│   │   ├── DailyComplete.jsx
│   │   ├── Settings.jsx
│   │   ├── LanguageSelect.jsx
│   │   ├── DeitySelector.jsx
│   │   ├── OnboardingFlow.jsx
│   │   ├── ShareCard.jsx
│   │   ├── SignInPrompt.jsx
│   │   ├── LifetimeUnlock.jsx
│   │   ├── Diya.jsx
│   │   ├── FlowerDrop.jsx
│   │   └── AdBanner.jsx
│   ├── locales/
│   │   ├── en.json
│   │   ├── hi.json
│   │   ├── ta.json
│   │   ├── te.json
│   │   ├── kn.json
│   │   ├── mr.json
│   │   ├── bn.json
│   │   └── gu.json
│   ├── assets/
│   │   ├── deities/     # SVG deity illustrations
│   │   └── patterns/    # Sacred geometry SVGs
│   ├── hooks/
│   │   ├── useAskLimit.js
│   │   ├── useAuth.js
│   │   └── useAudio.js
│   ├── services/
│   │   ├── firebase.js
│   │   ├── razorpay.js
│   │   └── analytics.js
│   ├── utils/
│   │   ├── answerPhrases.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── api/                  # Backend API (if using Vercel serverless)
│   ├── ask.js
│   ├── payment-verify.js
│   └── user-status.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Notes for Claude Code

- Build phase by phase. Do not jump ahead.
- After each phase, test thoroughly on mobile (Chrome DevTools mobile emulator at minimum).
- The flower fall animation is the HEART of the product. Spend extra time making it feel natural — slight random variation in trajectory each time, gentle rotation, not mechanical.
- All text must come from locale files, never hardcoded strings.
- Design mobile-first, portrait-only. Max-width 480px, centered on desktop.
- Keep the aesthetic SACRED. No bright colors, no playful UI patterns. Think: quiet temple at 5 AM, oil lamps lit, incense rising.
- When in doubt about any UX copy, err on the side of spiritual simplicity over clever marketing language.
