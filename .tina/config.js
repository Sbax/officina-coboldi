import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "1c97b314-037b-45a6-94a3-f7c0c6af9f1e", // Get this from tina.io
  token: "88d62227c97b2a4b87a527cf3ab726a48e634613", // Get this from tina.io
  build: {
    outputFolder: "blog/admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "Home",
        label: "Home",
        path: "_home",
        format: "json",
        fields: [
          {
            label: "Next Event Text",
            name: "nextEventText",
            type: "string",
            required: false,
          },
          {
            label: "Next Event Link",
            name: "nextEventLink",
            type: "string",
            required: false,
          },
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
      },
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        format: "json",
        fields: [
          {
            label: "Date",
            name: "date",
            type: "datetime",
            ui: {
              dateFormat: "DD-MM-YYYY",
            },
            required: true,
          },
          {
            type: "image",
            label: "Image",
            name: "coverImage",
          },
          {
            type: "rich-text",
            name: "artist",
            label: "Artist",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "content",
            label: "Content",
            isBody: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/posts/${document._sys.filename}`,
        },
      },
      {
        name: "pages",
        label: "Pages",
        path: "_pages",
        format: "json",
        fields: [
          {
            label: "Title",
            name: "title",
            type: "string",
            required: true,
            isTitle: true,
          },
          {
            label: "Content",
            name: "content",
            type: "rich-text",
            required: true,
            isBody: true,
          },
        ],
      },
    ],
  },
});
