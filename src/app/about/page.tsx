"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
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

  const teamMembers = [
    {
      name: "Aditya Sharma",
      role: "Team Lead & Full Stack Developer",
      bio: "Experienced in building GIS applications and leading development teams.",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Priya Patel",
      role: "GIS Specialist",
      bio: "Expert in spatial data analysis and geospatial database management.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Rahul Verma",
      role: "Machine Learning Engineer",
      bio: "Specializes in computer vision and satellite imagery analysis.",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      name: "Ananya Singh",
      role: "UI/UX Designer",
      bio: "Creates intuitive user experiences with a focus on accessibility.",
      image: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      name: "Vikram Reddy",
      role: "Backend Developer",
      bio: "Expert in building scalable APIs and database architecture.",
      image: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      name: "Meera Joshi",
      role: "Policy Researcher",
      bio: "Specializes in forest rights legislation and tribal community engagement.",
      image: "https://randomuser.me/api/portraits/women/6.jpg"
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
          About Our Team
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet the passionate individuals behind VanAdhikar-DSS, working to transform forest rights management through technology.
        </p>
      </motion.div>

      {/* Mission Section */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            To empower tribal communities by creating transparent, efficient digital systems for forest rights management, ensuring equitable access to land resources and promoting sustainable development.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet The Team</h2>
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </motion.div>
      </section>

      {/* Our Approach */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Human-Centered Design</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                We prioritize the needs of tribal communities in our design process, ensuring our solutions are accessible, intuitive, and culturally sensitive.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Technology with Purpose</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                We leverage cutting-edge technology not for its own sake, but to solve real problems faced by communities in accessing their forest rights.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Collaborative Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                We work closely with government agencies, NGOs, and community representatives to ensure our solutions address the needs of all stakeholders.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Partners */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-gray-100 rounded-lg p-8 w-40 h-40 flex items-center justify-center">
            <p className="text-gray-500">Partner Logo</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 w-40 h-40 flex items-center justify-center">
            <p className="text-gray-500">Partner Logo</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 w-40 h-40 flex items-center justify-center">
            <p className="text-gray-500">Partner Logo</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 w-40 h-40 flex items-center justify-center">
            <p className="text-gray-500">Partner Logo</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function TeamMemberCard({ name, role, bio, image }) {
  return (
    <motion.div variants={item}>
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className="text-blue-600 font-medium">{role}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{bio}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}