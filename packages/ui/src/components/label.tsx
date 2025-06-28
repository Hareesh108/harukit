import React from "react";
import * as RadixLabel from "@radix-ui/react-label";
import { cn } from "../utils/cs";

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof RadixLabel.Root> {}

export const Label = React.forwardRef<
  React.ElementRef<typeof RadixLabel.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <RadixLabel.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));

Label.displayName = "Label";
