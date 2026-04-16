import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  onCopied?: () => void;
}

export default function CopyButton({ text, onCopied }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    onCopied?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`w-full min-h-[48px] rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
        copied
          ? 'bg-success text-success-foreground'
          : 'bg-primary text-primary-foreground hover:opacity-90'
      }`}
    >
      {copied ? (
        <>
          <Check className="animate-scale-check" size={18} />
          Copied! Paste it into your text message 💬
        </>
      ) : (
        <>
          <Copy size={18} />
          Copy to Clipboard
        </>
      )}
    </button>
  );
}
