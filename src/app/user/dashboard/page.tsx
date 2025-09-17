"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserData } from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

// Define interfaces for user data types
interface FamilyMember {
  name: string;
  relation: string;
  age: number;
  aadhaar: string;
}

interface Document {
  name: string;
  uploadDate: string;
  status: "Verified" | "Pending" | "Rejected";
}

interface Benefit {
  scheme: string;
  date: string;
  description: string;
  value: number;
}

interface Scheme {
  name: string;
  status: string;
  startDate: string;
}

interface UserData {
  name: string;
  aadhaar: string;
  location: string;
  familySize: number;
  landArea: number;
  landType: string;
  landStatus: string;
  registrationDate: string;
  activeSchemes: Scheme[];
  familyMembers: FamilyMember[];
  documents: Document[];
  benefitsHistory: Benefit[];
}

export default function UserDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const userData: UserData = getUserData();

  // Redirect if not logged in or not a user
  useEffect(() => {
    if (!user || user.role !== "user") {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || user.role !== "user") {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Welcome, {userData.name}</h1>
        </motion.div>

        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium">{userData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Aadhaar:</span>
                    <span className="font-medium">{userData.aadhaar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{userData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Family Size:</span>
                    <span className="font-medium">{userData.familySize}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Land Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Area:</span>
                    <span className="font-medium">{userData.landArea} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Land Type:</span>
                    <span className="font-medium">Forest Land</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-green-600">Verified</span>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                      View Land Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {userData.activeSchemes.map((scheme, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span>{scheme.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4">Your Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="text-lg">Forest Rights Act Benefits</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Land Rights</p>
                      <p className="text-sm text-gray-500">Legal ownership of forest land up to 4 hectares</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Resource Access</p>
                      <p className="text-sm text-gray-500">Right to collect minor forest produce</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="text-lg">PM Kisan Benefits</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Financial Support</p>
                      <p className="text-sm text-gray-500">₹6,000 per year in three equal installments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Next Installment</p>
                      <p className="text-sm text-gray-500">Due on 15th August, 2023</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}