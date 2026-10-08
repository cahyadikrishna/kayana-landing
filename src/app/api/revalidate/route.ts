import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import type { NextRequest } from "next/server";

// Called by the Sanity GROQ webhook on publish. Expires every Sanity-backed fetch.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("SANITY_REVALIDATE_SECRET is not set", { status: 503 });
  const { isValidSignature } = await parseBody(request, secret);
  if (!isValidSignature) return new Response("Invalid signature", { status: 401 });
  revalidateTag("sanity", { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
