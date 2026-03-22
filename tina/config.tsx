import { defineConfig } from "tinacms";
import page from "./collection/page";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "9d390a17-d083-4542-b443-541038017adc",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  token: process.env.TINA_CLIENT_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public",
    },
  },
  schema: {
    // This tells Tina to only look at your official, working page setup!
    collections: [page], 
  },
});