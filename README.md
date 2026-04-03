# 🚀 Kizuna ⚡  
### AI-Powered Income Protection for Gig Delivery Partners  

> Guidewire DEVTrails 2026 | Team Kizuna  

---

# 🧩 The Problem  

Gig delivery partners face **unpredictable income loss** due to:  

- Extreme weather (rain, heat, floods)  
- Pollution (AQI spikes)  
- Platform disruptions (app/store downtime)  

There is **no real-time income protection**, and workers bear **100% of the financial risk**.

---

# 💡 The Solution  

Kizuna is a **parametric, event-driven income protection system** that:  

- Detects disruptions via APIs  
- Estimates income loss using AI  
- Pays **20–30% of lost income instantly**  

---

# 🧠 Core Principle  

> Kizuna provides a **partial income buffer**, not full replacement  

- Keeps premiums affordable  
- Prevents misuse  
- Ensures long-term sustainability  

---

# ⚙️ Unified System Design  

Kizuna is a **trust-driven system**, powered by:

## 👉 Trust Score  

Controls:
- Premium  
- Payout %  
- Claim limits  
- Settlement speed  
- Fraud penalties  

---

# 🔢 Trust Score Engine  

```
TS = clip(50 + 0.20I + 0.30R + 0.30A - 30F, 0, 100)
```

### Definitions  

- **I (Identity):** 100 if e-Shram verified, else 0  
- **R (Rating):** 20 × avg rating (1–5)  
- **A (Activity):** Recency-weighted (0–100)  
- **F (Fraud):** Number of fraud events  

> Each fraud event reduces score by 30 points and removes benefits temporarily.

---

# 🧭 Onboarding Flow  

### Step 1 — Platform Verification  
- OTP + Worker ID  
- Checks:
  - Active account  
  - Weekly orders > 20  
  - Rating ≥ 3.5  

---

### Step 2 — e-Shram Integration (Optional but Recommended)  

#### 🔐 What is e-Shram?  
- Government of India database of unorganised workers  
- Acts as a **verified identity layer (not self-declared data)**  
- Ensures the user is a **real delivery partner / gig worker**
- **e-Shram verification gives a UAN (Universal Account Number)** — a unique ID used to verify identity and prevent duplicate or fake worker accounts

---

#### ⭐ Benefits (Trust Score Boost)  

e-Shram verified users receive:

- +15 Trust Score  
- Lower premiums  
- Higher claim limits  
- Faster payouts  

---

#### 🛡 Fraud Prevention Impact  

Prevents:
- Duplicate identities  
- Fake workers  
- Multi-account abuse  

> Adds a **government-backed validation layer**, improving system reliability  

---

### Step 3 — Zone & Shift  
- Micro-zone selection  
- Risk classification  

---

### Step 4 — Coverage Selection  

**Dynamic Premium Preview**

Premium is dynamically calculated based on:  
- Zone risk  
- Trust score  
- Historical disruption frequency

---

# 💰 Weekly Premium Model  

| Zone | Premium Range |
|------|--------------|
| Low | ₹29–₹39 |
| Medium | ₹45–₹65 |
| High | ₹75–₹99 |
| Extreme | Dynamic |

> Final premium dynamically adjusted using risk multipliers.

---

# 🛡 Coverage Scope  

✔ Income loss only  
❌ No health, vehicle, pandemic, or systemic coverage  

---

# ⚡ Triggers (Phase 2 — Implemented)

- **Rain / Weather:** Triggered when rainfall exceeds threshold disrupting deliveries  
- **Pollution (AQI):** Triggered when AQI crosses unsafe level restricting outdoor work  
- **App Downtime:** Triggered when platform app is unavailable beyond threshold duration  
- **Dark Store Downtime:** Triggered when assigned store is non-operational  
- **Incentive Chain Break:** Triggered when rider loses incentive due to disruption  

---

# 🔮 Phase 3 Triggers  

- **Account Freeze (Selective):** Covered only if not caused by platform fraud detection  
- **Curfew / Social Disruption:** Triggered when access to delivery zones is restricted  
- **Infrastructure Failure:** Triggered during network/electricity outages affecting work  

---

# 💸 Coverage Tiers  

### 🟢 Basic  
- 25% payout  
- 2 claims/week  

### 🔵 Plus  
- 30% payout  
- 2 claims/week  

### 🔴 Pro  
- 40% payout  
- 3 claims/week  

---

# ⚡ Payout System  

| Trust Level | Payout % |
|------------|---------|
| High | 30% | 
| Medium | 25% | 
| Low | 20% | 

---

# 🧠 Earnings Fingerprint  

Each worker has a **personalized earning rate**:

```
Earning Rate = Total Earnings / Active Hours (recency-weighted)
```

```
Estimated Loss = Earning Rate × Time Lost
```

```
Payout = Tier % × Estimated Loss
```

👉 Same disruption → different payouts per worker  

---

# 🛡 Fraud Detection  

- GPS validation  
- Device fingerprinting  
- Activity verification  
- Duplicate claim prevention  

---

# 🌍 Zone Risk Model  

| Zone | Risk |
|------|------|
| Low | Stable |
| Medium | Moderate |
| High | Frequent disruptions |
| Extreme | Severe |

---

# 📊 Actuarial Model & Stress Testing  

## Key Formula  

### 1. Adjusted Payout  
```
P' = N × D × (Income × Cap%) × Claim Factor
```

### 2. Insurer Cost  
```
Cost = P' × (1 - Platform Share) × Retention
```

### 3. Loss Ratio  
```
Loss Ratio = Cost / Premium Pool
```

---

### 🔤 Definitions  

- **P′ (Adjusted Payout)**  
  → Total payout after applying caps and claim limits  

- **N (Number of Riders Affected)**  
  → Total number of insured workers impacted in the event  

- **D (Disruption Duration)**  
  → Number of days (or equivalent time) the disruption lasts  

- **Income**  
  → Average daily income per rider (₹1200 baseline or personalized via earnings fingerprint)  

- **Cap% (Payout Cap Percentage)**  
  → Maximum % of income that can be paid (e.g., 20%)  

- **Claim Factor**  
  → Adjustment for claim limits  
  (e.g., if only 5 out of 12 days are claimable → 5/12)

---

## Scenario 1 — Multi-City Monsoon  

- Riders (N) = 5000  
- Days (D) = 7  
- Income = ₹1200  
- Cap = 20% → ₹240  
- Claim factor = 4/7  
- Platform share = 20%  
- Retention = 20%  

### Calculation  

```
P' = 5000 × 7 × 240 × (4/7) = ₹48,00,000
Cost = 48L × 0.8 × 0.2 = ₹7.68L
Premium Pool = ₹12L
```

```
Loss Ratio = 7.68 / 12 = 64%
```

✅ **Stable**

---

## Scenario 2 — Extreme Pollution  

- Riders = 2000  
- Days = 12  
- Cap = ₹240  
- Claim factor = 5/12  
- Platform = 20%  
- Retention = 20%  

### Calculation  

```
P' = 2000 × 12 × 240 × (5/12) = ₹24,00,000
Cost = 24L × 0.8 × 0.2 = ₹3.84L
Premium Pool = ₹4.8L
```

```
Loss Ratio = 3.84 / 4.8 = 80%
```

✅ **Controlled**

---

## Scenario 3 — App Failure  

- Riders = 1000  
- Duration = 1.5 days  
- Payout/day = ₹240  

### Calculation  

```
P' = 1000 × 1.5 × 240 = ₹3.6L
Cost = 3.6L × 0.8 × 0.2 = ₹0.576L
Premium Pool = ₹2.4L
```

```
Loss Ratio = 0.576 / 2.4 = 24%
```

✅ **Highly Safe**

---

## 🧠 Key Insight  

> Even under extreme correlated events, loss ratio remains controlled using caps, reinsurance, and dynamic pricing.

---

# 🛠 System Safeguards  

- >70% → Premium adjustment  
- >85% → Enrollment restriction  
- >100% → Emergency controls  

---

# ⚡ Catastrophic Handling  

- Auto-trigger payouts  
- No manual claims  
- Strict caps applied  

---

# 🤖 Why Parametric?  

- Instant payouts  
- No paperwork  
- API-triggered events  
- Low operational cost  

---

# 💼 Business Model  

- Insurer → Underwriting  
- Platform → Distribution  
- Kizuna → AI + system  

---

# 🏆 Moat  

- Trust score engine  
- Earnings fingerprint  
- Fraud detection  
- Zone pricing  

---

# 🚀 One-Line Pitch  

> “Kizuna protects gig workers by instantly paying a portion of lost income when real-world disruptions occur.”
