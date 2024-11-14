"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  FileText,
  Layout,
  TrendingUp,
  Edit2,
  Loader2,
} from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  updatePlanPrice,
  updatePlanTemplates,
} from "@/actions/dashboard/plans";

export default function AdminDashboard({ initialData, lng }) {
  const { t } = useTranslation(lng, "admin");
  const [activeTab, setActiveTab] = useState("free");
  const [editingPrice, setEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const [planData, setPlanData] = useState(initialData);
  const [selectedTemplates, setSelectedTemplates] = useState(() => {
    const initial = {};
    Object.entries(initialData).forEach(([plan, data]) => {
      initial[plan] = data.templates;
    });
    return initial;
  });
  const [loading, setLoading] = useState(false);
  const planColors = {
    free: "bg-blue-100 text-blue-800",
    pro: "bg-purple-100 text-purple-800",
    proPlus: "bg-green-100 text-green-800",
  };

  const allTemplates = [
    "modern",
    "BlueHorizon",
    "elegantModern",
    "ProfessionalSidebar",
    "modernFormal",
    "creativeTimeLine",
    "bold",
    "professional",
    "gridLayout",
    "creative",
    "formal",
    "glow",
    "elegant",
  ];

  const handlePriceUpdate = async (plan) => {
    setLoading(true);
    const result = await updatePlanPrice(plan, parseFloat(newPrice));
    if (result.success) {
      setEditingPrice(false);
      setLoading(false);
    }
  };

  const handleTemplateUpdate = async (plan) => {
    setLoading(true);
    const templates = selectedTemplates[plan] || [];
    const result = await updatePlanTemplates(plan, templates);
    if (result.success) {
      setPlanData((prev) => ({
        ...prev,
        [plan]: {
          ...prev[plan],
          templates: templates,
        },
      }));
      setLoading(false);
    }
  };
  const handleTemplateToggle = (plan, template) => {
    setSelectedTemplates((prev) => {
      const currentTemplates = prev[plan] || [];
      const updatedTemplates = currentTemplates.includes(template)
        ? currentTemplates.filter((t) => t !== template)
        : [...currentTemplates, template];

      return {
        ...prev,
        [plan]: updatedTemplates,
      };
    });
  };

  return (
    <div className="container mx-auto p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#3b51a3]">
        {t("adminDashboard.title")}
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 bg-[#3b51a3]/10">
          <TabsTrigger
            value="free"
            className="data-[state=active]:bg-[#3b51a3] data-[state=active]:text-white"
          >
            {t("adminDashboard.tabs.free")}
          </TabsTrigger>
          <TabsTrigger
            value="pro"
            className="data-[state=active]:bg-[#3b51a3] data-[state=active]:text-white"
          >
            {t("adminDashboard.tabs.pro")}
          </TabsTrigger>
          <TabsTrigger
            value="proPlus"
            className="data-[state=active]:bg-[#3b51a3] data-[state=active]:text-white"
          >
            {t("adminDashboard.tabs.proPlus")}
          </TabsTrigger>
        </TabsList>
        {Object.entries(initialData).map(([plan, data]) => (
          <TabsContent key={plan} value={plan} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("adminDashboard.cards.totalUsers")}
                  </CardTitle>
                  <Users className="h-4 w-4 text-[#3b51a3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3b51a3]">
                    {data.users.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    {t("adminDashboard.cards.subscribedTo", {
                      plan: t(`adminDashboard.tabs.${plan}`),
                    })}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("adminDashboard.cards.templates")}
                  </CardTitle>
                  <Layout className="h-4 w-4 text-[#3b51a3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3b51a3]">
                    {data.templates.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    {t("adminDashboard.cards.availableFor", {
                      plan: t(`adminDashboard.tabs.${plan}`),
                    })}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("adminDashboard.cards.resumesCreated")}
                  </CardTitle>
                  <FileText className="h-4 w-4 text-[#3b51a3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3b51a3]">
                    {data.resumes}
                  </div>
                  <p className="text-xs text-gray-500">
                    {t("adminDashboard.cards.totalFor", {
                      plan: t(`adminDashboard.tabs.${plan}`),
                    })}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {t("adminDashboard.cards.planPrice")}
                  </CardTitle>
                  {plan !== "free" && (
                    <Dialog open={editingPrice} onOpenChange={setEditingPrice}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4 text-[#3b51a3]" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("editPrice")}</DialogTitle>
                          <DialogDescription>
                            {t("enterNewPrice")}
                          </DialogDescription>
                        </DialogHeader>
                        <Input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          step="0.01"
                          min="0"
                        />
                        <DialogFooter>
                          <Button
                            disabled={loading}
                            onClick={() => handlePriceUpdate(plan)}
                          >
                            {loading ? (
                              <Loader2 className="size-4 animate-spin text-white" />
                            ) : (
                              t("adminDashboard.btns.save")
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3b51a3]">
                    {data.price}
                    <span className="text-sm text-gray-500">{t("SAR")}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-[#3b51a3]">
                    {t("adminDashboard.details.users")}
                  </CardTitle>
                  <CardDescription>
                    {t("adminDashboard.details.subscribedUsers", {
                      plan: t(`adminDashboard.tabs.${plan}`),
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] px-4">
                    {data.users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-4 mb-4 p-2 rounded-lg hover:bg-gray-100"
                      >
                        <Avatar>
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {user.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        <Badge className={`mx-auto ${planColors[plan]}`}>
                          {t(`adminDashboard.tabs.${plan}`)}
                        </Badge>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="col-span-1 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-[#3b51a3]">
                    {t("adminDashboard.details.templates")}
                  </CardTitle>
                  <CardDescription>
                    {t("adminDashboard.details.selectTemplates")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] px-4">
                    <div className="space-y-4">
                      {allTemplates.map((template) => (
                        <div key={template} className="flex items-center gap-2">
                          <Checkbox
                            id={`${plan}-${template}`}
                            checked={selectedTemplates[plan]?.includes(
                              template,
                            )}
                            onCheckedChange={() =>
                              handleTemplateToggle(plan, template)
                            }
                          />
                          <Label
                            htmlFor={`${plan}-${template}`}
                            className="cursor-pointer"
                          >
                            {template}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <Button
                    className="mt-4"
                    disabled={loading}
                    onClick={() => handleTemplateUpdate(plan)}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      t("adminDashboard.btns.save")
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
