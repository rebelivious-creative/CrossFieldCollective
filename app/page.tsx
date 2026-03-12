import { client } from "../../tina/__generated__/client";
import ClientPage from "./client-page";

export default async function Page() {
  // Fetches the text from home.md
  const res = await client.queries.page({ relativePath: "home.md" });
  
  // Sends the text to your visual frontend
  return <ClientPage {...res} />;
}