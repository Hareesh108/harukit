import React from "react";
import { cn } from "../utils/cs";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant = "default",
      size = "md",
      leftIcon,
      rightIcon,
      error = false,
      success = false,
      fullWidth = false,
      label,
      helperText,
      errorText,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles =
      "flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
      default: "border-input",
      filled: "border-transparent bg-muted/50",
      outlined: "border-2",
      ghost: "border-transparent bg-transparent",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-3",
      lg: "h-12 px-4 text-base",
    };

    const stateClasses = error
      ? "border-destructive focus-visible:ring-destructive"
      : success
      ? "border-green-500 focus-visible:ring-green-500"
      : "";

    const widthClass = fullWidth ? "w-full" : "";
    const iconPadding = leftIcon ? "pl-10" : "";
    const rightIconPadding = rightIcon ? "pr-10" : "";

    return (
      <div className={cn("space-y-2", widthClass)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              stateClasses,
              iconPadding,
              rightIconPadding,
              className
            )}
            ref={ref}
            id={inputId}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || errorText) && (
          <p
            className={cn(
              "text-xs",
              errorText ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {errorText || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
