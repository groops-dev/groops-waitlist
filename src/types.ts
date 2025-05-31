export interface WaitListFormData {
  email: string;
  name?: string;
  location?: string;
  acceptedTerms: boolean;
}

export interface SocialShare {
  platform: "facebook" | "linkedin" | "twitter" | "bluesky" | "whatsapp";
  url: string;
  iconUrl: string;
}
