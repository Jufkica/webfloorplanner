# Web Floor Planner

**🌐 Live demo:** https://jufkica.github.io/webfloorplanner/

A single-file HTML/SVG floor-planning app for sketching rooms, placing furniture,
drawing walking paths between objects, and analysing traffic.

## Features
- **Walls / doors / windows** with snapping, alignment guides and dimension labels
- **Furniture catalog** (table, chair, bed, sofa, desk, cabinet) and EU-standard safety icons
- **Walking paths** with auto-generated dense graph and Dijkstra shortest-path routing
- **Linked furniture** — define logical links and visualise shortest paths between them
- **Heatmaps**
  - Per-link line heatmap with section badges showing distinct-link counts
  - True 2D density heatmap (jet colormap) via Gaussian kernel density
- **Ruler / annotation tool** — click-and-drag measurements with Shift-snap to 45°
- **Text annotations** with size/color
- **Move-rate calculator**, distances panel, undo/redo, copy/paste
- **Project save/load** (JSON) and **SVG export** (simple + professional with title block + sidebar)

## Run
Just open `index.html` in any modern browser — no build, no server.

## Deploy on GitHub Pages
This repo includes a workflow at `.github/workflows/pages.yml` that builds
and deploys the site on every push to `main`. To enable it:

1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` (or run the *Deploy to GitHub Pages* workflow manually).

The site will be live at https://jufkica.github.io/webfloorplanner/.

## Status
Hobby / WIP. Pull requests welcome.
