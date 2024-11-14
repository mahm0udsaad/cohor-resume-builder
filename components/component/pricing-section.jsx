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
  const plans = await getPlansWithPrices();
  const session = await auth();
  const user = session?.user;
  const pricingPlans = [
    {
      name: t("pricingPlans.0.name"),
      price: t("pricingPlans.0.price"),
      description: t("pricingPlans.0.description"),
      features: t("pricingPlans.0.features", { returnObjects: true }),
    },
    {
      name: t("pricingPlans.1.name"),
      price: plans[1].price,
      description: t("pricingPlans.1.description"),
      features: t("pricingPlans.1.features", { returnObjects: true }),
      highlighted: true,
    },
    {
      name: t("pricingPlans.2.name"),
      price: plans[2].price,
      description: t("pricingPlans.2.description"),
      features: t("pricingPlans.2.features", { returnObjects: true }),
    },
  ];
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#3b51a3]">
          {t("pricingTitle")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
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
                  {index > 0 ? `${plan.price}` : plan.price}
                  <span className="text-xl font-bold text-[#3b51a3]">
                    {index > 0 ? t("SAR") : ""}
                  </span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-[#3b51a3] mx-2" />
                      <span>{feature}</span>
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
