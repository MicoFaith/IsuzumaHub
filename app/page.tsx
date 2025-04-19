"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { Header } from "@/components/header"

export default function Home() {
  // Refs for scrolling
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header
        onHomeClick={() => scrollToSection(homeRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onGalleryClick={() => scrollToSection(galleryRef)}
      />

      {/* Home Section */}
      <div ref={homeRef} className="flex-1 relative min-h-screen">
  <video
    src="/lab-video.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="object-cover w-full h-full absolute top-0 left-0"
  />
</div>
<div>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white p-8 max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to IsuzumaHub</h1>
            <p className="text-xl">
              A comprehensive laboratory management system designed to streamline operations, manage samples, and
              facilitate reporting for laboratories of all sizes.
            </p>
          </div>
        </div>
      </div>

      {/* About Section - Now before Gallery */}
      <div ref={aboutRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About IsuzumaHub</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="mb-6">
                IsuzumaHub is a comprehensive laboratory management system designed to streamline operations, manage
                samples, track inventory, and facilitate reporting for laboratories of all sizes.
              </p>
              <p className="mb-6">
                Our system helps laboratory professionals focus on their scientific work by automating administrative
                tasks and providing a centralized platform for all laboratory data.
              </p>
              <p>
                Whether you're running a small research lab or managing a large-scale testing facility, IsuzumaHub
                provides the tools you need to increase efficiency and maintain compliance.
              </p>
            </div>

            <div className="bg-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-blue-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Sample tracking and management</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Inventory control and reagent management</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Equipment maintenance scheduling</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Comprehensive reporting and analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>User management with role-based access</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-400 text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                    ✓
                  </span>
                  <span>Compliance with industry regulations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section - Now after About */}
      <div ref={galleryRef} className="py-16 px-4 bg-blue-300">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center text-white mb-16">Gallery</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gallery Image 1 */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/gallery-1.jpg"
                alt="Scientist working in laboratory"
                width={500}
                height={350}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Gallery Image 2 */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/gallery-2.jpg"
                alt="Laboratory microscope"
                width={500}
                height={350}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Gallery Image 3 */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/gallery-3.jpg"
                alt="Scientist with lab equipment"
                width={500}
                height={350}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Gallery Image 4 */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/gallery-4.jpg"
                alt="Scientist using microscope"
                width={500}
                height={350}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Gallery Image 5 */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/gallery-5.jpg"
                alt="Clean room laboratory"
                width={500}
                height={350}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Gallery Image 6 */}
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/gallery-6.jpg"
                alt="Laboratory samples and petri dishes"
                width={500}
                height={350}
                className="w-full h-64 object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
