# Cloudflare DNS setup

This project includes a protected server-side API for managing DNS records through Cloudflare.

## Files added

- `src/lib/cloudflare.ts` - reusable Cloudflare DNS client
- `src/app/api/cloudflare/dns-records/route.ts` - protected API endpoint for listing and upserting DNS records

## Required environment variables

Add these in your hosting provider's environment settings, for example Vercel Project Settings > Environment Variables.

```env
CLOUDFLARE_API_TOKEN=your_restricted_cloudflare_token
CLOUDFLARE_ZONE_ID=your_zone_id
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ADMIN_SECRET=make_a_long_random_admin_secret
```

Use a restricted Cloudflare token, not the global key. The token only needs:

- Zone Read
- DNS Edit

Limit it to the specific domain/zone this project should control.

## List DNS records

```bash
curl "https://your-domain.com/api/cloudflare/dns-records" \
  -H "x-admin-secret: your_admin_secret"
```

Optional filters:

```bash
curl "https://your-domain.com/api/cloudflare/dns-records?type=A&name=example.com" \
  -H "x-admin-secret: your_admin_secret"
```

## Create or update a DNS record

```bash
curl -X POST "https://your-domain.com/api/cloudflare/dns-records" \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your_admin_secret" \
  -d '{
    "type": "A",
    "name": "@",
    "content": "123.123.123.123",
    "proxied": true
  }'
```

For `www`:

```bash
curl -X POST "https://your-domain.com/api/cloudflare/dns-records" \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: your_admin_secret" \
  -d '{
    "type": "CNAME",
    "name": "www",
    "content": "example.com",
    "proxied": true
  }'
```

## Safety notes

- Do not commit live tokens or keys to GitHub.
- Rotate any global key that has been pasted into chat or exposed elsewhere.
- Keep the admin secret different from the Cloudflare token.
- The current route supports list and upsert only. It does not expose DNS delete operations.
