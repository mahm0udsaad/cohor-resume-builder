import { getPlansWithPrices } from "@/actions/resumes/plans";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import PaymentBtn from "../btns/pay-btn";
import { auth } from "@/lib/auth";

const PricingSection = async ({ t, lng }) => {
  const plansPrices = await getPlansWithPrices();
  const session = await auth();
  const user = session?.user;
  const plans = {
    pro: {
      name: t("plans.pro.name"),
      highlighted: true,
      price: plansPrices[1]?.price,
      period: t("plans.pro.period"),
      features: [
        { text: t("plans.pro.features.advancedThemes") },
        { text: t("plans.pro.features.templatesAvailable") },
        { text: t("plans.pro.features.noWatermark") },
      ],
      buttonText: t("plans.pro.buttonText"),
      gradient: "from-purple-400 to-purple-600",
    },
    proPlus: {
      name: t("plans.proPlus.name"),
      price: plansPrices[2]?.price,
      period: t("plans.proPlus.period"),
      features: [
        { text: t("plans.proPlus.features.premiumThemes") },
        { text: t("plans.proPlus.features.templatesAvailable") },
        { text: t("plans.proPlus.features.aiSuggestions") },
      ],
      buttonText: t("plans.proPlus.buttonText"),
      gradient: "from-pink-400 to-pink-600",
    },
  };
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#3b51a3]">
          {t("pricingTitle")}
        </h2>
        <div className="w-4/5 mx-auto grid md:grid-cols-2 gap-4">
          {Object.values(plans).map((plan, index) => (
            <Card
              key={index}
              className={`min-w-2xl flex flex-col ${
                plan.highlighted ? "border-[#3b51a3] border-2 shadow-lg" : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#3b51a3]">
                  {plan.name}
                  {plan.highlighted && (
                    <span className="mx-2 text-sm font-normal text-white bg-[#3b51a3] px-2 py-1 rounded-full">
                      {t("pricingRecommended")}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold text-[#3b51a3] mb-4">
                  {`${plan.price}`}
                  <span className="text-xl font-bold text-[#3b51a3]">
                    {`/${t("SAR")}`}
                  </span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-[#3b51a3] mx-2" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <PaymentBtn lng={lng} plan={plan} user={user} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
