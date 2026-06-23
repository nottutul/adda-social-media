"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Smile,
  Image as ImageIcon,
  X,
  Loader2,
  Send,
} from "lucide-react";

import EmojiPicker from "@/components/emoji-picker";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const AddPost = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<
    Array<{ id: string; name: string; url: string; type: "image" | "video" }>
  >([]);
  const [isPosting, setIsPosting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-grow textarea height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 250)}px`;
    }
  }, [message]);

  if (!isLoaded) {
    return (
      <div className="bg-card border border-border/40 shadow-xs rounded-xl p-5 mb-5 flex items-center justify-center h-30">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <div className="bg-card border border-border/40 shadow-xs rounded-xl p-6 mb-5 text-center transition-all duration-300 hover:shadow-md">
        <h3 className="text-lg font-semibold mb-2">Join the conversation on Adda</h3>
        <p className="text-muted-foreground text-sm mb-4 max-w-md mx-auto">
          Sign in to share posts, connect with friends, and join groups in your local community.
        </p>
        
      </div>
    );
  }

  // Handle caret / selection-aware emoji insertion
  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setMessage((prev) => prev + emoji);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    const newValue = before + emoji + after;
    setMessage(newValue);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + emoji.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: typeof attachments = [];
    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (isImage || isVideo) {
        const url = URL.createObjectURL(file);
        newAttachments.push({
          id: Math.random().toString(36).substring(2, 9),
          name: file.name,
          url: url,
          type: isImage ? "image" : "video",
        });
      }
    });

    setAttachments((prev) => [...prev, ...newAttachments]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    const item = attachments.find((a) => a.id === id);
    if (item && item.url.startsWith("blob:")) {
      URL.revokeObjectURL(item.url);
    }
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!message.trim() && attachments.length === 0) || message.length > 500) return;

    setIsPosting(true);

    // Simulate database posting delay
    setTimeout(() => {
      setIsPosting(false);
      setMessage("");
      
      // Revoke and clear blob URLs outside state updater to avoid side effect warnings
      attachments.forEach((a) => {
        if (a.url.startsWith("blob:")) URL.revokeObjectURL(a.url);
      });
      setAttachments([]);

      // Show temporary visual confirmation banner
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }, 1500);
  };

  // Circular character indicator values
  const maxChars = 500;
  const charCount = message.length;
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
    <div className="bg-card border border-border/40 shadow-xs rounded-xl p-4 md:p-5 mb-5 transition-all duration-300">
      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-lg flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <div className="bg-emerald-500 text-white rounded-full p-0.5">
              <svg className="w-3.5 h-3.5 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium">Post shared successfully! 🎉</span>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="text-emerald-700 dark:text-emerald-400 hover:opacity-75 transition-opacity cursor-pointer animate-in"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Editor Content */}
      <form onSubmit={handlePostSubmit}>
        {/* Header Section: Avatar and Name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-linear-to-tr from-primary/20 to-primary/5 border border-border shrink-0 overflow-hidden shadow-xs">
            {user.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.imageUrl}
                alt={user.fullName || "User Avatar"}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.fullName || "User")}`;
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center font-semibold text-primary/75 text-sm bg-muted">
                {(user.firstName || "U")[0]}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm leading-tight text-foreground truncate">
              {user.fullName || user.username || `${user.firstName} ${user.lastName}`}
            </h4>
            <span className="text-xs text-muted-foreground">Share updates to your feed</span>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="mb-3">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isPosting}
            placeholder={`What's on your mind, ${user.firstName || "friend"}?`}
            className="w-full border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-1 pt-1 min-h-18.75 text-base placeholder:text-muted-foreground/60 bg-transparent text-foreground shadow-none"
          />
        </div>

        {/* Media Attachments Preview Grid */}
        {attachments.length > 0 && (
          <div className="pb-3 animate-in fade-in duration-200">
            <div
              className={`grid gap-2 ${
                attachments.length === 1
                  ? "grid-cols-1"
                  : attachments.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              {attachments.map((file) => (
                <div
                  key={file.id}
                  className="relative group aspect-video bg-muted rounded-lg overflow-hidden border border-border/40 shadow-xs"
                >
                  {file.type === "image" ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                  ) : (
                    <video
                      src={file.url}
                      controls={false}
                      muted
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                  )}
                  <button
                    type="button"
                    disabled={isPosting}
                    onClick={() => removeAttachment(file.id)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/85 text-white rounded-full p-1 transition-all backdrop-blur-xs shadow-md opacity-90 hover:opacity-100 cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  {file.type === "video" && (
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium pointer-events-none backdrop-blur-xs shadow-md">
                      VIDEO
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden File Upload Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={isPosting}
        />

        {/* Bottom Actions and Submit Section */}
        <div className="flex items-center justify-between border-t border-border/40 pt-3 mt-1">
          {/* Quick attachment options */}
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isPosting}
              onClick={triggerFileInput}
              className="flex items-center gap-2 px-3 h-9 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors cursor-pointer"
            >
              <ImageIcon className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-medium">Add Media</span>
            </Button>

            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
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
              disabled={(!message.trim() && attachments.length === 0) || isOverLimit || isPosting}
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
      </form>
    </div>
  );
};

export default AddPost;

