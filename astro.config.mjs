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
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Quick Start", slug: "getting-started/quickstart" },
            { label: "Creating An Application", 
              slug: "getting-started/application" },
          ],
        },
        {
          label: "Core Concepts",
          items: [
            { label: "Template Syntax", slug: "core-concepts/template" },
            {
              label: "Reactivity Fundamentals",
              slug: "core-concepts/reactivity",
            },
            { label: "Computed Properties", slug: "core-concepts/computed" },
            {
              label: "Class and Style Bindings",
              slug: "core-concepts/class-and-style",
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
            { label: "Keep Alive", slug: "builts-in/keep-alive" },
            { label: "Teleport", slug: "builts-in/teleport" },
            { label: "Suspense", slug: "builts-in/suspense" },
          ],
        },
        {
          label: "Scalling Up",
          items: [
            {
              label: "Single-File Components",
              slug: "scalling-up/single-file-component",
            },
            {
              label: "Tooling",
              slug: "scalling-up/tooling",
            },
            {
              label: "Routing",
              slug: "scalling-up/routing",
            },
            {
              label: "State Management",
              slug: "scalling-up/state-management",
            },
          ],
        },
        {
          label: "Best practices",
          items: [
            {
              label: "Production Deployment",
              slug: "best-practices/production-deployment",
            },
            {
              label: "Performance",
              slug: "best-practices/performance",
            },
          ],
        },
        {
          label: "TypeScript",
          items: [
            {
              label: "Overview",
              slug: "typescript/overview",
            },
            {
              label: "TS with composition API",
              slug: "typescript/composition",
            },
          ],
        },
        {
          label: "Extra Topics",
          items: [
            {
              label: "Ways of Using Vue",
              slug: "extra-topics/ways-of-using-vue",
            },
            {
              label: "Rendering Mechanism",
              slug: "extra-topics/rendering-mechanism",
            },
          ],
        },
      ],
    }),
  ],
});
