// privacy-policy.jsx
"use client";

import { useTranslation } from "@/app/i18n";

export default async function PrivacyPolicy({ params: { lng } }) {
  const { t } = await useTranslation(lng, "common");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#3b51a3] mb-8 pb-4 border-b">
        {t("privacyPolicyTitle")}
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">{t("section1Title")}</h2>
        <p className="mt-2 text-gray-700">{t("section1Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">{t("section2Title")}</h2>
        <p className="mt-2 text-gray-700">{t("section2Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">{t("section3Title")}</h2>
        <p className="mt-2 text-gray-700">{t("section3Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">{t("section4Title")}</h2>
        <p className="mt-2 text-gray-700">{t("section4Content")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">{t("section5Title")}</h2>
        <p className="mt-2 text-gray-700">{t("section5Content")}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">{t("section6Title")}</h2>
        <p className="mt-2 text-gray-700">{t("section6Content")}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">{t("section7Title")}</h2>
        <p className="mt-2 text-gray-700">{t("section7Content")}</p>
      </section>
    </div>
  );
}
