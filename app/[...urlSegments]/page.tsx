// @ts-nocheck
import React from 'react';
import client from '../../tina/__generated__/client';

import { Hero } from '@/components/blocks/hero';
import { Features } from '@/components/blocks/features';
import { Content } from '@/components/blocks/content';
import { CallToAction } from '@/components/blocks/call-to-action';

// THE MAGIC COMPONENT
import { Section } from '@/components/layout/section';

import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { TextEffect } from '@/components/motion-primitives/text-effect';

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
    <main className="flex flex-col min-h-screen text-white bg-black">
      
      {/* Navigation Menu */}
      {pageData.navLinks && pageData.navLinks.length > 0 && (
        <nav className="w-full px-8 py-6 flex justify-center gap-10 border-b border-white/5 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
          {pageData.navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target={link.newTab ? "_blank" : "_self"} 
              rel={link.newTab ? "noopener noreferrer" : ""}
              className="text-white no-underline font-bold uppercase tracking-[2px] text-[0.85rem] opacity-80 hover:opacity-100 hover:text-[#990000] transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      
      {/* Block Renderer */}
      {pageData.blocks?.map((block, i) => {
        switch (block.__typename) {
          
          /* NATIVE TEMPLATE BLOCKS */
          case 'PageBlocksHero': return <Hero key={i} data={block} />;
          case 'PageBlocksFeatures': return <Features key={i} data={block} />;
          case 'PageBlocksContent': return <Content key={i} data={block} />;
          case 'PageBlocksCta': return <CallToAction key={i} data={block} />;
          
          /* YOUR CUSTOM BLOCKS (Now wrapped in the native <Section>) */
          case 'PageBlocksAbout':
            return (
              <Section key={i} background={block.background}>
                <div className="text-center">
                  <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' className="text-[2.5rem] font-bold mb-8 text-[#990000] tracking-tight">
                    About Us
                  </TextEffect>
                  <AnimatedGroup variants={transitionVariants}>
                    <p className="leading-[1.8] opacity-70 text-[1.15rem] max-w-3xl mx-auto">{block.aboutText}</p>
                  </AnimatedGroup>
                </div>
              </Section>
            );

          case 'PageBlocksEcosystem':
            return (
              <Section key={i} background={block.background}>
                <div className="text-center">
                  <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' className="text-5xl font-bold mb-16 tracking-tight">
                    The Ecosystem
                  </TextEffect>
                  
                  {block.ecoImg && (
                    <AnimatedGroup variants={transitionVariants}>
                      <img src={block.ecoImg} alt="Ecosystem" className="max-w-[1000px] w-full h-auto mb-20 rounded-2xl border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] mx-auto" />
                    </AnimatedGroup>
                  )}
                  
                  <AnimatedGroup variants={transitionVariants}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                      {(block.ecoTitle1 || block.ecoText1) && (
                        <div className="p-12 bg-white/5 border border-white/5 rounded-3xl text-left backdrop-blur-md">
                          <h3 className="mb-4 text-[#990000] text-2xl font-bold">{block.ecoTitle1}</h3>
                          <p className="opacity-60 leading-[1.7]">{block.ecoText1}</p>
                        </div>
                      )}
                      {(block.ecoTitle2 || block.ecoText2) && (
                        <div className="p-12 bg-white/5 border border-white/5 rounded-3xl text-left backdrop-blur-md">
                          <h3 className="mb-4 text-[#990000] text-2xl font-bold">{block.ecoTitle2}</h3>
                          <p className="opacity-60 leading-[1.7]">{block.ecoText2}</p>
                        </div>
                      )}
                      {(block.ecoTitle3 || block.ecoText3) && (
                        <div className="p-12 bg-white/5 border border-white/5 rounded-3xl text-left backdrop-blur-md">
                          <h3 className="mb-4 text-[#990000] text-2xl font-bold">{block.ecoTitle3}</h3>
                          <p className="opacity-60 leading-[1.7]">{block.ecoText3}</p>
                        </div>
                      )}
                    </div>
                  </AnimatedGroup>
                </div>
              </Section>
            );

          case 'PageBlocksStages':
            return (
              <Section key={i} background={block.background}>
                <div className="text-center">
                  <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' className="text-5xl font-bold mb-16 tracking-tight">
                    Our Stages
                  </TextEffect>
                  
                  {block.stagesImg && (
                    <AnimatedGroup variants={transitionVariants}>
                      <img src={block.stagesImg} alt="Stages" className="max-w-[1000px] w-full h-auto block mx-auto mb-20 rounded-2xl border border-white/5" />
                    </AnimatedGroup>
                  )}
                  
                  <AnimatedGroup variants={transitionVariants}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-[1200px] mx-auto text-left">
                      {(block.stagesTitle1 || block.stagesText1) && (
                        <div className="border-l-[2px] border-[#990000]/50 pl-8">
                          <h4 className="text-[1.75rem] font-bold mb-4">{block.stagesTitle1}</h4>
                          <p className="opacity-60 leading-[1.7]">{block.stagesText1}</p>
                        </div>
                      )}
                      {(block.stagesTitle2 || block.stagesText2) && (
                        <div className="border-l-[2px] border-[#990000]/50 pl-8">
                          <h4 className="text-[1.75rem] font-bold mb-4">{block.stagesTitle2}</h4>
                          <p className="opacity-60 leading-[1.7]">{block.stagesText2}</p>
                        </div>
                      )}
                      {(block.stagesTitle3 || block.stagesText3) && (
                        <div className="border-l-[2px] border-[#990000]/50 pl-8">
                          <h4 className="text-[1.75rem] font-bold mb-4">{block.stagesTitle3}</h4>
                          <p className="opacity-60 leading-[1.7]">{block.stagesText3}</p>
                        </div>
                      )}
                    </div>
                  </AnimatedGroup>
                </div>
              </Section>
            );

          case 'PageBlocksFooter':
            return (
              <Section key={i} background={block.background}>
                <div className="text-center mt-8">
                  <TextEffect preset='fade-in-blur' speedSegment={0.5} as='h2' className="text-[2.5rem] font-bold">
                    {block.footerTitle}
                  </TextEffect>
                  <AnimatedGroup variants={transitionVariants}>
                    <p className="opacity-50 mt-6 mb-12 text-[1.1rem] max-w-2xl mx-auto">{block.footerSub}</p>
                    {block.contactPhone && (
                      <a 
                        href={`https://wa.me/${block.contactPhone}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block px-10 py-4 bg-[#990000] text-white font-bold rounded-full transition-all duration-300 hover:bg-[#cc0000] hover:-translate-y-1"
                      >
                        Start a Project
                      </a>
                    )}
                  </AnimatedGroup>
                </div>
              </Section>
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