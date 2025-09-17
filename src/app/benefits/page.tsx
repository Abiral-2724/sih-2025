"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BenefitsPage() {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [cardsRef, cardsInView] = useInView({
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
          Benefits & Impact
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transforming forest rights management through digital innovation, creating transparency and empowering communities.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        ref={statsRef}
        variants={container}
        initial="hidden"
        animate={statsInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
      >
        <StatCard 
          title="Land Digitized" 
          value={95} 
          suffix="%" 
          description="Forest land digitally mapped" 
          inView={statsInView}
        />
        <StatCard 
          title="Processing Time" 
          value={60} 
          suffix="%" 
          description="Reduction in claim processing" 
          inView={statsInView}
        />
        <StatCard 
          title="Disputes Resolved" 
          value={1250} 
          suffix="+" 
          description="Land disputes resolved digitally" 
          inView={statsInView}
        />
        <StatCard 
          title="Communities Served" 
          value={350} 
          suffix="+" 
          description="Tribal communities benefited" 
          inView={statsInView}
        />
      </motion.div>

      {/* Case Studies */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Case Studies</h2>
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Kodagu District, Karnataka</h3>
              <p className="mb-4">
                In Kodagu, the VanAdhikar-DSS system helped resolve a decades-old boundary dispute between forest departments and tribal communities. By digitizing historical records and using satellite imagery, the system provided clear evidence of traditional land use patterns.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>95% reduction in processing time for claims</li>
                <li>127 families received proper documentation</li>
                <li>3,500 hectares of land properly mapped and recorded</li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Case Study Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Impact Areas</h2>
        <motion.div
          ref={cardsRef}
          variants={container}
          initial="hidden"
          animate={cardsInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <ImpactCard
            title="Transparency & Accountability"
            description="Digital records and public dashboards ensure all stakeholders can track claim status and decisions, reducing corruption and increasing trust in the process."
            icon="🔍"
          />
          <ImpactCard
            title="Rural Credit Access"
            description="With proper documentation of land rights, tribal communities can access formal credit systems, enabling economic development and sustainable livelihoods."
            icon="💰"
          />
          <ImpactCard
            title="Dispute Resolution"
            description="AI-powered analysis of historical records and satellite imagery helps resolve boundary disputes quickly and fairly, reducing conflicts."
            icon="⚖️"
          />
          <ImpactCard
            title="Cost Savings"
            description="Digital processing reduces administrative costs by 70%, allowing resources to be redirected to community development and forest conservation efforts."
            icon="📉"
          />
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl p-12"
      >
        <h2 className="text-3xl font-bold mb-4">Experience the Impact</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          See how VanAdhikar-DSS is transforming forest rights management across India.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Try the Dashboard
        </button>
      </motion.div>
    </main>
  );
}

function StatCard({ title, value, suffix, description, inView }) {
  return (
    <motion.div
      variants={item}
      className="bg-white rounded-xl shadow-md p-6 text-center"
    >
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <div className="text-4xl font-bold text-blue-600 mb-2">
        {inView ? (
          <CountUp end={value} duration={2} suffix={suffix} />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      <p className="text-gray-500">{description}</p>
    </motion.div>
  );
}

function ImpactCard({ title, description, icon }) {
  return (
    <motion.div variants={item}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="text-4xl mb-2">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}