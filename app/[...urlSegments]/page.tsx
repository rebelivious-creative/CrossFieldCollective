// @ts-nocheck
import React from 'react';
import client from '../../tina/__generated__/client';

export default function Page() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
      <img 
        src="https://rebelivious-creative.github.io/CrossFieldCollective/assets/main-logo.png" 
        alt="Crossfield Logo" 
        style={{ width: '250px', marginBottom: '2rem' }} 
      />
      
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '-0.05em', color: '#fff', textAlign: 'center' }}>
        CROSSFIELD <span style={{ color: '#990000' }}>WEB</span>
      </h1>
      
      <p style={{ color: '#fff', opacity: 0.7, maxWidth: '600px', textAlign: 'center', padding: '0 1rem' }}>
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

export function generateStaticParams() {
  return [
    { urlSegments: ['services'] }
  ];
}

// This tells Next.js exactly which dynamic pages to build
export async function generateStaticParams() {
  return [
    { urlSegments: ['services'] } 
  ];
}