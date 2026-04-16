interface MessagePreviewProps {
  message: string;
  onChange: (msg: string) => void;
}

export default function MessagePreview({ message, onChange }: MessagePreviewProps) {
  return (
    <div className="relative">
      <textarea
        value={message}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[160px] p-4 rounded-lg bg-card text-foreground text-sm leading-relaxed resize-none border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-shadow"
        placeholder="Your message preview will appear here..."
      />
    </div>
  );
}
