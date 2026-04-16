import { Plus } from 'lucide-react';
import { MessageTemplate } from '@/lib/types';

interface TemplatePillsProps {
  templates: MessageTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
  onCreateNew: () => void;
}

export default function TemplatePills({ templates, selectedId, onSelect, onCreateNew }: TemplatePillsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {templates.map((t) => (
        <label
          key={t.id}
          className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-150 min-h-[40px] select-none ${
            selectedId === t.id
              ? 'bg-primary/10 text-primary border border-primary/40 ring-1 ring-primary/20'
              : 'bg-card text-foreground border border-border hover:border-foreground/20'
          }`}
        >
          <span
            className={`flex-shrink-0 w-3.5 h-3.5 rounded-full border-2 transition-colors ${
              selectedId === t.id
                ? 'border-primary bg-primary'
                : 'border-muted-foreground/40 bg-transparent'
            }`}
          >
            {selectedId === t.id && (
              <span className="block w-1.5 h-1.5 rounded-full bg-white m-[3px]" />
            )}
          </span>
          <input
            type="radio"
            name="template"
            value={t.id}
            checked={selectedId === t.id}
            onChange={() => onSelect(t.id)}
            className="sr-only"
          />
          <span className="truncate leading-tight">{t.name}</span>
        </label>
      ))}
      <button
        type="button"
        onClick={onCreateNew}
        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium min-h-[40px] border border-dashed border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors duration-150"
      >
        <Plus size={14} />
        Custom
      </button>
    </div>
  );
}
