# ashmod.dev

**"my little internet corner."**

This is the source code for [ashmod.dev](https://ashmod.dev), a personal portfolio and blog built with a custom **Static Site Generator (SSG)** script called `baker.js`.

The design philosophy is **"Digital Pamphlet"**: a retro, brutalist, paper-like aesthetic that prioritizes readability, speed, and standard web technologies (HTML/CSS/JS) without heavy frameworks.

## 🛠️ Tech Stack

-   **Core**: Vanilla HTML, CSS, JavaScript.
-   **SSG**: Custom Node.js script (`scripts/baker.js`).
-   **Markdown**: Content is written in `.md` files, parsed by `marked`.
-   **Templating**: Simple string replacement (custom engine).
-   **Forms**: Web3Forms for contact submissions.
-   **Hosting**: GitHub Pages (served from the root/docs of `main` branch).

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14+ recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ashmod/ashmod.github.io.git
    cd ashmod.github.io
    ```
2.  Install dependencies (only needed for the build script):
    ```bash
    npm install
    # Installs: fs-extra, gray-matter, marked
    ```

### Development Workflow

1.  **Edit Content**:
    -   Modify Markdown files in `content/`.
    -   Edit Templates in `templates/`.
    -   Update Styles in `assets/css/style.css`.
2.  **Build the Site**:
    Run the baker script to generate the static HTML files in the root directory:
    ```bash
    node scripts/baker.js
    ```
3.  **Preview**:
    You can simply open `index.html` in your browser, or use a local server:
    ```bash
    npx serve .
    ```

## 📂 Project Structure

```
.
├── assets/             # Static assets (images, css, js)
│   ├── css/
│   ├── images/
│   └── js/
├── content/            # Source content (Markdown)
│   ├── blog/           # Blog posts
│   ├── pages/          # Static pages (about, contact, home)
│   └── projects/       # Project entries
├── scripts/            # Build scripts
│   └── baker.js        # The Static Site Generator
├── templates/          # HTML Templates
│   ├── base.html       # Base layout (unused directly, reference)
│   ├── layout-default.html # Standard page layout (Header/Footer)
│   ├── layout-home.html    # Home page layout (Cover style)
│   ├── post.html       # Blog post layout
│   └── project.html    # Single project layout (if needed)
├── .gitignore
├── package.json
└── README.md
```

## ✍️ Content Guide

### Creating a Blog Post
Create a file in `content/blog/my-post.md`:
```markdown
---
title: "My Post Title"
date: "2025-01-01"
description: "A short summary."
tags: ["tech", "life"]
layout: post
---
Your content here...
```

### Adding a Project
Create a file in `content/projects/my-project.md`:
```markdown
---
title: My Project
year: 2025
description: A short description. (optional)
category: TOOL (or OPEN SOURCE, MISC, GAME)
link: https://github.com/...
org_logo: /assets/images/logo.png (optional)
layout: project
---
Details about the project...
```

### Adding Open Source Contributions (No Markdown Files)
Add entries to `content/projects/open-source.json`:
```json
[
  {
    "title": "Some Project",
    "year": 2025,
    "link": "https://github.com/org/repo",
    "org_logo": "/assets/images/orgs/org.png",
    "description": "Optional"
  }
]
```
The Projects page preserves the order of entries as they appear in the JSON array.

**Note**: The Project Index page (`projects.html`) logic is handled in `scripts/baker.js`, which groups projects by category (`OPEN SOURCE`, `PROJECTS`, `MISC`).

## 🎨 Customization

-   **Theme**: The site includes a Light/Dark mode toggle.
    -   Light: Warm off-white paper (`#f4f1ea`) with black ink.
    -   Dark: Deep grey (`#1a1a1a`) with off-white text.
-   **CSS**: All styles are in `assets/css/style.css`. No preprocessors, just CSS variables and clean rules.

## 🚢 Deployment

The site is hosted on GitHub Pages.
1.  Commit your changes (including the generated `.html` files in the root).
2.  Push to the `main` branch.
3.  GitHub Pages will serve the static files immediately.

---
*© 2025 Shehab Mahmoud.*
