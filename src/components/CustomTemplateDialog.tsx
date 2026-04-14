import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MessageTemplate } from '@/lib/types';
import { getCustomTemplates, saveCustomTemplates } from '@/lib/storage';

interface CustomTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editTemplate?: MessageTemplate | null;
  onSaved: () => void;
}

export default function CustomTemplateDialog({ open, onOpenChange, editTemplate, onSaved }: CustomTemplateDialogProps) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (open && editTemplate) {
      setName(editTemplate.name);
      setBody(editTemplate.body);
    } else if (open) {
      setName('');
      setBody('');
    }
  }, [open, editTemplate]);

  const handleSave = () => {
    if (!name.trim() || !body.trim()) return;
    const templates = getCustomTemplates();
    if (editTemplate) {
      const idx = templates.findIndex((t) => t.id === editTemplate.id);
      if (idx !== -1) templates[idx] = { ...templates[idx], name, body };
    } else {
      templates.push({ id: `custom_${Date.now()}`, name, body, isCustom: true });
    }
    saveCustomTemplates(templates);
    onSaved();
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (!editTemplate) return;
    const templates = getCustomTemplates().filter((t) => t.id !== editTemplate.id);
    saveCustomTemplates(templates);
    onSaved();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="tracking-tight text-xl">{editTemplate ? 'Edit' : 'Create'} Template</DialogTitle>
          <DialogDescription>
            Use placeholders: [Client Name], [Business Name], [Owner Name], [link], [service type]
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="tplName">Template Name</Label>
            <Input
              id="tplName"
              className="mt-1 rounded-xl"
              placeholder="e.g. Casual Thanks"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tplBody">Message Body</Label>
            <Textarea
              id="tplBody"
              className="mt-1 rounded-xl min-h-[120px]"
              placeholder="Hey [Client Name], thanks for choosing [Business Name]! ..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {editTemplate && (
              <Button variant="outline" onClick={handleDelete} className="rounded-xl min-h-[44px] text-destructive">
                Delete
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={!name.trim() || !body.trim()}
              className="flex-1 rounded-xl min-h-[44px]"
            >
              {editTemplate ? 'Update' : 'Create'} Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
