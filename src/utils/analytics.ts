import posthog from "posthog-js";
import { SocialShare } from "../types";

export const initAnalytics = () => {
  const posthogApiKey = import.meta.env.VITE_POSTHOG_API_KEY;
  const posthogHost = import.meta.env.VITE_POSTHOG_HOST;
  if (!posthogApiKey || !posthogHost) {
    console.warn("PostHog API key or host not found");
    return;
  }
  posthog.init(posthogApiKey, {
    api_host: `https://${posthogHost}.posthog.cloud`,
  });
};

export const trackSignup = (email: string, hasOptionalFields: boolean) => {
  posthog.capture("waitlist_signup", {
    email,
    provided_optional_fields: hasOptionalFields,
  });
};

export const trackSocialShare = (share: SocialShare) => {
  posthog.capture("social_share_click", {
    platform: share.platform,
  });
};

export function optInAnalytics() {
  posthog.opt_in_capturing();
}

export function optOutAnalytics() {
  posthog.opt_out_capturing();
}
