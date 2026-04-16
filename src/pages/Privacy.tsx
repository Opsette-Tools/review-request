import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border/60">
        <div className="max-w-md mx-auto flex items-center gap-2 px-4 h-14">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 rounded-md hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Back"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground tracking-tight">Privacy Policy</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <p className="text-sm font-medium text-foreground">
          ReviewRequest Generator respects your privacy.
        </p>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">No Data Collection</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ReviewRequest Generator runs entirely in your browser. We do not collect, store, or
            transmit any personal information. All interactions happen locally on your device.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">No Cookies or Tracking</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We do not use cookies, analytics, or any third-party tracking services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">No Account Required</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            There is no sign-up, no login, and no data stored on any server. Your business
            settings, templates, and request history are stored locally in your browser using
            localStorage and never shared with anyone.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you have questions about this policy, you can reach us through the app's repository.
          </p>
        </section>

        <p className="text-xs text-muted-foreground/60 pt-4">
          Last updated: April 2026
        </p>
      </main>
    </div>
  );
}
