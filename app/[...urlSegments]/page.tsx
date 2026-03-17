// @ts-nocheck
import React from 'react';
import client from '../../tina/__generated__/client';

// 1. Import your template's beautiful built-in animated blocks
import { Hero } from '@/components/blocks/hero';
import { Features } from '@/components/blocks/features';
import { Content } from '@/components/blocks/content';
import { CallToAction } from '@/components/blocks/call-to-action';

// 2. Import the animation tools for your custom blocks
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { TextEffect } from '@/components/motion-primitives/text-effect';

// 3. Match the template's exact animation speed and bounce
const transitionVariants = {
  container: { visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } },
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { type: 'spring', bounce: 0.3, duration: 1.2 } },
  },
};

export default async function Page({ params }) {
  const { urlSegments } = await params;
  
  const data = await client.queries.page({
    relativePath: `${urlSegments.join('/')}.md`,
  });

  const pageData = data.data.page;

  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: pageData.bgColor || '#000',
      fontFamily: pageData.fontSelection || 'Inter',
      color: '#fff'
    }}>

      {/* --- THE NAVIGATION MENU --- */}
      {pageData.navLinks && pageData.navLinks.length > 0 && (
        <nav className="w-full p-6 flex justify-center gap-10 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-black/50">
          {pageData.navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target={link.newTab ? "_blank" : "_self"} 
              rel={link.newTab ? "noopener noreferrer" : ""}
              className="text-white no-underline font-bold uppercase tracking-widest text-sm hover:text-[#990000] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      
      {/* --- THE BLOCK RENDERER --- */}
      {pageData.blocks?.map((block, i) => {
        switch (block.__typename) {
          
          /* USE THE BUILT-IN ANIMATED TEMPLATE BLOCKS */
          case 'PageBlocksHero': return <Hero key={i} data={block} />;
          case 'PageBlocksFeatures': return <Features key={i} data={block} />;
          case 'PageBlocksContent': return <Content key={i} data={block} />;
          case 'PageBlocksCta': return <CallToAction key={i} data={block} />;
          
          /* YOUR CUSTOM ANIMATED BLOCKS */
          case 'PageBlocksAbout':
            return (
              <section key={i} className="py-24 px-6 max-w-4xl mx-auto text-center">
                <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' className="text-3xl font-bold mb-6 text-[#990000]">
                  About Us
                </TextEffect>
                <AnimatedGroup variants={transitionVariants}>
                  <p className="leading-relaxed opacity-90 text-lg">{block.aboutText}</p>
                </AnimatedGroup>
              </section>
            );

          case 'PageBlocksEcosystem':
            return (
              <section key={i} className="py-24 px-6 max-w-6xl mx-auto text-center">
                <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' className="text-4xl font-bold mb-16">
                  The Ecosystem
                </TextEffect>
                
                {block.ecoImg && (
                  <AnimatedGroup variants={transitionVariants}>
                    <img src={block.ecoImg} alt="Ecosystem" className="max-w-full h-auto mb-16 mx-auto rounded-xl shadow-2xl ring-1 ring-white/10" />
                  </AnimatedGroup>
                )}
                
                <AnimatedGroup variants={transitionVariants} className="flex flex-wrap justify-center gap-8">
                  {(block.ecoTitle1 || block.ecoText1) && (
                    <div className="flex-1 min-w-[280px] p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors duration-300 text-left">
                      <h3 className="mb-4 text-[#990000] text-xl font-bold">{block.ecoTitle1}</h3>
                      <p className="opacity-80 leading-relaxed">{block.ecoText1}</p>
                    </div>
                  )}
                  {(block.ecoTitle2 || block.ecoText2) && (
                    <div className="flex-1 min-w-[280px] p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors duration-300 text-left">
                      <h3 className="mb-4 text-[#990000] text-xl font-bold">{block.ecoTitle2}</h3>
                      <p className="opacity-80 leading-relaxed">{block.ecoText2}</p>
                    </div>
                  )}
                  {(block.ecoTitle3 || block.ecoText3) && (
                    <div className="flex-1 min-w-[280px] p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors duration-300 text-left">
                      <h3 className="mb-4 text-[#990000] text-xl font-bold">{block.ecoTitle3}</h3>
                      <p className="opacity-80 leading-relaxed">{block.ecoText3}</p>
                    </div>
                  )}
                </AnimatedGroup>
              </section>
            );

          case 'PageBlocksStages':
            return (
              <section key={i} className="py-24 px-6 max-w-6xl mx-auto">
                <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' className="text-4xl font-bold text-center mb-16">
                  Our Stages
                </TextEffect>
                
                {block.stagesImg && (
                  <AnimatedGroup variants={transitionVariants}>
                    <img src={block.stagesImg} alt="Stages" className="max-w-full h-auto mb-16 mx-auto rounded-xl shadow-2xl ring-1 ring-white/10" />
                  </AnimatedGroup>
                )}
                
                <AnimatedGroup variants={transitionVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {(block.stagesTitle1 || block.stagesText1) && (
                    <div className="border-l-4 border-[#990000] pl-6">
                      <h4 className="text-2xl font-bold mb-3">{block.stagesTitle1}</h4>
                      <p className="opacity-70 leading-relaxed">{block.stagesText1}</p>
                    </div>
                  )}
                  {(block.stagesTitle2 || block.stagesText2) && (
                    <div className="border-l-4 border-[#990000] pl-6">
                      <h4 className="text-2xl font-bold mb-3">{block.stagesTitle2}</h4>
                      <p className="opacity-70 leading-relaxed">{block.stagesText2}</p>
                    </div>
                  )}
                  {(block.stagesTitle3 || block.stagesText3) && (
                    <div className="border-l-4 border-[#990000] pl-6">
                      <h4 className="text-2xl font-bold mb-3">{block.stagesTitle3}</h4>
                      <p className="opacity-70 leading-relaxed">{block.stagesText3}</p>
                    </div>
                  )}
                </AnimatedGroup>
              </section>
            );

          case 'PageBlocksFooter':
            return (
              <footer key={i} className="py-16 px-6 text-center border-t border-white/10 mt-16">
                <TextEffect preset='fade-in-blur' speedSegment={0.5} as='h2' className="text-3xl font-bold">
                  {block.footerTitle}
                </TextEffect>
                <AnimatedGroup variants={transitionVariants}>
                  <p className="opacity-60 mt-4 mb-8 text-lg">{block.footerSub}</p>
                  {block.contactPhone && (
                    <a 
                      href={`https://wa.me/${block.contactPhone}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-105 transition-transform duration-300"
                    >
                      WhatsApp Us
                    </a>
                  )}
                </AnimatedGroup>
              </footer>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const pages = await client.queries.pageConnection();
    return pages.data?.pageConnection?.edges?.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];
  } catch (error) {
    return [];
  }
}