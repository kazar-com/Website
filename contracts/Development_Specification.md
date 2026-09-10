# KAZAR WEBSITE FINAL UI & DEVELOPMENT SYSTEM R01

## 01 / Release and implementation boundary

KAZAR WEBSITE FINAL UI & DEVELOPMENT SYSTEM R01
Visual UI R01 is approved and locked. This package extends the same system to every remaining route, including reusable project and service templates. It is a design and development handoff for approval, not a deployed production service.
Hero decision: B is recommended and used. The approved Midnight panel retains its position and dimensions; the duplicate logo is removed. “A private construction house / Dubai / UAE” carries the panel. Header logo and Home copy remain unchanged. A remains in the review for comparison.
Contact received and confirmation are one canonical screen, not duplicate routes. Finished and Diagnostic receipt are separate contextual states.
Legal pages are complete visual templates with clearly identified publication content gates. Final controller, policy terms, retention, processors and jurisdiction require owner/legal confirmation. No invented contractual terms are supplied.
Evidence remains exactly as approved: Al Furjan is one public case, DOCUMENTED DECISION. The drawing itself is PROPOSED. Valecasa Design Studio credit retained. No client name or villa address.
After package approval, the website DESIGN AND SPECIFICATION block can close. Implementation, backend integration, native-browser/device acceptance and launch remain execution tasks.

## 02 / Route and publication register

/ — Home; index; primary enquiry CTA.
/projects/ — one selected public case; no filters until supported portfolio density.
/projects/al-furjan/ — Al Furjan case; canonical evidence and technical story.
/services/ — construction-first hub; links to audience paths and approved service pages.
/private-clients/ — approved Private Clients page.
/for-architects/ — architects and interior designers; authorship protected.
/kazar-standard/ — exact eight stages; no completion markers.
/about/ — supporting navigation; founder-led responsibility.
/project-diagnostic/ — contextual page; scope and exclusions before CTA.
/contact/ — initial enquiry; indexable.
/contact/received/ — server-confirmed success only; noindex.
/contact/details/ — optional Step 2, scoped session; noindex.
/contact/finished/ — completion/skip state; noindex.
/diagnostic/intake/ — authenticated invitation and engagement scope; noindex; not in public navigation.
/diagnostic/received/ — private acknowledgement; noindex.
/diagnostic/access/ — invalid/expired access state; noindex.
/privacy/, /terms/, /accessibility/ — footer utilities; legal content gate before publication.
404 — return HTTP 404, not a soft-404 success; Home link and normal navigation.
/services/villa-renovation-dubai/ — exemplar SEO template; publish only after content approval.
Future /projects/{slug}/ and /services/{slug}/ — templates, not public records. All review/template-only routes excluded from production routing, sitemap and indexing.
Primary navigation exactly: PROJECTS / SERVICES / PRIVATE CLIENTS / FOR ARCHITECTS / KAZAR STANDARD / CONTACT. About and Diagnostic remain supporting links.

## 03 / Responsive grid and spacing

CSS viewport policy: phone <600 px; tablet 600–1099 px; desktop >=1100 px. Navigation switches to the compact menu below 1100 px. No device-name inference.
320: one column; 24 px content margins, 16 px header margins; 48 px section spacing; Home hero 48 px; page H1 36 px. Full-width stacked hero actions. Menu controls remain 44 px minimum.
390: one column; 24 px margins; 48 px sections; hero ~53 px, page H1 ~37 px.
430: one column; 24 px margins; 48 px sections; hero 59 px, page H1 41 px.
768: 36 px margins; 55 px sections; two columns only for short paired content. Form remains one column. Compact navigation. Hero side panel 180 px.
1024: same tablet rules; retain readable column widths. Hero text 66 px; do not introduce squeezed desktop navigation.
1366: content width 1206 px; outer margins 80 px. Editorial grid 42/58; project grid 36/64; evidence grid 52/48. Hero side panel 310 px. Sections 76 px, retained from approved UI.
1440+: content max 1206 px; centred. Home hero max 1440 px. Outer surplus becomes light margin, never expanded paragraph measure. Header aligns within a maximum 1280 px region.
Underlying layout grid: 12 columns desktop, 8 tablet, 4 phone. Reference gutter 24 px desktop/tablet, 16 px phone; editorial percentage grids preserve the approved silhouette.
Core space tokens: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 px. Component gaps use 8–32; groups 32–48; major sections 48 mobile / 55 tablet / 76 desktop. The inherited 55/76 section tokens are deliberate compatibility values, not new ad hoc spacing.
Paragraph measure 64ch maximum, lead 620–750 px. Images use width 100%, explicit aspect ratio and contain for drawings; never crop technical content. Drawing zoom is the only intentional horizontal content scroll.
At 200% text size and 400% browser zoom, reflow to a single column; no fixed text-container height. Long credits and filenames wrap. No horizontal page scrolling at 320 CSS px.

## 04 / Typography tokens

All sizes below are CSS px; implement text values in rem at a 16 px root. Never prevent browser font enlargement. Source Sans 3 and Source Serif 4 are self-hosted under their included OFL licences.
Display / Hero: Source Serif 4, 400, 86/1.04 desktop; 66/1.04 tablet; clamp(48,13.7vw,59)/1.02 phone; tracking -0.025em.
H1: Source Serif 4, 400, 62/1.04; tablet 53; phone clamp(36,9.5vw,41)/1.09; -0.025em.
H2: Source Serif 4, 400, 43/1.15; tablet 34; phone 33/1.18; -0.02em.
H3: Source Sans 3, 600, 19/1.30; phone 18/1.30; 0.
H4: Source Sans 3, 600, 17/1.35; phone 16/1.35; 0.
Editorial: Source Serif 4, 400, 29/1.25; phone 26/1.25; 0.
Body Large: Source Sans 3, 400, 21/1.50; phone 18/1.50; 0.
Body: Source Sans 3, 400, 18/1.50; phone 17/1.55; 0.
Small: Source Sans 3, 400, 14/1.50 all widths; 0.
Caption: Source Sans 3, 400, 13/1.50 all widths; 0.
Label: Source Sans 3, 600, 13/1.50 desktop, 12/1.50 phone; 0.13/0.11em.
Navigation: Source Sans 3, 400, 14/1.50 desktop; compact controls 15/1.50; overlay links 25/1.20; 0.055em desktop, 0 mobile.
Button: Source Sans 3, 600, 16/1.35 desktop; 15/1.35 phone; 0.
Form label: Source Sans 3, 600, 17/1.50 desktop; 16/1.50 phone; optional suffix 14/13, 400.
Technical metadata: Source Sans 3, 400, 16/1.40; phone 15/1.45; labels 12/1.50, 600, 0.09em.
Evidence status: Source Sans 3, 600, 13/1.50; 0.07em. Status is never colour-only.
Source Sans 3 500 is reserved for navigation/secondary labels if required by the approved component implementation; no synthetic weights. Source Serif 4 500 only limited editorial emphasis; never inputs, navigation or technical metadata.
Provide Latin/Cyrillic webfont subsets where used. Arabic remains a separate unapproved companion phase. Logo is an independent vector, never typeset with the corporate fonts.

## 05 / Colour tokens and state language

--midnight: #202735; --ivory: #F4F1EB; --limestone: #DDD6CC; --taupe: #A69C90; --charcoal: #302D29; --smoked-olive: #484B3E.
--background-primary: var(--ivory); --background-secondary: var(--limestone); --background-dark: var(--midnight); --surface-material: var(--taupe).
--text-primary: var(--charcoal); --text-inverse: var(--ivory).
--border-light: var(--taupe), decorative separators only; --border-dark: var(--midnight), functional field boundaries.
--action-primary: var(--midnight); --focus: var(--midnight), inverse var(--ivory) on dark; --error: var(--midnight); --disabled: var(--limestone) with Charcoal text.
Error is identified by text, aria-invalid and a 2 px border, not a seventh red colour. Success uses a heading and status message, not green. Loading uses text and aria-busy, not a new colour or continuous animation.
Primary button always Midnight/Ivory. Focus ring 2 px, offset 5 px; inverse ring on Midnight/Olive. Taupe separators must not be the sole boundary for input controls.
Colour rhythm remains locked. Olive appears only as a contained editorial field; never forms, primary buttons, navigation or evidence-status coding. Real evidence retains its source colours.
Primary/inverse text pairings must meet WCAG AA contrast. Charcoal on Ivory/Limestone/Taupe and Ivory on Midnight/Olive are intended text pairs; validate the actual rendered states, not HEX alone.

## 06 / Components 1–5

Header
Layout/type/surface: 110 px desktop / 86 compact; logo 174×56 / 118–128×43; Ivory; 1 px Limestone bottom
Behaviour: Scroll >40 px changes rule to 2 px Midnight, geometry stable; sticky; 220 ms border transition.

Navigation
Layout/type/surface: 14 px sans; 23 px desktop link gap; compact below1100; six locked links
Behaviour: Hover/current: Midnight underline; focus ring; no disabled public links.

Mobile menu
Layout/type/surface: Full viewport Midnight; 25 px Ivory links; 59 px rows; 24 px inset
Behaviour: Open focuses Close; trap Tab, Escape closes, restore trigger; body scroll locked; background inert.

Footer
Layout/type/surface: Midnight; 48 px desktop /39 phone inner padding; approved logo and supporting links
Behaviour: Links underline on hover; inverse focus ring; phone nav groups wrap; no hiding legal links.

Primary button
Layout/type/surface: 52 px min; 14×21 padding; sans600 16/15; Midnight/Ivory
Behaviour: Hover outline offset3; focus2 offset5; active outline0; disabled Limestone/Charcoal, no click; 220 ms.

Shared contract: 220 ms ease-out (allowed150–300); reduced motion0. No hover dependency on touch. Focus always visible. Non-interactive components have no hover/active/disabled/error state. Error applies only to interactive validation or unavailable evidence; disabled controls remain labelled.

## 06 / Components 6–10

Secondary button
Layout/type/surface: Same dimensions; transparent/Ivory, Midnight rule/text
Behaviour: Hover Limestone; focus same; active2 px rule; disabled Limestone; inverse version on dark.

Text links
Layout/type/surface: 15 px sans600; 44 px target when standalone; underline offset5
Behaviour: Hover underline; focus ring; active maintains underline; no fake disabled anchor.

Section labels
Layout/type/surface: 13/12 px sans600; tracking .13/.11em; bottom24
Behaviour: Static: hover/focus/active/disabled/error N/A; inverse Ivory on dark.

Headings
Layout/type/surface: Use named H1–H4 tokens; bottom24–32; width controlled
Behaviour: Static states N/A; anchors have scroll margin header+16; never forced fixed height.

Body copy
Layout/type/surface: 18/17 px sans400; 64ch measure; paragraph gap24
Behaviour: Static states N/A; inline links underlined; text selection native.

Shared contract: 220 ms ease-out (allowed150–300); reduced motion0. No hover dependency on touch. Focus always visible. Non-interactive components have no hover/active/disabled/error state. Error applies only to interactive validation or unavailable evidence; disabled controls remain labelled.

## 06 / Components 11–15

Evidence card
Layout/type/surface: Figure: status row, Taupe mat, contained asset, caption, viewer link
Behaviour: Asset hover retains colour; link focus2; no status promotion. Missing asset becomes labelled typographic placeholder in review, blocked publish if required.

Project card
Layout/type/surface: 36/64 desktop; single-column phone; Limestone field, Taupe metadata
Behaviour: Only explicit case link navigates; title, general location, role and status always visible; no imaginary portfolio cards.

Evidence status
Layout/type/surface: 13 px sans600 uppercase; .07em; 1 px Taupe rules; 10 px vertical padding
Behaviour: Static states N/A; canonical text persists with reuse and zoom; no traffic-light badge.

Drawing viewer / zoom
Layout/type/surface: 90vw max1150; phone width minus24; Ivory dialog; 24/16 inset
Behaviour: Fit, +, −, close; zoom100–400%; keyboard scroll region; Escape/restore focus. Caption always outside scroll region.

Standard accordion
Layout/type/surface: 65/41 px number column, content,35/22 control;84 px minimum desktop summary
Behaviour: Native details/summary; 03 initially open; multi-open; keyboard Enter/Space; 220 ms content fade; reduced motion none.

Shared contract: 220 ms ease-out (allowed150–300); reduced motion0. No hover dependency on touch. Focus always visible. Non-interactive components have no hover/active/disabled/error state. Error applies only to interactive validation or unavailable evidence; disabled controls remain labelled.

## 06 / Components 16–20

Form fields
Layout/type/surface: Ivory on Limestone;52 px min;13×15 padding; Midnight1 border; full width
Behaviour: Focus2 offset5; error2 border+message; readonly readable; disabled Limestone; no validation while initially empty.

Select fields
Layout/type/surface: Native select, same field tokens; clear default option
Behaviour: Arrow keys native; focus/error same; no auto-submit or navigation on selection; disabled native.

Textarea
Layout/type/surface: 130 px starting height; resize vertical; same field tokens
Behaviour: Preserve text on error/back; no fixed max-height clipping; max length message before limit.

File upload
Layout/type/surface: Native chooser plus filenames/size/remove actions; full width;14 px helper
Behaviour: No required upload; pending/scanning/uploaded/rejected text states; reject type/size; retry per file; cancel/remove before send.

Error states
Layout/type/surface: Midnight text and2 px field rule; Ivory summary,3 px left rule;16 inset
Behaviour: Summary focuses after failed submit; links to fields; retained values; retry; role alert only on new response.

Shared contract: 220 ms ease-out (allowed150–300); reduced motion0. No hover dependency on touch. Focus always visible. Non-interactive components have no hover/active/disabled/error state. Error applies only to interactive validation or unavailable evidence; disabled controls remain labelled.

## 06 / Components 21–25

Success states
Layout/type/surface: Ivory heading + Limestone optional-next panel; normal footer
Behaviour: Shown after durable backend acknowledgement only; focus H1; Add details or Finish; no timed redirect.

Empty states
Layout/type/surface: Typography and restrained rule; no stock substitute
Behaviour: State what is unavailable and relevant next action; no spinner when genuinely empty.

Loading states
Layout/type/surface: Existing button width; “Submitting…”; sans; aria-busy
Behaviour: Disable duplicate submission; retain keyboard context; no indefinite decorative animation; timeout becomes retry state.

Inline validation
Layout/type/surface: 14 px sans;8 px below field; linked describedby
Behaviour: On submit then blur/change for invalid fields; whitespace trim; no aggressive keystroke errors.

Breadcrumbs
Layout/type/surface: 14 px sans;24 px vertical; normal links; semantic nav/list
Behaviour: Wrap on phone; current item text/aria-current; hover underline; focus ring; no truncating project identity.

Shared contract: 220 ms ease-out (allowed150–300); reduced motion0. No hover dependency on touch. Focus always visible. Non-interactive components have no hover/active/disabled/error state. Error applies only to interactive validation or unavailable evidence; disabled controls remain labelled.

## 06 / Components 26–29

CTA blocks
Layout/type/surface: Light inset within Midnight closing;32/24 inset;52 px button
Behaviour: Primary remains Midnight on light inset; long labels wrap on phone; button state contract applies.

Editorial Olive panel
Layout/type/surface: Contained28% desktop; full-width small phone field;26/20 inset
Behaviour: Ivory editorial text; no primary action inside; static states N/A; max-height removed if text grows.

Limestone panel
Layout/type/surface: Section or form container;76/48 section or45/25 form inset
Behaviour: Static states N/A; functional fields have distinct Ivory background and Midnight border.

Taupe evidence mat
Layout/type/surface: 22 px desktop/15 phone padding; contain source image
Behaviour: Static states N/A; never rasterise new textures; no crop; viewer action inherits link states.

Shared contract: 220 ms ease-out (allowed150–300); reduced motion0. No hover dependency on touch. Focus always visible. Non-interactive components have no hover/active/disabled/error state. Error applies only to interactive validation or unavailable evidence; disabled controls remain labelled.

## 07 / Interaction and focus contract

Header: sticky without resizing. At scrollY>40, change bottom rule. Anchor destinations offset header height+16 px. Smooth scroll only if reduced motion is off.
Mobile menu: modal navigation, no focus behind it; first focus Close; Tab loops; Escape/backdrop close optional; closing restores trigger. Route selection closes menu then focuses new H1. Browser back restores route, scroll and draft where safe.
Standard: all eight names visible, 03 open; independent native disclosures. Opening changes no project status. No progress visualisation.
Drawing viewer: explicit open control; dialog name and asset caption; fit initially; zoom100–400 with +/-/fit. Arrow-key and touch scrolling in focusable drawing region; caption stays outside. Escape closes, focus returns to source control. Provide text equivalent and permitted accessible source download in production.
Public form: local validation for assistance; server repeats validation. Submit sets aria-busy and disables duplicate sends. No success until durable save returns an opaque enquiry reference. Failures retain draft, focus error message and offer retry. No automatic reset.
Step2: entered only after initial success or valid opaque session; all fields optional. Save updates the existing enquiry, never creates a second lead. Skip and Finish leave initial enquiry intact. Back returns to receipt, not resubmission. Expired session explains and provides enquiry contact route without leaking data.
Diagnostic: invitation bound to engagement, authorised recipient, expiry and scope; authentication/authorisation on each request. Public link never grants access. Invalid token shows access state; no record existence leak. Back/draft rules mirror Step2 inside the authorised session.
Upload: optional chooser; list name/size; remove; per-file progress/scanning; reject unsafe files; retry. Never block initial enquiry on document availability.
Review prototype demonstrates local validation, simulated success/failure, menu, accordion and zoom. It intentionally transmits no data; file selection is local. Production security and delivery semantics are specified, not implemented in this review.

## 08 / Evidence CMS and publication workflow

Machine-readable JSON schemas are included in spec/. Canonical evidence is stored once and referenced by ID. Page placement stores asset_id and display order only; no status, role or claim override.
Required: Project, Asset / Record ID, Evidence Type, Date / Revision, Evidence Status, KAZAR Role, Architect / Interior Designer Credit, Source, Claim Supported, Scope, Publication Permission, Verified By, Last Review Date, Alt Text, Asset Path, Supersedes, Acceptance Record, Stage Links.
Status enum exactly PROPOSED / DOCUMENTED DECISION / EXECUTED / ACCEPTED.
Source and asset paths are internal-controlled references; only permission-approved derivatives enter public output. Credit can be “not applicable” only with verifier reason; uncertain credit blocks public issue.
Publication permission must identify grant, scope, approved channels and constraints. Missing permission or verifier blocks publish. A review placeholder remains unpublished. Store original and sanitised public derivative separately.
ACCEPTED requires acceptance-record ID, acceptance scope and date that match the asset's claim. JSON validates presence; application validation resolves the referenced record and scope. EXECUTED requires an actual execution record. A designer render is always PROPOSED and cannot support an execution claim.
Supersedes forms an acyclic same-project record chain. Replacing evidence invalidates cached placements and triggers review; old records remain in audit history. No automatic promotion on reuse.
Stage Links is an array of exact stage IDs plus record reference and relationship. Default relationship is relevant_to; no completion inference. A stage-completion claim requires a separate verified stage assessment outside this model.
Workflow: draft → evidence review → publication permission review → approved public derivative → publish. Status and publication approval are separate axes. Review expiry/revocation unpublishes all affected placements. Audit actor, timestamp, old/new value and source record.

## 09 / Project CMS and reusable page schema

Project fields: Project Name; Public Slug; General Location; Project Type; Client Type; Architect / Designer; KAZAR Role; Scope; Project Stage; Public Status; Hero Evidence Asset; Case Study Sections; Relevant Services; Relevant KAZAR Standard Stages; Publication Permission; SEO Title; SEO Description; OG Image.
Project Stage is an operational description, not evidence status. Public Status uses the canonical evidence vocabulary and must have a scoped supporting claim record; do not infer from the strongest single asset.
Case Study Sections order: identity → primary evidence → scope/challenge → technical evidence → technical resolution → execution/materials → relevant stage → outcome → next step. Each claim paragraph references supporting evidence IDs. Unsupported outcome stays explicitly unverified.
Public slug immutable after publication except reviewed redirect. General location only; public fields must not contain client personal names, exact villa address, access codes or internal project references. Store sensitive operational data outside this public CMS.
Hero and OG reference approved evidence derivatives. OG cannot upgrade status or erase credit where relevant; use typography if no valid image exists. A case may remain public with typography and clear evidence limits only if editorial approval supports its value.
Future service: title, slug, market/location qualifier, approved scope, responsibilities, approach, exclusions, evidence references, related pages, CTA context, SEO fields, publication approval. SEO and service templates share this schema; no separate content-farm type.
Services claims require appointment/capability confirmation; future template copy is instructional and must fail publication preflight until replaced.

## 10 / Forms, API and backend

POST /api/enquiries: required name(1–120 chars), email(valid,<=254), projectStage(approved enum), projectBrief(20–5000). Optional companyRole<=160, preferredChannel(email/phone/unspecified), phone<=40. Phone remains optional even if Phone selected; if absent, explain email fallback. Normalise whitespace and reject control characters; no restrictive Latin-only name validation.
Success 201 only after durable write: {enquiryReference, nextStepToken}. Reference is opaque; token scoped and short-lived. Idempotency-Key prevents duplicate records on retries. Validation422 with field keys; rate limit429 with retry guidance; service503 with retained draft. Never expose internal stack traces.
PATCH /api/enquiries/{opaqueRef}/details requires scoped session/token. All fields optional: project type, location, size, design status, appointed designer, programme, budget, documents, representation. Validate supplied values only. Attach to same enquiry.
POST /api/diagnostic/{engagement}/intake: authenticated invitation; require reference, authorised contact and assessment question. Resolve server-side engagement; ignore client-supplied access scope. No public diagnostic form submission endpoint.
Uploads: proposed production limits5 files,20 MB each,50 MB total; PDF/JPEG/PNG only; DWG or larger packs by controlled follow-up. Enforce client AND server type/signature/size; sanitise filenames, scan malware, strip unnecessary metadata, block active content and quarantine before attachment. Private object storage, signed short-lived download URLs, no executable public uploads.
Spam: server rate limits per IP/session, honeypot excluded from keyboard/AT, minimum plausible form timing; escalate to accessible challenge only when needed. CSRF/origin checks, secure SameSite cookies, TLS, content security policy and safe output encoding.
Notifications: durable enquiry recorded first; queue notification to owner-approved mailbox. Retry failed notification separately; do not lose lead or show false submission failure after a successful save. Minimal acknowledgement to validated email if enabled; no confidential brief/attachments in notification body. Do not send any real notifications from review.
CRM: unselected. Define adapter and field map only; default backend queue/storage plus approved mailbox. Require owner approval of provider, access, mapping, deduplication and privacy terms before integration.
Retention: owner must approve enquiry, engagement, upload, backup and log schedules, deletion workflow and access roles before launch. Do not invent legal retention periods. Avoid full brief/file payloads in analytics and logs. Privacy notice beside submit; no bundled marketing consent.

## 11 / SEO development requirements

Titles: Home “KAZAR | Construction & Interiors Dubai”; service “{Approved service} in Dubai | KAZAR”; case “{Project name} | KAZAR”; Standard “The KAZAR Standard | KAZAR”. Avoid keyword repetition. Descriptions are unique factual summaries, roughly140–160 characters as editorial guidance, not a ranking guarantee.
One self-referencing absolute canonical on the approved live host; HTTPS and one slash policy. Filter/tracking parameters canonicalise to clean equivalent. Never canonicalise every page to Home. Alternate languages only when real equivalent pages exist; Arabic is not assumed.
XML sitemap includes only published indexable200 canonical pages; lastmod reflects content changes. Exclude receipt, qualification, private intake, drafts, template previews, search/testing routes and404. Robots is crawl guidance, not access control. Use meta/X-Robots-Tag noindex for utility workflow pages; protect private routes with auth. Staging must be authenticated plus noindex; do not block crawling as a substitute for removal.
BreadcrumbList uses visible actual hierarchy. Organization uses verified legal name, public URL and approved logo; add address/contact/social links only if verified and public. No invented reviews, ratings, awards or founding dates. Case study may use Article/CreativeWork only when the page is genuinely editorial; do not invent a Google “Project” rich-result type. Do not mark a proposed project as completed construction.
Image alt describes relevant information and evidence status; nearby caption carries full source and credit. Decorative duplicates alt="". Technical complex image has adjacent text equivalent. No keyword stuffing.
Internal links: Services → approved service pages → relevant verified cases → enquiry; Projects → case → relevant service/Standard stage; audience pages → evidence and contextual discussion. No orphan SEO pages, duplicate city permutations or empty service promises.
Verify structured data against current schema.org and Google's supported features during implementation. References: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data ; https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag

## 12 / Domain migration checklist

Technical plan only. kazarbuild.com remains the current domain; kazar.build is the target, not assumed launched or approved for migration.
Before: obtain owner go/no-go; inventory current URLs, status, backlinks, assets, forms, analytics, mail/DNS dependencies; export traffic baselines and full redirect map. Confirm target DNS/TLS, hosting and crawl settings in staging. Keep email routing independent.
Map every valuable old URL to a relevant new200 destination. Use direct server301 redirects, no chains/blanket Home redirect; obsolete pages return410/404 where no relevant equivalent. Include PDFs and assets if externally linked.
At cutover: update canonical host, internal links, structured data URLs, OG URLs and sitemap; test redirects, HTTP→HTTPS, www policy, forms, upload, notifications, analytics consent and receipt paths. Remove staging noindex only on approved public routes.
Search Console: verify both properties; submit new sitemap; use applicable Change of Address workflow; monitor indexing and crawl errors. Keep old property and domain controlled. Retain redirects for at least a year and preferably longer for useful old links, subject to operational plan.
Monitor: daily initial checks of5xx/404, top landing pages, canonical selection, enquiry success and notification queue; then scheduled review. Do not compare only total traffic during transition.
Rollback: preserve pre-cutover deployment/DNS/redirect configuration; define owner, trigger and window. If form or hosting failure is critical, restore previous serving configuration and re-test end-to-end. Reconcile enquiries written during cutover; avoid a second conflicting site with mixed canonicals.
Reference: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

## 13 / Performance targets

Core Web Vitals field goals at75th percentile, mobile and desktop: LCP<=2.5 s, INP<=200 ms, CLS<=0.1. These are acceptance targets, not measurements of this local review. Reference: https://web.dev/articles/vitals
Initial route budget: aim<=200 KB compressed JS and<=80 KB compressed CSS, excluding media/fonts. Load no framework or tracking bundle without a task-specific reason. Split private intake and drawing viewer where practical.
Images: generate responsive AVIF/WebP plus suitable fallback from permission-approved originals; srcset/sizes, explicit width/height, no upscaling. Hero primary visual eager, below-fold assets lazy. Keep linework crisp; use lossless PNG or sanitised SVG for technical drawings when lossy compression damages legibility.
Drawing previews normally<=500 KB where legible; full-resolution source loaded only on request. Use tiled/rasterised derivatives for huge drawings; never ship a full multi-page drawing pack to render one thumbnail. Test actual dimensions before fixed byte goals.
Fonts: self-host approved licensed WOFF2 subsets; preload only the above-fold essential face, font-display swap with measured fallback metrics to avoid shifts. No synthetic bold; include Cyrillic only where used. Bundled TTF review fonts are source references, not the production loading strategy.
Keep layout stable during font/image loads. No autoplay dependence, continuous animations, cinematic loader or parallax. Prefer server-rendered semantic content and progressive enhancement. Cache fingerprinted static assets; revalidate CMS HTML when evidence permissions change.
Measure representative routes on mid-range phone/throttled network and real field telemetry after launch, without recording personal enquiry content.

## 14 / Accessibility acceptance

Target WCAG2.2 AA. Requirement, not certification. Reference: https://www.w3.org/WAI/WCAG22/quickref/
Keyboard: every control reachable and operable; skip link; logical focus order; visible2 px focus with sufficient contrast; sticky header must not obscure focused elements. Menu and drawing dialog trap focus only while open and restore it on close.
Semantics: one meaningful H1, ordered headings, landmarks, native buttons/select/details; link text names its destination. No click-only div controls.
Forms: explicit labels, required/optional text, autocomplete where applicable, errors associated by aria-describedby and aria-invalid, summary links, announcement of new failure/success. Preserve values and do not require re-entering known information. No mandatory uploads in public enquiry.
Contrast:4.5:1 normal text;3:1 large text and essential non-text controls. Do not use Taupe-only input boundary when insufficient. Status and error never rely on colour alone.
Zoom/reflow:320 CSS px,200% text size,400% zoom without loss of content/functions; intentional drawing pan is contained. 44×44 px preferred touch targets; ensure applicable WCAG2.2 minimum target spacing/size. No drag-only action.
Images: informative alt, decorative null alt, complex drawing text summary plus caption and accessible permitted source. Evidence status/credit visible at every responsive size and inside viewer.
Motion: respect prefers-reduced-motion; instant state changes are valid. No autoplay dependence/flashing. Menu overlay scrolls on short devices; Escape works; background inert.
Acceptance matrix: keyboard-only Chrome/Firefox/Safari; VoiceOver Safari/iOS; NVDA Windows; Android TalkBack; browser zoom/text enlargement; forced colours; reduced motion; real touch. Test both success/failure and file rejection flows. Document remaining limitations before publishing Accessibility statement.

## 15 / Development handoff and release gates

Design assets: approved logo vectors, palette and font sources, final HTML/CSS review, full desktop/mobile screens, component matrix, tokens and two CMS JSON schemas. Preserve source credits and font licences.
Content gate: verified project permissions, public founder portrait if used, exact company contact details, legal content and approved service copy. Never substitute stock luxury imagery.
Backend gate: hosting and storage ownership, notification recipient, retention/deletion, authorised Diagnostic access, file scanning, privacy notice and CRM decision. Review has no backend and no real submissions.
Engineering gate: route mapping, canonical host config, CMS relational validators, evidence audit log, API validation/idempotency, token access controls, request monitoring, queued notification retry, upload quarantine.
QA gate: all routes at320/390/430/768/1024/1366/1440; long credit/name strings; empty/error/loading/disabled states; keyboard/AT; native iOS/Android; contact→received→optional details→finish/back; private intake invalid/valid invitation; upload type/size/malware rejection; offline/timeout; no duplicate enquiry on retry.
Preflight: no unresolved template copy in public routes; no private addresses; no stronger evidence status on reused assets; no fake awards; stage order exact; no new palette/font; no dead internal link; correct HTTP404; legal pages approved.
Launch is a separate explicit go/no-go. Domain migration is a checklist only. Final UI package approval completes the website design/specification phase; it does not certify deployed functionality or approve a domain switch.