import React from "react";
import client from "../../tina/__generated__/client";
import ClientPage from "../client-page";

export default async function Page({ params }) {
  const { urlSegments } = await params;
  
  // Fetch the data for the specific page (e.g., services.md)
  const res = await client.queries.page({
    relativePath: `${urlSegments.join('/')}.md`,
  });

  // Send it to the template's brain
  return <ClientPage {...res} />;
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