import posthog from 'posthog-js';
import { SocialShare } from '../types';

export const initAnalytics = () => {
  posthog.init('YOUR_POSTHOG_KEY', {
    api_host: 'https://app.posthog.com',
  });
};

export const trackSignup = (email: string, hasOptionalFields: boolean) => {
  posthog.capture('waitlist_signup', {
    email,
    provided_optional_fields: hasOptionalFields,
  });
};

export const trackSocialShare = (share: SocialShare) => {
  posthog.capture('social_share_click', {
    platform: share.platform,
  });
};