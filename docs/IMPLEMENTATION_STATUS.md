# Implementation status — startup correction

- Runtime actually used: Node.js 24.19.0, Linux.
- Build: PASS; 17 routes, approved CSS and original logos retained.
- Automated tests: 8 PASS, 0 FAIL.
- Startup in a directory containing spaces, # and %: PASS, actual child process and HTTP response.
- Windows drive-letter/file URL decoding: PASS on Linux using explicit Windows path semantics.
- Native Windows startup: NOT RUN; Windows environment required. Same regression is portable and ready to run there.
- HTTP enquiry acceptance, restart persistence, duplicate prevention, validation, failure response, details: PASS.
- Local SQLite backup/restore: PASS; existing destination is not overwritten.
- Authentication on pages, assets and API: PASS locally; source/database/secret paths remain inaccessible after authentication.
- Notification queue retry: PASS with clearly synthetic transport only. Provider not selected/connected. No email sent; no receipt confirmed.
- Browser click journey, phone layouts, mobile menu, focus and network retry: NOT COMPLETED. Previous managed browser could not reach loopback server. No new browser pass claimed.
- Protected staging URL: NONE; hosting and secure access not provided.
- HTTPS / persistent hosting storage / production restore: NOT TESTED on hosting.
- Al Furjan: HOLD. Image placeholders remain review-only; legal publication approval pending.
- Uploads: UNAVAILABLE. Private Diagnostic intake: UNAVAILABLE.

## Single owner access list
1. Identify the approved Node.js/SQLite staging host, staging URL, persistent private volume and responsible administrator; invite the developer securely. Provide TLS/authentication and backup ownership through that environment. No framework change or paid service is assumed.
2. Identify the approved transactional email service (or existing supported mail service), authorised From address and secure configuration/invitation; recipient remains info@kazar.build. Provide a permitted mailbox receipt-verification method. No passwords or tokens in chat.
3. Provide a Windows 24.x test environment/operator for native startup acceptance, plus desktop/mobile browser access to the protected staging URL.

## Notification integration boundary
server/notifications.mjs exports dispatchNotifications(db, transport). It has no network transport or scheduler enabled. The selected adapter must enforce a timeout shorter than the two-minute lease and provider-side idempotency, then return providerId on acceptance. RETRY uses backoff; after five failed attempts it requires MANUAL_REVIEW. A provider webhook/poll or actual mailbox inspection is still required to establish delivery. Never set DELIVERED from a successful send response. Notification text contains only the saved enquiry reference, not the private brief.

No DNS, email routing, redirects, public publication or paid service changes were made.
