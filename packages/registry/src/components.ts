import { Component } from "./schema";

export const components: Component[] = [
  {
    name: "button",
    description: "A button component with multiple variants and sizes",
    version: "0.0.2",
    dependencies: ["clsx", "tailwind-merge"],
    devDependencies: [],
    files: [
      {
        name: "button.tsx",
        content: `import React from "react";
import { cn } from "../utils/cs";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    rounded = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8",
      xl: "h-12 px-10 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";
    const roundedClass = rounded ? "rounded-full" : "rounded-md";

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          roundedClass,
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";`,
        path: "src/components/button.tsx",
        type: "component",
      },
    ],
    tags: ["button", "form", "interactive"],
    category: "form",
    author: "Harukit Team",
    license: "MIT",
    repository: "https://github.com/your-username/harukit",
  },
  {
    name: "card",
    description: "A flexible card component with header, content, and footer sections",
    version: "0.0.2",
    dependencies: ["clsx"],
    devDependencies: [],
    files: [
      {
        name: "card.tsx",
        content: `import React from "react";
import { cn } from "../utils/cs";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    hover = false,
    interactive = false,
    children,
    ...props 
  }, ref) => {
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

    const hoverClass = hover ? "transition-all duration-200 hover:shadow-md hover:-translate-y-1" : "";
    const interactiveClass = interactive ? "cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]" : "";

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

Card.displayName = "Card";`,
        path: "src/components/card.tsx",
        type: "component",
      },
    ],
    tags: ["card", "layout", "container"],
    category: "layout",
    author: "Harukit Team",
    license: "MIT",
    repository: "https://github.com/your-username/harukit",
  },
];

export const getComponent = (name: string): Component | undefined => {
  return components.find((component) => component.name === name);
};

export const getAllComponents = (): Component[] => {
  return components;
}; 