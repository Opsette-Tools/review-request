export interface BusinessSettings {
  businessName: string;
  googleReviewUrl: string;
  yelpReviewUrl: string;
  preferredPlatform: 'google' | 'yelp';
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
  platform: 'google' | 'yelp';
  templateName: string;
  message: string;
  reviewStatus: ReviewStatus;
}
