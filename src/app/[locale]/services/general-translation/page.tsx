import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/metadata";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";

const SLUG = "general-translation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: `services.${SLUG}` });
  return buildMetadata({ title: t("title"), description: t("short"), locale, path: `/services/${SLUG}` });
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicePageLayout slug={SLUG} />;
}
