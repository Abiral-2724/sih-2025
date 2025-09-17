"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [solutionRef, solutionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [innovationRef, innovationInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [problemRef, problemInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="font-sans min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #4CAF50 0%, #2196F3 100%)",
        }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/wave-bg.svg')] bg-cover opacity-20 animate-wave"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="text-white max-w-2xl mb-10 md:mb-0"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              variants={fadeUp}
            >
              VanAdhikar-DSS
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 opacity-90"
              variants={fadeUp}
            >
              An AI-powered FRA Atlas and WebGIS Decision Support System for transforming recognition into empowerment.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={slideIn}
            >
              <Link 
                href="/dashboard" 
                className="bg-white text-green-700 px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
              >
                Explore Dashboard
              </Link>
              <Link 
                href="/about" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="w-full md:w-1/2 flex justify-center"
          >
            <Image 
              src="https://plus.unsplash.com/premium_photo-1712328581748-75c46db5ed1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Globe with satellite grid overlay" 
              width={400} 
              height={400}
              className="drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section 
        ref={solutionRef}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={solutionInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solution</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              VanAdhikar-DSS combines cutting-edge technology with deep domain expertise to create a comprehensive solution for forest rights management.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              animate={solutionInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered FRA Atlas</h3>
              <p className="text-gray-600">
                Digitizes fragmented paper records using OCR and NLP, creating a unified national geospatial database of FRA claims.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={solutionInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">WebGIS Dashboard</h3>
              <p className="text-gray-600">
                Provides real-time, interactive monitoring of FRA claims with transparent map-based visualization for all stakeholders.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={solutionInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Decision Support System (DSS)</h3>
              <p className="text-gray-600">
                AI-driven engine that links FRA beneficiaries with major government schemes, enabling proactive service delivery.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <motion.div
              initial="hidden"
              animate={solutionInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multilingual & Inclusive</h3>
              <p className="text-gray-600">
                Supports multiple Indian languages and grassroots accessibility, ensuring nationwide adoption and ease of use.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={solutionInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ delay: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Predictive Governance</h3>
              <p className="text-gray-600">
                AI-powered alerts identify service delivery gaps and enable proactive interventions for transparent, accountable governance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Innovation & Uniqueness Section */}
      <section 
        ref={innovationRef}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial="hidden"
            animate={innovationInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            Innovation & Uniqueness
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Convergence AI Agent", icon: "🔄", delay: 0 },
              { title: "Multi-Modal Models", icon: "📑", delay: 0.2 },
              { title: "Predictive Platform", icon: "🤖", delay: 0.4 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 duration-300"
                initial="hidden"
                animate={innovationInView ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { 
                      duration: 0.6,
                      delay: item.delay
                    } 
                  }
                }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">
                  Advanced technology solutions powering our platform for maximum efficiency and accuracy.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Resolution Section */}
      <section 
        ref={problemRef}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial="hidden"
            animate={problemInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            Problem Resolution
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="w-full md:w-1/2"
              initial="hidden"
              animate={problemInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">✓</div>
                  <p className="text-lg">FRA Atlas as a single source of truth.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">✓</div>
                  <p className="text-lg">WebGIS dashboard ensures transparency.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">✓</div>
                  <p className="text-lg">Georeferenced claims help reverse wrongful rejections.</p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial="hidden"
              animate={problemInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <div className="rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src="/map-placeholder.svg" 
                  alt="Map of India with district overlays" 
                  width={600} 
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section 
        ref={ctaRef}
        className="py-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2196F3 0%, #4CAF50 100%)",
        }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/wave-bg.svg')] bg-cover opacity-20 animate-wave-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div 
              className="text-white max-w-2xl"
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Empowering Communities Through Transparent Land Rights
              </h2>
              <Link 
                href="/dashboard" 
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all mt-4"
              >
                Try Demo Dashboard
              </Link>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <Image 
                src="/community.svg" 
                alt="Community collaboration" 
                width={300} 
                height={200}
                className="drop-shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
