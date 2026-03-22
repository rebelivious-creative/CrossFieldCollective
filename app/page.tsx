import React from "react";
import client from "../tina/__generated__/client";
import ClientPage from "./client-page";
import NetworkGlobe from "../components/NetworkGlobe";

export default async function Page() {
  // @ts-ignore
  const res = await client.queries.page({ relativePath: "home.md" });

  return (
    <main>
      {/* This loads all your TinaCMS blocks (Hero, Timeline, etc) */}
      <ClientPage {...res} />
      
      {/* This is our brand new 3D Globe Section! */}
      <section className="w-full relative z-10 py-20 border-t border-[rgba(255,255,255,0.08)] bg-black/40">
        <div className="max-w-[1200px] mx-auto px-[5%] text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-widest text-white">
            The Global Network
          </h2>
          <p className="text-[#b0b5d1] text-lg mb-12 max-w-[600px] mx-auto">
            Our growing ecosystem of independent businesses and local commerce hubs.
          </p>
          
          <NetworkGlobe />
          
        </div>
      </section>
    </main>
  );
}