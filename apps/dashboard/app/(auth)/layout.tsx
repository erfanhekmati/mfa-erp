export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-muted/80 to-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--muted))_0%,_transparent_55%)] opacity-60"
        aria-hidden
      />
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10">
        {children}
      </div>
    </div>
  );
}
