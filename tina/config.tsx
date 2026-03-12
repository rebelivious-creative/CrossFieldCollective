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
          { type: "boolean", name: "useDefaultTheme", label: "Use Default Crossfield Blue Theme?", description: "Turn OFF to use custom colors." },
          { type: "string", name: "bgColor", label: "Custom Background Color", ui: { component: "color" } },
          { type: "string", name: "glowColor1", label: "Custom Gradient Glow 1", ui: { component: "color" } },
          { type: "string", name: "glowColor2", label: "Custom Gradient Glow 2", ui: { component: "color" } },
          
          { type: "string", name: "heroTitle", label: "Hero Title", ui: { component: "textarea" } },
          { type: "string", name: "heroSub", label: "Hero Subtext", ui: { component: "textarea" } },
          { type: "string", name: "aboutText", label: "About Text", ui: { component: "textarea" } },
          
          { type: "image", name: "ecoImg", label: "Ecosystem Image" },
          { type: "string", name: "ecoTitle1", label: "Eco Box 1 Title" },
          { type: "string", name: "ecoText1", label: "Eco Box 1 Text", ui: { component: "textarea" } },
          { type: "string", name: "ecoTitle2", label: "Eco Box 2 Title" },
          { type: "string", name: "ecoText2", label: "Eco Box 2 Text", ui: { component: "textarea" } },
          { type: "string", name: "ecoTitle3", label: "Eco Box 3 Title" },
          { type: "string", name: "ecoText3", label: "Eco Box 3 Text", ui: { component: "textarea" } },

          { type: "image", name: "stagesImg", label: "Stages Image" },
          { type: "string", name: "stagesTitle1", label: "Stages Box 1 Title" },
          { type: "string", name: "stagesText1", label: "Stages Box 1 Text", ui: { component: "textarea" } },
          { type: "string", name: "stagesTitle2", label: "Stages Box 2 Title" },
          { type: "string", name: "stagesText2", label: "Stages Box 2 Text", ui: { component: "textarea" } },
          { type: "string", name: "stagesTitle3", label: "Stages Box 3 Title" },
          { type: "string", name: "stagesText3", label: "Stages Box 3 Text", ui: { component: "textarea" } },

          { type: "string", name: "footerTitle", label: "Footer Title" },
          { type: "string", name: "footerSub", label: "Footer Subtext" },
          { type: "string", name: "contactPhone", label: "WhatsApp Number (No + or spaces)" },
        ],
      },
    ],
  },
});