import {GridHexagonConstants} from "../../common/hexLibraries/GridHexagonConstants";
import {AssetManager} from "./AssetManager";

export class GridHexagon {
    x = 0;
    y = 0;
    z = 0;
    height = 0;

    icon = null;
    unit = null;

    highlightColor = null;
    hexColor = null;
    topPath = null;
    leftDepthPath = null;
    bottomDepthPath = null;
    rightDepthPath = null;
    drawCache = null;


    getDepthHeight() {
        return Math.max(1,(this.height) * GridHexagonConstants.depthHeight());
    }

    setUnit(name) {
        this.unit = name;
        if (this.unit) {
            this.icon = AssetManager.instance.assets[this.unit];
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
        this.topPath = buildPath(GridHexagonConstants.hexagonTopPolygon());
        this.leftDepthPath = buildPath(GridHexagonConstants.hexagonDepthLeftPolygon(depthHeight));
        this.bottomDepthPath = buildPath(GridHexagonConstants.hexagonDepthBottomPolygon(depthHeight));
        this.rightDepthPath = buildPath(GridHexagonConstants.hexagonDepthRightPolygon(depthHeight));
    }

    $getDrawingColor() {
        return this.highlightColor || this.hexColor;
    }

    drawLeftDepth(context) {
        context.strokeStyle = this.$getDrawingColor().dark1;
        context.stroke(this.leftDepthPath);
        context.fillStyle = this.$getDrawingColor().dark1;
        context.fill(this.leftDepthPath);
    }

    drawBottomDepth(context) {
        context.strokeStyle = this.$getDrawingColor().dark2;
        context.stroke(this.bottomDepthPath);
        context.fillStyle = this.$getDrawingColor().dark2;
        context.fill(this.bottomDepthPath);
    }

    drawRightDepth(context) {
        context.strokeStyle = this.$getDrawingColor().dark3;
        context.stroke(this.rightDepthPath);
        context.fillStyle = this.$getDrawingColor().dark3;
        context.fill(this.rightDepthPath);
    }

    drawTop(context) {
        /*
         if ((this.y + this.height) != 1)
         context.strokeStyle = this.$getDrawingColor().darkBorder;
         else
         context.strokeStyle = this.$getDrawingColor().color;
         */
        if (this.highlightColor || this.icon) {
            context.strokeStyle = this.$getDrawingColor().darkBorder;
            context.stroke(this.topPath);
        } else {
            context.strokeStyle = this.$getDrawingColor().darkBorder;
            context.stroke(this.topPath);
        }
        context.fillStyle = this.$getDrawingColor().color;
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

    draw(context) {

        const center = this.hexCenter();
        if (this.drawCache) {
            context.drawImage(this.drawCache, -center.x, -center.y);
        } else {
            const c = getCacheImage(this.height, this.icon ? this.icon.name : '', this.highlightColor || this.hexColor);
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

                setCacheImage(this.height, this.icon ? this.icon.name : '', this.hexColor.color, can);
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
}

function buildPath(path) {
    const p2d = new Path2D();
    for (let i = 0; i < path.length; i++) {
        const point = path[i];
        p2d.lineTo(point.x, point.y);
    }
    return p2d;
}

const caches = {};
function getCacheImage(height, icon, hexColor) {
    const c = `${icon ? icon.name : ''}-${height}-${hexColor.color}`;
    return caches[c]
}
function setCacheImage(height, icon, hexColor, img) {
    const c = `${icon ? icon.name : ''}-${height}-${hexColor.color}`;
    caches[c] = img;
}


interface Path2D {
    addPath(path:Path2D, transform?:SVGMatrix);
    closePath():void;
    moveTo(x:number, y:number):void;
    lineTo(x:number, y:number):void;
    bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number):void;
    quadraticCurveTo(cpx:number, cpy:number, x:number, y:number):void;
    arc(x:number, y:number, radius:number, startAngle:number, endAngle:number, anticlockwise?:boolean):void;
    arcTo(x1:number, y1:number, x2:number, y2:number, radius:number):void;
    /*ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;*/
    rect(x:number, y:number, w:number, h:number):void;
}
interface Path2DConstructor {
    new ():Path2D;
    new (d:string):Path2D;
    new (path:Path2D, fillRule?:string):Path2D;
    prototype:Path2D;
}
declare var Path2D:Path2DConstructor;
 