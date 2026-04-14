import { BusinessSettings } from './types';

export function renderMessage(
  template: string,
  clientName: string,
  serviceType: string,
  platform: 'google' | 'yelp',
  settings: BusinessSettings | null
): string {
  const link =
    platform === 'google'
      ? settings?.googleReviewUrl || '[Google Review Link]'
      : settings?.yelpReviewUrl || '[Yelp Review Link]';

  return template
    .replace(/\[Client Name\]/g, clientName || '[Client Name]')
    .replace(/\[Business Name\]/g, settings?.businessName || '[Business Name]')
    .replace(/\[Owner Name\]/g, settings?.ownerName || '[Owner Name]')
    .replace(/\[link\]/g, link)
    .replace(/\[service type\]/g, serviceType || '[service type]');
}
