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
        fields: [
          { type: "boolean", name: "useDefaultTheme", label: "Use Default Crossfield Blue Theme?", description: "Turn this ON to use the official brand colors. Turn it OFF to use the custom gradient colors below." },
          { type: "string", name: "bgColor", label: "Custom Background Color", ui: { component: "color" } },
          { type: "string", name: "glowColor1", label: "Custom Gradient Glow 1", ui: { component: "color" } },
          { type: "string", name: "glowColor2", label: "Custom Gradient Glow 2", ui: { component: "color" } },
          { type: "string", name: "heroTitle", label: "Hero Title", ui: { component: "textarea" } },
          { type: "string", name: "heroSub", label: "Hero Subtext", ui: { component: "textarea" } },
          { type: "string", name: "aboutText", label: "About Text", ui: { component: "textarea" } },
        ],
      },
    ],
  },
});