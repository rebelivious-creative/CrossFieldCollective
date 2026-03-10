import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "local",   
  token: "local",      
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