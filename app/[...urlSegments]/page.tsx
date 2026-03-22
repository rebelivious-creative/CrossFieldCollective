import React from "react";
import client from "../../tina/__generated__/client";
import ClientPage from "../client-page";

export default async function Page({ params }: any) {
  const { urlSegments } = await params;

  // Fetch the data for the specific page (e.g., vision.md)
  const res = await client.queries.pages({
    relativePath: `${urlSegments.join('/')}.md`,
  });

  return <ClientPage {...res} />;
}

export async function generateStaticParams() {
  try {
    const pages = await client.queries.pagesConnection();
    return pages.data?.pagesConnection?.edges?.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];
  } catch (error) {
    return [];
  }
}