// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Vue.js",
      customCss: ["./src/styles/custom.css"],
      logo: { src: "./src/assets/Vue.js.svg" },
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
            {
              label: "Reactivity Fundamentals",
              slug: "essentials/reactivity",
            },
            { label: "Computed Properties", slug: "essentials/computed" },
            {
              label: "Class and Style Bindings",
              slug: "essentials/class-and-style",
            },
          ],
        },
        {
          label: "Components In-Depth",
          items: [
            {
              label: "Component Registration",
              slug: "components/registration",
            },
            {
              label: "Props",
              slug: "components/props",
            },
            {
              label: "Component Events",
              slug: "components/events",
            },
            {
              label: "Component v-model",
              slug: "components/v-model",
            },
            {
              label: "Fallthrough Attributes",
              slug: "components/attribute",
            },
          ],
        },
        {
          label: "Reusability",
          items: [
            { label: "Composables", slug: "reusability/composable" },
            {
              label: "Custom Directives",
              slug: "reusability/custom-directive",
            },
            {
              label: "Plugins",
              slug: "reusability/plugins",
            },
          ],
        },
        {
          label: "Built-in Components",
          items: [
            { label: "Transition", slug: "builts-in/transition" },
            { label: "TransitionGroup", slug: "builts-in/transition-group" },
          ],
        },
      ],
    }),
  ],
});
