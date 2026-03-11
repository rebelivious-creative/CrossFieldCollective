import React from 'react';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <img 
        src="/assets/main-logo.png" 
        alt="Crossfield Logo" 
        style={{ width: '250px', marginBottom: '2rem' }} 
      />
      
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '-0.05em', color: '#fff' }}>
        CROSSFIELD <span style={{ color: '#990000' }}>WEB</span>
      </h1>
      
      <p style={{ color: '#fff', opacity: 0.7, maxWidth: '600px', textAlign: 'center' }}>
        Redefining creative agency standards with a rebellion against the ordinary.
      </p>
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