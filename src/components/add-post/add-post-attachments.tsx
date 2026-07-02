"use client";

import React from "react";
import { X } from "lucide-react";

export interface Attachment {
  id: string;
  name: string;
  url: string;
}

interface AddPostAttachmentsProps {
  attachment: Attachment | null;
  onRemove: () => void;
  disabled?: boolean;
}

export const AddPostAttachments: React.FC<AddPostAttachmentsProps> = ({
  attachment,
  onRemove,
  disabled,
}) => {
  if (!attachment) return null;

  return (
    <div className="pb-3 animate-in fade-in duration-200">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border border-border/40 shadow-xs">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={attachment.url}
          alt={attachment.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-101"
        />
        <button
          type="button"
          disabled={disabled}
          onClick={onRemove}
          className="absolute top-2 right-2 bg-black/60 hover:bg-black/85 text-white rounded-full p-1 transition-all backdrop-blur-xs shadow-md opacity-90 hover:opacity-100 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AddPostAttachments;

