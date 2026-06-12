// src/components/ChatFileUpload.tsx

import { useRef } from "react";
import { Paperclip } from "lucide-react";

type ChatFileUploadProps = {
  /** Callback when files are selected */
  onFilesSelected: (files: File[]) => void;
  /** Accepted file mime types or extensions */
  accept?: string;
};

export function ChatFileUpload({ onFilesSelected, accept }: ChatFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      onFilesSelected(fileArray);
      // Reset value so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center gap-1">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        multiple
        accept={accept}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleClick}
        className="grid h-9 w-9 place-items-center rounded-xl bg-card/60 hover:bg-card/80 transition"
        aria-label="Attach files"
      >
        <Paperclip className="h-4 w-4" />
      </button>
    </div>
  );
}
