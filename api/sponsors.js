const FALLBACK_SPONSORS = [
  {
    id: "karnel-sponsor-open",
    name: "Karnel-Termux",
    message: "Espaço de patrocínio disponível para ferramentas de desenvolvimento.",
    url: "https://github.com/israelmarques1024-dotcom/karnel-termux/blob/main/SPONSORSHIP.md",
    enabled: true,
  },
];

function cleanText(value, maxLength) {
  return String(value ?? "")
    .replace(/[\t\r\n\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanUrl(value) {
  try {
    const parsed = new URL(String(value ?? ""));
    if (parsed.protocol !== "https:") return null;
    return parsed.toString().slice(0, 300);
  } catch {
    return null;
  }
}

function normalizeSponsor(candidate) {
  const id = cleanText(candidate?.id, 64);
  const name = cleanText(candidate?.name, 60);
  const message = cleanText(candidate?.message, 160);
  const url = cleanUrl(candidate?.url);

  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) return null;
  if (!name || !message || !url) return null;

  const startsAt = candidate?.startsAt ? Date.parse(candidate.startsAt) : null;
  const endsAt = candidate?.endsAt ? Date.parse(candidate.endsAt) : null;

  return {
    id,
    name,
    message,
    url,
    enabled: candidate?.enabled !== false,
    startsAt: Number.isFinite(startsAt) ? startsAt : null,
    endsAt: Number.isFinite(endsAt) ? endsAt : null,
  };
}

function loadSponsors() {
  const raw = process.env.KARNEL_SPONSORS_JSON;
  if (!raw) return FALLBACK_SPONSORS;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function activeSponsors(now = Date.now()) {
  return loadSponsors()
    .map(normalizeSponsor)
    .filter(Boolean)
    .filter((sponsor) => sponsor.enabled)
    .filter((sponsor) => sponsor.startsAt === null || sponsor.startsAt <= now)
    .filter((sponsor) => sponsor.endsAt === null || sponsor.endsAt >= now)
    .map(({ startsAt, endsAt, enabled, ...publicSponsor }) => publicSponsor);
}

function wantsText(req) {
  const format = Array.isArray(req.query?.format)
    ? req.query.format[0]
    : req.query?.format;
  const accept = String(req.headers?.accept ?? "");
  return format === "tsv" || accept.includes("text/plain");
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD, OPTIONS");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const sponsors = activeSponsors();

  if (wantsText(req)) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    const body = sponsors
      .map((sponsor) => [sponsor.id, sponsor.name, sponsor.message, sponsor.url].join("\t"))
      .join("\n");
    res.status(200).send(body ? `${body}\n` : "");
    return;
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).json({ schemaVersion: 1, sponsors });
}
