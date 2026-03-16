import { defineConfig, Template } from "tinacms";

// --- 1. DEFINE THE LEGO BLOCKS ---

const heroBlock: Template = {
  name: "hero",
  label: "Hero Section",
  ui: { itemProps: (item: Record<string, any>) => ({ label: item?.heroTitle || "Hero Section" }) },
  fields: [
    { type: "string", name: "heroTitle", label: "Hero Title", ui: { component: "textarea" } },
    { type: "string", name: "heroSub", label: "Hero Subtext", ui: { component: "textarea" } },
  ],
};

const aboutBlock: Template = {
  name: "about",
  label: "About Section",
  ui: { itemProps: () => ({ label: "About Section" }) },
  fields: [
    { type: "string", name: "aboutText", label: "About Text", ui: { component: "textarea" } },
  ],
};

const ecosystemBlock: Template = {
  name: "ecosystem",
  label: "Ecosystem Section",
  ui: { itemProps: () => ({ label: "Ecosystem Section" }) },
  fields: [
    { type: "image", name: "ecoImg", label: "Ecosystem Image" },
    { type: "string", name: "ecoTitle1", label: "Eco Box 1 Title" },
    { type: "string", name: "ecoText1", label: "Eco Box 1 Text", ui: { component: "textarea" } },
    { type: "string", name: "ecoTitle2", label: "Eco Box 2 Title" },
    { type: "string", name: "ecoText2", label: "Eco Box 2 Text", ui: { component: "textarea" } },
    { type: "string", name: "ecoTitle3", label: "Eco Box 3 Title" },
    { type: "string", name: "ecoText3", label: "Eco Box 3 Text", ui: { component: "textarea" } },
  ],
};

const stagesBlock: Template = {
  name: "stages",
  label: "Stages Section",
  ui: { itemProps: () => ({ label: "Stages Section" }) },
  fields: [
    { type: "image", name: "stagesImg", label: "Stages Image" },
    { type: "string", name: "stagesTitle1", label: "Stages Box 1 Title" },
    { type: "string", name: "stagesText1", label: "Stages Box 1 Text", ui: { component: "textarea" } },
    { type: "string", name: "stagesTitle2", label: "Stages Box 2 Title" },
    { type: "string", name: "stagesText2", label: "Stages Box 2 Text", ui: { component: "textarea" } },
    { type: "string", name: "stagesTitle3", label: "Stages Box 3 Title" },
    { type: "string", name: "stagesText3", label: "Stages Box 3 Text", ui: { component: "textarea" } },
  ],
};

const footerBlock: Template = {
  name: "footer",
  label: "Footer Section",
  ui: { itemProps: () => ({ label: "Footer Section" }) },
  fields: [
    { type: "string", name: "footerTitle", label: "Footer Title" },
    { type: "string", name: "footerSub", label: "Footer Subtext" },
    { type: "string", name: "contactPhone", label: "WhatsApp Number (No + or spaces)" },
  ],
};


// --- 2. MAIN CONFIGURATION ---

export default defineConfig({
  // Adding the fallback strings here:
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "9d390a17-d083-4542-b443-541038017adc",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  token: process.env.TINA_CLIENT_TOKEN || "80792521fdce43d5165ef72ef52953929e83b939",     
  build: { outputFolder: "admin", publicFolder: "public" },
  // ... the rest of your code stays the same
  media: { tina: { mediaRoot: "assets", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        fields: [
          // Theme settings stay permanently at the top
          { type: "boolean", name: "useDefaultTheme", label: "Use Default Crossfield Blue Theme?", description: "Turn OFF to use custom colors." },
          { type: "string", name: "fontSelection", label: "Website Font", options: ["Inter", "Playfair Display", "Syne", "Space Grotesk", "Helvetica Neue"] },
          { type: "string", name: "bgColor", label: "Custom Background Color", ui: { component: "color" } },
          { type: "string", name: "glowColor1", label: "Custom Gradient Glow 1", ui: { component: "color" } },
          { type: "string", name: "glowColor2", label: "Custom Gradient Glow 2", ui: { component: "color" } },
          
          // DYNAMIC NAVIGATION LINKS (So she can add new pages to the menu)
          {
            type: "object",
            list: true,
            name: "navLinks",
            label: "Navigation Menu Links",
            ui: { itemProps: (item: any) => ({ label: item?.label || "New Link" }) },
            fields: [
              { type: "string", name: "label", label: "Button Name" },
              { type: "string", name: "url", label: "Link URL" },
              { type: "boolean", name: "newTab", label: "Open in New Tab?" }, // THE SWITCH
            ],
          },

          // THE MODULAR SYSTEM
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Page Sections (Add & Drag)",
            templates: [heroBlock, aboutBlock, ecosystemBlock, stagesBlock, footerBlock],
          },
        ],
      },
    ],
  },
});