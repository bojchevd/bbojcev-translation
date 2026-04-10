import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-serif text-4xl text-brown">
        Biljana Vasileva Bojcev
      </h1>
    </main>
  );
}
