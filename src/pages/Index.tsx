import { useState, useEffect, useCallback } from 'react';
import { Settings, Clock, Sparkles, X } from 'lucide-react';
import { BusinessSettings, MessageTemplate } from '@/lib/types';
import { getSettings, getCustomTemplates, addHistoryEntry, addRecentService, getRecentServices } from '@/lib/storage';
import { DEFAULT_TEMPLATES } from '@/lib/templates';
import { renderMessage } from '@/lib/message';
import SettingsDialog from '@/components/SettingsDialog';
import HistorySheet from '@/components/HistorySheet';
import TemplatePills from '@/components/TemplatePills';
import MessagePreview from '@/components/MessagePreview';
import CopyButton from '@/components/CopyButton';
import CustomTemplateDialog from '@/components/CustomTemplateDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Index() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [customTplOpen, setCustomTplOpen] = useState(false);

  const [clientName, setClientName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [platform, setPlatform] = useState<'google' | 'yelp'>('google');
  const [message, setMessage] = useState('');
  const [showSentPrompt, setShowSentPrompt] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const [allTemplates, setAllTemplates] = useState<MessageTemplate[]>(DEFAULT_TEMPLATES);
  const [recentServices, setRecentServices] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  const refreshTemplates = useCallback(() => {
    setAllTemplates([...DEFAULT_TEMPLATES, ...getCustomTemplates()]);
  }, []);

  const refreshSettings = useCallback(() => {
    const s = getSettings();
    setSettings(s);
    if (s) setPlatform(s.preferredPlatform);
  }, []);

  useEffect(() => {
    const s = getSettings();
    setSettings(s);
    if (!s) setSettingsOpen(true);
    else setPlatform(s.preferredPlatform);
    refreshTemplates();
  }, [refreshTemplates]);

  useEffect(() => {
    const tpl = allTemplates.find((t) => t.id === selectedTemplate);
    if (tpl) {
      setMessage(renderMessage(tpl.body, clientName, serviceType, platform, settings));
    }
  }, [clientName, serviceType, selectedTemplate, platform, settings, allTemplates]);

  const hasUrls = settings && (settings.googleReviewUrl || settings.yelpReviewUrl);
  const availablePlatforms = settings
    ? (['google', 'yelp'] as const).filter(
        (p) => (p === 'google' ? settings.googleReviewUrl : settings.yelpReviewUrl)
      )
    : [];

  const handleCopied = () => {
    setShowSentPrompt(true);
  };

  const handleMarkSent = () => {
    const tpl = allTemplates.find((t) => t.id === selectedTemplate);
    addHistoryEntry({
      id: `h_${Date.now()}`,
      clientName,
      serviceType,
      dateSent: new Date().toISOString(),
      platform,
      templateName: tpl?.name || '',
      message,
      reviewStatus: 'pending',
    });
    if (serviceType) addRecentService(serviceType);
    setShowSentPrompt(false);
    handleClear();
  };

  const handleClear = () => {
    setClientName('');
    setServiceType('');
    setSelectedTemplate('professional');
    setShowSentPrompt(false);
    setIsDemo(false);
    if (settings) setPlatform(settings.preferredPlatform);
  };

  const loadDemo = () => {
    setClientName('Sarah Mitchell');
    setServiceType('deep cleaning');
    setSelectedTemplate('warm');
    setIsDemo(true);
  };

  const formEmpty = !clientName && !serviceType;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
          <h1 className="text-base font-semibold text-foreground">ReviewRequest</h1>
          <div className="flex gap-1">
            <button
              onClick={() => setHistoryOpen(true)}
              className="p-2.5 rounded-md hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="History"
            >
              <Clock size={20} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2.5 rounded-md hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Settings"
            >
              <Settings size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        {settings && !hasUrls && (
          <div className="bg-card rounded-md shadow-sm border border-border p-4">
            <p className="text-sm text-muted-foreground">
              Add your Google or Yelp review link in{' '}
              <button onClick={() => setSettingsOpen(true)} className="text-primary font-medium underline underline-offset-2">
                Settings
              </button>{' '}
              to get started.
            </p>
          </div>
        )}

        {isDemo && (
          <div className="flex items-center justify-between bg-warning/10 rounded-md px-4 py-3 text-sm">
            <span className="flex items-center gap-2 text-foreground">
              <Sparkles size={16} className="text-warning" /> Demo data loaded
            </span>
            <button onClick={handleClear} className="min-w-[44px] min-h-[44px] flex items-center justify-center">
              <X size={16} className="text-muted-foreground" />
            </button>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Client Name</label>
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Who did you just help?"
            className="text-sm h-10"
          />
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-foreground mb-1 block">Service Type</label>
          <Input
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            onFocus={() => {
              setRecentServices(getRecentServices());
              setShowRecent(true);
            }}
            onBlur={() => setTimeout(() => setShowRecent(false), 150)}
            placeholder="e.g. lawn care, deep cleaning"
            className="text-sm h-10"
          />
          {showRecent && recentServices.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-md z-10 overflow-hidden">
              {recentServices.map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseDown={() => { setServiceType(s); setShowRecent(false); }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors min-h-[44px]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Template</label>
          <TemplatePills
            templates={allTemplates}
            selectedId={selectedTemplate}
            onSelect={setSelectedTemplate}
            onCreateNew={() => setCustomTplOpen(true)}
          />
        </div>

        {availablePlatforms.length > 1 && (
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Review Platform</label>
            <div className="flex gap-2">
              {availablePlatforms.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 min-h-[44px] ${
                    platform === p
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground border border-border'
                  }`}
                >
                  {p === 'google' ? 'Google' : 'Yelp'}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Message Preview</label>
          <MessagePreview message={message} onChange={setMessage} />
        </div>

        <div className="space-y-3">
          <CopyButton text={message} onCopied={handleCopied} />

          {showSentPrompt && clientName && (
            <div className="flex gap-2">
              <Button
                onClick={handleMarkSent}
                variant="outline"
                className="flex-1 min-h-[44px] text-sm"
              >
                Mark as Sent
              </Button>
              <Button
                onClick={() => setShowSentPrompt(false)}
                variant="ghost"
                className="min-h-[44px] text-sm text-muted-foreground"
              >
                Skip
              </Button>
            </div>
          )}

          {!formEmpty && !showSentPrompt && (
            <Button onClick={handleClear} variant="ghost" className="w-full min-h-[44px] text-sm text-muted-foreground">
              Clear
            </Button>
          )}

          {formEmpty && !isDemo && (
            <Button onClick={loadDemo} variant="ghost" className="w-full min-h-[44px] text-sm text-muted-foreground">
              <Sparkles size={16} className="mr-1" /> Try Demo
            </Button>
          )}
        </div>
      </main>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} onSave={refreshSettings} />
      <HistorySheet open={historyOpen} onOpenChange={setHistoryOpen} />
      <CustomTemplateDialog open={customTplOpen} onOpenChange={setCustomTplOpen} onSaved={refreshTemplates} editTemplate={null} />
    </div>
  );
}
