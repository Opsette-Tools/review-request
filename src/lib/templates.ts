import { MessageTemplate } from './types';

export const DEFAULT_TEMPLATES: MessageTemplate[] = [
  {
    id: 'professional',
    name: 'Professional',
    body: 'Hi [Client Name], thank you for choosing [Business Name]. If you were happy with the service, a quick review would mean a lot to us: [link]',
    isCustom: false,
  },
  {
    id: 'warm',
    name: 'Warm & Personal',
    body: "Hey [Client Name]! It was great working with you today. If you have a sec, I'd really appreciate a review — it helps small businesses like mine more than you'd think: [link] Thanks! — [Owner Name]",
    isCustom: false,
  },
  {
    id: 'short',
    name: 'Short & Sweet',
    body: "[Client Name] — thanks for today! If you'd leave a quick review, I'd really appreciate it: [link] 🙏",
    isCustom: false,
  },
  {
    id: 'followup',
    name: 'Follow-Up',
    body: "Hi [Client Name], just following up from the other day. Hope everything's still looking great! If you get a chance, a review would really help: [link] Thank you! — [Owner Name]",
    isCustom: false,
  },
  {
    id: 'referral',
    name: 'Referral Ask',
    body: "Hey [Client Name], thanks again for your business! If you were happy with the work, two things would really help me out: a quick review at [link], and if you know anyone who could use [service type], I'd love the referral. Thank you! — [Owner Name]",
    isCustom: false,
  },
];
