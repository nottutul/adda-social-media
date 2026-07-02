"use client";

import React from "react";
import { Smile, Image as ImageIcon, Loader2, Send } from "lucide-react";
import EmojiPicker from "@/components/emoji-picker";
import { Button } from "@/components/ui/button";

interface AddPostActionsProps {
  onTriggerFileInput: () => void;
  onEmojiSelect: (emoji: string) => void;
  isPosting: boolean;
  charCount: number;
  maxChars: number;
  canSubmit: boolean;
  hasAttachment?: boolean;
}

export const AddPostActions: React.FC<AddPostActionsProps> = ({
  onTriggerFileInput,
  onEmojiSelect,
  isPosting,
  charCount,
  maxChars,
  canSubmit,
  hasAttachment,
}) => {
  const isOverLimit = charCount > maxChars;
  const percent = Math.min((charCount / maxChars) * 100, 100);
  const radius = 9;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ - (percent / 100) * circ;

  const getRingColor = () => {
    if (charCount >= maxChars) return "stroke-destructive";
    if (charCount >= maxChars - 40) return "stroke-amber-500";
    return "stroke-primary";
  };

  return (
    <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-1">
      {/* Quick attachment options */}
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isPosting || hasAttachment}
          onClick={onTriggerFileInput}
          className="flex items-center gap-2 px-3 h-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors cursor-pointer"
        >
          <ImageIcon className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-medium">Add Media</span>
        </Button>

        <EmojiPicker
          onEmojiSelect={onEmojiSelect}
          trigger={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isPosting}
              className="flex items-center gap-2 px-3 h-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors cursor-pointer"
            >
              <Smile className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-medium">Add Emoji</span>
            </Button>
          }
        />
      </div>

      {/* Character counter & submit button */}
      <div className="flex items-center gap-3">
        {charCount > 0 && (
          <div className="flex items-center gap-1.5" title={`${charCount} / ${maxChars} characters`}>
            <svg className="w-5 h-5 -rotate-90">
              <circle cx="10" cy="10" r={radius} className="stroke-muted fill-none" strokeWidth="2" />
              <circle
                cx="10"
                cy="10"
                r={radius}
                className={`fill-none transition-all duration-150 ${getRingColor()}`}
                strokeWidth="2"
                strokeDasharray={circ}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <span
              className={`text-[10px] font-mono font-medium ${
                isOverLimit ? "text-destructive font-semibold" : "text-muted-foreground"
              }`}
            >
              {maxChars - charCount}
            </span>
          </div>
        )}

        <Button
          type="submit"
          disabled={!canSubmit || isOverLimit || isPosting}
          className="gap-2 h-9 px-4 rounded-full font-medium shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
        >
          {isPosting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span className="text-xs">Posting</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              <span className="text-xs">Post</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddPostActions;
