import { useState } from 'react';
import { HistoryEntry, ReviewStatus } from '@/lib/types';
import { getHistory, updateHistoryEntry, deleteHistoryEntry, clearHistory } from '@/lib/storage';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2, MinusCircle, Trash2, ChevronRight, X } from 'lucide-react';
import ConversionRing from './ConversionRing';

interface HistorySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusIcon = (s: ReviewStatus) => {
  if (s === 'reviewed') return <CheckCircle2 size={18} className="text-success" />;
  if (s === 'pending') return <Clock size={18} className="text-warning" />;
  return <MinusCircle size={18} className="text-neutral" />;
};

const platformLabel = (p: string) => (p === 'google' ? 'Google' : 'Yelp');

export default function HistorySheet({ open, onOpenChange }: HistorySheetProps) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [selected, setSelected] = useState<HistoryEntry | null>(null);

  const refresh = () => setEntries(getHistory());

  const handleOpen = (val: boolean) => {
    if (val) refresh();
    onOpenChange(val);
  };

  const total = entries.length;
  const reviewed = entries.filter((e) => e.reviewStatus === 'reviewed').length;
  const rate = total > 0 ? (reviewed / total) * 100 : 0;

  const cycleStatus = (entry: HistoryEntry) => {
    const next: ReviewStatus =
      entry.reviewStatus === 'unknown' ? 'pending' : entry.reviewStatus === 'pending' ? 'reviewed' : 'unknown';
    updateHistoryEntry(entry.id, { reviewStatus: next });
    refresh();
    if (selected?.id === entry.id) setSelected({ ...entry, reviewStatus: next });
  };

  const handleDelete = (id: string) => {
    deleteHistoryEntry(id);
    refresh();
    if (selected?.id === id) setSelected(null);
  };

  const handleClearAll = () => {
    clearHistory();
    refresh();
    setSelected(null);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-5 pb-0">
          <SheetTitle className="tracking-tight text-xl">Request History</SheetTitle>
          <SheetDescription className="sr-only">View past review requests</SheetDescription>
        </SheetHeader>

        {total > 0 && (
          <div className="flex items-center gap-4 px-5 py-4 border-b border-border">
            <ConversionRing percentage={rate} />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
              <div className="flex gap-4 mt-1 text-sm tabular-nums">
                <span className="font-medium">{total} sent</span>
                <span className="text-success font-medium">{reviewed} reviewed</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-destructive text-xs">
              Clear All
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {selected ? (
            <div className="p-5 space-y-4">
              <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-muted-foreground min-h-[44px]">
                <ChevronRight size={16} className="rotate-180" /> Back
              </button>
              <div>
                <h3 className="font-semibold tracking-tight text-lg">{selected.clientName}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(selected.dateSent).toLocaleDateString()} · {platformLabel(selected.platform)} · {selected.templateName}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-primary/10 text-base leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl min-h-[44px]"
                  onClick={() => cycleStatus(selected)}
                >
                  {statusIcon(selected.reviewStatus)}
                  <span className="ml-2 capitalize">{selected.reviewStatus}</span>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl min-h-[44px] text-destructive"
                  onClick={() => handleDelete(selected.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ) : entries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
              <Clock size={40} className="text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground text-sm">No requests yet — send your first one after your next job</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {entries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setSelected(entry)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors min-h-[56px]"
                >
                  {statusIcon(entry.reviewStatus)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{entry.clientName}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(entry.dateSent).toLocaleDateString()} · {platformLabel(entry.platform)}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
