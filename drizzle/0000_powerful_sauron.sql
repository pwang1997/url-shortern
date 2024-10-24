CREATE TABLE IF NOT EXISTS "url-shortener_urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"domain" varchar(256),
	"long_url" varchar(256),
	"short_url" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
