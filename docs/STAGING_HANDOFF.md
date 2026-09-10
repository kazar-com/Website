# Staging handoff — implementation, not deployment

Status: runnable local build. No staging deployment or public release has occurred.

## Existing approach
Preserve the supplied HTML/CSS and page fragments; serve generated HTML with a small Node.js 24 server. There are no runtime npm dependencies. SQLite is suitable for this single-instance local review; it is not an ephemeral serverless filesystem. Node documentation: https://nodejs.org/api/sqlite.html . The standard Web Request/Response backend also exports a Worker-compatible fetch handler, but no Cloudflare deployment or D1 acceptance is claimed.

## Source map
- source/approved-pages.json: unchanged approved fragments; private source, NEVER static-host this folder.
- source/header.html: original header markup with logo references externalised.
- public/approved.css: unchanged approved CSS.
- public/implementation.css: functional notice/focus/placeholder adaptations.
- public/app.js and validation.js: behaviour and shared validation.
- contracts/public-contact.json: current owner-approved public facts.
- scripts/build.mjs: source-to-HTML build and explicit removal of withheld evidence.
- server/local.mjs: local HTTP bridge and Basic protection for non-loopback staging.
- server/worker.mjs: request handler; dist/server/index.js is its ESM build.
- server/database.mjs and migrations/: SQLite adapter and initial schema.
- contracts/: approved tokens, CMS schemas, forms and component requirements.
- dist/client/: generated review frontend ONLY; publishing it as a static site would not implement the backend.

## Node staging option
Use one Node 24 instance, TLS reverse proxy, persistent encrypted disk, backup/restore process and restricted administrative access. Set APP_ORIGIN to the exact protected staging origin. Set HOST=0.0.0.0 only with STAGING_USER and a random STAGING_PASSWORD (20+ characters) configured securely. Gate ALL routes/assets, not just the home page. Basic Auth is required by this implementation for non-loopback; combine with organisational access control if available. Do not remove it to get a health check working; configure authenticated health checks. Terminate TLS before sending any credentials.

No committed .env, live database, secret or credentials are included. APP_SECRET is generated locally at first start; persist the data directory. Set backup, restore, retention, log access and key-management policies before real enquiries. The outbox is NOT_CONNECTED and has no delivery worker. The operator CLI can verify stored synthetic entries without exposing a public admin API.

## Worker option if later selected
The ESM fetch handler requires DB with prepare/bind/first/run and transactional batch, ASSETS.fetch, APP_ORIGIN, APP_SECRET and trusted client-IP metadata. Provision D1, apply reviewed schema migrations and authenticated staging at the edge; retest cookies, durable transactions, duplicate handling and static route guards. Do not deploy the bare Worker assuming access control/ASSETS routing exists. The Node bridge currently owns static mapping, security headers, Basic Auth and request-size limits. Port these explicitly. D1 resources, migration tooling and Cloudflare credentials are not configured by this delivery.

## Genuine enquiry contract
POST /api/enquiries returns 201 after the enquiry and notification-outbox row commit. Idempotency-Key has a unique database constraint; changed payload under the same key returns 409. Validation 422, invalid origin 403, rate limit 429, oversized JSON 413, storage failure 503. No raw stack traces. Client keeps the same request key for retries, retains the safe draft in sessionStorage and clears it after confirmed success. This storage is a temporary UI draft, never the authoritative enquiry store.

Response includes opaque enquiryReference. A two-hour HttpOnly SameSite=Strict cookie, Secure under HTTPS, scopes receipt/details access. PATCH /api/enquiries/{reference}/details updates the same record after token/reference validation. A direct success URL without a valid stored session redirects to Contact. The spec's nextStepToken is transported in an HttpOnly cookie instead of exposed in JSON, to keep it unavailable to page scripts. This is an implementation security choice, not a UX change.

Email: enqueue first, dispatch later through approved provider; retry independently of enquiry receipt. Do not change a successfully saved enquiry to a submission failure just because notification fails. No review notifications are sent. Do not put confidential brief contents into notification subjects/logs. CRM remains unselected.

Upload endpoints deliberately return unavailable until private storage, content checks and scanning exist. The disabled optional control preserves the 5 / 20 MB / 50 MB contract. No public intake endpoint accepts Diagnostic submissions.

## Acceptance gates
- Complete browser journey on desktop and phone; 320/390/430/768/1024/1366/1440.
- Keyboard menu, Escape/focus return, accordion, labels/error focus, 200% zoom/reflow, reduced motion, approved fonts actually loaded.
- Test disconnect/retry; simultaneous duplicate request; timeout after committed save; cookie expiry; cross-origin requests; forged ref; persistent disk restart and restore.
- Verify email provider delivery separately, including failure retry; don't confuse DB receipt with inbox delivery.
- Approve privacy/legal content, retention, access roles and real asset permissions.
- Native staging QA and explicit owner GO before public launch.

No DNS, domain redirect, email routing or public migration is performed. kazar.build / info@kazar.build are approved public facts independently of deployment. kazarbuild.com is legacy only.
