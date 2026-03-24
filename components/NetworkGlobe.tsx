"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { client } from "../tina/__generated__/client";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function NetworkGlobe({ glowColor1 = "#0028a3", glowColor2 = "#6d79c2" }: { glowColor1?: string, glowColor2?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [arcs, setArcs] = useState<any[]>([]);
  const globeRef = useRef<any>();

  // ==========================================
  // 🎨 DESIGNER CONTROL PANEL
  // Tweak these numbers to change the exact look of the globe!
  // ==========================================
  const VISUALS = {
    // ARC (LASER) SETTINGS
    ARC_THICKNESS: 1.0,       // Standard is 0.5. Higher = thicker lines.
    ARC_CURVE_HEIGHT: 0.4,    // Standard is 0.3. Higher = arcs shoot higher into space.
    ARC_LASER_LENGTH: 0.4,    // How long the glowing beam is (0.1 to 1.0)
    ARC_SPEED: 2000,          // Time in milliseconds. Lower number = FASTER lasers!
    
    // COLORS & HUB
    HUB_COORD: { lat: 1.3521, lng: 103.8198 }, // Singapore Hub
    HUB_SIZE: 0.25,           // Size of the main HQ dot
    PARTNER_SIZE: 0.15,       // Size of the connected city dots
    ATMOSPHERE_GLOW: 0.3,     // How thick the blue halo around the earth is
    AUTO_ROTATE_SPEED: 1.0    // Speed of the earth spinning
  };
  // ==========================================

  useEffect(() => {
    setIsMounted(true);
    
    const fetchTinaLocations = async () => {
      try {
        const response = await client.queries.locationsConnection();
        
        if (response.data && response.data.locationsConnection.edges) {
          const docs = response.data.locationsConnection.edges;
          
          const partnerLocations = docs.map((edge: any) => {
            const data = edge.node;
            const rawUrl = data.googleMapsUrl || "";
            const name = data.companyName || "CF Partner";
            
            const coordsMatch = rawUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
            
            if (coordsMatch) {
              return {
                name: name,
                lat: parseFloat(coordsMatch[1]),
                lng: parseFloat(coordsMatch[2]),
                size: VISUALS.PARTNER_SIZE
              };
            }
            return null;
          }).filter(Boolean);

          const singaporeHub = {
            name: "Crossfield HQ",
            lat: VISUALS.HUB_COORD.lat,
            lng: VISUALS.HUB_COORD.lng,
            size: VISUALS.HUB_SIZE,
            color: glowColor2
          };
          
          setLocations([singaporeHub, ...partnerLocations]);

          if (partnerLocations.length > 0) {
            const generatedArcs = partnerLocations.map(partner => ({
              startLat: VISUALS.HUB_COORD.lat,
              startLng: VISUALS.HUB_COORD.lng,
              endLat: partner.lat,
              endLng: partner.lng,
            }));
            setArcs(generatedArcs);
          }
        }
      } catch (error) {
        console.error("Failed to connect to TinaCMS:", error);
      }
    };
    
    fetchTinaLocations();
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full max-w-[800px] mx-auto h-[300px] md:h-[500px] animate-pulse rounded-3xl border bg-[#020112]/50 backdrop-blur-md flex items-center justify-center" style={{ borderColor: `${glowColor1}4d` }}>
        <p className="tracking-widest uppercase text-sm font-bold" style={{ color: glowColor2 }}>Initializing CF Network...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center cursor-grab active:cursor-grabbing overflow-hidden mt-8 mb-16" style={{ outline: 'none' }}>
      <Globe
        ref={globeRef}
        height={500} 
        width={800}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        atmosphereColor={glowColor1}
        atmosphereAltitude={VISUALS.ATMOSPHERE_GLOW}

        pointsData={locations}
        pointAltitude="size"
        pointColor={(d: any) => d.color || glowColor1} 
        pointRadius={0.5}
        pointLabel={(d: any) => `
          <div style="background: #020112; border: 1px solid ${glowColor1}; padding: 8px 12px; border-radius: 8px; color: white; font-family: sans-serif; box-shadow: 0 0 10px ${glowColor1}4d;">
            <b style="color: ${glowColor2}">${d.name}</b>
          </div>
        `}

        // WIRING UP THE DESIGNER CONTROLS
        arcsData={arcs}
        arcColor={() => [glowColor1, glowColor2]} // Creates a sick gradient from start to finish!
        arcAltitude={() => VISUALS.ARC_CURVE_HEIGHT}
        arcStroke={() => VISUALS.ARC_THICKNESS}
        arcDashLength={VISUALS.ARC_LASER_LENGTH}
        arcDashGap={2.0} // Keeps the gap wide so it looks like a single pulse
        arcDashAnimateTime={VISUALS.ARC_SPEED} 
        
        onGlobeReady={() => {
          if (globeRef.current) {
            const controls = globeRef.current.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = VISUALS.AUTO_ROTATE_SPEED;
            controls.enableZoom = true;
            controls.minDistance = 150; 
            controls.maxDistance = 400; 
            
            globeRef.current.pointOfView({ lat: VISUALS.HUB_COORD.lat, lng: VISUALS.HUB_COORD.lng, altitude: 2.2 }, 2000);
          }
        }}
      />
    </div>
  );
}