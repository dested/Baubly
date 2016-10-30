import {GridHexagonConstants} from "./gridHexagonConstants";
import {Node, orderBy, distance} from "../../common/hexLibraries/HexUtils";
import {GridHexagon} from "./GridHexagon";
import {HexBoardModel} from "../../common/models/hexBoard";
import {HexagonColor, DrawingUtilities} from "../utils/drawingUtilities";

export class HexBoard {
    hexList = [];
    hexBlock = {};
    boardSize = {width: 0, height: 0};
    viewPort = {x: 0, y: 0, width: 400, height: 400, padding: GridHexagonConstants.width * 2};

    constructor() {
    }

    xyToHexIndex(x, y) {
        return this.hexBlock[x + y * 5000];
    }

    resize(width, height) {
        this.viewPort.width = width;
        this.viewPort.height = height;
    }

    setSize(width, height) {
        this.boardSize.width = width;
        this.boardSize.height = height;
    }

    offsetView(x, y) {
        this.viewPort.x += x;
        this.viewPort.y += y;
        this.constrainViewPort();
    }

    setView(x, y) {
        this.viewPort.x = x;
        this.viewPort.y = y;
    }

    constrainViewPort() {
        this.viewPort.x = Math.max(this.viewPort.x, 0 - this.viewPort.padding);
        this.viewPort.y = Math.max(this.viewPort.y, 0 - this.viewPort.padding);
        const size = this.gameDimensions();

        this.viewPort.x = Math.min(this.viewPort.x, size.width + this.viewPort.padding - this.viewPort.width);
        this.viewPort.y = Math.min(this.viewPort.y, size.height + this.viewPort.padding - this.viewPort.height)
    }

    initialize(board: HexBoardModel) {
        const str = board.boardStr;
        this.setSize(board.width, board.height);
        var baseColor = new HexagonColor('#AFFFFF');

        var otherColors = [];

        for (var i = 0; i < 15; i++) {

            otherColors[i]=new HexagonColor(DrawingUtilities.colorLuminance('#AFF000',(i/15)));

        }

        const ys = str.split('|');

        for (let y = 0; y < ys.length; y++) {
            const yItem = ys[y].split('');
            for (let x = 0; x < yItem.length; x += 2) {
                const xItem = parseInt(yItem[x]);
                // if (xItem == 0) continue;

                let gridHexagon = new GridHexagon();
                gridHexagon.x = x / 2;
                gridHexagon.y = 0;
                gridHexagon.z = y;
                gridHexagon.height = xItem == 0 ? 0 : xItem;
                if (xItem == 0) {
                    gridHexagon.hexColor = baseColor;

                } else {
                    gridHexagon.hexColor = otherColors[xItem-1];
                }
                gridHexagon.buildPaths();
                this.addHexagon(gridHexagon);
            }
        }
        this.reorderHexList();


    }

    gameDimensions() {
        const size = {width: 0, height: 0};
        size.width = GridHexagonConstants.width * 3 / 4 * this.boardSize.width;
        size.height = GridHexagonConstants.height() * this.boardSize.height;
        return size;
    }

    getHexAtPoint(clickX, clickY) {
        let lastClick = null;
        clickX += this.viewPort.x;
        clickY += this.viewPort.y;

        for (let i = 0; i < this.hexList.length; i++) {
            const gridHexagon = this.hexList[i];
            const x = GridHexagonConstants.width * 3 / 4 * gridHexagon.x;
            let z = gridHexagon.z * GridHexagonConstants.height() + ((gridHexagon.x % 2 === 1) ? (-GridHexagonConstants.height() / 2) : 0);
            z -= gridHexagon.height * GridHexagonConstants.depthHeight();
            z += gridHexagon.y * GridHexagonConstants.depthHeight();
            if (DrawingUtilities.pointInPolygon(clickX - x, clickY - z, GridHexagonConstants.hexagonTopPolygon())) {
                lastClick = gridHexagon;
            }
            if (DrawingUtilities.pointInPolygon(clickX - x, clickY - z, GridHexagonConstants.hexagonDepthLeftPolygon((gridHexagon.height + 1) * GridHexagonConstants.depthHeight()))) {
                lastClick = gridHexagon;
            }
            if (DrawingUtilities.pointInPolygon(clickX - x, clickY - z, GridHexagonConstants.hexagonDepthBottomPolygon((gridHexagon.height + 1) * GridHexagonConstants.depthHeight()))) {
                lastClick = gridHexagon;
            }
            if (DrawingUtilities.pointInPolygon(clickX - x, clickY - z, GridHexagonConstants.hexagonDepthRightPolygon((gridHexagon.height + 1) * GridHexagonConstants.depthHeight()))) {
                lastClick = gridHexagon;
            }
        }

        return lastClick;
    }

    addHexagon(hexagon) {
        this.hexList.push(hexagon);
        this.hexBlock[hexagon.x + hexagon.z * 5000] = hexagon;
    }

    reorderHexList() {
        this.hexList = orderBy(this.hexList, m => (m.z - m.y) * 1000 + (m.x % 2) * -200 + m.height);
    }

    drawBoard(context) {
        context.save();
        context.translate(-this.viewPort.x, -this.viewPort.y);
        context.lineWidth = 1;
        for (let i = 0; i < this.hexList.length; i++) {
            const gridHexagon = this.hexList[i];
            this.drawHexagon(context, gridHexagon);
        }
        context.restore();
    }

    drawHexagon(context, gridHexagon) {

        const x = GridHexagonConstants.width * 3 / 4 * gridHexagon.x;
        let z = gridHexagon.z * GridHexagonConstants.height() + ((gridHexagon.x % 2 === 1) ? (-GridHexagonConstants.height() / 2) : 0);

        z -= gridHexagon.height * GridHexagonConstants.depthHeight();
        z += gridHexagon.y * GridHexagonConstants.depthHeight();

        if (!(x > this.viewPort.x - this.viewPort.padding &&
            x < this.viewPort.x + this.viewPort.width + this.viewPort.padding &&
            z > this.viewPort.y - this.viewPort.padding &&
            z < this.viewPort.y + this.viewPort.height + this.viewPort.padding)) {
            return;
        }

        context.save();
        context.translate(x, z);
        gridHexagon.draw(context);
        context.restore();

    }

    pathFind(start, finish) {
        const mypathStart = new Node(null, start);
        const mypathEnd = new Node(null, finish);
        let aStar = [];
        let open = [mypathStart];
        let closed = [];
        const result = [];
        let neighbours;
        let node;
        let path;
        let length, max, min, i, j;
        while (length = open.length) {
            max = Infinity;
            min = -1;
            for (i = 0; i < length; i++) {
                if (open[i].f < max) {
                    max = open[i].f;
                    min = i;
                }
            }
            node = open.splice(min, 1)[0];
            if (node.x === mypathEnd.x && node.y === mypathEnd.y) {
                path = closed[closed.push(node) - 1];
                do {
                    result.push(path.item);
                }
                while (path = path.parent);
                aStar = closed = open = [];
                result.reverse();
            }
            else {
                neighbours = node.item.getNeighbors();
                for (i = 0, j = neighbours.length; i < j; i++) {
                    const n = this.xyToHexIndex(neighbours[i].x, neighbours[i].y);
                    if (!n) continue;
                    if (Math.abs((node.item.y + node.item.height) - (n.y + n.height)) >= 2)
                        continue;
                    path = new Node(node, n);
                    if (!aStar[path.value()]) {
                        path.g = node.g + distance(n, node.item) + (Math.abs((node.item.y + node.item.height) - (n.y + n.height)) * 2);
                        path.f = path.g + distance(n, finish);
                        open.push(path);
                        aStar[path.value()] = true;
                    }
                }
                closed.push(node);
            }
        }
        return result;
    }
}