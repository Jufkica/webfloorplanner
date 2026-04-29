// Replace the existing exportSVGEnhanced function (starting around line 3460) with this:

exportSVGEnhanced(projectName, creator, date, comments, orientation, includeGrid) {
    if (this.walls.length === 0 && this.assets.length === 0) {
        alert('Nothing to export! Add walls or furniture first.');
        return;
    }
    
    const svgNS = 'http://www.w3.org/2000/svg';
    const exportSvg = document.createElementNS(svgNS, 'svg');
    
    // Calculate bounds of all content
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    this.walls.forEach(wall => {
        minX = Math.min(minX, wall.start.x, wall.end.x);
        minY = Math.min(minY, wall.start.y, wall.end.y);
        maxX = Math.max(maxX, wall.start.x, wall.end.x);
        maxY = Math.max(maxY, wall.start.y, wall.end.y);
    });
    
    this.assets.forEach(asset => {
        const halfW = asset.width / 2;
        const halfH = asset.height / 2;
        minX = Math.min(minX, asset.x - halfW);
        minY = Math.min(minY, asset.y - halfH);
        maxX = Math.max(maxX, asset.x + halfW);
        maxY = Math.max(maxY, asset.y + halfH);
    });
    
    const contentPadding = 50;
    const origMinX = minX - contentPadding;
    const origMinY = minY - contentPadding;
    const origMaxX = maxX + contentPadding;
    const origMaxY = maxY + contentPadding;
    const contentWidth = origMaxX - origMinX;
    const contentHeight = origMaxY - origMinY;
    
    // Professional layout dimensions
    let pageWidth, pageHeight;
    if (orientation === 'landscape') {
        pageWidth = 2800;
        pageHeight = 2000;
    } else {
        pageWidth = 2000;
        pageHeight = 2800;
    }
    
    const margin = 50;
    const sidebarWidth = 350;
    const titleBlockHeight = 150;
    const labelMargin = 40;
    
    // Calculate plan area (top-left positioning with sidebar on right, title block at bottom)
    const planStartX = margin + labelMargin;
    const planStartY = margin + labelMargin;
    const planAreaWidth = pageWidth - sidebarWidth - margin * 2 - labelMargin * 2;
    const planAreaHeight = pageHeight - titleBlockHeight - margin * 2 - labelMargin * 2;
    
    // Scale plan to fit
    const scaleX = planAreaWidth / contentWidth;
    const scaleY = planAreaHeight / contentHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    
    const scaledWidth = contentWidth * scale;
    const scaledHeight = contentHeight * scale;
    
    // Set up SVG
    exportSvg.setAttribute('xmlns', svgNS);
    exportSvg.setAttribute('viewBox', `0 0 ${pageWidth} ${pageHeight}`);
    exportSvg.setAttribute('width', pageWidth);
    exportSvg.setAttribute('height', pageHeight);
    
    // White background
    const bg = document.createElementNS(svgNS, 'rect');
    bg.setAttribute('x', '0');
    bg.setAttribute('y', '0');
    bg.setAttribute('width', pageWidth);
    bg.setAttribute('height', pageHeight);
    bg.setAttribute('fill', '#ffffff');
    exportSvg.appendChild(bg);
    
    // Copy defs (wall pattern)
    const defs = document.createElementNS(svgNS, 'defs');
    const pattern = document.createElementNS(svgNS, 'pattern');
    pattern.setAttribute('id', 'wallPattern');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    pattern.setAttribute('width', '5');
    pattern.setAttribute('height', '5');
    pattern.setAttribute('patternTransform', 'rotate(45)');
    
    const bgRect = document.createElementNS(svgNS, 'rect');
    bgRect.setAttribute('x', '0');
    bgRect.setAttribute('y', '0');
    bgRect.setAttribute('width', '5');
    bgRect.setAttribute('height', '5');
    bgRect.setAttribute('fill', 'white');
    pattern.appendChild(bgRect);
    
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', '0');
    line.setAttribute('x2', '0');
    line.setAttribute('y2', '5');
    line.setAttribute('stroke', '#666');
    line.setAttribute('stroke-width', '1');
    pattern.appendChild(line);
    defs.appendChild(pattern);
    exportSvg.appendChild(defs);
    
    // Create content group with transform
    const contentGroup = document.createElementNS(svgNS, 'g');
    const translateX = planStartX - (origMinX * scale);
    const translateY = planStartY - (origMinY * scale);
    contentGroup.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${scale})`);
    
    // Temporarily redirect canvas to content group
    const originalCanvas = this.canvas;
    this.canvas = contentGroup;
    
    // Draw grid if requested
    if (includeGrid) {
        const originalViewBox = {...this.viewBox};
        this.viewBox = { x: origMinX, y: origMinY, width: contentWidth, height: contentHeight };
        this.drawGrid();
        this.viewBox = originalViewBox;
    }
    
    // Draw walls and assets
    if (this.walls.length > 0) {
        this.drawWalls();
    }
    if (this.assets.length > 0) {
        this.assets.forEach(asset => {
            this.drawAsset(asset, false, false, false, false);
        });
    }
    
    this.canvas = originalCanvas;
    exportSvg.appendChild(contentGroup);
    
    // Draw grid frame with labels (top and left only, in boxes)
    const planBounds = {
        minX: planStartX,
        minY: planStartY,
        maxX: planStartX + scaledWidth,
        maxY: planStartY + scaledHeight
    };
    
    const origBounds = {
        minX: origMinX,
        minY: origMinY,
        maxX: origMaxX,
        maxY: origMaxY
    };
    
    this.drawGridFrame(exportSvg, origBounds, planBounds);
    
    // Draw scale bar
    const scaleBarY = planStartY + scaledHeight + 15;
    const scaleBarX = planStartX;
    const scaleBarLength = 100; // 100 units in plan = 100cm = 1m
    const scaleBarDisplayLength = scaleBarLength * scale;
    
    const scaleBarLine = document.createElementNS(svgNS, 'line');
    scaleBarLine.setAttribute('x1', scaleBarX);
    scaleBarLine.setAttribute('y1', scaleBarY);
    scaleBarLine.setAttribute('x2', scaleBarX + scaleBarDisplayLength);
    scaleBarLine.setAttribute('y2', scaleBarY);
    scaleBarLine.setAttribute('stroke', '#000');
    scaleBarLine.setAttribute('stroke-width', '2');
    exportSvg.appendChild(scaleBarLine);
    
    // Scale bar ticks
    const tick1 = document.createElementNS(svgNS, 'line');
    tick1.setAttribute('x1', scaleBarX);
    tick1.setAttribute('y1', scaleBarY - 5);
    tick1.setAttribute('x2', scaleBarX);
    tick1.setAttribute('y2', scaleBarY + 5);
    tick1.setAttribute('stroke', '#000');
    tick1.setAttribute('stroke-width', '2');
    exportSvg.appendChild(tick1);
    
    const tick2 = document.createElementNS(svgNS, 'line');
    tick2.setAttribute('x1', scaleBarX + scaleBarDisplayLength);
    tick2.setAttribute('y1', scaleBarY - 5);
    tick2.setAttribute('x2', scaleBarX + scaleBarDisplayLength);
    tick2.setAttribute('y2', scaleBarY + 5);
    tick2.setAttribute('stroke', '#000');
    tick2.setAttribute('stroke-width', '2');
    exportSvg.appendChild(tick2);
    
    // Scale label
    const scaleLabel = document.createElementNS(svgNS, 'text');
    scaleLabel.setAttribute('x', scaleBarX + scaleBarDisplayLength / 2);
    scaleLabel.setAttribute('y', scaleBarY + 20);
    scaleLabel.setAttribute('text-anchor', 'middle');
    scaleLabel.setAttribute('font-size', '11');
    scaleLabel.setAttribute('fill', '#000');
    scaleLabel.textContent = '1 m';
    exportSvg.appendChild(scaleLabel);
    
    // Calculate scale ratio text
    const scaleRatio = Math.round(1 / scale);
    const scaleText = document.createElementNS(svgNS, 'text');
    scaleText.setAttribute('x', scaleBarX + scaleBarDisplayLength + 20);
    scaleText.setAttribute('y', scaleBarY + 4);
    scaleText.setAttribute('font-size', '11');
    scaleText.setAttribute('fill', '#666');
    scaleText.textContent = `Scale 1:${scaleRatio}`;
    exportSvg.appendChild(scaleText);
    
    // Draw furniture cards in sidebar (right side)
    const furnitureData = this.getFurnitureConnectionData();
    const sidebarX = pageWidth - sidebarWidth - margin + 20;
    const sidebarY = margin + 20;
    const cardMaxHeight = pageHeight - titleBlockHeight - margin * 2;
    
    if (furnitureData.length > 0) {
        this.drawFurnitureCards(exportSvg, furnitureData, sidebarX, sidebarY, sidebarWidth - 40, cardMaxHeight);
    }
    
    // Draw title block at bottom
    const titleBlockY = pageHeight - titleBlockHeight - margin;
    const titleBlockX = margin;
    const titleBlockWidth = pageWidth - margin * 2;
    
    // Title block border
    const titleBlockBorder = document.createElementNS(svgNS, 'rect');
    titleBlockBorder.setAttribute('x', titleBlockX);
    titleBlockBorder.setAttribute('y', titleBlockY);
    titleBlockBorder.setAttribute('width', titleBlockWidth);
    titleBlockBorder.setAttribute('height', titleBlockHeight);
    titleBlockBorder.setAttribute('fill', 'none');
    titleBlockBorder.setAttribute('stroke', '#000');
    titleBlockBorder.setAttribute('stroke-width', '2');
    exportSvg.appendChild(titleBlockBorder);
    
    // Title block content
    const titleY = titleBlockY + 30;
    const titleFontSize = 20;
    const infoFontSize = 12;
    
    const titleBlockTitle = document.createElementNS(svgNS, 'text');
    titleBlockTitle.setAttribute('x', titleBlockX + 20);
    titleBlockTitle.setAttribute('y', titleY);
    titleBlockTitle.setAttribute('font-size', titleFontSize);
    titleBlockTitle.setAttribute('font-weight', 'bold');
    titleBlockTitle.setAttribute('fill', '#000');
    titleBlockTitle.textContent = projectName;
    exportSvg.appendChild(titleBlockTitle);
    
    const creatorLabel = document.createElementNS(svgNS, 'text');
    creatorLabel.setAttribute('x', titleBlockX + 20);
    creatorLabel.setAttribute('y', titleY + 35);
    creatorLabel.setAttribute('font-size', infoFontSize);
    creatorLabel.setAttribute('fill', '#333');
    creatorLabel.textContent = `Creator:`;
    exportSvg.appendChild(creatorLabel);
    
    const creatorValue = document.createElementNS(svgNS, 'text');
    creatorValue.setAttribute('x', titleBlockX + 90);
    creatorValue.setAttribute('y', titleY + 35);
    creatorValue.setAttribute('font-size', infoFontSize);
    creatorValue.setAttribute('font-weight', '600');
    creatorValue.setAttribute('fill', '#000');
    creatorValue.textContent = creator;
    exportSvg.appendChild(creatorValue);
    
    const dateLabel = document.createElementNS(svgNS, 'text');
    dateLabel.setAttribute('x', titleBlockX + 20);
    dateLabel.setAttribute('y', titleY + 55);
    dateLabel.setAttribute('font-size', infoFontSize);
    dateLabel.setAttribute('fill', '#333');
    dateLabel.textContent = `Date:`;
    exportSvg.appendChild(dateLabel);
    
    const dateValue = document.createElementNS(svgNS, 'text');
    dateValue.setAttribute('x', titleBlockX + 90);
    dateValue.setAttribute('y', titleY + 55);
    dateValue.setAttribute('font-size', infoFontSize);
    dateValue.setAttribute('font-weight', '600');
    dateValue.setAttribute('fill', '#000');
    dateValue.textContent = date;
    exportSvg.appendChild(dateValue);
    
    if (comments) {
        const commentsLabel = document.createElementNS(svgNS, 'text');
        commentsLabel.setAttribute('x', titleBlockX + 20);
        commentsLabel.setAttribute('y', titleY + 75);
        commentsLabel.setAttribute('font-size', infoFontSize);
        commentsLabel.setAttribute('fill', '#333');
        commentsLabel.textContent = `Notes:`;
        exportSvg.appendChild(commentsLabel);
        
        const commentsValue = document.createElementNS(svgNS, 'text');
        commentsValue.setAttribute('x', titleBlockX + 90);
        commentsValue.setAttribute('y', titleY + 75);
        commentsValue.setAttribute('font-size', infoFontSize);
        commentsValue.setAttribute('fill', '#666');
        commentsValue.textContent = comments.substring(0, 100);
        exportSvg.appendChild(commentsValue);
    }
    
    // Serialize and download
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(exportSvg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    const filename = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `${filename}_${orientation}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
