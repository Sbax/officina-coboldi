import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "d6241bea-957c-4fa5-a631-f57aa5b22d38", // Get this from tina.io
  token: "7ff65b781daaf1fc4431729dadac5b1f2e471b92", // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Pages",
        name: "pages",
        path: "_pages",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        label: "Posts",
        name: "posts",
        path: "_posts",
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          {
            type: "string",
            name: "title",
            label: "Titolo",
          },
          {
            type: "string",
            name: "content",
            label: "Contenuto",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "excerpt",
            label: "Riassunto",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "coverImage",
            label: "Immagine di Copertina",
          },
          {
            type: "string",
            name: "artist",
            label: "Artista",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Data",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Autore",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags",
            },
          },
        ],
      },
    ],
  },
});
