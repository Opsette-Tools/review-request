import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';

export default function About() {
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
          <h1 className="text-base font-semibold text-foreground tracking-tight">About</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Star size={24} className="text-primary fill-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">ReviewRequest Generator</h2>
            <p className="text-sm text-muted-foreground mt-1">
              A business tool from{' '}
              <a
                href="https://opsette.io"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Opsette Marketplace
              </a>
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          ReviewRequest Generator helps service professionals send polished, personalized review
          requests to their clients. Whether you run a lawn care company, cleaning service,
          contracting business, or any client-facing operation — this tool makes it easy to ask
          for reviews consistently.
        </p>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">How It Works</h3>

          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">1</span>
              <div>
                <p className="text-sm font-medium text-foreground">Set up your business</p>
                <p className="text-xs text-muted-foreground">Add your business name, your name, and review links for Google, Yelp, Facebook, or Nextdoor.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm font-medium text-foreground">Generate a message</p>
                <p className="text-xs text-muted-foreground">Enter your client's name, the service you performed, and pick a template. The message auto-fills instantly.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">3</span>
              <div>
                <p className="text-sm font-medium text-foreground">Copy and send</p>
                <p className="text-xs text-muted-foreground">One tap copies the message. Paste it into a text, email, or DM.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">4</span>
              <div>
                <p className="text-sm font-medium text-foreground">Track your results</p>
                <p className="text-xs text-muted-foreground">Mark requests as sent and track who left a review. See your conversion rate over time.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60 text-center pt-4">
          All data stays on your device. Nothing is sent to any server.
        </p>

        <p className="text-xs text-muted-foreground/60 text-center">
          Find more tools at{' '}
          <a
            href="https://opsette.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-muted-foreground transition-colors"
          >
            opsette.io
          </a>.
        </p>
      </main>
    </div>
  );
}
