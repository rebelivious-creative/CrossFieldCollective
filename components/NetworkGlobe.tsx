"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function NetworkGlobe() {
  const [isMounted, setIsMounted] = useState(false);
  const globeRef = useRef<any>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full max-w-[800px] mx-auto h-[300px] md:h-[500px] animate-pulse rounded-3xl border border-[#0028a3]/30 bg-[#020112]/50 backdrop-blur-md flex items-center justify-center">
        <p className="text-[#6d79c2] tracking-widest uppercase text-sm font-bold">Initializing CF Network...</p>
      </div>
    );
  }

  // Upgraded Test Data with CF Colors
  const testLocations = [
    { lat: 1.4927, lng: 103.7414, name: "Johor Bahru", size: 0.15, color: "#6d79c2" },
    { lat: 3.1390, lng: 101.6869, name: "Kuala Lumpur", size: 0.08, color: "#0028a3" },
    { lat: 1.3521, lng: 103.8198, name: "Singapore", size: 0.08, color: "#0028a3" }
  ];

  // Laser Arcs connecting the network!
  const testArcs = [
    { startLat: 1.4927, startLng: 103.7414, endLat: 3.1390, endLng: 101.6869, color: ['#0028a3', '#6d79c2'] },
    { startLat: 1.4927, startLng: 103.7414, endLat: 1.3521, endLng: 103.8198, color: ['#0028a3', '#6d79c2'] }
  ];

  return (
    <div className="w-full flex justify-center items-center cursor-grab active:cursor-grabbing overflow-hidden mt-8 mb-16">
      <Globe
        ref={globeRef}
        height={500} 
        width={800}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        atmosphereColor="#0028a3" // CF Glowing Blue Atmosphere!
        atmosphereAltitude={0.25}
        pointsData={testLocations}
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.5}
        pointsMerge={false}
        arcsData={testArcs}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={1500} // Makes the lines look like flowing data
        onGlobeReady={() => {
          if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 1.0;
            globeRef.current.controls().enableZoom = false;
            
            // Forces the camera to start looking directly at Malaysia!
            globeRef.current.pointOfView({ lat: 2.0, lng: 103.0, altitude: 1.8 }, 2000);
          }
        }}
      />
    </div>
  );
}