# Blog Content Management System

This directory contains all blog posts managed through the Lovable CMS.

## Structure

- **`config.ts`** - Defines the content collection schema for blog posts
- **`posts/`** - All blog post markdown files with frontmatter

## Adding a New Blog Post

### Option 1: Through Lovable UI (Recommended)
1. Click the **Content** tab in the Lovable editor
2. Click **Blog Posts**
3. Click **Create New Post**
4. Fill in the form fields
5. Write your content using markdown
6. Click **Publish**

### Option 2: Manual File Creation
Create a new `.md` file in `src/content/posts/` with this structure:

```markdown
---
title: "Your Post Title"
slug: "your-post-slug"
date: "Month Day, Year"
author: "Poised Gentlemen"
description: "A brief excerpt or description of your post"
coverImage: "article-image-name.jpg"
tags: ["Tag1", "Tag2"]
category: "Four Pillars"
pillar: "Discipline"
readTime: 5
isParentResource: false
url: "https://poisedgentlemen.com/blogs/news/your-post-slug"
---

Your full blog post content goes here in **markdown** format.

## You can use headers

- Bullet points
- And more

### Subheadings work too

Write freely with full markdown support!
```

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | The post title |
| `slug` | string | ✅ | URL-friendly identifier |
| `date` | string | ✅ | Publication date (e.g., "March 12, 2025") |
| `author` | string | ❌ | Author name (defaults to "Poised Gentlemen") |
| `description` | string | ✅ | Short excerpt shown in listings |
| `coverImage` | string | ✅ | Image filename (must exist in `/src/assets/`) |
| `tags` | array | ❌ | Array of tag strings |
| `category` | enum | ❌ | One of: "All Articles", "Four Pillars", "Presence & Etiquette", "Masculinity FAQs", "Mindfulness" |
| `pillar` | string | ❌ | Related pillar (e.g., "Discipline", "Emotional Intelligence") |
| `readTime` | number | ❌ | Estimated read time in minutes |
| `isParentResource` | boolean | ❌ | Whether this is a parent/mentor resource |
| `url` | string | ❌ | Optional external URL (e.g., Shopify link) |

## Cover Images

All cover images must be placed in `/src/assets/` and imported in `/src/lib/content.ts`.

Current available images:
- `article-stoic.jpg`
- `article-teen-acne.jpg`
- `article-forged-story.jpg`
- `article-modern-masculinity.jpg`
- `article-poised-steps.jpg`
- `article-emotional-blueprint.jpg`
- `article-fathers-day-2025.jpg`

## Categories

- **All Articles** - Default/general category
- **Four Pillars** - Posts about the core framework
- **Presence & Etiquette** - Style, manners, and presentation
- **Masculinity FAQs** - Q&A and guidance on modern masculinity
- **Mindfulness** - Meditation, stoicism, mental health

## Viewing Your Posts

- **Blog Index**: `/codex` - Shows all posts with filtering
- **Individual Post**: `/codex/your-post-slug`
- **Featured Post**: Automatically displayed at the top of the Codex

## SEO

Each post automatically generates:
- Page title: `{Post Title} | Poised Gentlemen`
- Meta description from the `description` field
- OpenGraph tags for social sharing
- Twitter Card metadata
- Proper semantic HTML structure

## Development

Posts are loaded via `src/lib/content.ts` which:
1. Reads all `.md` files from this directory
2. Parses frontmatter
3. Maps cover images to imported assets
4. Sorts by date (newest first)
5. Exports as an array for React components

No build step or external tools required—everything is hot-reloaded in development!
