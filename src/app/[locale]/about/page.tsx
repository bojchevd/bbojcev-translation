import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Bio } from "@/components/about/Bio";
import { Timeline } from "@/components/about/Timeline";
import { Skills } from "@/components/about/Skills";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("pageTitle") };
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
