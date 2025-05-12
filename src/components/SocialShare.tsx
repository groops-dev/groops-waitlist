import "react-social-icons/bsky.app";
import "react-social-icons/facebook";
import "react-social-icons/twitter";

import { SocialIcon } from "react-social-icons/component";
import { SocialShare as SocialShareType } from "../types";
import { trackSocialShare } from "../utils/analytics";

const SHARE_TEXT = encodeURIComponent(
  "Join me on the Groops waitlist - find and connect with like-minded people! 🤝"
);
const SHARE_URL = encodeURIComponent("https://groops.app");

const SOCIAL_SHARES: ReadonlyArray<SocialShareType> = [
  {
    platform: "facebook",
    url: `https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`,
    iconUrl: "www.facebook.com",
  },
  {
    platform: "twitter",
    url: `https://twitter.com/intent/tweet?text=${SHARE_TEXT}&url=${SHARE_URL}`,
    iconUrl: "www.twitter.com",
  },
  {
    platform: "bluesky",
    url: `https://bsky.app/intent/compose?text=${SHARE_TEXT}%20${SHARE_URL}`,
    iconUrl: "www.bsky.app",
  },
];

export const SocialShare = () => {
  const handleShare = (share: SocialShareType) => {
    trackSocialShare(share);
    window.open(share.url, "_blank");
  };

  return (
    <div className="flex space-x-2 items-center justify-center mt-6">
      <span className="text-sm text-gray-600">Share with friends:</span>
      {SOCIAL_SHARES.map((share) => {
        return (
          <button
            key={share.platform}
            onClick={() => handleShare(share)}
            className="text-gray-600 hover:text-rose-500 transition-colors"
            aria-label={`Share on ${share.platform}`}
          >
            <SocialIcon url={share.iconUrl} style={{ width: 32, height: 32 }} />
          </button>
        );
      })}
    </div>
  );
};
