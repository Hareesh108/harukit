import React from "react";
import { cn } from "../utils/cs";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated" | "flat";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      hover = false,
      interactive = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-lg border bg-card text-card-foreground";

    const variants = {
      default: "shadow-sm",
      outlined: "border-2 shadow-none",
      elevated: "shadow-lg border-0",
      flat: "shadow-none border-0 bg-muted/50",
    };

    const paddings = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-12",
    };

    const hoverClass = hover
      ? "transition-all duration-200 hover:shadow-md hover:-translate-y-1"
      : "";
    const interactiveClass = interactive
      ? "cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          hoverClass,
          interactiveClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "none" | "sm" | "md" | "lg";
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, spacing = "md", children, ...props }, ref) => {
    const spacingClasses = {
      none: "",
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-6",
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = "h3", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "text-2xl font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = "CardDescription";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = "none", children, ...props }, ref) => {
    const paddingClasses = {
      none: "",
      sm: "pt-3",
      md: "pt-6",
      lg: "pt-8",
    };

    return (
      <div
        ref={ref}
        className={cn(paddingClasses[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: "start" | "center" | "end" | "between" | "around";
  spacing?: "none" | "sm" | "md" | "lg";
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (
    { className, justify = "start", spacing = "md", children, ...props },
    ref
  ) => {
    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    };

    const spacingClasses = {
      none: "",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          justifyClasses[justify],
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";
