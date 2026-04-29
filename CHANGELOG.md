# Remplanner - 2D Floor Planning Application

## Project Summary
Remplanner is a professional 2D floor planning web application built as a single HTML file. It provides an intuitive interface for creating architectural floor plans with precise measurements, wall drawing tools, and a comprehensive asset library including doors, windows, and furniture.

## Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required
- No external dependencies or libraries
- Single file: `index.html` (standalone application)

## Features

### Canvas & Navigation
- **SVG-based canvas** with infinite workspace
- **Grid system**: 100cm major grid (gray, 2px) and 10cm minor grid (light gray, 1px)
- **Pan**: Click and drag in select mode or use middle mouse button
- **Zoom**: Mouse wheel (default 8x = 100%)
- **Reset view**: Dedicated button to return to default view

### Wall Drawing
- **Click-and-hold drawing**: Click to start, drag to extend, release to finish
- **10cm wall thickness**: Standard architectural thickness
- **45-degree angle snapping**: Walls snap to 0°, 45°, 90°, 135°, etc. (within 10° tolerance)
- **Endpoint snapping**: Automatically connects to nearby wall endpoints
- **Wall segment snapping**: Snap to existing wall segments when drawing
- **Visual feedback**: Diagonal slash pattern with bold black outline (6px)
- **90-degree alignment guides**: Green lines show perpendicular alignment to existing walls

### Dimensioning System
- **Dual measurement display**: Inner and outer dimensions
- **Automatic dimension labels**: Width and height for rectangular objects
- **T-junction handling**: Smart dimension calculation at wall intersections
- **Professional styling**: Clean, architectural-grade dimension lines

### Asset System
**Doors**
- Standard door: 90cm
- Double door: 180cm
- Auto-snap to walls with rotation
- Flip functionality via property editor

**Windows**
- Standard window: 120cm
- Auto-snap to walls with rotation

**Furniture**
- Table, Chair (with custom SVG), Bed, Sofa, Desk, Cabinet
- Freely placeable anywhere on canvas
- Rotate and resize capabilities

### Object Manipulation
- **Selection**: Click to select objects (walls or assets)
- **Drag-to-relocate**: Move selected objects by dragging
- **Rotation handles**: Large circular handles above selected objects for rotation
  - Handle distance: 90 units from edge
  - Handle radius: 24 units (visual and hitbox match)
- **Property editor**: Double-click selected object to edit
  - Width and height adjustment
  - Rotation angle input
  - Flip button (doors only)
- **Delete**: Select object and click delete button

### Import/Export
- **Export SVG**: Download complete floor plan as SVG file
- **Save/Load**: JSON-based project files with all walls and assets
- **File persistence**: Load previously saved projects

## Toolbar
1. **Select** - Default mode for selection and navigation
2. **Wall** - Draw walls with click-and-hold
3. **Door** - Place standard doors
4. **Window** - Place windows
5. **Furniture** - Access furniture dropdown menu
6. **Delete** - Remove selected objects
7. **Export** - Download SVG
8. **Save** - Save project as JSON
9. **Load** - Load existing project

## Technical Details

### File Structure
- Single HTML file: `index.html`
- Inline CSS for all styling
- Inline JavaScript for all functionality
- Embedded SVG for chair asset (from `chair.svg`)

### Key Functions
- `drawWall()`: Click-and-hold wall drawing with snapping
- `snapPoint()`: 45-degree angle snapping
- `snapToWallEndpoint()`: Endpoint and segment snapping
- `findAlignmentOpportunity()`: 90-degree perpendicular alignment guides
- `placeAsset()`: Asset placement with wall snapping
- `drawAsset()`: Render assets with rotation handles
- `showPropertyEditor()`: Property editing popup
- `exportSVG()`: Export floor plan as SVG
- `saveProject()`/`loadProject()`: JSON-based save/load

### Coordinate System
- SVG viewBox: Default 4000x4000 units centered at origin
- Grid units: 10cm per unit
- Wall thickness: 10 units (10cm)
- Zoom level: 8x = 100% display

## Changelog

### Version 1.0 (December 2024)
**Initial Release**
- ✅ SVG canvas with pan and zoom
- ✅ Grid system (100cm major, 10cm minor)
- ✅ Wall drawing tool with click-and-hold
- ✅ Professional dimensioning system
- ✅ Asset library (doors, windows, furniture)
- ✅ Custom office chair SVG integration
- ✅ Object selection and manipulation
- ✅ Rotation handles for selected objects
- ✅ Property editor with double-click
- ✅ Drag-to-relocate functionality
- ✅ 45-degree angle snapping for walls
- ✅ 90-degree alignment guides (green lines)
- ✅ Export to SVG
- ✅ Save/Load projects (JSON)
- ✅ Delete functionality
- ✅ Right-click returns to select mode

### Bug Fixes
- Fixed rotation handle hitbox position (Y coordinate sign error)
- Fixed rotation handle hitbox size to match visual representation
- Fixed office chair SVG rendering with correct path data
- Fixed export/save to include furniture assets
- Fixed delete button positioning
- Fixed dimension labels for rectangular objects
- Removed unintended syntax error (duplicate closing brace)

## Known Limitations
- Single file architecture (no backend/database)
- No undo/redo functionality
- No multi-select capability
- No copy/paste functionality
- No layer system
- No measurement units toggle (fixed to cm)

## Future Enhancements
- Undo/redo system
- Multi-select with Ctrl/Shift
- Copy/paste objects
- Layer management
- Room labeling
- Area calculation
- Print optimization
- Measurement unit toggle (cm/inches/feet)
- Snap-to-grid option
- Custom furniture creation
- Color/material picker for walls
- Text annotation tool

## License
[Add license information]

## Credits
Chair SVG asset from: `C:\Users\domen\Projects\Remplanner\chair.svg`
