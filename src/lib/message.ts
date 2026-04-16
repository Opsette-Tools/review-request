import { BusinessSettings, ReviewPlatform } from './types';

const PLATFORM_LABELS: Record<ReviewPlatform, string> = {
  google: 'Google Review Link',
  yelp: 'Yelp Review Link',
  facebook: 'Facebook Review Link',
  nextdoor: 'Nextdoor Review Link',
};

function getReviewUrl(platform: ReviewPlatform, settings: BusinessSettings | null): string {
  if (!settings) return `[${PLATFORM_LABELS[platform]}]`;
  const urls: Record<ReviewPlatform, string> = {
    google: settings.googleReviewUrl,
    yelp: settings.yelpReviewUrl,
    facebook: settings.facebookReviewUrl,
    nextdoor: settings.nextdoorReviewUrl,
  };
  return urls[platform] || `[${PLATFORM_LABELS[platform]}]`;
}

export function renderMessage(
  template: string,
  clientName: string,
  serviceType: string,
  platform: ReviewPlatform,
  settings: BusinessSettings | null
): string {
  const link = getReviewUrl(platform, settings);

  return template
    .replace(/\[Client Name\]/g, clientName || '[Client Name]')
    .replace(/\[Business Name\]/g, settings?.businessName || '[Business Name]')
    .replace(/\[Owner Name\]/g, settings?.ownerName || '[Owner Name]')
    .replace(/\[link\]/g, link)
    .replace(/\[service type\]/g, serviceType || '[service type]');
}
