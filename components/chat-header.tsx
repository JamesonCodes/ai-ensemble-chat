"use client";

import { motion } from "framer-motion";
import { LayoutGridIcon, SquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useWindowSize } from "usehooks-ts";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ResponseMode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlusIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

function setCookie(name: string, value: string) {
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  // biome-ignore lint/suspicious/noDocumentCookie: needed for client-side cookie setting
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}`;
}

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  responseMode,
  onResponseModeChange,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  responseMode: ResponseMode;
  onResponseModeChange: (mode: ResponseMode) => void;
  isReadonly: boolean;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="sticky top-0 flex items-center gap-2 bg-background px-2 py-1.5 md:px-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Button
          className="h-8 px-2 md:h-fit md:px-2"
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
          variant="outline"
        >
          <PlusIcon />
          <span className="md:sr-only">New Chat</span>
        </Button>
      )}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          className="shrink-0"
          selectedVisibilityType={selectedVisibilityType}
        />
      )}

      {!isReadonly && (
        <TooltipProvider delayDuration={120}>
          <fieldset className="relative ml-auto grid h-8 w-[80px] grid-cols-2 items-center rounded-md border border-border bg-muted/40 p-0.5">
            <legend className="sr-only">View mode</legend>
            <motion.div
              animate={{ x: responseMode === "single" ? 0 : 38 }}
              className="absolute top-[3px] left-[3px] h-6 w-8 rounded-sm border border-border bg-background"
              transition={{ duration: 0.16, ease: "easeOut" }}
            />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="single response"
                  aria-pressed={responseMode === "single"}
                  className={cn(
                    "relative z-10 inline-flex h-7 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors",
                    responseMode === "single" && "text-foreground"
                  )}
                  onClick={() => {
                    onResponseModeChange("single");
                    setCookie("chat-response-mode", "single");
                  }}
                  type="button"
                >
                  <SquareIcon className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                single response
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  aria-label="quad response"
                  aria-pressed={responseMode === "quad"}
                  className={cn(
                    "relative z-10 inline-flex h-7 w-9 items-center justify-center rounded-sm text-muted-foreground transition-colors",
                    responseMode === "quad" && "text-foreground"
                  )}
                  onClick={() => {
                    onResponseModeChange("quad");
                    setCookie("chat-response-mode", "quad");
                  }}
                  type="button"
                >
                  <LayoutGridIcon className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={8}>
                quad response
              </TooltipContent>
            </Tooltip>
          </fieldset>
        </TooltipProvider>
      )}
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.responseMode === nextProps.responseMode &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
