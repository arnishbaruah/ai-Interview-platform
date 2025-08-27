"use client";
import React from "react";
import moment from "moment";
import {
  Copy,
  Send,
  User,
  ArrowRight,
  CalendarClock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import InterviewCardMenu from "./InterviewCardMenu";
import { Mail } from "lucide-react";

// Helper function to format duration
const formatDuration = (duration) => {
  if (!duration) return "N/A";
  
  // If it's already a string like "5 Min", return as is
  if (typeof duration === 'string') {
    return duration;
  }
  
  // If it's a number, convert to "X Min" format
  if (typeof duration === 'number') {
    return `${duration} Min`;
  }
  
  return "N/A";
};

function InterviewCard({ interview, viewDetail, onDelete }) {
  const url = (process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000") + "/interview/" + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Link copied.");
  };

  const onSend = () => {
  const subject = encodeURIComponent("Interview Link from PrepTrack");
    const body = encodeURIComponent(
      `Hi,\n\nHere is the interview link:\n${url}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm transition-all duration-200 hover:shadow-md group">
      {/* Card Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 text-primary dark:from-primary/20 dark:to-primary/40">
              <User className="h-5 w-5" />
            </div>
            <h2 className="font-medium text-lg text-card-foreground line-clamp-1">
              {interview?.jobPosition}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1 text-xs">
              <CalendarClock className="h-3.5 w-3.5" />
              <span>{moment(interview?.created_at).format("DD MMM YYYY")}</span>
            </div>
            <InterviewCardMenu interview={interview} onDelete={onDelete} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60 w-full mx-auto" />

      {/* Card Content */}
      <div className="p-5 pt-3">
        <div className="flex items-center justify-between mb-4 text-muted-foreground">
          <div className="flex items-center gap-1 text-sm">
            <span>{formatDuration(interview?.duration)}</span>
          </div>

          {!viewDetail ? null : (
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-3.5 w-3.5" />
              <span>
                {(() => {
                  const count = interview?.["interview-feedback"]?.length || 0;
                  return `${count} Candidate${count !== 1 ? "s" : ""}`;
                })()}
              </span>
            </div>
          )}
        </div>

        {viewDetail ? (
          <Link
            href={
              "/scheduled-interviews/" + interview?.interview_id + "/details"
            }>
            <Button
              className="w-full flex items-center justify-center gap-2 transition-colors hover:bg-primary/90 dark:hover:bg-primary/90 cursor-pointer"
              variant="default">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors cursor-pointer"
              onClick={copyLink}>
              <Copy className="w-4 h-4" />
              <span>Copy link</span>
            </Button>
            <Button
              className="flex-1 flex items-center justify-center gap-2 transition-colors hover:bg-primary/90 dark:hover:bg-primary/90 cursor-pointer"
              onClick={onSend}>
              <Mail className="w-4 h-4" />
              <span>Send mail</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewCard;
