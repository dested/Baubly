///<reference path="../typings/path2d.d.ts"/>

import {GridHexagonConstants} from "./gridHexagonConstants";
import {AssetManager, Asset} from "./AssetManager";
import {HexagonColor} from "../utils/drawingUtilities";

export class GridHexagon {
    x = 0;
    y = 0;
    z = 0;
    height = 0;

    icon: Asset = null;

    highlightColor: HexagonColor = null;
    hexColor: HexagonColor = null;
    topPath: Path2D = null;
    leftDepthPath: Path2D = null;
    bottomDepthPath: Path2D = null;
    rightDepthPath: Path2D = null;
    drawCache: HTMLCanvasElement = null;


    getDepthHeight() {
        return Math.max(1, (this.height) * GridHexagonConstants.depthHeight());
    }

    setIcon(name) {
        if (name) {
            this.icon = AssetManager.instance.assets[name];
        } else {
            this.icon = null;
        }
        this.invalidate();
    }

    setColor(hexColor) {
        if (this.hexColor != hexColor) {
            this.hexColor = hexColor;
            this.invalidate();
        }
    }

    setHighlight(hexColor) {
        if (this.highlightColor != hexColor) {
            this.highlightColor = hexColor;
            this.invalidate();
        }
    }

    buildPaths() {
        const depthHeight = this.getDepthHeight();
        this.topPath = GridHexagon.buildPath(GridHexagonConstants.hexagonTopPolygon());
        this.leftDepthPath = GridHexagon.buildPath(GridHexagonConstants.hexagonDepthLeftPolygon(depthHeight));
        this.bottomDepthPath = GridHexagon.buildPath(GridHexagonConstants.hexagonDepthBottomPolygon(depthHeight));
        this.rightDepthPath = GridHexagon.buildPath(GridHexagonConstants.hexagonDepthRightPolygon(depthHeight));
    }

    getDrawingColor() {
        return this.highlightColor || this.hexColor;
    }

    drawLeftDepth(context) {
        context.strokeStyle = this.getDrawingColor().dark1;
        context.stroke(this.leftDepthPath);
        context.fillStyle = this.getDrawingColor().dark1;
        context.fill(this.leftDepthPath);
    }

    drawBottomDepth(context) {
        context.strokeStyle = this.getDrawingColor().dark2;
        context.stroke(this.bottomDepthPath);
        context.fillStyle = this.getDrawingColor().dark2;
        context.fill(this.bottomDepthPath);
    }

    drawRightDepth(context) {
        context.strokeStyle = this.getDrawingColor().dark3;
        context.stroke(this.rightDepthPath);
        context.fillStyle = this.getDrawingColor().dark3;
        context.fill(this.rightDepthPath);
    }

    drawTop(context) {
        /*
         if ((this.y + this.height) != 1)
         context.strokeStyle = this.getDrawingColor().darkBorder;
         else
         context.strokeStyle = this.getDrawingColor().color;
         */
        if (this.highlightColor || this.icon) {
            context.strokeStyle = this.getDrawingColor().darkBorder;
            context.stroke(this.topPath);
        } else {
            context.strokeStyle = this.getDrawingColor().darkBorder;
            context.stroke(this.topPath);
        }
        context.fillStyle = this.getDrawingColor().color;
        context.fill(this.topPath);
    }

    drawIcon(context) {
        if (this.icon) {
            context.save();
            context.translate(-this.icon.base.x, -this.icon.base.y);
            let width = this.icon.size.width;
            let height = this.icon.size.height;
            context.drawImage(this.icon.image, 0, 0, width, height);
            context.restore();
        }
    }

    invalidate() {
        this.drawCache = null;
    }

    envelope() {
        const size = {width: 0, height: 0};
        size.width = GridHexagonConstants.width;
        size.height = GridHexagonConstants.height();

        if (this.icon) {
            size.height = Math.max(size.height, this.icon.base.y + size.height / 2);
        }

        size.height += this.getDepthHeight();


        size.width += 12;
        size.height += 6;

        return size;
    }

    hexCenter() {
        const center = {x: 0, y: 0};

        center.y = GridHexagonConstants.height() / 2;
        if (this.icon) {
            center.y = Math.max(center.y, this.icon.base.y);
        }

        center.x = GridHexagonConstants.width / 2;
        if (this.icon) {
            center.x = center.x;
        }


        center.x += 6;
        center.y += 6;
        return center;
    }

    draw(context:CanvasRenderingContext2D) {

        const center = this.hexCenter();
        if (this.drawCache) {
            context.drawImage(this.drawCache, -center.x, -center.y);
        } else {
            const c = GridHexagon.getCacheImage(this.height, this.icon, this.highlightColor || this.hexColor);
            if (!c) {
                const can = document.createElement('canvas');
                const ctx = can.getContext('2d');

                const size = this.envelope();
                can.width = size.width;
                can.height = size.height;
                ctx.save();


                ctx.translate(center.x, center.y);
                if (this.height > 0) {
                    this.drawLeftDepth(ctx);
                    this.drawBottomDepth(ctx);
                    this.drawRightDepth(ctx);
                }

                ctx.save();
                ctx.lineWidth = 1;
                //ctx.lineCap = "round";
                //ctx.lineJoin = "round";
                this.drawTop(ctx);
                ctx.restore();


                this.drawIcon(ctx);
                ctx.restore();

                GridHexagon.setCacheImage(this.height, this.icon, this.highlightColor || this.hexColor, can);
                /*       ctx.strokeStyle='black';
                 ctx.lineWidth=1;
                 ctx.strokeRect(0,0,can.width,can.height);*/
                this.drawCache = can;

            } else {
                this.drawCache = c;
            }
            this.draw(context);
        }
    }

    getNeighbors() {

        const neighbors = [];

        if ((this.x % 2 === 0)) {
            neighbors.push({x: this.x - 1, y: this.z});
            neighbors.push({x: this.x, y: this.z - 1});
            neighbors.push({x: this.x + 1, y: this.z});

            neighbors.push({x: this.x - 1, y: this.z + 1});
            neighbors.push({x: this.x, y: this.z + 1});
            neighbors.push({x: this.x + 1, y: this.z + 1});
        } else {
            neighbors.push({x: this.x - 1, y: this.z - 1});
            neighbors.push({x: this.x, y: this.z - 1});
            neighbors.push({x: this.x + 1, y: this.z - 1});

            neighbors.push({x: this.x - 1, y: this.z});
            neighbors.push({x: this.x, y: this.z + 1});
            neighbors.push({x: this.x + 1, y: this.z});
        }
        return neighbors;
    }


    static caches :{[key:string]:HTMLCanvasElement}= {};

    static getCacheImage(height: number, icon: Asset, hexColor: HexagonColor): HTMLCanvasElement {
        const c = `${icon ? icon.name : ''}-${height}-${hexColor.color}`;
        return GridHexagon.caches[c]
    }

    static setCacheImage(height: number, icon: Asset, hexColor: HexagonColor, img: HTMLCanvasElement) {
        const c = `${icon ? icon.name : ''}-${height}-${hexColor.color}`;
        GridHexagon.caches[c] = img;
    }

    static  buildPath(path): Path2D {
        const p2d = new Path2D();
        for (let i = 0; i < path.length; i++) {
            const point = path[i];
            p2d.lineTo(point.x, point.y);
        }
        return p2d;
    }


}



 