import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { Bio } from "@/components/about/Bio";
import { Timeline } from "@/components/about/Timeline";
import { Skills } from "@/components/about/Skills";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({
    title: t("pageTitle"),
    description: locale === "mk"
      ? "Овластен судски преведувач со 30+ години искуство. Дознајте повеќе за квалификациите и кариерата."
      : "Certified court translator with 30+ years of experience. Learn about qualifications and career.",
    locale,
    path: "/about",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Bio />
      <Timeline />
      <Skills />
    </>
  );
}
