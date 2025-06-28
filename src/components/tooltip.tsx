import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../utils/cs";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null | Array<Element | null>;
  collisionPadding?:
    | number
    | Partial<Record<"top" | "right" | "bottom" | "left", number>>;
  arrowPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  updatePositionStrategy?: "optimized" | "always";
  gutter?: number;
  className?: string;
  contentClassName?: string;
  arrowClassName?: string;
  variant?: "default" | "light" | "dark" | "colored";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  animation?: "fade" | "scale" | "slide" | "none";
}

export const Tooltip = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Provider>,
  TooltipProps
>(
  (
    {
      children,
      content,
      delayDuration = 700,
      skipDelayDuration = 300,
      disableHoverableContent = false,
      open,
      onOpenChange,
      defaultOpen = false,
      side = "top",
      sideOffset = 4,
      align = "center",
      alignOffset = 0,
      avoidCollisions = true,
      collisionBoundary,
      collisionPadding = 0,
      arrowPadding = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      gutter,
      className,
      contentClassName,
      arrowClassName,
      variant = "default",
      size = "md",
      showArrow = true,
      animation = "fade",
    },
    ref
  ) => {
    const variants = {
      default: "bg-popover text-popover-foreground border shadow-md",
      light: "bg-white text-gray-900 border border-gray-200 shadow-lg",
      dark: "bg-gray-900 text-white border border-gray-700 shadow-lg",
      colored:
        "bg-primary text-primary-foreground border border-primary/20 shadow-md",
    };

    const sizes = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    };

    const animations = {
      fade: "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
      scale:
        "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95",
      slide:
        "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=delayed-open]:slide-in-from-top-2",
      none: "",
    };

    const arrowVariants = {
      default: "fill-popover",
      light: "fill-white",
      dark: "fill-gray-900",
      colored: "fill-primary",
    };

    return (
      <RadixTooltip.Provider
        delayDuration={delayDuration}
        skipDelayDuration={skipDelayDuration}
        disableHoverableContent={disableHoverableContent}
      >
        <RadixTooltip.Root
          open={open}
          onOpenChange={onOpenChange}
          defaultOpen={defaultOpen}
        >
          <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content
              side={side}
              sideOffset={sideOffset}
              align={align}
              alignOffset={alignOffset}
              avoidCollisions={avoidCollisions}
              collisionBoundary={collisionBoundary}
              collisionPadding={collisionPadding}
              arrowPadding={arrowPadding}
              sticky={sticky}
              hideWhenDetached={hideWhenDetached}
              updatePositionStrategy={updatePositionStrategy}
              gutter={gutter}
              className={cn(
                "z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md",
                variants[variant],
                sizes[size],
                animations[animation],
                "data-[state=delayed-open]:data-[side=top]:slide-in-from-bottom-2",
                "data-[state=delayed-open]:data-[side=right]:slide-in-from-left-2",
                "data-[state=delayed-open]:data-[side=bottom]:slide-in-from-top-2",
                "data-[state=delayed-open]:data-[side=left]:slide-in-from-right-2",
                contentClassName
              )}
            >
              {content}
              {showArrow && (
                <RadixTooltip.Arrow
                  className={cn(
                    "h-2 w-2",
                    arrowVariants[variant],
                    arrowClassName
                  )}
                />
              )}
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

// Convenience components for common use cases
export const TooltipTrigger = RadixTooltip.Trigger;
export const TooltipContent = RadixTooltip.Content;
export const TooltipArrow = RadixTooltip.Arrow;
export const TooltipProvider = RadixTooltip.Provider;
