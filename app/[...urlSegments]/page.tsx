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

  // Protect against empty colors causing bright blue screens
  const bg = pageData.bgColor || '#020112';
  const glow1 = pageData.glowColor1 || 'transparent';
  const glow2 = pageData.glowColor2 || 'transparent';

  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: bg,
      // Render the actual custom glows from Tina
      backgroundImage: `radial-gradient(circle at 15% 50%, ${glow1}, transparent 35%), radial-gradient(circle at 85% 30%, ${glow2}, transparent 35%)`,
      fontFamily: pageData.fontSelection || 'Inter',
      color: '#fff',
      overflowX: 'hidden'
    }}>

      {/* --- THE NAVIGATION MENU --- */}
      {pageData.navLinks && pageData.navLinks.length > 0 && (
        <nav style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'center', gap: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
          {pageData.navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target={link.newTab ? "_blank" : "_self"} 
              rel={link.newTab ? "noopener noreferrer" : ""}
              style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      
      {/* --- THE BLOCK RENDERER --- */}
      {pageData.blocks?.map((block, i) => {
        switch (block.__typename) {
          
          case 'PageBlocksHero': return <Hero key={i} data={block} />;
          case 'PageBlocksFeatures': return <Features key={i} data={block} />;
          case 'PageBlocksContent': return <Content key={i} data={block} />;
          case 'PageBlocksCta': return <CallToAction key={i} data={block} />;
          
          case 'PageBlocksAbout':
            return (
              <section key={i} style={{ padding: '6rem 1.5rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#990000' }}>
                  About Us
                </TextEffect>
                <AnimatedGroup variants={transitionVariants}>
                  <p style={{ lineHeight: '1.8', opacity: 0.9, fontSize: '1.1rem' }}>{block.aboutText}</p>
                </AnimatedGroup>
              </section>
            );

          case 'PageBlocksEcosystem':
            return (
              <section key={i} style={{ padding: '6rem 1.5rem', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '4rem' }}>
                  The Ecosystem
                </TextEffect>
                
                {block.ecoImg && (
                  <AnimatedGroup variants={transitionVariants}>
                    <img src={block.ecoImg} alt="Ecosystem" style={{ maxWidth: '100%', height: 'auto', marginBottom: '4rem', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} />
                  </AnimatedGroup>
                )}
                
                <AnimatedGroup variants={transitionVariants}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                    {(block.ecoTitle1 || block.ecoText1) && (
                      <div style={{ flex: '1 1 300px', padding: '2.5rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', textAlign: 'left' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#990000', fontSize: '1.5rem', fontWeight: 'bold' }}>{block.ecoTitle1}</h3>
                        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>{block.ecoText1}</p>
                      </div>
                    )}
                    {(block.ecoTitle2 || block.ecoText2) && (
                      <div style={{ flex: '1 1 300px', padding: '2.5rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', textAlign: 'left' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#990000', fontSize: '1.5rem', fontWeight: 'bold' }}>{block.ecoTitle2}</h3>
                        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>{block.ecoText2}</p>
                      </div>
                    )}
                    {(block.ecoTitle3 || block.ecoText3) && (
                      <div style={{ flex: '1 1 300px', padding: '2.5rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', textAlign: 'left' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#990000', fontSize: '1.5rem', fontWeight: 'bold' }}>{block.ecoTitle3}</h3>
                        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>{block.ecoText3}</p>
                      </div>
                    )}
                  </div>
                </AnimatedGroup>
              </section>
            );

          case 'PageBlocksStages':
            return (
              <section key={i} style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                <TextEffect preset='fade-in-blur' speedSegment={0.3} as='h2' style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '4rem' }}>
                  Our Stages
                </TextEffect>
                
                {block.stagesImg && (
                  <AnimatedGroup variants={transitionVariants}>
                    <img src={block.stagesImg} alt="Stages" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto 4rem', borderRadius: '12px' }} />
                  </AnimatedGroup>
                )}
                
                <AnimatedGroup variants={transitionVariants}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {(block.stagesTitle1 || block.stagesText1) && (
                      <div style={{ borderLeft: '4px solid #990000', paddingLeft: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{block.stagesTitle1}</h4>
                        <p style={{ opacity: 0.7, lineHeight: '1.6' }}>{block.stagesText1}</p>
                      </div>
                    )}
                    {(block.stagesTitle2 || block.stagesText2) && (
                      <div style={{ borderLeft: '4px solid #990000', paddingLeft: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{block.stagesTitle2}</h4>
                        <p style={{ opacity: 0.7, lineHeight: '1.6' }}>{block.stagesText2}</p>
                      </div>
                    )}
                    {(block.stagesTitle3 || block.stagesText3) && (
                      <div style={{ borderLeft: '4px solid #990000', paddingLeft: '1.5rem' }}>
                        <h4 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{block.stagesTitle3}</h4>
                        <p style={{ opacity: 0.7, lineHeight: '1.6' }}>{block.stagesText3}</p>
                      </div>
                    )}
                  </div>
                </AnimatedGroup>
              </section>
            );

          case 'PageBlocksFooter':
            return (
              <footer key={i} style={{ padding: '4rem 1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem' }}>
                <TextEffect preset='fade-in-blur' speedSegment={0.5} as='h2' style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                  {block.footerTitle}
                </TextEffect>
                <AnimatedGroup variants={transitionVariants}>
                  <p style={{ opacity: 0.6, marginTop: '1rem', marginBottom: '2rem', fontSize: '1.1rem' }}>{block.footerSub}</p>
                  {block.contactPhone && (
                    <a 
                      href={`https://wa.me/${block.contactPhone}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ display: 'inline-block', padding: '1rem 2rem', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(37,211,102,0.3)' }}
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