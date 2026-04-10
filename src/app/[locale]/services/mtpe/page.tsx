import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";

const SLUG = "mtpe";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: `services.${SLUG}` });
  return { title: t("title"), description: t("short") };
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicePageLayout slug={SLUG} />;
}
