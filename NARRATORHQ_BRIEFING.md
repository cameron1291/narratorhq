# NarratorHQ — Full Briefing Document
### For: LinkedIn profile build, sales conversations, marketing strategy

---

## What NarratorHQ Is (One Sentence)

NarratorHQ automates the monthly client performance report for digital marketing agencies — connecting to GA4, Google Ads, and Meta, generating the written narrative automatically, and delivering it white-labeled to the agency's clients.

---

## The Problem It Solves

Every digital marketing agency sends monthly performance reports to their clients. The data pull is fast. The writing is not.

An account manager writing a monthly report has to:
- Pull data from GA4, Google Ads, and Meta (different attribution windows, different schemas)
- Reconcile contradictory numbers between platforms
- Figure out *why* something changed — not just that it changed
- Frame difficult months without losing client confidence
- Remember what was promised last month and reference it
- Write it all in a tone that makes the agency look strategic

This takes **1–3 hours per client, per month**. At 15 clients, that's an entire working day. Every month. Just on reports.

NarratorHQ cuts that to **under 10 minutes per client**.

---

## How It Works (The Full Flow)

1. Agency signs up and connects their clients' data sources (GA4, Google Ads, Meta)
2. On schedule (monthly or weekly), the system pulls all metrics automatically
3. It normalises the data into a single canonical schema (solving the attribution mismatch problem)
4. It detects anomalies — traffic up but conversions down, CPA spike, ROAS drop — and explains why
5. It passes everything to Claude (Anthropic's AI) which generates a structured narrative report
6. The account manager receives a notification: "Your report for [Client] is ready to review"
7. They open the approval queue, review each section, edit anything in-app, approve section by section
8. They click Send — the client receives a branded PDF by email, sent from the agency's own domain
9. The client never sees NarratorHQ — it looks like the agency wrote it

---

## The Six Report Sections

1. **Overview** — The headline result in 2–3 sentences. What the client will quote to their CEO.
2. **Organic Performance** — Sessions, rankings, channel breakdown, what drove the change
3. **Paid Search** — Google Ads spend, CPA, ROAS, campaign breakdown, what was changed
4. **Paid Social** — Meta spend, CPA, creative performance, attribution note
5. **Anomalies** — The most important section. Explains *why* something diverged — the thing that takes account managers longest to write
6. **Next Steps** — Three specific actions the agency is taking next month

See it live: narratorhq.com/demo

---

## The Approval Workflow (The Core Product)

This is what separates NarratorHQ from a simple AI writing tool:

- **Section-by-section approval** — approve the Overview separately from Paid Search. Skip sections that don't need changes.
- **Inline editing** — click any sentence and rewrite it. No modals, no separate editor.
- **Confidence indicators** — each section is flagged High / Review Recommended / Low Confidence so the account manager knows where to spend time
- **Regenerate with instruction** — "Rewrite the paid social section with a more cautious tone" — one click
- **Revert to original** — if the AI got it right and the edit made it worse, one click back
- **Approve all** — for clients where the AI consistently nails it, one tap
- **Client memory** — each client has stored goals, sensitivities, promises, and standing instructions that feed every future report

The account manager is always in the loop. Nothing sends without human approval. This is intentional and permanent — it's the trust mechanism.

---

## Active Integrations

| Platform | Method | Status |
|---|---|---|
| Google Analytics 4 | OAuth | Live |
| Google Ads | OAuth | Live |
| Meta Ads | System user token (user pastes their own) | Live |

All three are live. GA4 is required. Google Ads and Meta are optional but recommended.

---

## The Competitive Landscape

**AgencyAnalytics** ($39–$479/mo) — dashboard builder, just added basic AI summaries. Does not automate narrative delivery. Still requires manual writing.

**DashThis** ($39–$149/mo) — drag-and-drop dashboard tool. "AI Insights" is very basic. Same problem — shows data, doesn't write the story.

**Whatagraph** ($199+/mo) — data visualisation, no AI narrative.

**Looker Studio** (free) — Google's tool. Requires significant setup, no narrative generation.

**None of them automate the written narrative + approval + delivery flow.** That gap is open and confirmed.

---

## Pricing

| Plan | Price | Client Limit |
|---|---|---|
| Starter | £149/mo | Up to 5 clients |
| Growth | £249/mo | Up to 15 clients |
| Agency | £399/mo | Unlimited |

14-day free trial on all plans. No credit card required to start.

At £149/mo average, an agency with 10 clients pays £14.90 per client per month to reclaim 2 hours of account manager time per client. At £25/hr fully loaded, that's a 33x ROI.

---

## The Moat (Why This Is Hard to Copy)

The AI writing is not the moat. Any tool can generate text. The moat is:

1. **The approval workflow** — built specifically for agency account managers, not generic
2. **Client memory and context** — goals, promises, sensitivities stored per client, feeding every report
3. **Multi-platform normalisation** — solving the attribution mismatch problem that makes cross-platform reporting hard
4. **White-label delivery** — the client never sees NarratorHQ
5. **Report history** — every approved report is stored, enabling trend analysis and "what was promised last month" context
6. **Institutional lock-in** — once an agency's client context, instructions, and history are in the tool, switching means losing years of context

---

## Who To Target

**Priority 1 — PPC/Performance agencies**
- They have the most painful cross-platform attribution problem
- They manage the most data sources per client
- They have the most to explain (spend, CPA, ROAS changes)
- Typically 5–50 employees, 10–30 clients
- Job titles: Account Manager, Head of PPC, Paid Media Director, Agency Owner

**Priority 2 — SEO agencies**
- Monthly reporting is standard
- GA4 is always connected
- Pain point is clear: sessions, rankings, content performance
- Often smaller (2–15 people)

**Priority 3 — Full-service digital agencies**
- Longer sales cycle
- More stakeholders
- But higher ACV (more clients, more platforms)
- Target after first 20 customers are proven

**Where to find them:**
- Apollo.io: Industry = Marketing & Advertising, 10–50 employees, UK, Title = Owner/Director/Founder
- LinkedIn: same filters
- Agency Hackers (UK agency community)
- Bureau of Digital

---

## Cameron's Story (For LinkedIn / Sales Conversations)

Cameron Drayton is the founder of NarratorHQ. Background: super yacht chef — not a typical SaaS founder. Built NarratorHQ after observing the operational inefficiency of manual reporting in agency work.

**Why this matters in sales:** The unconventional background is an asset. It signals:
- This wasn't built by someone inside the agency bubble — it was built by someone who saw the problem from the outside and solved it practically
- No corporate agenda, no VC pressure — a founder who ships fast and talks to customers directly
- Agencies buy from people, not companies. A real person with an unusual story is more memorable than another ex-agency founder.

**The pitch for LinkedIn:**
"I spent years working in high-pressure environments where attention to detail and clear communication were everything. I watched agency account managers burn hours every month translating data into client updates — skilled work being done by the wrong tool (copy-paste). I built NarratorHQ to fix that."

---

## Current Status

- Product: Live at narratorhq.com
- All three integrations: Active
- Paying customers: 0 (pre-revenue, seeking first 3 pilot agencies)
- Free trial: 14 days, no credit card
- Live demo: narratorhq.com/demo
- Cold email: Warming up (live from ~10 June)
- Product Hunt: Launching Tuesday

---

## The Offer That Gets Replies

Stop pitching the product. Pitch the pilot:

> "I'm looking for 3 PPC agencies to test NarratorHQ free for 30 days. You get full access, I get honest feedback on time saved. No obligation to pay. Interested?"

This works because:
- Low commitment (free, 30 days)
- Specific (3 agencies — scarcity)
- Honest (you get feedback, they get value)
- No call required

---

## Marketing Streams — Current and Recommended

### Active Now
| Channel | Status | Expected result |
|---|---|---|
| Cold email (Hotmail, manual) | Active — 20 sent | 1–3 replies per 20 |
| Cold email (narratorhq.online) | Warming — live ~10 June | 500/week at scale |
| SEO content (5 articles) | Live, indexing | Traffic in 6–8 weeks |
| Product Hunt | Launching Tuesday | Spike of 200–500 visitors |
| Demo page | Live | Reduces signup friction |

### Add Immediately (Free, No Audience Needed)

**1. Software directories**
List NarratorHQ on: G2, Capterra, GetApp, Trustpilot, Slant, Futurepedia, There's An AI For That. These are free, drive inbound, and build backlinks. Takes 2 hours total.

**2. AppSumo (Lifetime Deal)**
AppSumo lets you sell a lifetime deal (e.g. £299 one-time) to their audience of 1M+ tool buyers. Not ideal long-term for MRR but gets you 50–200 paying customers fast, cash, and reviews. Apply at appsumo.com/sell. Takes 2–4 weeks to get approved and live. Strongest short-term revenue option available.

**3. Agency community posts**
- Agency Hackers Slack (UK) — post in #tools: "Built a tool that writes your client reports. Looking for 3 agencies to test free." One post, real community, real prospects.
- Bureau of Digital — same
- Reddit r/PPC and r/digital_marketing — story-first post, not a pitch

**4. YouTube / Loom demo video**
A 90-second screen recording of the full flow (connect GA4 → generate report → approve → see PDF) embedded on the landing page and posted to YouTube. This is the single highest-conversion asset you can add. See video script below.

**5. Twitter/X — build in public**
Post weekly: "Week X building NarratorHQ: [one specific thing you learned/built/broke]." Takes 10 minutes/week, compounds over time. The indie hacker audience loves this and shares tools they've followed from the start.

**6. Partner with agency tools**
Reach out to Semrush, Ahrefs, or AgencyAnalytics affiliate programmes. "We integrate with your tool — would you mention us to your agency audience?" Long shot but zero cost.

---

## Demo Video — Full Script

**Tool to use:** Loom (free, loom.com) — record screen + face cam. Export as MP4.
**Length:** 90 seconds maximum.
**Target:** Agency owner who has never seen the product.

---

### SCRIPT

**[0:00–0:10] — Hook (face cam only)**
"If your team is still spending 2 hours per client writing monthly reports — I built something that does it in 30 seconds. Let me show you."

**[0:10–0:20] — Dashboard (screen share)**
"This is NarratorHQ. Here's a client — Meridian Home & Garden — connected to GA4 and Google Ads."
*[Click into client, show connections panel with green ticks]*

**[0:20–0:35] — Generate report**
"I click Generate Report."
*[Click generate — show the generating state]*
"It pulls all the data, detects anomalies, and writes the narrative. Done."
*[Report appears in approval queue]*

**[0:35–0:55] — Approval workflow**
"Here's the report. Six sections — Overview, Organic, Paid Search, Paid Social, Anomalies, Next Steps."
*[Scroll through sections, show confidence indicators]*
"Each one has a confidence score. I can click any section to edit it inline."
*[Click a sentence, type a small edit, save]*
"I approve the sections I'm happy with."
*[Click approve on 2–3 sections]*

**[0:55–1:10] — Send**
"When everything's approved — I hit Send."
*[Click Send to client]*
"The client gets a branded PDF by email. It looks like it came from us. They never see NarratorHQ."
*[Show the email preview / PDF briefly]*

**[1:10–1:20] — Close (face cam)**
"That's it. 2 hours down to 10 minutes. 14-day free trial at narratorhq.com — no credit card."

---

### HOW TO RECORD IT

1. Go to loom.com — sign up free
2. Install the Loom Chrome extension
3. Click Record — select "Screen + Camera"
4. Open narratorhq.com/demo in another tab (use the demo for the recording — no real client data needed)
5. Follow the script above
6. Export and upload to YouTube (unlisted is fine) + embed on narratorhq.com landing page

---

## LinkedIn Profile Brief

**Headline:**
`Founder at NarratorHQ · Automating client reporting for marketing agencies · narratorhq.com`

**About section:**
> Marketing agencies spend 20+ hours a month writing client performance reports. Skilled people doing copy-paste work.
>
> I built NarratorHQ to fix it. Connect GA4, Google Ads and Meta — get a white-labeled narrative report, ready to approve and send, in under 30 seconds.
>
> Account managers review and edit before anything goes to the client. It's not auto-send — it's the first draft done for you.
>
> Currently looking for 3 PPC or performance agencies to test it free for 30 days.
>
> → narratorhq.com/demo (see a live example report)

**Current position:**
`Founder — NarratorHQ`
`Client reporting automation for digital marketing agencies`

**Featured section:**
Add narratorhq.com/demo as a featured link with screenshot.

---

## The Three Emails To Send This Week

**Email 1 — The pilot offer**
> Subject: Free 30-day pilot — client reporting automation
>
> Hi [name],
>
> I'm looking for 3 PPC agencies to test NarratorHQ free for 30 days.
>
> It connects to GA4, Google Ads and Meta, writes the monthly client report automatically, and puts it in an approval queue. Your team reviews, edits if needed, approves, and sends — white-labeled as your agency's work.
>
> No obligation, no credit card. You keep the reports. I get honest feedback on time saved.
>
> See a live example: narratorhq.com/demo
>
> Interested?
>
> Cameron

**Email 2 — The follow-up (day 4, no reply)**
> Subject: Re: Free 30-day pilot
>
> Just checking this didn't get buried — happy to answer any questions before you decide.

**Email 3 — The close (day 8, no reply)**
> Subject: Closing the loop
>
> Closing the loop on this — if the timing isn't right, no problem. Happy to revisit when report season hits.

---

*Document prepared: May 2026*
*Live product: narratorhq.com*
*Live demo: narratorhq.com/demo*
