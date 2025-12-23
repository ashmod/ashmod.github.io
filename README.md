# ashmod.dev

Personal portfolio and blog built with a custom Static Site Generator.

## Features

- Custom Node.js-based SSG for generating static HTML from Markdown
- Responsive design with light/dark mode toggle
- Markdown content management for blog posts and projects
- Simple templating system without heavy frameworks
- Hosted on GitHub Pages

## Tech Stack

- **Core**: HTML, CSS, JavaScript
- **SSG**: Custom Node.js script (`scripts/baker.js`)
- **Content**: Markdown files parsed with `marked`
- **Templating**: Custom string replacement engine
- **Hosting**: GitHub Pages

## Installation

### Prerequisites

- Node.js (v14+ recommended)
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ashmod/ashmod.github.io.git
   cd ashmod.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   # Installs: fs-extra, gray-matter, marked
   ```

## Usage

### Development Workflow

1. Edit content in `content/` (Markdown files), templates in `templates/`, or styles in `assets/css/style.css`.

2. Build the site:
   ```bash
   npm run build
   ```

3. Preview locally:
   Open `index.html` in a browser or run:
   ```bash
   npx serve .
   ```

### Content Management

#### Blog Posts
Create `content/blog/my-post.md`:
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

#### Projects
Create `content/projects/my-project.md`:
```markdown
---
title: My Project
year: 2025
description: A short description.
category: TOOL
link: https://github.com/...
layout: project
---
Details about the project...
```

## Project Structure

```
.
├── assets/             # Static assets (images, CSS, JS)
├── content/            # Source content (Markdown)
│   ├── blog/           # Blog posts
│   ├── pages/          # Static pages
│   └── projects/       # Project entries
├── scripts/            # Build scripts
│   └── baker.js        # Static Site Generator
├── templates/          # HTML templates
├── .gitignore
├── package.json
└── README.md
```

## Contributing

Contributions are always welcome. Report issues or suggest improvements via GitHub issues.

## License

Licensed under [Creative Commons Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/).
See [LICENSE](LICENSE) for more details.
