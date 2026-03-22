import React from "react";
import client from "../../tina/__generated__/client";
import ClientPage from "../client-page";

export default async function Page({ params }: any) {
  const { urlSegments } = await params;

  const res = await client.queries.pages({
    relativePath: `${urlSegments.join('/')}.md`,
  });

  return <ClientPage {...res} />;
}

export async function generateStaticParams() {
  try {
    const pages = await client.queries.pagesConnection();
    const paths = pages.data?.pagesConnection?.edges?.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];
    
    // NEXT.JS 15 BUG FIX: Never return an empty array. 
    // This forces the server to build the Vision page and prevents the crash.
    if (paths.length === 0) {
      return [{ urlSegments: ['vision'] }];
    }
    return paths;
  } catch (error) {
    return [{ urlSegments: ['vision'] }];
  }
}