"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Mock data for the dashboard
const claimsData = [
  { id: "FRA-2023-001", location: "Kodagu, Karnataka", status: "Approved", area: "2.5 hectares", date: "2023-05-15" },
  { id: "FRA-2023-002", location: "Wayanad, Kerala", status: "Pending", area: "1.8 hectares", date: "2023-06-22" },
  { id: "FRA-2023-003", location: "Nilgiris, Tamil Nadu", status: "Under Review", area: "3.2 hectares", date: "2023-07-10" },
  { id: "FRA-2023-004", location: "Koraput, Odisha", status: "Approved", area: "2.1 hectares", date: "2023-04-30" },
  { id: "FRA-2023-005", location: "Dang, Gujarat", status: "Rejected", area: "1.5 hectares", date: "2023-08-05" },
];

const schemesData = [
  { id: "SCH-001", name: "Tribal Forest Conservation", eligibility: "FRA Claim Holders", benefits: "Financial assistance for forest conservation" },
  { id: "SCH-002", name: "Sustainable Harvesting Program", eligibility: "Approved FRA Claims", benefits: "Training and equipment for sustainable harvesting" },
  { id: "SCH-003", name: "Forest Produce Marketing", eligibility: "All Forest Dwellers", benefits: "Market linkage for forest produce" },
];

const insightsData = [
  { title: "Claim Approval Rate", value: "68%", trend: "up", change: "5%" },
  { title: "Average Processing Time", value: "45 days", trend: "down", change: "12%" },
  { title: "Forest Cover Change", value: "+2.3%", trend: "up", change: "1.5%" },
  { title: "Community Participation", value: "1,245 claims", trend: "up", change: "23%" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          WebGIS Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Dashboard Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="claims" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="claims">Claims</TabsTrigger>
                      <TabsTrigger value="schemes">Schemes</TabsTrigger>
                      <TabsTrigger value="insights">Insights</TabsTrigger>
                    </TabsList>
                    <TabsContent value="claims" className="space-y-4 mt-4">
                      <h3 className="font-medium text-sm text-gray-500">CLAIM STATUS</h3>
                      <div className="space-y-2">
                        {claimsData.map((claim) => (
                          <div key={claim.id} className="p-3 bg-white rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{claim.id}</p>
                                <p className="text-sm text-gray-600">{claim.location}</p>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                claim.status === "Approved" ? "bg-green-100 text-green-800" :
                                claim.status === "Rejected" ? "bg-red-100 text-red-800" :
                                claim.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                "bg-blue-100 text-blue-800"
                              }`}>
                                {claim.status}
                              </span>
                            </div>
                            <div className="mt-2 flex justify-between text-xs text-gray-500">
                              <span>{claim.area}</span>
                              <span>{claim.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="schemes" className="space-y-4 mt-4">
                      <h3 className="font-medium text-sm text-gray-500">AVAILABLE SCHEMES</h3>
                      <div className="space-y-2">
                        {schemesData.map((scheme) => (
                          <div key={scheme.id} className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer">
                            <p className="font-medium">{scheme.name}</p>
                            <p className="text-xs text-gray-600 mt-1">Eligibility: {scheme.eligibility}</p>
                            <p className="text-xs text-gray-600 mt-1">{scheme.benefits}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="insights" className="space-y-4 mt-4">
                      <h3 className="font-medium text-sm text-gray-500">AI INSIGHTS</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {insightsData.map((insight, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-600">{insight.title}</p>
                            <div className="flex items-end justify-between mt-1">
                              <p className="text-xl font-bold">{insight.value}</p>
                              <div className={`flex items-center text-xs ${
                                insight.trend === "up" ? "text-green-600" : "text-red-600"
                              }`}>
                                <svg 
                                  className="w-3 h-3 mr-1" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24" 
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d={insight.trend === "up" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                                  ></path>
                                </svg>
                                {insight.change}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <CardTitle>Interactive Map</CardTitle>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">FRA Claims</button>
                      <button className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full">Forest Loss</button>
                      <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Satellite</button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center mt-4">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                      <p className="text-gray-600">Interactive India Map</p>
                      <p className="text-sm text-gray-500 mt-2">Showing FRA claims and forest cover data</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-600">Total Claims</p>
                      <p className="text-2xl font-bold">1,245</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-600">Approved Claims</p>
                      <p className="text-2xl font-bold">847</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-600">Total Area</p>
                      <p className="text-2xl font-bold">3,567 ha</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}