import React from "react";
import client from "../../tina/__generated__/client";
import ClientPage from "../client-page";

export default async function Page({ params }: any) {
  const { urlSegments } = await params;

  // @ts-ignore - Bypassing local/cloud type mismatch
  const res = await client.queries.page({
    relativePath: `${urlSegments.join('/')}.md`,
  });

  return <ClientPage {...res} />;
}

export async function generateStaticParams() {
  try {
    // @ts-ignore - Forcing cloud server naming convention
    const pagesData = await client.queries.pageConnection();
    // @ts-ignore
    const paths = pagesData.data?.pageConnection?.edges?.map((edge: any) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];
    
    if (paths.length === 0) {
      return [{ urlSegments: ['vision'] }];
    }
    return paths;
  } catch (error) {
    return [{ urlSegments: ['vision'] }];
  }
}