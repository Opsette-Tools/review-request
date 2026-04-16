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
        className="w-full min-h-[140px] p-4 rounded-md bg-muted text-foreground text-sm leading-relaxed resize-none border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
        placeholder="Your message preview will appear here..."
      />
    </div>
  );
}
