import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  token: process.env.TINA_CLIENT_TOKEN,     
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "assets", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: { router: () => "/" },
        fields: [
          { type: "string", name: "heroTitle", label: "Hero Title", ui: { component: "textarea" } },
          { type: "string", name: "heroSub", label: "Hero Subtext", ui: { component: "textarea" } },
          { type: "string", name: "aboutText", label: "About Text", ui: { component: "textarea" } },
        ],
      },
    ],
  },
});