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
  ui: { itemProps: (item: any) => ({ label: item?.sectionTitle || "About Section" }) },
  fields: [
    { type: "string", name: "sectionTitle", label: "Section Title (e.g. ABOUT US)" },
    { type: "string", name: "aboutText", label: "About Text", ui: { component: "textarea" } },
  ],
};

const ecosystemBlock: Template = {
  name: "ecosystem",
  label: "Ecosystem Section",
  ui: { itemProps: (item: any) => ({ label: item?.sectionTitle || "Ecosystem Section" }) },
  fields: [
    { type: "string", name: "sectionTitle", label: "Section Title (e.g. THE GROWTH ECOSYSTEM)" },
    { type: "image", name: "ecoImg", label: "Ecosystem Image" },
    {
      type: "object",
      list: true,
      name: "boxes",
      label: "Ecosystem Cards (Add as many as you want!)",
      ui: { itemProps: (item: any) => ({ label: item?.title || "New Card" }) },
      fields: [
        { type: "string", name: "title", label: "Card Title" },
        { type: "string", name: "text", label: "Card Text", ui: { component: "textarea" } },
      ],
    },
  ],
};

const stagesBlock: Template = {
  name: "stages",
  label: "Stages Section",
  ui: { itemProps: (item: any) => ({ label: item?.sectionTitle || "Stages Section" }) },
  fields: [
    { type: "string", name: "sectionTitle", label: "Section Title (e.g. GROWTH STAGES)" },
    { type: "image", name: "stagesImg", label: "Stages Image" },
    {
      type: "object",
      list: true,
      name: "boxes",
      label: "Stages Cards (Add as many as you want!)",
      ui: { itemProps: (item: any) => ({ label: item?.title || "New Card" }) },
      fields: [
        { type: "string", name: "title", label: "Card Title" },
        { type: "string", name: "text", label: "Card Text", ui: { component: "textarea" } },
      ],
    },
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
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "9d390a17-d083-4542-b443-541038017adc",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  token: process.env.TINA_CLIENT_TOKEN, 
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "assets", publicFolder: "public" } },
  schema: {
    collections: [
      // --- COLLECTION 1: PAGES ---
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          { type: "boolean", name: "useDefaultTheme", label: "Use Default Theme" },
          { type: "string", name: "fontSelection", label: "Font Selection" },
          { type: "string", name: "bgColor", label: "Background Color", ui: { component: "color" } },
          { type: "string", name: "glowColor1", label: "Glow Color 1", ui: { component: "color" } },
          { type: "string", name: "glowColor2", label: "Glow Color 2", ui: { component: "color" } },
          {
            type: "object",
            list: true,
            name: "navLinks",
            label: "Navigation Links",
            ui: { itemProps: (item: any) => ({ label: item?.label || "New Link" }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "url", label: "URL" },
              { type: "boolean", name: "newTab", label: "Open in new tab?" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Page Sections (Add & Drag)",
            templates: [heroBlock, aboutBlock, ecosystemBlock, stagesBlock, footerBlock],
          },
        ],
      },
// --- COLLECTION 1: PAGES ---
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          { type: "boolean", name: "useDefaultTheme", label: "Use Default Theme" },
          { type: "string", name: "fontSelection", label: "Font Selection" },
          { type: "string", name: "bgColor", label: "Background Color", ui: { component: "color" } },
          { type: "string", name: "glowColor1", label: "Glow Color 1", ui: { component: "color" } },
          { type: "string", name: "glowColor2", label: "Glow Color 2", ui: { component: "color" } },
          {
            type: "object",
            list: true,
            name: "navLinks",
            label: "Navigation Links",
            ui: { itemProps: (item: any) => ({ label: item?.label || "New Link" }) },
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "url", label: "URL" },
              { type: "boolean", name: "newTab", label: "Open in new tab?" },
            ],
          },
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