# Web Floor Planner

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

## Status
Hobby / WIP. Pull requests welcome.
