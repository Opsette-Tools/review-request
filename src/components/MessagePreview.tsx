interface MessagePreviewProps {
  message: string;
  onChange: (msg: string) => void;
}

export default function MessagePreview({ message, onChange }: MessagePreviewProps) {
  return (
    <div className="relative">
      {/* Bubble tail */}
      <div className="absolute bottom-0 left-4 w-3 h-3 bg-primary/10 transform rotate-45 translate-y-1.5" />
      <textarea
        value={message}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[140px] p-5 rounded-2xl bg-primary/10 text-foreground text-base leading-relaxed resize-none border-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
        placeholder="Your message preview will appear here..."
      />
    </div>
  );
}
