"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import AddPostSuccess from "./add-post/add-post-success";

import AddPostAttachments, { Attachment } from "./add-post/add-post-attachments";
import AddPostActions from "./add-post/add-post-actions";

const AddPost = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<Attachment | null>(null);
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
    if (!files || files.length === 0) return;

    const file = files[0];
    const isImage = file.type.startsWith("image/");

    if (isImage) {
      // Revoke previous URL if selecting a replacement to avoid memory leaks
      if (attachment && attachment.url.startsWith("blob:")) {
        URL.revokeObjectURL(attachment.url);
      }

      const url = URL.createObjectURL(file);
      setAttachment({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        url: url,
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = () => {
    if (attachment && attachment.url.startsWith("blob:")) {
      URL.revokeObjectURL(attachment.url);
    }
    setAttachment(null);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!message.trim() && !attachment) || message.length > 500) return;

    setIsPosting(true);

    // Simulate database posting delay
    setTimeout(() => {
      setIsPosting(false);
      setMessage("");
      
      // Revoke blob URL after submit to clean up memory
      if (attachment && attachment.url.startsWith("blob:")) {
        URL.revokeObjectURL(attachment.url);
      }
      setAttachment(null);

      // Show temporary visual confirmation banner
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }, 1500);
  };

  const maxChars = 500;
  const charCount = message.length;
  const canSubmit = message.trim().length > 0 || attachment !== null;

  return (
    <div className="bg-card border border-border/40 shadow-xs rounded-xl p-4 md:p-5 mb-5 transition-all duration-300">
      {/* Success Notification */}
      {showSuccess && <AddPostSuccess onClose={() => setShowSuccess(false)} />}

      {/* Editor Content */}
      <form onSubmit={handlePostSubmit}> 

        {/* Text Input Area */}
        <div className="mb-3">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isPosting}
            placeholder={`What's on your mind, ${user.firstName || "friend"}?`}
            className="w-full border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 pb-1 pt-1 min-h-18.75 text-base placeholder:text-muted-foreground/60 bg-transparent text-foreground shadow-none"
          />
        </div>

        {/* Media Attachments Preview Grid */}
        <AddPostAttachments
          attachment={attachment}
          onRemove={removeAttachment}
          disabled={isPosting}
        />

        {/* Hidden File Upload Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isPosting}
        />

        {/* Bottom Actions and Submit Section */}
        <AddPostActions
          onTriggerFileInput={triggerFileInput}
          onEmojiSelect={handleEmojiSelect}
          isPosting={isPosting}
          charCount={charCount}
          maxChars={maxChars}
          canSubmit={canSubmit}
          hasAttachment={attachment !== null}
        />
      </form>
    </div>
  );
};

export default AddPost;


