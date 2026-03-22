import React from "react";
import client from "../../tina/__generated__/client";
import ClientPage from "../client-page";

export default async function Page({ params }: any) {
  const { urlSegments } = await params;

  const res = await client.queries.page({
    relativePath: `${urlSegments.join('/')}.md`,
  });

  return <ClientPage {...res} />;
}

export async function generateStaticParams() {
  try {
    const pagesData = await client.queries.pageConnection();
    const paths = pagesData.data?.pageConnection?.edges?.map((edge: any) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];
    
    // Fallback to prevent Next.js 15 crash
    if (paths.length === 0) {
      return [{ urlSegments: ['vision'] }];
    }
    return paths;
  } catch (error) {
    return [{ urlSegments: ['vision'] }];
  }
}