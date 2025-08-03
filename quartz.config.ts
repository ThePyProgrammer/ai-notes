import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "AI Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "ai.prannay.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          // light: "#faf8f8",
          // lightgray: "#e5e5e5",
          // gray: "#b8b8b8",
          // darkgray: "#4e4e4e",
          // dark: "#2b2b2b",
          // secondary: "#284b63",
          // tertiary: "#84a59d",
          // highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
          light: "#1F1A1A",       // Deep charred background
          lightgray: "#2F2929",   // Smoky gray
          // gray: "#4F4747",        // Ashen gray
          // darkgray: "#6F6363",    // Fading ember
          dark: "#FFA07A",        // Light salmon color for general text and links like "Rubiks" and "Cohere"
          secondary: "#D44523",   // Fiery red-orange
          tertiary: "#FF6F49",    // Brighter orange
          highlight: "#5A1E1E",    // Muted burning red for highlighted background
          gray: "#646464",
          darkgray: "#d4d4d4", // Changes color of the text
        },
        darkMode: {
          // light: "#161618",
          // lightgray: "#393639", // Changes color 
          gray: "#646464",
          darkgray: "#d4d4d4", // Changes color of the text
          // dark: "#ebebec",
          // secondary: "#7b97aa", // Changes color of title
          // tertiary: "#84a59d",
          // highlight: "rgba(143, 159, 169, 0.15)", // Changes color of highlight
          light: "#1D1E2E",       // Deep underwater background
          lightgray: "#2C2F3E",   // Slightly brighter underwater shade
          // gray: "#4C4F5E",        // Neutral blue-gray, reminiscent of the game's platforms
          // darkgray: "#6C6F7E",    // Fading water ripple
          dark: "#AFCCE0",        // Lighter blue-gray for general text and subheadings like "Rubiks" and "Cohere"
          secondary: "#235A9A",   // Deep ocean blue, Watergirl's primary color
          tertiary: "#4A8CD4",    // Brighter sky blue
          highlight: "#1E2F4A",   // Muted deep sea blue for highlighted background
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["git", "frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      // Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
