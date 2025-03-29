import React from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { SocialShare as SocialShareType } from '../types';
import { trackSocialShare } from '../utils/analytics';

const SHARE_TEXT = encodeURIComponent('Join me on the Groops waitlist - find and connect with like-minded people! 🤝');
const SHARE_URL = encodeURIComponent('https://groops.app');

const SOCIAL_SHARES: SocialShareType[] = [
  {
    platform: 'facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`,
  },
  {
    platform: 'linkedin',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${SHARE_URL}`,
  },
  {
    platform: 'twitter',
    url: `https://twitter.com/intent/tweet?text=${SHARE_TEXT}&url=${SHARE_URL}`,
  },
  {
    platform: 'bluesky',
    url: `https://bsky.app/intent/compose?text=${SHARE_TEXT}%20${SHARE_URL}`,
  },
];

const IconMap = {
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  bluesky: Twitter, // Using Twitter icon as placeholder for BlueSky
};

export const SocialShare = () => {
  const handleShare = (share: SocialShareType) => {
    trackSocialShare(share);
    window.open(share.url, '_blank');
  };

  return (
    <div className="flex gap-4 items-center justify-center mt-6">
      <span className="text-sm text-gray-600">Share with friends:</span>
      {SOCIAL_SHARES.map((share) => {
        const Icon = IconMap[share.platform];
        return (
          <button
            key={share.platform}
            onClick={() => handleShare(share)}
            className="p-2 text-gray-600 hover:text-rose-500 transition-colors"
            aria-label={`Share on ${share.platform}`}
          >
            <Icon size={20} />
          </button>
        );
      })}
    </div>
  );
};