import { useState, useEffect } from 'react';
import { BusinessSettings, ReviewPlatform } from '@/lib/types';
import { getSettings, saveSettings } from '@/lib/storage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
}

const empty: BusinessSettings = {
  businessName: '',
  googleReviewUrl: '',
  yelpReviewUrl: '',
  facebookReviewUrl: '',
  nextdoorReviewUrl: '',
  preferredPlatform: 'google',
  ownerName: '',
};

const PLATFORM_OPTIONS: { value: ReviewPlatform; label: string }[] = [
  { value: 'google', label: 'Google' },
  { value: 'yelp', label: 'Yelp' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'nextdoor', label: 'Nextdoor' },
];

export default function SettingsDialog({ open, onOpenChange, onSave }: SettingsDialogProps) {
  const [form, setForm] = useState<BusinessSettings>(empty);

  useEffect(() => {
    if (open) {
      setForm(getSettings() || empty);
    }
  }, [open]);

  const handleSave = () => {
    if (!form.businessName.trim()) return;
    saveSettings(form);
    onSave?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Business Settings</DialogTitle>
          <DialogDescription>Set up your business info. This auto-fills into every message.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="bizName">Business Name *</Label>
            <Input
              id="bizName"
              className="mt-1"
              placeholder="e.g. Marcus's Lawn Care"
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="ownerName">Your First Name</Label>
            <Input
              id="ownerName"
              className="mt-1"
              placeholder="e.g. Marcus"
              value={form.ownerName}
              onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="googleUrl">Google Review URL</Label>
            <Input
              id="googleUrl"
              className="mt-1"
              placeholder="https://g.page/..."
              value={form.googleReviewUrl}
              onChange={(e) => setForm({ ...form, googleReviewUrl: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="yelpUrl">Yelp Review URL</Label>
            <Input
              id="yelpUrl"
              className="mt-1"
              placeholder="https://yelp.com/biz/..."
              value={form.yelpReviewUrl}
              onChange={(e) => setForm({ ...form, yelpReviewUrl: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="facebookUrl">Facebook Review URL</Label>
            <Input
              id="facebookUrl"
              className="mt-1"
              placeholder="https://facebook.com/..."
              value={form.facebookReviewUrl}
              onChange={(e) => setForm({ ...form, facebookReviewUrl: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="nextdoorUrl">Nextdoor Review URL</Label>
            <Input
              id="nextdoorUrl"
              className="mt-1"
              placeholder="https://nextdoor.com/..."
              value={form.nextdoorReviewUrl}
              onChange={(e) => setForm({ ...form, nextdoorReviewUrl: e.target.value })}
            />
          </div>
          <div>
            <Label>Preferred Platform</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {PLATFORM_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm({ ...form, preferredPlatform: value })}
                  className={`py-2.5 rounded-md text-sm font-medium transition-colors duration-200 min-h-[44px] ${
                    form.preferredPlatform === value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground border border-border'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={!form.businessName.trim()}
            className="w-full min-h-[44px] text-sm font-medium"
          >
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
