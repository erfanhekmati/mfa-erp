import type { CSSProperties, HTMLAttributes } from "react";

const cardStyle: CSSProperties = {
  borderRadius: "6px",
  border: "1px solid var(--border, #e5e5e5)",
  backgroundColor: "var(--background, #fff)",
  color: "var(--foreground, #171717)",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
};

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, style, ...props }: CardProps) {
  return (
    <div className={className} style={{ ...cardStyle, ...style }} {...props} />
  );
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className, style, ...props }: CardHeaderProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        padding: "1rem 1rem 0",
        ...style,
      }}
      {...props}
    />
  );
}

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, style, ...props }: CardTitleProps) {
  return (
    <h3
      className={className}
      style={{
        margin: 0,
        fontSize: "1.0625rem",
        fontWeight: 600,
        lineHeight: 1.35,
        ...style,
      }}
      {...props}
    />
  );
}

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({
  className,
  style,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={className}
      style={{
        margin: 0,
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "var(--muted-foreground, #737373)",
        ...style,
      }}
      {...props}
    />
  );
}

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export function CardContent({ className, style, ...props }: CardContentProps) {
  return (
    <div
      className={className}
      style={{ padding: "1rem", ...style }}
      {...props}
    />
  );
}

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export function CardFooter({ className, style, ...props }: CardFooterProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 1rem 1rem",
        gap: "0.5rem",
        ...style,
      }}
      {...props}
    />
  );
}
