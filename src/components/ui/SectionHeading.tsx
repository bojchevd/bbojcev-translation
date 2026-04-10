export function SectionHeading({
  title,
  subtitle,
  centered = true,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="font-serif text-3xl sm:text-4xl text-brown mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div
        className={`mt-4 h-0.5 w-16 bg-terracotta ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
}
