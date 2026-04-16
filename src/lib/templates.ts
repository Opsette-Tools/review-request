import { MessageTemplate } from './types';

export const DEFAULT_TEMPLATES: MessageTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    body: 'Hi [Client Name], thank you for choosing [Business Name] for your [service type]. If you were happy with the results, a quick review would mean a lot to our team: [link]',
    isCustom: false,
  },
  {
    id: 'warm',
    name: 'Warm',
    body: "Hey [Client Name]! It was great working with you on the [service type] today. If you have a minute, I'd really appreciate a review — it helps small businesses like mine grow more than you'd think: [link]\n\nThank you! — [Owner Name]",
    isCustom: false,
  },
  {
    id: 'short',
    name: 'Short & Sweet',
    body: "Hi [Client Name] — thanks for choosing us! If you'd leave a quick review, it would really help us out: [link]",
    isCustom: false,
  },
  {
    id: 'followup',
    name: 'Follow-Up',
    body: "Hi [Client Name], just checking in from the [service type] the other day. Hope everything is still looking great! If you get a chance, a review would really help us out: [link]\n\nThank you! — [Owner Name]",
    isCustom: false,
  },
  {
    id: 'referral',
    name: 'Referral Ask',
    body: "Hey [Client Name], thanks again for trusting [Business Name] with your [service type]! If you were happy with the work, two things would really help me out:\n\n1. A quick review here: [link]\n2. If you know anyone who could use similar help, I'd love the referral.\n\nThank you! — [Owner Name]",
    isCustom: false,
  },
  {
    id: 'firsttime',
    name: 'First Time',
    body: "Hi [Client Name], it was a pleasure meeting you and handling the [service type] today! We hope [Business Name] exceeded your expectations. If you have a moment, we'd love to hear your thoughts: [link]\n\nWelcome to the family! — [Owner Name]",
    isCustom: false,
  },
];
