'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/shared/Footer';
import WhatsApp from '@/components/shared/WhatsApp';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { services } from '@/lib/services';
import { projects } from '@/lib/projects';
import { WindowIcon, FacadeIcon, RailingIcon, ShowerIcon, PergolaIcon, GalleryIcon, ProductIcon, AboutIcon, ContactIcon } from '@/lib/icons';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-crystal-dark">
      <Header />
      <Hero />
      
      {/* Quick Overview */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-crystal-dark via-gray-900 to-crystal-dark">
        <div className="section-padding">
          <div className="container-max">
            
            {/* Main Pages Navigation */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            >
              {[
                {
                  title: "גלריה",
                  description: "הפרויקטים שמגדירים אותנו",
                  href: "/gallery",
                  icon: GalleryIcon,
                  image: projects[0].images[0]
                },
                {
                  title: "מחשבון",
                  description: "קבלו הערכת מחיר לפי המידות שלכם",
                  href: "/calculator",
                  icon: WindowIcon, // you can pick another icon if you prefer
                  image: "https://images.unsplash.com/photo-1597007721077-b3c6ffb6d1d5?w=400"
                },
                {
                  title: "מוצרים",
                  description: "ההתמחויות שלנו",
                  href: "/products", 
                  icon: ProductIcon,
                  image: services[0].image
                },
                {
                  title: "אודות",
                  description: "החזון שלנו ברור – שקיפות מושלמת",
                  href: "/about",
                  icon: AboutIcon,
                  image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400"
                },
                {
                  title: "יצירת קשר",
                  description: "בואו נתחיל את הפרויקט שלכם",
                  href: "/contact",
                  icon: ContactIcon,
                  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"
                }
              ].map((page, index) => {
                const IconComponent = page.icon;
                
                return (
                  <Link key={index} href={page.href}>
                    <motion.div
                      variants={staggerItem}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group relative overflow-hidden rounded-2xl shadow-2xl bg-crystal-dark cursor-pointer"
                    >
                      {/* Background Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={page.image}
                          alt={page.title}
                          width={300}
                          height={256}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-crystal-dark via-crystal-dark/70 to-crystal-dark/20"></div>
                        
                        {/* Icon */}
                        <div className="absolute top-6 right-6 w-12 h-12 bg-crystal-blue/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-crystal-dark">
                          <IconComponent />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-crystal-white mb-3">
                          {page.title}
                        </h3>
                        <p className="text-crystal-silver text-sm">
                          {page.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>

            {/* Featured Projects Preview */}
            <motion.div
              initial="initial"
              whileInView="animate" 
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl lg:text-5xl font-bold text-crystal-white mb-6"
              >
                פרויקטים נבחרים
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-xl text-crystal-silver max-w-3xl mx-auto leading-relaxed"
              >
                כל פרויקט הוא הזדמנות להראות מהי שלמות
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={staggerItem}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-crystal-dark/80 to-transparent">
                      <div className="absolute bottom-4 right-4 left-4">
                        <h4 className="text-crystal-white font-bold text-lg mb-1">
                          {project.title}
                        </h4>
                        <p className="text-crystal-blue text-sm">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <Link href="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                >
                  צפו בכל הפרויקטים
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsApp />
    </main>
  );
}