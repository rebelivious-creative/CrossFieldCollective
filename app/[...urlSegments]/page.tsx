// @ts-nocheck
import React from 'react';
import client from '../../tina/__generated__/client';

export default async function Page({ params }) {
  const { urlSegments } = await params;
  
  // 1. Fetch data from Tina for this specific page
  const data = await client.queries.page({
    relativePath: `${urlSegments.join('/')}.md`,
  });

  const pageData = data.data.page;

  // 2. Map the data to your UI
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: pageData.bgColor || '#000',
      fontFamily: pageData.fontSelection || 'Inter',
      color: '#fff'
    }}>
      
      {/* 3. The Block Renderer */}
      {pageData.blocks?.map((block, i) => {
        switch (block.__typename) {
          
          case 'PageBlocksHero':
            return (
              <section key={i} style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>{block.heroTitle}</h1>
                <p style={{ opacity: 0.7, fontSize: '1.2rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>{block.heroSub}</p>
              </section>
            );
          
          case 'PageBlocksAbout':
            return (
              <section key={i} style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#990000' }}>About Us</h2>
                <p style={{ lineHeight: '1.8', opacity: 0.9 }}>{block.aboutText}</p>
              </section>
            );

          case 'PageBlocksEcosystem':
            return (
              <section key={i} style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>The Ecosystem</h2>
                {block.ecoImg && <img src={block.ecoImg} alt="Ecosystem" style={{ maxWidth: '100%', height: 'auto', marginBottom: '3rem', borderRadius: '10px' }} />}
                
                <div style={{ display: 'flex', gap: '2rem', justifyItems: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
                  <div style={{ flex: '1', minWidth: '250px', padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#990000' }}>{block.ecoTitle1}</h3>
                    <p style={{ opacity: 0.8 }}>{block.ecoText1}</p>
                  </div>
                  <div style={{ flex: '1', minWidth: '250px', padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#990000' }}>{block.ecoTitle2}</h3>
                    <p style={{ opacity: 0.8 }}>{block.ecoText2}</p>
                  </div>
                  <div style={{ flex: '1', minWidth: '250px', padding: '2rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#990000' }}>{block.ecoTitle3}</h3>
                    <p style={{ opacity: 0.8 }}>{block.ecoText3}</p>
                  </div>
                </div>
              </section>
            );

          case 'PageBlocksStages':
            return (
              <section key={i} style={{ padding: '4rem 2rem' }}>
                <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Our Stages</h2>
                {block.stagesImg && <img src={block.stagesImg} alt="Stages" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto 3rem', borderRadius: '10px' }} />}
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                  <div style={{ borderLeft: '3px solid #990000', paddingLeft: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{block.stagesTitle1}</h4>
                    <p style={{ opacity: 0.7 }}>{block.stagesText1}</p>
                  </div>
                  <div style={{ borderLeft: '3px solid #990000', paddingLeft: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{block.stagesTitle2}</h4>
                    <p style={{ opacity: 0.7 }}>{block.stagesText2}</p>
                  </div>
                  <div style={{ borderLeft: '3px solid #990000', paddingLeft: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{block.stagesTitle3}</h4>
                    <p style={{ opacity: 0.7 }}>{block.stagesText3}</p>
                  </div>
                </div>
              </section>
            );

          case 'PageBlocksFooter':
            return (
              <footer key={i} style={{ padding: '4rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{block.footerTitle}</h2>
                <p style={{ opacity: 0.6, marginTop: '1rem', marginBottom: '2rem' }}>{block.footerSub}</p>
                {block.contactPhone && (
                  <a href={`https://wa.me/${block.contactPhone}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                    WhatsApp Us
                  </a>
                )}
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
    console.error("Failed to fetch pages for static generation", error);
    return [];
  }
}