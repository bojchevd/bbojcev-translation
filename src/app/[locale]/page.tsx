import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <ClientLogos />
      <Testimonials />
      <CtaBand />
    </>
  );
}
