# GigShield ⚡
### AI-Powered Parametric Income Insurance for Quick Commerce Delivery Partners

> **Guidewire DEVTrails 2026** | Team GigShield | Phase 1 Submission

---

## The Problem

India's quick commerce delivery partners (Zepto, Blinkit) are the invisible backbone of the 10-minute delivery promise. When a cyclone hits Mumbai, a GRAP IV alert locks down Delhi, or a dark store shuts down mid-shift — these riders don't just lose an hour. They lose a meaningful portion of their day's income, their weekly streak bonus (often ₹1,000+), and sometimes their account standing.

**No platform protects them. No insurer has built for them. GigShield does.**

> **Core Principle:** GigShield provides a partial income buffer — not a full replacement. Payouts are intentionally capped at 25–30% of estimated daily loss. We are a safety net, not a salary substitute. This keeps premiums affordable, loss ratios sustainable, and the product viable at scale.

---

## Who We're Building For

**Persona:** Quick Commerce Delivery Partners on Zepto and Blinkit  
**Location:** Tier-1 cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai) and Tier-2 cities (Jaipur, Lucknow, Coimbatore, Indore, Bhubaneswar)  
**Earnings profile:** ₹500–₹900/day | Weekly bonus: ₹800–₹1,500 | At-risk income per disruption event: ₹300–₹2,500  
**Eligibility:** Minimum 35 active hours/week OR 120 hours/month to qualify for coverage  

---

## What We're Solving

We cover **5 specific, verifiable income loss events** — nothing more, nothing less. In every case, GigShield pays a **partial buffer (25–30% of daily income)**, not full compensation.

### Income Definition
**Daily income baseline** = average earnings across the rider's last 14 active working days. This is the reference figure for all payout calculations.

---

### 1. City-Level Disruption (GRAP / Extreme Weather / Sec 144)

**Smart Trigger System**
- Rainfall exceeding threshold (mm) as reported by IMD API
- Wind speed exceeding safe operating threshold
- Active GRAP IV alert from CPCB
- Government-issued Sec 144 curfew in rider's operational zone
- Platform order drop exceeding 40% in the rider's pin code

**Impact:** Rider cannot work. Orders are halted or severely reduced.
**Payout:** 30% of daily income baseline per affected day
**Cap:** Maximum 3 days per event
**Data source:** CPCB API, IMD API, government gazette alerts, platform order volume (simulated)

---

### 2. Incentive Chain-Break Protection

**Trigger:** A verified disruption event (above) caused the rider to miss a day, breaking their weekly delivery streak  
**Impact:** Rider loses entire weekly platform bonus despite working every other day  
**Payout:** 30% of daily income baseline for the missed day  
**Logic:** Trigger data is shared with city-level disruption — zero additional verification needed  

---

### 3. Dark Store Downtime

**Trigger:** Rider's assigned dark store goes offline on the platform for 2+ continuous hours during active hours (8am–11pm)  
**Impact:** Rider is assigned to a non-functional store and cannot receive orders  
**Payout:** 25% of daily income baseline, prorated by downtime hours  
**Data source:** Platform store availability monitoring via UptimeRobot / StatusPage  

---

### 4. App / UPI Infrastructure Crash

**Trigger:** Blinkit/Zepto app downtime confirmed by 3 independent uptime monitors for 45+ minutes during peak hours, OR NPCI-confirmed UPI outage  
**Impact:** Rider is online and available but cannot receive or complete orders  
**Payout:** 25% of daily income baseline, prorated by confirmed downtime (capped at 4hrs/event)  
**Data source:** UptimeRobot API, NPCI status page  

---

### 5. Account Freeze Support (Incorrectly Reported)

**Eligibility conditions (both must be met):**
- Rider's platform rating ≥ 4.0
- Freeze reason is non-fraud and non-policy-violation

**Trigger:** Account frozen due to a disputed customer report, confirmed via platform freeze notification screenshot with timestamp

**Payout tiers:**
- Rating 4.5 and above → 30% of daily income baseline per day
- Rating 4.0–4.49 → 20% of daily income baseline per day

**Cap:** Maximum 5 days/month
**Fraud wall:** Screenshot + timestamp verification. Phase 2 target: direct platform API integration for automated freeze detection.

---

## Claim Limits

| Period | Limit |
|--------|-------|
| Weekly | 2 claims |
| Monthly | 5 claims |
| Major disaster override | Event-based — reviewed and unlocked by admin |

---

## The "Earnings Fingerprint" — Personalized Payouts

Every rider earns differently. Rider A earns ₹220/hr on Friday evenings. Rider B earns ₹90/hr on Tuesday mornings. A flat payout is unfair to both.

GigShield's AI builds an **Earnings Fingerprint** for each rider:
- 90-day historical earning pattern by day, time slot, and zone
- Baseline hourly rate by shift type (peak / off-peak / weekend)
- Zone-adjusted earning potential

When a disruption hits, the partial payout is calculated against **their personal loss profile** — not a generic platform average. Payouts remain capped at 25–30% of estimated loss, keeping the model sustainable.

---

## Weekly Premium Model

Premiums are structured weekly to match the gig economy's earning cycle and deducted automatically from platform earnings — invisible to the rider, like a PF contribution.

### Region-Based Risk Tiers

| Risk Tier   | Example Cities                                      | Weekly Premium |
|------------|------------------------------------------------------|----------------|
| Low Risk    | Rajasthan (Jaipur, Jodhpur), MP                     | ₹29–₹39/week   |
| Medium Risk | Chennai, Bengaluru, Hyderabad, Pune                 | ₹45–₹65/week   |
| High Risk   | Kerala, North-East India, Mumbai, Delhi NCR         | ₹75–₹99/week   |

**Zone classification:** Based on IMD historical flood/rainfall data, CPCB pollution records, NDMA disaster risk indices, and seasonal risk forecasts per pin code.

**Seasonal adjustment:** Premiums shift dynamically — e.g., a Medium Risk city moves to High Risk pricing during peak monsoon (June–September).

---

## Gamification — Activity-Based Coverage Tiers

Coverage depth is unlocked through rider activity, not profit. The more consistently a rider works, the stronger their protection.

| Tier | Activity Threshold | Benefits |
|------|--------------------|----------|
| 🥉 Tier 1 | 50 hrs/month | Basic coverage across all 5 events |
| 🥈 Tier 2 | 100 hrs/month | +10% higher partial payouts |
| 🥇 Tier 3 | 160 hrs/month | Extra claim/month + faster payout processing (within 1hr) |
| 💎 Tier 4 | Sustained Tier 3 for 3 months | Account freeze protection unlocked + priority support |

---

## AI / ML Integration

### 1. Earnings Fingerprint Model
- **Input:** Rider's historical order data (simulated), time of day, day of week, zone, weather conditions
- **Model:** Time-series regression (Facebook Prophet or LSTM)
- **Output:** Personalized daily income baseline and partial payout amount per disrupted period

### 2. Dynamic Premium Engine
- **Input:** Rider's zone, IMD 7-day forecast, historical claim frequency in zone, CPCB pollution forecast
- **Model:** Gradient Boosted Trees (XGBoost) trained on historical disruption + claim data
- **Output:** Weekly premium recommendation per rider per risk tier

### 3. Fraud Detection Layer
- **Anomaly detection:** Claims during non-working hours, GPS inconsistency, duplicate cluster claims
- **Cross-validation:** Every claim must be corroborated by at least 2 independent data sources
- **Model:** Isolation Forest for anomaly scoring; rule-based hard filters as first pass

### 4. Disruption Forecast Notifications
- 24-hour advance push notification when IMD/CPCB data predicts a likely trigger event in rider's zone
- Example: *"Heavy rain forecast tomorrow in your zone (Koramangala, Bengaluru). Your coverage is active. Estimated partial payout if triggered: ₹180."*

### 5. Weekly Risk Scorecard
- Every Monday: zone risk level, disruption probability, and next week's premium direction
- Designed for low-literacy users — visual, emoji-friendly, zero insurance jargon

---

## Adversarial Defense & Anti-Spoofing Strategy

### Core Principle
Don't trust GPS alone — verify behaviour patterns, device identity, and network signals together.

---

### Layer 1 — Multi-Signal Verification (Not Just GPS)

Every claim is cross-checked against 3 independent signals simultaneously:
- 📍 GPS location consistency
- 📶 Network / IP location
- 📱 Device fingerprint

**Rule:** If 2 out of 3 signals don't match the claimed location → flagged as suspicious.

---

### Layer 2 — Movement Pattern Detection

Fake GPS users behave unnaturally. GigShield detects:
- **Teleporting** — sudden location jumps with no travel time
- **Perfect straight-line movement** — no human walks or rides in a perfectly straight line
- **Constant speed** — bots don't slow down, pause, or vary pace like real riders
- **No idle time between orders** — genuine riders have natural gaps; bots don't

**Rule:** If movement pattern ≠ human-like → flagged automatically.

---

### Layer 3 — Cluster Detection (Fraud Rings)

Fraud rings operate in coordinated groups, not as isolated individuals. GigShield looks for:
- Multiple accounts sharing the same device model + OS version + behaviour pattern
- Identical routes repeated across different accounts
- Same login location or IP subnet across multiple rider accounts

**Rule:** If many accounts behave identically → freeze the entire cluster, not just one account.

---

### Layer 4 — Order vs. Reality Check

Every completed order is cross-validated against physical possibility:
- Orders completed vs. time taken vs. distance covered

**Example:** 5 deliveries completed in 10 minutes across 5 km = physically impossible → auto-flagged.

---

### Layer 5 — Lightweight Trust Score

Every rider carries a trust score (0–100, starts at 70).

**Deductions:**
- GPS signal mismatch
- Unrealistic movement speed
- Repeated identical routes
- High claim frequency relative to activity

**Additions:**
- Consistent long-term activity
- High platform rating
- Extended account history with clean claims

**Thresholds:**
- Score < 40 → payouts restricted, manual review required
- Score < 20 → account frozen + escalated review

---

### Layer 6 — Soft Action Ladder (No Instant Bans)

GigShield never punishes immediately. Genuine riders caught by false positives must have a path back.

| Step | Action |
|------|--------|
| 1 | Warning issued, rider notified |
| 2 | Payout eligibility temporarily reduced |
| 3 | Temporary account freeze (48hrs) |
| 4 | Full ban after review confirmation |

---

### Layer 7 — "Proof of Work" Trigger (Edge Cases Only)

Used only when the trust score drops into a suspicious range and automated signals are inconclusive:
- Live selfie verification via app camera
- QR code scan at pickup or drop location

Low friction. Deployed sparingly. Never the default path for honest riders.

---

### Fraud Signal Summary

| Signal | Genuine Rider | Fraudster |
|--------|--------------|-----------|
| Multi-signal match | GPS + IP + device all align | 2 of 3 signals mismatched |
| Movement pattern | Human-like, variable speed, idle gaps | Teleporting, constant speed, no idle |
| Cluster behaviour | Unique routes and patterns | Identical routes across accounts |
| Order vs. distance | Physically consistent | Impossible delivery times |
| Trust score | 70+ with clean history | Declining due to repeated anomalies |
| Action response | Passes proof-of-work if needed | Escalates through ban ladder |

---

## Business Model — B2B2C

GigShield is **not** a standalone insurance product. We are the AI/tech layer.

**The stack:**
- **Underwriter:** Licensed insurer partner (Digit Insurance / Bajaj Allianz / ICICI Lombard)
- **Distribution:** Embedded into Zepto/Blinkit rider onboarding and earnings dashboard across Tier-1 and Tier-2 cities
- **Tech:** GigShield owns the risk engine, trigger logic, fraud detection, and UX

**Why Zepto/Blinkit need this:**
- Rider churn costs platforms ₹8,000–₹15,000 per re-onboarding
- Platforms with rider welfare programs show 23% lower weekly dropout rates (industry estimate)
- PR differentiation in a market where rider welfare is under increasing scrutiny
- Zero friction — integrates into existing earnings disbursement flow

**Revenue model:** Per-rider weekly premium split — platform covers 40%, rider contributes 60%. GigShield earns a technology fee from the insurer's premium pool.

---

## Parametric Trigger Summary Table

| Event | Data Source | Threshold | Payout |
|-------|------------|-----------|--------|
| GRAP IV / Extreme Weather | CPCB API + IMD API | ≥ 2 smart trigger conditions met | 30% of daily baseline, max 3 days |
| Sec 144 Curfew | Government gazette + news API | Curfew active in rider's zone | 30% of daily baseline |
| Dark Store Offline | UptimeRobot | Store offline ≥ 2hrs (8am–11pm) | 25% of daily baseline, prorated |
| App / UPI Crash | UptimeRobot + NPCI status | App down ≥ 45 min (3 monitors) | 25% of daily baseline, max 4hrs |
| Account Freeze | Screenshot → Platform API (Phase 2) | Rating ≥ 4.0, non-fraud freeze | 20–30% of daily baseline, max 5 days/month |
| Incentive Chain-Break | Derived from disruption triggers | Disruption caused missed streak day | 30% of daily baseline for missed day |

---

## Platform Choice — Web

We are building a **progressive web app (PWA)** for Phase 1–2, with a fully mobile-first responsive design.

**Reasoning:**
- Riders in both Tier-1 and Tier-2 cities access dashboards primarily via mobile browsers — a PWA covers both without app store dependency
- Faster to build and iterate within a 6-week timeline
- Admin/insurer dashboard benefits from desktop screen real estate
- Phase 3 stretch goal: React Native wrapper for a full native experience

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js + TailwindCSS (PWA, mobile-first) |
| Backend | Node.js + Express.js |
| ML / Risk Engine | Python + FastAPI (microservice) |
| ML Models | XGBoost (premium), Prophet/LSTM (earnings fingerprint), Isolation Forest (fraud) |
| Database | PostgreSQL (policies, claims, riders) + Redis (real-time trigger cache) |
| External APIs | IMD API, CPCB API, UptimeRobot API, NPCI status, Open-Meteo (fallback) |
| Payment (mock) | Razorpay test mode / UPI simulator |
| Hosting | Render / Railway (backend) + Vercel (frontend) |
| Auth | JWT + OTP login (phone number — no email dependency) |

---

## Application Workflow

### Rider Journey
1. **Onboarding** — Phone number + platform worker ID + zone pin code. Policy activated in 60 seconds.
2. **Weekly coverage** — Premium auto-deducted from earnings disbursement. Confirmation card sent.
3. **Disruption occurs** — System detects trigger automatically. No rider action required.
4. **Partial payout** — Claim auto-initiated, AI fraud-validates, 25–30% income buffer sent to UPI within 2 hours.
5. **Scorecard** — Every Monday, rider receives their risk card and weekly coverage summary.

### Insurer / Admin Journey
1. Real-time dashboard: active policies, trigger events, claim queue, loss ratios
2. Predictive analytics: next week's disruption probability by zone
3. Fraud flagging queue with anomaly scores
4. Premium adjustment recommendations from ML engine

---

## Persona Scenarios

**Scenario A — Ravi, Blinkit rider, Delhi NCR (Tier-1, High Risk)**
GRAP IV is declared on a Tuesday. Ravi's 14-day income baseline is ₹720/day. Two smart trigger conditions are met (GRAP IV + rainfall threshold). GigShield auto-triggers. Ravi receives 30% of ₹720 = **₹216** as a partial income buffer. His Tuesday absence also breaks his weekly streak — GigShield pays an additional 30% buffer for the missed bonus day.

**Scenario B — Priya, Zepto rider, Coimbatore (Tier-2, Medium Risk)**
Her assigned dark store in RS Puram goes offline at 6pm on a Friday. UptimeRobot confirms a 3-hour outage. Priya's 14-day baseline is ₹640/day. She receives 25% of ₹640 prorated for 3 hours = **₹80** automatically. No claim filed. No form filled.

**Scenario C — Arjun, Blinkit rider, Bengaluru (Tier-1, Medium Risk)**
A customer falsely reports Arjun. His account is frozen for 2 days. Rating: 4.6. He uploads the freeze screenshot. GigShield verifies, confirms non-fraud freeze, and pays 30% of ₹700 × 2 days = **₹420** as a partial income bridge, plus guided reinstatement support via chatbot.

---

## Development Plan

| Phase | Weeks | Focus | Key Deliverables |
|-------|-------|-------|-----------------|
| Seed | 1–2 | Ideation + Foundation | README, system design, onboarding UI, mock API integrations |
| Scale | 3–4 | Core Build | Registration, policy engine, dynamic premium, claims management, 3–5 automated triggers |
| Soar | 5–6 | Intelligence + Polish | Advanced fraud detection, earnings fingerprint ML, instant payout (Razorpay test), full dashboard, 5-min demo |

---

## Team — GigShield

| Name                | Role                          |
|---------------------|-------------------------------|
| Rupayan Jas         | Team Lead & Web Developer     |
| Riddhidip Jana      | AI/ML Engineer                |
| Jasveer Singh Tuteja| UI/UX Designer                |
| Yusra Ali           | Product Manager               |
| Nipun Thakuria      | Backend & Data Engineer       | 

---

## Repository

This repository will be updated continuously across all 3 phases.  
**Stack:** React + Node.js + Python (ML)

---

*"The delivery partner gets paid in 10 minutes. Their income protection should be just as fast."*
