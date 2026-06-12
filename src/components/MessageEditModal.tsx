// src/components/MessageEditModal.tsx

import { useState } from "react";
import { X } from "lucide-react";

/**
 * Simple modal for editing a user message.
 * It appears as a fullscreen overlay with a textarea.
 */
export function MessageEditModal({
  originalText,
  onClose,
  onSave,
}: {
  originalText: string;
  onClose: () => void;
  onSave: (newText: string) => void;
}) {
  const [value, setValue] = useState(originalText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-xl bg-card p-6 shadow-glow">
        <button
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          onClick={onClose}
          aria-label="Close edit modal"
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 text-xl font-medium">Edit Message</h2>
        <textarea
          className="w-full rounded-lg border border-border bg-background p-3 text-sm focus:outline-none"
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => onSave(value)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
