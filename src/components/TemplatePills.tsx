import { MessageTemplate } from '@/lib/types';

interface TemplatePillsProps {
  templates: MessageTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
  onCreateNew: () => void;
}

export default function TemplatePills({ templates, selectedId, onSelect, onCreateNew }: TemplatePillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
      {templates.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect(t.id)}
          className={`flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 min-h-[44px] whitespace-nowrap ${
            selectedId === t.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-card text-foreground border border-border hover:border-foreground/30'
          }`}
        >
          {t.name}
        </button>
      ))}
      <button
        type="button"
        onClick={onCreateNew}
        className="flex-shrink-0 px-3 py-2 rounded-md text-sm font-medium min-h-[44px] whitespace-nowrap border border-dashed border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors duration-200"
      >
        + Custom
      </button>
    </div>
  );
}
