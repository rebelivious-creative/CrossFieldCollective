import React from 'react';
import NetworkGlobe from '../NetworkGlobe';

export const Hero = ({ data }: any) => {
  return (
    <div className="hero relative w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-12">
      
      {/* 1. TEXT CONTENT */}
      <div className="relative z-20 max-w-[1000px] mx-auto px-5 text-center">
        {data?.heroTitle && (
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            {data.heroTitle}
          </h1>
        )}
        
        {data?.heroSub && (
          <p className="hero-sub text-xl md:text-2xl text-[#b0b5d1] max-w-[700px] mx-auto drop-shadow-md">
            {data.heroSub}
          </p>
        )}
      </div>

      {/* 2. 3D GLOBE PLACEMENT (CF COLORS) */}
      <div className="relative z-10 w-full flex justify-center mt-4 md:mt-8">
        <NetworkGlobe />
      </div>

    </div>
  );
};