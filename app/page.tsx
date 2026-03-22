import React from "react";
import client from "../tina/__generated__/client";
import ClientPage from "./client-page";

export default async function Page() {
  const res = await client.queries.page({ relativePath: "home.md" });

  return (
    <main>
      <ClientPage {...res} />
    </main>
  );
}