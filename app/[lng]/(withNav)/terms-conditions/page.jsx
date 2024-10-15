"use client";

import { useTranslation } from "@/app/i18n";
import React from "react";

const TermsAndConditions = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "common");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#3b51a3] mb-8 pb-4 border-b">
        {t("TermsAndConditions")}
      </h1>

      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">{t("acceptanceOfTerms")}</h2>
        <p>{t("acceptanceContent")}</p>

        <h2 className="text-xl font-semibold">{t("useOfApplication")}</h2>
        <p>{t("useOfApplicationContent")}</p>

        <h2 className="text-xl font-semibold">{t("userAccounts")}</h2>
        <p>{t("userAccountsContent")}</p>

        <h2 className="text-xl font-semibold">{t("userContent")}</h2>
        <p>{t("userContentContent")}</p>

        <h2 className="text-xl font-semibold">{t("intellectualProperty")}</h2>
        <p>{t("intellectualPropertyContent")}</p>

        <h2 className="text-xl font-semibold">{t("privacyPolicy")}</h2>
        <p>{t("privacyPolicyContent")}</p>

        <h2 className="text-xl font-semibold">{t("limitationOfLiability")}</h2>
        <p>{t("limitationOfLiabilityContent")}</p>

        <h2 className="text-xl font-semibold">{t("termination")}</h2>
        <p>{t("terminationContent")}</p>

        <h2 className="text-xl font-semibold">{t("modificationsToTerms")}</h2>
        <p>{t("modificationsToTermsContent")}</p>

        <h2 className="text-xl font-semibold">{t("governingLaw")}</h2>
        <p>{t("governingLawContent")}</p>

        <h2 className="text-xl font-semibold">{t("contactUs")}</h2>
        <p>{t("contactUsContent")}</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
