"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { beneficiaries, getBeneficiaryStats } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Bell, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define the beneficiary type to match the structure in mockData
interface Beneficiary {
  id: string;
  name: string;
  aadhaar: string;
  location: string;
  policies: string;
  landArea: number;
  familySize: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState<Beneficiary[]>(beneficiaries);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const stats = getBeneficiaryStats();

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, [user, router]);

  // Filter beneficiaries based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBeneficiaries(beneficiaries);
    } else {
      const filtered = beneficiaries.filter(
        (b) =>
          b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.aadhaar.includes(searchTerm)
      );
      setFilteredBeneficiaries(filtered);
    }
  }, [searchTerm]);

  const handleViewDetails = (id: string) => {
    router.push(`/admin/beneficiary/${id}`);
  };

  if (!user || user.role !== "admin") {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold mb-4 flex justify-between items-center">
                    Active System Alerts
                    
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Beneficairy's</div>
                      <div className="bg-red-500 text-white px-2 py-0.5 rounded text-sm">Priority</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="bg-red-500 text-white px-2 py-0.5 rounded">High</span>
                        <div>
                          <div>Rajesh Kumar</div>
                          <div className="text-sm text-gray-500">Shivpur</div>
                        </div>
                      </div>
                      <Button className="bg-blue-500 hover:bg-blue-600">View Benefiagy</Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Beneficiary's</div>
                      <div className="flex gap-2">
                        <span className="bg-yellow-500 text-white px-2 py-0.5 rounded text-sm">Medium</span>
                        <span className="bg-green-500 text-white px-2 py-0.5 rounded text-sm">Low</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="bg-yellow-500 text-white px-2 py-0.5 rounded">Medium</span>
                        <div>
                          <div>Beneficiary submited imcoplete</div>
                          <div className="text-sm text-gray-500">Shivpur</div>
                        </div>
                      </div>
                      <Button className="bg-blue-500 hover:bg-blue-600">View Benefiary</Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-2">Vilme Alerts</div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-green-500 text-white px-2 py-0.5 rounded">Low</span>
                        <div>Beneficiary submited impoplete documentation for scheme ABC.</div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Acknowledge</Button>
                        <Button className="bg-blue-500 hover:bg-blue-600">View Beneficiary</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="text-sm text-gray-600">
              Location: Mayurbhanj District
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-gray-200 shadow-sm p-4">
              <h3 className="text-gray-500 text-sm mb-1">Total Beneficiaries</h3>
              <p className="text-3xl font-bold">{stats.totalBeneficiaries}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border border-gray-200 shadow-sm p-4">
              <h3 className="text-gray-500 text-sm mb-1">Active Policies</h3>
              <p className="text-3xl font-bold">{stats.activePolicies}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border border-gray-200 shadow-sm p-4">
              <h3 className="text-gray-500 text-sm mb-1">Total Land Area</h3>
              <p className="text-3xl font-bold">{stats.totalLandArea} acres</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border border-gray-200 shadow-sm p-4">
              <h3 className="text-gray-500 text-sm mb-1">Avg. Family Size</h3>
              <p className="text-3xl font-bold">{stats.avgFamilySize}</p>
            </Card>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="outline" className="hover:bg-gray-100">
            All Beneficiaries
          </Button>
          <Button variant="outline" className="text-gray-600 hover:bg-gray-100">
            Forest Rights Act
          </Button>
          <Button variant="outline" className="text-gray-600 hover:bg-gray-100">
            PM Kisan
          </Button>
          <Button variant="outline" className="text-gray-600 hover:bg-gray-100">
            Tribal Schemes
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search beneficiaries..."
              className="border-gray-300 pl-10"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Beneficiaries Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhaar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policies</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{beneficiary.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{beneficiary.aadhaar}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{beneficiary.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{beneficiary.policies}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{beneficiary.landArea} acres</td>
                  <td className="px-6 py-4 whitespace-nowrap">{beneficiary.familySize}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      size="sm"
                      onClick={() => handleViewDetails(beneficiary.id)}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}