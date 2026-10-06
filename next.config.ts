import type { NextConfig } from "next";

// Only these origins may frame the site: the hosted Studio and the Sanity
// Dashboard (Presentation tool), plus local `sanity dev` in development.
const frameAncestors = [
  "'self'",
  "https://kayanamoment.sanity.studio",
  "https://www.sanity.io",
  ...(process.env.NODE_ENV === "development" ? ["http://localhost:*"] : []),
];

// Structural CSP only — a script-src would need per-request nonces, which
// would make every page dynamic (see issue #15).
const contentSecurityPolicy = [
  `frame-ancestors ${frameAncestors.join(" ")}`,
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
