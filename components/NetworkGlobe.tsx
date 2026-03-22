"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Secret Next.js trick: Only load this on the actual browser, never the server!
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function NetworkGlobe() {
  const [isMounted, setIsMounted] = useState(false);
  const globeRef = useRef<any>();

  // Wait for the page to load before turning on the 3D engine
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // While it loads, show a glowing glass box so the layout doesn't jump
  if (!isMounted) {
    return (
      <div className="w-full max-w-[800px] mx-auto h-[400px] md:h-[600px] animate-pulse rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex items-center justify-center">
        <p className="text-[#b0b5d1] tracking-widest uppercase text-sm font-bold">Initializing Network...</p>
      </div>
    );
  }

  // Test Data: Starting with Johor Bahru, KL, and SG!
  const testLocations = [
    { lat: 1.4927, lng: 103.7414, name: "Johor Bahru", size: 0.1, color: "#0028a3" },
    { lat: 3.1390, lng: 101.6869, name: "Kuala Lumpur", size: 0.05, color: "#6d79c2" },
    { lat: 1.3521, lng: 103.8198, name: "Singapore", size: 0.05, color: "#6d79c2" }
  ];

  return (
    <div className="w-full flex justify-center items-center cursor-grab active:cursor-grabbing overflow-hidden">
      <Globe
        ref={globeRef}
        height={600}
        width={800}
        backgroundColor="rgba(0,0,0,0)" // Makes the background totally transparent glass!
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={testLocations}
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.4}
        pointsMerge={false}
        // These settings make it slowly spin on its own like a premium tech site
        onGlobeReady={() => {
          if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 1.2;
            globeRef.current.controls().enableZoom = false; // Stops users from getting lost
          }
        }}
      />
    </div>
  );
}