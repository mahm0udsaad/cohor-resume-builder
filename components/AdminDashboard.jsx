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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, FileText, Layout, TrendingUp } from "lucide-react";

export default function AdminDashboard({ initialData }) {
  const [activeTab, setActiveTab] = useState("free");

  const planColors = {
    free: "bg-blue-100 text-blue-800",
    pro: "bg-purple-100 text-purple-800",
    proPlus: "bg-green-100 text-green-800",
  };

  const displayPlanName = {
    free: "Free",
    pro: "Pro",
    proPlus: "Pro Plus",
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#3b51a3]">
        Admin Dashboard
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
            Free
          </TabsTrigger>
          <TabsTrigger
            value="pro"
            className="data-[state=active]:bg-[#3b51a3] data-[state=active]:text-white"
          >
            Pro
          </TabsTrigger>
          <TabsTrigger
            value="proPlus"
            className="data-[state=active]:bg-[#3b51a3] data-[state=active]:text-white"
          >
            Pro Plus
          </TabsTrigger>
        </TabsList>
        {Object.entries(initialData).map(([plan, data]) => (
          <TabsContent key={plan} value={plan} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-[#3b51a3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3b51a3]">
                    {data.users.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    Subscribed to {displayPlanName[plan]}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Templates
                  </CardTitle>
                  <Layout className="h-4 w-4 text-[#3b51a3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3b51a3]">
                    {data.templates.length}
                  </div>
                  <p className="text-xs text-gray-500">
                    Available for {displayPlanName[plan]}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Resumes Created
                  </CardTitle>
                  <FileText className="h-4 w-4 text-[#3b51a3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3b51a3]">
                    {data.resumes}
                  </div>
                  <p className="text-xs text-gray-500">
                    Total for {displayPlanName[plan]}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Plan Performance
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-[#3b51a3]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#3b51a3]">
                    {data.users.length
                      ? (data.resumes / data.users.length).toFixed(1)
                      : "0.0"}
                  </div>
                  <p className="text-xs text-gray-500">Resumes per user</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-[#3b51a3]">Users</CardTitle>
                  <CardDescription>
                    Users subscribed to the {displayPlanName[plan]} plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {data.users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-4 mb-4 p-2 rounded-lg hover:bg-gray-100"
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
                        <Badge className={`ml-auto ${planColors[plan]}`}>
                          {displayPlanName[plan]}
                        </Badge>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="col-span-1 bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-[#3b51a3]">Templates</CardTitle>
                  <CardDescription>
                    Available templates for the {displayPlanName[plan]} plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {data.templates.map((template, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 mb-4 p-2 rounded-lg hover:bg-gray-100"
                      >
                        <Layout className="h-5 w-5 text-[#3b51a3]" />
                        <p className="text-sm font-medium leading-none">
                          {template}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
