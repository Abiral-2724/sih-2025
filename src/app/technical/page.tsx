"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function TechnicalApproachPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const techStack = [
    {
      name: "Next.js",
      description: "React framework for building the frontend with server-side rendering capabilities",
      icon: "⚛️"
    },
    {
      name: "Leaflet.js",
      description: "Open-source JavaScript library for interactive maps with GIS capabilities",
      icon: "🗺️"
    },
    {
      name: "Django",
      description: "Python web framework for building robust backend APIs and services",
      icon: "🐍"
    },
    {
      name: "PostgreSQL/PostGIS",
      description: "Spatial database for storing and querying geographic data",
      icon: "🌐"
    },
    {
      name: "TensorFlow",
      description: "Machine learning framework for AI-powered insights and predictions",
      icon: "🧠"
    },
    {
      name: "Google Earth Engine",
      description: "Cloud-based platform for satellite imagery analysis and processing",
      icon: "🛰️"
    }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">
          Technical Approach
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Leveraging cutting-edge technologies to create a robust, scalable solution for forest rights management.
        </p>
      </motion.div>

      {/* Tech Stack Grid */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techStack.map((tech, index) => (
            <TechCard 
              key={index}
              name={tech.name}
              description={tech.description}
              icon={tech.icon}
            />
          ))}
        </motion.div>
      </section>

      {/* Architecture Diagram */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">System Architecture</h2>
        <Card>
          <CardContent className="p-6">
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Architecture Diagram Placeholder</p>
                <div className="mx-auto w-full max-w-3xl">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-100 p-4 rounded">Frontend Layer</div>
                    <div className="bg-green-100 p-4 rounded">API Layer</div>
                    <div className="bg-purple-100 p-4 rounded">Data Layer</div>
                  </div>
                  <div className="h-8 flex items-center justify-center">
                    <div className="border-l-2 border-gray-400 h-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-yellow-100 p-4 rounded">ML/AI Services</div>
                    <div className="bg-red-100 p-4 rounded">GIS Processing</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Features */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Technical Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Spatial Data Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Real-time geospatial data processing</li>
                <li>Satellite imagery analysis for land use verification</li>
                <li>Boundary conflict detection algorithms</li>
                <li>Historical land use pattern recognition</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle>AI/ML Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Document classification for claim verification</li>
                <li>Predictive analytics for claim processing time</li>
                <li>Anomaly detection in land use patterns</li>
                <li>Natural language processing for tribal language support</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Security & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>End-to-end encryption for sensitive data</li>
                <li>Role-based access control system</li>
                <li>Audit trails for all system actions</li>
                <li>Compliance with government data protection standards</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Scalability & Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Microservices architecture for independent scaling</li>
                <li>Distributed processing for large geospatial datasets</li>
                <li>Caching strategies for frequently accessed data</li>
                <li>Offline-first approach for rural connectivity challenges</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

function TechCard({ name, description, icon }) {
  // Define the animation variant locally
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemAnimation}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{icon}</div>
              <CardTitle>{name}</CardTitle>
            </CardHeader>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <CardDescription className="text-base">{description}</CardDescription>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
}