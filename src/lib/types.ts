export type ReviewPlatform = 'google' | 'yelp' | 'facebook' | 'nextdoor';

export interface BusinessSettings {
  businessName: string;
  googleReviewUrl: string;
  yelpReviewUrl: string;
  facebookReviewUrl: string;
  nextdoorReviewUrl: string;
  preferredPlatform: ReviewPlatform;
  ownerName: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  body: string;
  isCustom: boolean;
}

export type ReviewStatus = 'unknown' | 'pending' | 'reviewed';

export interface HistoryEntry {
  id: string;
  clientName: string;
  serviceType: string;
  dateSent: string;
  platform: ReviewPlatform;
  templateName: string;
  message: string;
  reviewStatus: ReviewStatus;
}
