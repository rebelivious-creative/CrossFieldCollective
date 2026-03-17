// @ts-nocheck
import React from 'react';
import client from '../../tina/__generated__/client';

import { Hero } from '@/components/blocks/hero';
import { Features } from '@/components/blocks/features';
import { Content } from '@/components/blocks/content';
import { CallToAction } from '@/components/blocks/call-to-action';

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

  // SMART BACKGROUND LOGIC
  // If "Use Default Theme" is ON (or empty), let the template's beautiful animated background shine through.
  const useDefault = pageData.useDefaultTheme !== false; 
  const bg = useDefault ? 'transparent' : (pageData.bgColor || 'transparent');
  const glow1 = pageData.glowColor1 || 'transparent';
  const glow2 = pageData.glowColor2 || 'transparent';

  return (
    <main 
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ 
        backgroundColor: bg,
        fontFamily: pageData.fontSelection || 'Inter',
        color: '#fff' 
      }}
    >
      
      {/* --- CUSTOM ATMOSPHERIC GLOWS --- */}
      {/* Only runs if the user turns OFF the default theme and picks custom glow colors */}
      {!useDefault && (
        <div className="absolute inset-0 z-0 pointer-events-none fixed">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] opacity-40 blur-[120px] mix-blend-screen rounded-full" style={{ backgroundColor: glow1 }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] opacity-40 blur-[120px] mix-blend-screen rounded-full" style={{ backgroundColor: glow2 }} />
        </div>
      )}

      {/* --- ALL CONTENT --- */}
      <div className="relative z-10">
        
        {/* Navigation Menu */}
        {pageData.navLinks && pageData.navLinks.length > 0 && (
          <nav style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'center', gap: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)' }}>
            {pageData.navLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                target={link.newTab ? "_blank" : "_self"} 
                rel={link.newTab ? "noopener noreferrer" : ""}
                style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', opacity: 0.8 }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.8'}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
        
        {/* Block Renderer */}
        {pageData.blocks?.map((block, i) => {
          switch (block.__typename) {
            
            case 'PageBlocksHero': return <Hero key={i} data={block} />;
            case 'PageBlocksFeatures': return <Features key={i} data={block} />;
            case 'PageBlocksContent': return <Content key={i} data={block} />;
            case 'PageBlocksCta': return <CallToAction key={i} data={block} />;
            
            case 'PageBlocksAbout':
              return (
                <section key={i} style={{ padding: '8rem 1.5rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                  <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#990000', letterSpacing: '-0.02em' }}>
                    About Us
                  </TextEffect>
                  <AnimatedGroup variants={transitionVariants}>
                    <p style={{ lineHeight: '1.8', opacity: 0.7, fontSize: '1.15rem' }}>{block.aboutText}</p>
                  </AnimatedGroup>
                </section>
              );

            case 'PageBlocksEcosystem':
              return (
                <section key={i} style={{ padding: '8rem 1.5rem', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                  <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '4rem', letterSpacing: '-0.02em' }}>
                    The Ecosystem
                  </TextEffect>
                  
                  {block.ecoImg && (
                    <AnimatedGroup variants={transitionVariants}>
                      <img src={block.ecoImg} alt="Ecosystem" style={{ maxWidth: '100%', height: 'auto', marginBottom: '5rem', borderRadius: '16px', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.8)' }} />
                    </AnimatedGroup>
                  )}
                  
                  <AnimatedGroup variants={transitionVariants}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                      {(block.ecoTitle1 || block.ecoText1) && (
                        <div style={{ padding: '3rem', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', textAlign: 'left', backdropFilter: 'blur(10px)' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#990000', fontSize: '1.5rem', fontWeight: 'bold' }}>{block.ecoTitle1}</h3>
                          <p style={{ opacity: 0.7, lineHeight: '1.7' }}>{block.ecoText1}</p>
                        </div>
                      )}
                      {(block.ecoTitle2 || block.ecoText2) && (
                        <div style={{ padding: '3rem', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', textAlign: 'left', backdropFilter: 'blur(10px)' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#990000', fontSize: '1.5rem', fontWeight: 'bold' }}>{block.ecoTitle2}</h3>
                          <p style={{ opacity: 0.7, lineHeight: '1.7' }}>{block.ecoText2}</p>
                        </div>
                      )}
                      {(block.ecoTitle3 || block.ecoText3) && (
                        <div style={{ padding: '3rem', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', textAlign: 'left', backdropFilter: 'blur(10px)' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#990000', fontSize: '1.5rem', fontWeight: 'bold' }}>{block.ecoTitle3}</h3>
                          <p style={{ opacity: 0.7, lineHeight: '1.7' }}>{block.ecoText3}</p>
                        </div>
                      )}
                    </div>
                  </AnimatedGroup>
                </section>
              );

            case 'PageBlocksStages':
              return (
                <section key={i} style={{ padding: '8rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                  <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '4rem', letterSpacing: '-0.02em' }}>
                    Our Stages
                  </TextEffect>
                  
                  {block.stagesImg && (
                    <AnimatedGroup variants={transitionVariants}>
                      <img src={block.stagesImg} alt="Stages" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto 5rem', borderRadius: '16px' }} />
                    </AnimatedGroup>
                  )}
                  
                  <AnimatedGroup variants={transitionVariants}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                      {(block.stagesTitle1 || block.stagesText1) && (
                        <div style={{ borderLeft: '3px solid #990000', paddingLeft: '2rem' }}>
                          <h4 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{block.stagesTitle1}</h4>
                          <p style={{ opacity: 0.7, lineHeight: '1.7' }}>{block.stagesText1}</p>
                        </div>
                      )}
                      {(block.stagesTitle2 || block.stagesText2) && (
                        <div style={{ borderLeft: '3px solid #990000', paddingLeft: '2rem' }}>
                          <h4 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{block.stagesTitle2}</h4>
                          <p style={{ opacity: 0.7, lineHeight: '1.7' }}>{block.stagesText2}</p>
                        </div>
                      )}
                      {(block.stagesTitle3 || block.stagesText3) && (
                        <div style={{ borderLeft: '3px solid #990000', paddingLeft: '2rem' }}>
                          <h4 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>{block.stagesTitle3}</h4>
                          <p style={{ opacity: 0.7, lineHeight: '1.7' }}>{block.stagesText3}</p>
                        </div>
                      )}
                    </div>
                  </AnimatedGroup>
                </section>
              );

            case 'PageBlocksFooter':
              return (
                <footer key={i} style={{ padding: '6rem 1.5rem 4rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <TextEffect preset='fade-in-blur' speedSegment={0.5} as='h2' style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                    {block.footerTitle}
                  </TextEffect>
                  <AnimatedGroup variants={transitionVariants}>
                    <p style={{ opacity: 0.5, marginTop: '1.5rem', marginBottom: '3rem', fontSize: '1.1rem' }}>{block.footerSub}</p>
                    {block.contactPhone && (
                      <a 
                        href={`https://wa.me/${block.contactPhone}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ display: 'inline-block', padding: '1rem 2.5rem', backgroundColor: '#990000', color: '#fff', textDecoration: 'none', borderRadius: '50px', fontWeight: 'bold', transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#cc0000'; e.target.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = '#990000'; e.target.style.transform = 'translateY(0)'; }}
                      >
                        Start a Project
                      </a>
                    )}
                  </AnimatedGroup>
                </footer>
              );

            default:
              return null;
          }
        })}
      </div>
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