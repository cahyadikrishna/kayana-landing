import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { token } from "./token";

// The browser token is only sent to the browser while draft mode is on
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token ?? false,
  browserToken: token ?? false,
});
