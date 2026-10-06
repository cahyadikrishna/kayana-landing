import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";
import { token } from "@/sanity/token";

// Called by the Studio's Presentation tool with a signed secret
const enable = token ? defineEnableDraftMode({ client: client.withConfig({ token }) }) : null;

export function GET(request: Request) {
  if (!enable) {
    return new Response("Draft mode unavailable: SANITY_API_READ_TOKEN is not set", { status: 503 });
  }
  return enable.GET(request);
}
