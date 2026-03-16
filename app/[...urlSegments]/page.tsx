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
      {/* Example of pulling the Hero Title from your blocks */}
      {pageData.blocks?.map((block, i) => {
        if (block.__typename === 'PageBlocksHero') {
          return (
            <section key={i} style={{ padding: '4rem 2rem', textAlign: 'center' }}>
               <h1 style={{ fontSize: '4rem' }}>{block.heroTitle}</h1>
               <p>{block.heroSub}</p>
            </section>
          );
        }
        // Add more blocks (About, Ecosystem, etc.) here as you build them
        return <div key={i}>Section: {block.__typename} (Edit in Tina to see content)</div>;
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