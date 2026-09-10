CREATE TABLE IF NOT EXISTS enquiries (
 reference TEXT PRIMARY KEY,
 idempotency_key TEXT UNIQUE NOT NULL,
 payload_hash TEXT NOT NULL,
 payload TEXT NOT NULL,
 details TEXT NOT NULL DEFAULT '{}',
 token_hash TEXT NOT NULL,
 token_expires INTEGER NOT NULL,
 created_at INTEGER NOT NULL,
 updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS notification_outbox (
 enquiry_reference TEXT PRIMARY KEY REFERENCES enquiries(reference),
 status TEXT NOT NULL DEFAULT 'NOT_CONNECTED',
 created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS rate_limits (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL);
