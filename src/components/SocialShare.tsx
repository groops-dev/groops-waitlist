import "react-social-icons/bsky.app";
import "react-social-icons/facebook";
import "react-social-icons/twitter";
import "react-social-icons/instagram";
import "react-social-icons/x";
import "react-social-icons/tiktok";
import "react-social-icons/whatsapp";

import { SocialIcon } from "react-social-icons/component";
import { SocialShare as SocialShareType } from "../types";
import { trackSocialShare, trackSocialView } from "../utils/analytics";

const SHARE_TEXT = encodeURIComponent(
  "Join me on the Groops waitlist - find and connect with like-minded people! 🤝"
);
const SHARE_URL = encodeURIComponent("https://groops.club");

const SOCIAL_SHARES: ReadonlyArray<SocialShareType> = [
  {
    platform: "facebook",
    url: `https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`,
    iconUrl: "www.facebook.com",
  },
  {
    platform: "twitter",
    url: `https://twitter.com/intent/tweet?text=${SHARE_TEXT}&url=${SHARE_URL}`,
    iconUrl: "www.x.com",
  },
  {
    platform: "bluesky",
    url: `https://bsky.app/intent/compose?text=${SHARE_TEXT}%20${SHARE_URL}`,
    iconUrl: "www.bsky.app",
  },
  {
    platform: "whatsapp",
    url: `https://wa.me/?text=${SHARE_TEXT}%20${SHARE_URL}`,
    iconUrl: "www.whatsapp.com",
  },
];

export function SocialShare() {
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
            <SocialIcon
              url={share.iconUrl}
              style={{ width: 32, height: 32 }}
              as="div"
            />
          </button>
        );
      })}
    </div>
  );
}

const GROOPS_SOCIAL_LINKS = [
  {
    platform: "facebook",
    url: "https://www.facebook.com/WeAreGroops",
    iconUrl: "www.facebook.com",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/wearegroops",
    iconUrl: "www.instagram.com",
  },
  {
    platform: "tiktok",
    url: "https://www.tiktok.com/@wearegroops",
    iconUrl: "www.tiktok.com",
  },
  {
    platform: "twitter",
    url: "https://www.x.com/wearegroops",
    iconUrl: "www.x.com",
  },
  {
    platform: "bluesky",
    url: "https://bsky.app/profile/did:plc:47evncoti6bedmqxal7x4zyo",
    iconUrl: "www.bsky.app",
  },
];

export function GroopsSocialLinks() {
  const handleSharePress = (url: string, platform: string) => {
    trackSocialView(platform);
    window.open(url, "_blank");
  };

  return (
    <div className="flex space-x-2 items-center justify-center">
      <span className="text-sm text-gray-800">Follow us:</span>
      {GROOPS_SOCIAL_LINKS.map(({ platform, url, iconUrl }) => {
        return (
          <button
            key={platform}
            className="text-gray-600 hover:text-rose-500 transition-colors"
            onClick={() => handleSharePress(url, platform)}
            aria-label={`Follow us on ${platform}`}
          >
            <SocialIcon
              url={iconUrl}
              style={{ width: 32, height: 32 }}
              bgColor="#e5e7eb"
              fgColor="#ff2d6a"
              href={url}
              as="div"
            />
          </button>
        );
      })}
    </div>
  );
}
