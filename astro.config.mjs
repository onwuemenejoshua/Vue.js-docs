// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Vue.js",
      customCss: ["./src/styles/custom.css"],
      logo: { src: "./src/assets/Image/Vue.js.svg" },
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/vuejs/" },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Introduction", slug: "guides/introduction" },
            { label: "Quick Start", slug: "guides/quickstart" },
          ],
        },
        {
          label: "Essentials",
          items: [
            {
              label: "Creating An Application",
              slug: "essentials/application",
            },
            { label: "Template Syntax", slug: "essentials/template" },
          ],
        },
      ],
    }),
  ],
});
