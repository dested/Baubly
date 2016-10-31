var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("client/hexLibraries/AssetManager", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AssetManager;
    return {
        setters:[],
        execute: function() {
            AssetManager = (function () {
                function AssetManager() {
                }
                AssetManager.start = function () {
                    var _this = this;
                    var _loop_1 = function(name_1) {
                        if (this_1.assetQueue.hasOwnProperty(name_1)) {
                            var img_1 = new Image();
                            img_1.onload = function () {
                                _this.imageLoaded(img_1, name_1);
                            };
                            img_1.src = this_1.assetQueue[name_1].url;
                        }
                    };
                    var this_1 = this;
                    for (var name_1 in this.assetQueue) {
                        _loop_1(name_1);
                    }
                };
                AssetManager.addAsset = function (name, url, size, base) {
                    this.assetQueue[name] = { base: base, size: size, url: url, realName: name };
                    this.$assetsRequested++;
                };
                AssetManager.addAssetFrame = function (name, frameIndex, url, size, base) {
                    this.assetQueue[name + frameIndex] = { base: base, size: size, url: url, frameIndex: frameIndex, realName: name };
                    this.$assetsRequested++;
                };
                AssetManager.imageLoaded = function (img, name) {
                    var _this = this;
                    var assetQueue = this.assetQueue[name];
                    var asset = this.assets[assetQueue.realName] || {
                        size: null,
                        base: null,
                        name: name,
                        animated: assetQueue.frameIndex !== undefined
                    };
                    asset.size = assetQueue.size || { width: img.width, height: img.height };
                    asset.base = assetQueue.base || {
                        x: asset.size.width / 2,
                        y: asset.size.height / 2
                    };
                    if (asset.animated) {
                        asset.images = asset.images || [];
                        asset.images[assetQueue.frameIndex] = img;
                    }
                    else {
                        asset.image = img;
                    }
                    this.assets[assetQueue.realName] = asset;
                    this.$assetsLoaded++;
                    if (this.$assetsLoaded === this.$assetsRequested) {
                        setTimeout(function () {
                            _this.completed();
                        }, 100);
                    }
                };
                AssetManager.assetQueue = {};
                AssetManager.assets = {};
                AssetManager.completed = null;
                AssetManager.$assetsLoaded = 0;
                AssetManager.$assetsRequested = 0;
                return AssetManager;
            }());
            exports_1("AssetManager", AssetManager);
        }
    }
});
System.register("common/utils", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Point, DoublePoint, IntersectingRectangle, Rectangle;
    return {
        setters:[],
        execute: function() {
            Point = (function () {
                function Point(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Object.defineProperty(Point.prototype, "x", {
                    get: function () {
                        return this._x | 0;
                    },
                    set: function (val) {
                        this._x = val | 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Point.prototype, "y", {
                    get: function () {
                        return this._y | 0;
                    },
                    set: function (val) {
                        this._y = val | 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                Point.Create = function (pos) {
                    return new Point(pos.x, pos.y);
                };
                Point.prototype.offset = function (windowLocation) {
                    return new Point(this.x + windowLocation.x, this.y + windowLocation.y);
                };
                Point.prototype.negatePoint = function (windowLocation) {
                    return new Point(this.x - windowLocation.x, this.y - windowLocation.y);
                };
                Point.prototype.negate = function (x, y) {
                    return new Point(this.x - (x | 0), this.y - (y | 0));
                };
                Point.prototype.set = function (x, y) {
                    this.x = x;
                    this.y = y;
                };
                return Point;
            }());
            exports_2("Point", Point);
            DoublePoint = (function () {
                function DoublePoint(x, y) {
                    this.x = x;
                    this.y = y;
                }
                DoublePoint.create = function (pos) {
                    return new DoublePoint(pos.x, pos.y);
                };
                DoublePoint.prototype.offset = function (windowLocation) {
                    return new DoublePoint(this.x + windowLocation.x, this.y + windowLocation.y);
                };
                DoublePoint.prototype.negatePoint = function (windowLocation) {
                    return new DoublePoint(this.x - windowLocation.x, this.y - windowLocation.y);
                };
                DoublePoint.prototype.negate = function (x, y) {
                    return new DoublePoint(this.x - (x | 0), this.y - (y | 0));
                };
                DoublePoint.prototype.set = function (x, y) {
                    this.x = x;
                    this.y = y;
                };
                return DoublePoint;
            }());
            exports_2("DoublePoint", DoublePoint);
            IntersectingRectangle = (function (_super) {
                __extends(IntersectingRectangle, _super);
                function IntersectingRectangle(x, y, width, height) {
                    _super.call(this, x, y);
                    this.width = width;
                    this.height = height;
                }
                IntersectingRectangle.prototype.intersects = function (p) {
                    return this.x < p.x && this.x + this.width > p.x && this.y < p.y && this.y + this.height > p.y;
                };
                IntersectingRectangle.intersectsRect = function (r, p) {
                    return r.x < p.x && r.x + r.width > p.x && r.y < p.y && r.y + r.height > p.y;
                };
                IntersectingRectangle.intersectRect = function (r1, r2) {
                    return !(r2.x > r1.x + r1.width || r2.x + 0 < r1.x || r2.y > r1.y + r1.height || r2.y + 0 < r1.y);
                };
                return IntersectingRectangle;
            }(Point));
            exports_2("IntersectingRectangle", IntersectingRectangle);
            Rectangle = (function (_super) {
                __extends(Rectangle, _super);
                function Rectangle(x, y, width, height) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    if (width === void 0) { width = 0; }
                    if (height === void 0) { height = 0; }
                    _super.call(this, x, y);
                    this.width = width;
                    this.height = height;
                }
                return Rectangle;
            }(Point));
            exports_2("Rectangle", Rectangle);
        }
    }
});
System.register("common/hexLibraries/gridHexagonConstants", ["common/utils"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var utils_1;
    var GridHexagonConstants;
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            GridHexagonConstants = (function () {
                function GridHexagonConstants() {
                }
                GridHexagonConstants.height = function () {
                    return Math.sqrt(3) / 2 * GridHexagonConstants.width * GridHexagonConstants.heightSkew;
                };
                GridHexagonConstants.depthHeight = function () {
                    return GridHexagonConstants.height() * GridHexagonConstants.depthHeightSkew;
                };
                ;
                GridHexagonConstants.hexagonTopPolygon = function () {
                    return [new utils_1.Point(-GridHexagonConstants.width / 2, 0), new utils_1.Point(-GridHexagonConstants.width / 4, -GridHexagonConstants.height() / 2), new utils_1.Point(GridHexagonConstants.width / 4, -GridHexagonConstants.height() / 2), new utils_1.Point(GridHexagonConstants.width / 2, 0), new utils_1.Point(GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2), new utils_1.Point(-GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2), new utils_1.Point(-GridHexagonConstants.width / 2, 0)];
                };
                ;
                GridHexagonConstants.hexagonDepthLeftPolygon = function (depthHeight) {
                    return [new utils_1.Point(-GridHexagonConstants.width / 2, 0), new utils_1.Point(-GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2), new utils_1.Point(-GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2 + depthHeight), new utils_1.Point(-GridHexagonConstants.width / 2, depthHeight), new utils_1.Point(-GridHexagonConstants.width / 2, 0)];
                };
                ;
                GridHexagonConstants.hexagonDepthBottomPolygon = function (depthHeight) {
                    return [new utils_1.Point(-GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2),
                        new utils_1.Point(GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2),
                        new utils_1.Point(GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2 + depthHeight),
                        new utils_1.Point(-GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2 + depthHeight),
                        new utils_1.Point(-GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2)];
                };
                ;
                GridHexagonConstants.hexagonDepthRightPolygon = function (depthHeight) {
                    return [new utils_1.Point(GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2), new utils_1.Point(GridHexagonConstants.width / 2, 0), new utils_1.Point(GridHexagonConstants.width / 2, depthHeight), new utils_1.Point(GridHexagonConstants.width / 4, depthHeight + GridHexagonConstants.height() / 2), new utils_1.Point(GridHexagonConstants.width / 4, GridHexagonConstants.height() / 2)];
                };
                ;
                GridHexagonConstants.width = 150;
                GridHexagonConstants.heightSkew = .7;
                GridHexagonConstants.depthHeightSkew = .3;
                return GridHexagonConstants;
            }());
            exports_3("GridHexagonConstants", GridHexagonConstants);
        }
    }
});
System.register("common/gridHexagon", ["common/hexLibraries/gridHexagonConstants"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var gridHexagonConstants_1;
    var GridHexagon;
    return {
        setters:[
            function (gridHexagonConstants_1_1) {
                gridHexagonConstants_1 = gridHexagonConstants_1_1;
            }],
        execute: function() {
            GridHexagon = (function () {
                function GridHexagon() {
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.height = 0;
                    this.heightOffset = 0;
                }
                GridHexagon.prototype.getRealX = function () {
                    return gridHexagonConstants_1.GridHexagonConstants.width * 3 / 4 * this.x;
                };
                GridHexagon.prototype.getRealY = function () {
                    var y = this.z * gridHexagonConstants_1.GridHexagonConstants.height() + ((this.x % 2 === 1) ? (-gridHexagonConstants_1.GridHexagonConstants.height() / 2) : 0);
                    y -= this.getDepthHeight();
                    y += this.y * gridHexagonConstants_1.GridHexagonConstants.depthHeight();
                    return y;
                };
                GridHexagon.prototype.getDepthHeight = function () {
                    return Math.max(1, (this.height + this.heightOffset) * gridHexagonConstants_1.GridHexagonConstants.depthHeight());
                };
                return GridHexagon;
            }());
            exports_4("GridHexagon", GridHexagon);
        }
    }
});
System.register("common/spriteManager", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var SpriteManager, Sprite;
    return {
        setters:[],
        execute: function() {
            SpriteManager = (function () {
                function SpriteManager() {
                    this.sprites = [];
                    this.spritesMap = {};
                }
                SpriteManager.prototype.addSprite = function (sprite) {
                    this.sprites.push(sprite);
                    if (sprite.tile) {
                        var sprites = this.spritesMap[sprite.tile.x + "-" + sprite.tile.z];
                        sprites = sprites || [];
                        sprites.push(sprite);
                        this.spritesMap[sprite.tile.x + "-" + sprite.tile.z] = sprites;
                    }
                };
                SpriteManager.prototype.tick = function () {
                    for (var i = 0; i < this.sprites.length; i++) {
                        var sprite = this.sprites[i];
                        sprite.tick();
                    }
                };
                SpriteManager.prototype.getSpritesAtTile = function (item) {
                    return this.spritesMap[item.x + "-" + item.z];
                };
                return SpriteManager;
            }());
            exports_5("SpriteManager", SpriteManager);
            Sprite = (function () {
                function Sprite() {
                }
                Sprite.prototype.tick = function () {
                };
                return Sprite;
            }());
            exports_5("Sprite", Sprite);
        }
    }
});
System.register("client/utils/drawingUtilities", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var HexagonColor, DrawingUtils;
    return {
        setters:[],
        execute: function() {
            HexagonColor = (function () {
                function HexagonColor(color) {
                    this.color = "";
                    this.darkBorder = "";
                    this.dark1 = "";
                    this.dark2 = "";
                    this.dark3 = "";
                    this.color = color;
                    this.darkBorder = DrawingUtils.colorLuminance(color, -0.45);
                    this.dark1 = DrawingUtils.colorLuminance(color, -0.4);
                    this.dark2 = DrawingUtils.colorLuminance(color, -0.55);
                    this.dark3 = DrawingUtils.colorLuminance(color, -0.65);
                }
                return HexagonColor;
            }());
            exports_6("HexagonColor", HexagonColor);
            DrawingUtils = (function () {
                function DrawingUtils() {
                }
                DrawingUtils.drawCircle = function (context) {
                    context.beginPath();
                    context.arc(0, 0, 5, 0, 2 * Math.PI, false);
                    context.fillStyle = 'black';
                    context.fill();
                    context.lineWidth = 5;
                    context.stroke();
                };
                ;
                DrawingUtils.colorLuminance = function (hex, lum) {
                    // validate hex string
                    hex = hex.replace(new RegExp('[^0-9a-f]', 'gi'), '');
                    // convert to decimal and change luminosity
                    var rgb = '#';
                    for (var i = 0; i < 3; i++) {
                        var c = parseInt(hex.substr(i * 2, 2), 16);
                        var cs = (Math.round(Math.min(Math.max(0, c + c * lum), 255)) | 0).toString(16);
                        rgb += ("00" + cs).substr(cs.length);
                    }
                    return rgb;
                };
                ;
                DrawingUtils.makeTransparent = function (hex, opacitiy) {
                    // validate hex string
                    hex = hex.replace(new RegExp('[^0-9a-f]', 'gi'), '');
                    // convert to decimal and change luminosity
                    var rgb = 'rgba(';
                    for (var i = 0; i < 3; i++) {
                        var c = parseInt(hex.substr(i * 2, 2), 16);
                        rgb += c + ',';
                    }
                    rgb += opacitiy + ")";
                    return rgb;
                };
                ;
                DrawingUtils.pointInPolygon = function (pointX, pointY, polygon) {
                    var isInside = false;
                    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                        if (polygon[i].y > pointY !== polygon[j].y > pointY &&
                            pointX < (polygon[j].x - polygon[i].x) * (pointY - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
                            isInside = !isInside;
                        }
                    }
                    return isInside;
                };
                ;
                return DrawingUtils;
            }());
            exports_6("DrawingUtils", DrawingUtils);
        }
    }
});
System.register("common/hexLibraries/hexUtils", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var Node, HexUtils;
    return {
        setters:[],
        execute: function() {
            Node = (function () {
                function Node(parent, piece) {
                    this.parent = null;
                    this.x = 0;
                    this.y = 0;
                    this.item = null;
                    this.f = 0;
                    this.g = 0;
                    this.parent = parent;
                    // array index of this Node in the world linear array
                    // the location coordinates of this Node
                    this.x = piece.x;
                    this.y = piece.z;
                    this.item = piece;
                    // the distanceFunction cost to get
                    // TO this Node from the START
                    this.f = 0;
                    // the distanceFunction cost to get
                    // from this Node to the GOAL
                    this.g = 0;
                }
                Node.prototype.value = function () {
                    return this.x + (this.y * 5000);
                };
                return Node;
            }());
            exports_7("Node", Node);
            HexUtils = (function () {
                function HexUtils() {
                }
                HexUtils.distance = function (p1, p2) {
                    var x1 = p1.x;
                    var y1 = p1.z;
                    var x2 = p2.x;
                    var y2 = p2.z;
                    var du = x2 - x1;
                    var dv = (y2 + ((x2 / 2) | 0)) - (y1 + ((x1 / 2) | 0));
                    if ((du >= 0 && dv >= 0) || (du < 0 && dv < 0))
                        return Math.max(Math.abs(du), Math.abs(dv));
                    else
                        return Math.abs(du) + Math.abs(dv);
                };
                HexUtils.orderBy = function (list, callback) {
                    var itms = [];
                    for (var i = 0; i < list.length; i++) {
                        var obj = list[i];
                        itms.push({ item: obj, val: callback(obj) });
                    }
                    itms.sort(function (a, b) { return (a.val - b.val); });
                    list = [];
                    for (var i = 0; i < itms.length; i++) {
                        var obj1 = itms[i];
                        list.push(obj1.item);
                    }
                    return list;
                };
                HexUtils.mathSign = function (f) {
                    if (f < 0)
                        return -1;
                    else if (f > 0)
                        return 1;
                    return 0;
                };
                return HexUtils;
            }());
            exports_7("HexUtils", HexUtils);
        }
    }
});
System.register("common/hexBoard", ["common/hexLibraries/gridHexagonConstants", "common/hexLibraries/hexUtils"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var gridHexagonConstants_2, hexUtils_1;
    var HexBoard;
    return {
        setters:[
            function (gridHexagonConstants_2_1) {
                gridHexagonConstants_2 = gridHexagonConstants_2_1;
            },
            function (hexUtils_1_1) {
                hexUtils_1 = hexUtils_1_1;
            }],
        execute: function() {
            HexBoard = (function () {
                function HexBoard() {
                    this.hexList = [];
                    this.hexBlock = {};
                    this.boardSize = { width: 0, height: 0 };
                }
                HexBoard.prototype.gameDimensions = function () {
                    var size = { width: 0, height: 0 };
                    size.width = gridHexagonConstants_2.GridHexagonConstants.width * (3 / 4) * this.boardSize.width;
                    size.height = gridHexagonConstants_2.GridHexagonConstants.height() * this.boardSize.height;
                    return size;
                };
                HexBoard.prototype.addHexagon = function (hexagon) {
                    this.hexList.push(hexagon);
                    this.hexBlock[hexagon.x + hexagon.z * 5000] = hexagon;
                };
                HexBoard.prototype.reorderHexList = function () {
                    this.hexList = hexUtils_1.HexUtils.orderBy(this.hexList, function (m) { return (m.z - m.y) * 1000 + (m.x % 2) * -200 + m.height; });
                };
                HexBoard.prototype.xyToHexIndex = function (x, y) {
                    return this.hexBlock[x + y * 5000];
                };
                HexBoard.prototype.pathFind = function (start, finish) {
                    var myPathStart = new hexUtils_1.Node(null, start);
                    var myPathEnd = new hexUtils_1.Node(null, finish);
                    var aStar = [];
                    var open = [myPathStart];
                    var closed = [];
                    var result = [];
                    var neighbours;
                    var node;
                    var path;
                    var length, max, min, i, j;
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
                        if (node.x === myPathEnd.x && node.y === myPathEnd.y) {
                            path = closed[closed.push(node) - 1];
                            do {
                                result.push(path.item);
                            } while (path = path.parent);
                            aStar = closed = open = [];
                            result.reverse();
                        }
                        else {
                            neighbours = node.item.getNeighbors();
                            for (i = 0, j = neighbours.length; i < j; i++) {
                                var n = this.xyToHexIndex(neighbours[i].x, neighbours[i].y);
                                if (!n)
                                    continue;
                                if (Math.abs((node.item.y + node.item.height) - (n.y + n.height)) >= 2)
                                    continue;
                                path = new hexUtils_1.Node(node, n);
                                if (!aStar[path.value()]) {
                                    path.g = node.g + hexUtils_1.HexUtils.distance(n, node.item) + (Math.abs((node.item.y + node.item.height) - (n.y + n.height)) * 2);
                                    path.f = path.g + hexUtils_1.HexUtils.distance(n, finish);
                                    open.push(path);
                                    aStar[path.value()] = true;
                                }
                            }
                            closed.push(node);
                        }
                    }
                    return result;
                };
                return HexBoard;
            }());
            exports_8("HexBoard", HexBoard);
        }
    }
});
System.register("common/models/hexBoard", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var HexBoardModel;
    return {
        setters:[],
        execute: function() {
            HexBoardModel = (function () {
                function HexBoardModel() {
                }
                return HexBoardModel;
            }());
            exports_9("HexBoardModel", HexBoardModel);
        }
    }
});
///<reference path="../typings/path2d.d.ts"/>
System.register("client/hexLibraries/clientGridHexagon", ["client/hexLibraries/AssetManager", "client/utils/drawingUtilities", "common/gridHexagon", "common/hexLibraries/gridHexagonConstants"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var AssetManager_1, drawingUtilities_1, gridHexagon_1, gridHexagonConstants_3;
    var ClientGridHexagon;
    return {
        setters:[
            function (AssetManager_1_1) {
                AssetManager_1 = AssetManager_1_1;
            },
            function (drawingUtilities_1_1) {
                drawingUtilities_1 = drawingUtilities_1_1;
            },
            function (gridHexagon_1_1) {
                gridHexagon_1 = gridHexagon_1_1;
            },
            function (gridHexagonConstants_3_1) {
                gridHexagonConstants_3 = gridHexagonConstants_3_1;
            }],
        execute: function() {
            ClientGridHexagon = (function (_super) {
                __extends(ClientGridHexagon, _super);
                function ClientGridHexagon() {
                    _super.apply(this, arguments);
                    this.icon = null;
                    this.highlightColor = null;
                    this.hexColor = null;
                    this.topPath = null;
                    this.leftDepthPath = null;
                    this.bottomDepthPath = null;
                    this.rightDepthPath = null;
                    this.drawCache = null;
                }
                ClientGridHexagon.prototype.setIcon = function (name) {
                    if (name) {
                        this.icon = AssetManager_1.AssetManager.assets[name];
                    }
                    else {
                        this.icon = null;
                    }
                    this.invalidate();
                };
                ClientGridHexagon.prototype.setColor = function (hexColor) {
                    if (this.hexColor != hexColor) {
                        this.hexColor = hexColor;
                        this.invalidate();
                    }
                };
                ClientGridHexagon.prototype.setHighlight = function (hexColor) {
                    if (this.highlightColor != hexColor) {
                        this.highlightColor = hexColor;
                        this.invalidate();
                    }
                };
                ClientGridHexagon.prototype.setHeightOffset = function (heightOffset) {
                    if (this.heightOffset != heightOffset) {
                        this.heightOffset = heightOffset;
                        this.buildPaths();
                    }
                };
                ClientGridHexagon.prototype.buildPaths = function () {
                    var depthHeight = this.getDepthHeight();
                    this.topPath = ClientGridHexagon.buildPath(gridHexagonConstants_3.GridHexagonConstants.hexagonTopPolygon());
                    this.leftDepthPath = ClientGridHexagon.buildPath(gridHexagonConstants_3.GridHexagonConstants.hexagonDepthLeftPolygon(depthHeight));
                    this.bottomDepthPath = ClientGridHexagon.buildPath(gridHexagonConstants_3.GridHexagonConstants.hexagonDepthBottomPolygon(depthHeight));
                    this.rightDepthPath = ClientGridHexagon.buildPath(gridHexagonConstants_3.GridHexagonConstants.hexagonDepthRightPolygon(depthHeight));
                };
                ClientGridHexagon.prototype.getDrawingColor = function () {
                    return this.highlightColor || this.hexColor;
                };
                ClientGridHexagon.prototype.drawLeftDepth = function (context) {
                    context.strokeStyle = this.getDrawingColor().dark1;
                    context.stroke(this.leftDepthPath);
                    context.fillStyle = this.getDrawingColor().dark1;
                    context.fill(this.leftDepthPath);
                };
                ClientGridHexagon.prototype.drawBottomDepth = function (context) {
                    context.strokeStyle = this.getDrawingColor().dark2;
                    context.stroke(this.bottomDepthPath);
                    context.fillStyle = this.getDrawingColor().dark2;
                    context.fill(this.bottomDepthPath);
                };
                ClientGridHexagon.prototype.drawRightDepth = function (context) {
                    context.strokeStyle = this.getDrawingColor().dark3;
                    context.stroke(this.rightDepthPath);
                    context.fillStyle = this.getDrawingColor().dark3;
                    context.fill(this.rightDepthPath);
                };
                ClientGridHexagon.prototype.drawTop = function (context) {
                    context.save();
                    {
                        context.save();
                        {
                            context.clip(this.topPath);
                            context.fillStyle = context.createPattern(AssetManager_1.AssetManager.assets['tile'].image, 'repeat');
                            context.fillRect(-gridHexagonConstants_3.GridHexagonConstants.width / 2, -gridHexagonConstants_3.GridHexagonConstants.height() / 2, gridHexagonConstants_3.GridHexagonConstants.width, gridHexagonConstants_3.GridHexagonConstants.height()); // context.fillRect(x, y, width, height);
                            context.fillStyle = drawingUtilities_1.DrawingUtils.makeTransparent(this.getDrawingColor().color, 0.6);
                            context.fill(this.topPath);
                        }
                        context.restore();
                        context.lineWidth = 3;
                        context.strokeStyle = this.getDrawingColor().darkBorder;
                        context.stroke(this.topPath);
                    }
                    context.restore();
                };
                ClientGridHexagon.prototype.drawIcon = function (context) {
                    if (this.icon) {
                        context.save();
                        context.translate(-this.icon.base.x, -this.icon.base.y);
                        var width = this.icon.size.width;
                        var height = this.icon.size.height;
                        context.drawImage(this.icon.image, 0, 0, width, height);
                        context.restore();
                    }
                };
                ClientGridHexagon.prototype.invalidate = function () {
                    this.drawCache = null;
                };
                ClientGridHexagon.prototype.envelope = function () {
                    var size = { width: 0, height: 0 };
                    size.width = gridHexagonConstants_3.GridHexagonConstants.width;
                    size.height = gridHexagonConstants_3.GridHexagonConstants.height();
                    if (this.icon) {
                        size.height = Math.max(size.height, this.icon.base.y + size.height / 2);
                    }
                    size.height += this.getDepthHeight();
                    size.width += 12;
                    size.height += 6;
                    return size;
                };
                ClientGridHexagon.prototype.hexCenter = function () {
                    var center = { x: 0, y: 0 };
                    center.y = gridHexagonConstants_3.GridHexagonConstants.height() / 2;
                    if (this.icon) {
                        center.y = Math.max(center.y, this.icon.base.y);
                    }
                    center.x = gridHexagonConstants_3.GridHexagonConstants.width / 2;
                    if (this.icon) {
                        center.x = center.x;
                    }
                    center.x += 6;
                    center.y += 6;
                    return center;
                };
                ClientGridHexagon.prototype.draw = function (context) {
                    var center = this.hexCenter();
                    if (this.drawCache) {
                        context.drawImage(this.drawCache, -center.x, -center.y);
                    }
                    else {
                        var c = ClientGridHexagon.getCacheImage(this.getDepthHeight(), this.icon, this.highlightColor || this.hexColor);
                        if (!c) {
                            var can = document.createElement('canvas');
                            var ctx = can.getContext('2d');
                            var size = this.envelope();
                            can.width = size.width;
                            can.height = size.height;
                            ctx.save();
                            ctx.translate(center.x, center.y);
                            if (this.getDepthHeight() > 1) {
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
                            ClientGridHexagon.setCacheImage(this.getDepthHeight(), this.icon, this.highlightColor || this.hexColor, can);
                            /*       ctx.strokeStyle='black';
                             ctx.lineWidth=1;
                             ctx.strokeRect(0,0,can.width,can.height);*/
                            this.drawCache = can;
                        }
                        else {
                            this.drawCache = c;
                        }
                        this.draw(context);
                    }
                };
                ClientGridHexagon.prototype.getNeighbors = function () {
                    var neighbors = [];
                    if ((this.x % 2 === 0)) {
                        neighbors.push({ x: this.x - 1, y: this.z });
                        neighbors.push({ x: this.x, y: this.z - 1 });
                        neighbors.push({ x: this.x + 1, y: this.z });
                        neighbors.push({ x: this.x - 1, y: this.z + 1 });
                        neighbors.push({ x: this.x, y: this.z + 1 });
                        neighbors.push({ x: this.x + 1, y: this.z + 1 });
                    }
                    else {
                        neighbors.push({ x: this.x - 1, y: this.z - 1 });
                        neighbors.push({ x: this.x, y: this.z - 1 });
                        neighbors.push({ x: this.x + 1, y: this.z - 1 });
                        neighbors.push({ x: this.x - 1, y: this.z });
                        neighbors.push({ x: this.x, y: this.z + 1 });
                        neighbors.push({ x: this.x + 1, y: this.z });
                    }
                    return neighbors;
                };
                ClientGridHexagon.getCacheImage = function (height, icon, hexColor) {
                    var c = (icon ? icon.name : '') + "-" + height + "-" + hexColor.color;
                    return ClientGridHexagon.caches[c];
                };
                ClientGridHexagon.setCacheImage = function (height, icon, hexColor, img) {
                    var c = (icon ? icon.name : '') + "-" + height + "-" + hexColor.color;
                    ClientGridHexagon.caches[c] = img;
                };
                ClientGridHexagon.buildPath = function (path) {
                    var p2d = new Path2D();
                    for (var i = 0; i < path.length; i++) {
                        var point = path[i];
                        p2d.lineTo(point.x, point.y);
                    }
                    return p2d;
                };
                ClientGridHexagon.caches = {};
                return ClientGridHexagon;
            }(gridHexagon_1.GridHexagon));
            exports_10("ClientGridHexagon", ClientGridHexagon);
        }
    }
});
System.register("client/hexLibraries/clientHexBoard", ["common/hexLibraries/gridHexagonConstants", "client/utils/drawingUtilities", "common/hexBoard", "client/hexLibraries/clientGridHexagon", "client/clientSpriteManager"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var gridHexagonConstants_4, drawingUtilities_2, hexBoard_1, clientGridHexagon_1, clientSpriteManager_1;
    var ClientHexBoard;
    return {
        setters:[
            function (gridHexagonConstants_4_1) {
                gridHexagonConstants_4 = gridHexagonConstants_4_1;
            },
            function (drawingUtilities_2_1) {
                drawingUtilities_2 = drawingUtilities_2_1;
            },
            function (hexBoard_1_1) {
                hexBoard_1 = hexBoard_1_1;
            },
            function (clientGridHexagon_1_1) {
                clientGridHexagon_1 = clientGridHexagon_1_1;
            },
            function (clientSpriteManager_1_1) {
                clientSpriteManager_1 = clientSpriteManager_1_1;
            }],
        execute: function() {
            ClientHexBoard = (function (_super) {
                __extends(ClientHexBoard, _super);
                function ClientHexBoard() {
                    _super.call(this);
                    this.viewPort = { x: 0, y: 0, width: 400, height: 400, padding: gridHexagonConstants_4.GridHexagonConstants.width * 2 };
                    this.clientSpriteManager = new clientSpriteManager_1.ClientSpriteManager(this);
                }
                ClientHexBoard.prototype.resize = function (width, height) {
                    this.viewPort.width = width;
                    this.viewPort.height = height;
                };
                ClientHexBoard.prototype.setSize = function (width, height) {
                    this.boardSize.width = width;
                    this.boardSize.height = height;
                };
                ClientHexBoard.prototype.offsetView = function (x, y) {
                    this.viewPort.x += x;
                    this.viewPort.y += y;
                    this.constrainViewPort();
                };
                ClientHexBoard.prototype.setView = function (x, y) {
                    this.viewPort.x = x;
                    this.viewPort.y = y;
                    this.constrainViewPort();
                };
                ClientHexBoard.prototype.constrainViewPort = function () {
                    this.viewPort.x = Math.max(this.viewPort.x, 0 - this.viewPort.padding);
                    this.viewPort.y = Math.max(this.viewPort.y, 0 - this.viewPort.padding);
                    var size = this.gameDimensions();
                    this.viewPort.x = Math.min(this.viewPort.x, size.width + this.viewPort.padding - this.viewPort.width);
                    this.viewPort.y = Math.min(this.viewPort.y, size.height + this.viewPort.padding - this.viewPort.height);
                };
                ClientHexBoard.prototype.initialize = function (board) {
                    var str = board.boardStr;
                    this.setSize(board.width, board.height);
                    var baseColor = new drawingUtilities_2.HexagonColor('#AFFFFF');
                    var otherColors = [];
                    for (var i = 0; i < 6; i++) {
                        otherColors[i] = new drawingUtilities_2.HexagonColor(drawingUtilities_2.DrawingUtils.colorLuminance('#AFF000', (i / 6)));
                    }
                    var ys = str.split('|');
                    for (var y = 0; y < board.height; y++) {
                        var yItem = ys[y].split('');
                        for (var x = 0; x < board.width; x++) {
                            var xItem = parseInt(yItem[x]);
                            var gridHexagon = new clientGridHexagon_1.ClientGridHexagon();
                            gridHexagon.x = x;
                            gridHexagon.y = 0;
                            gridHexagon.z = y;
                            gridHexagon.height = xItem == 0 ? 0 : xItem;
                            if (xItem == 0) {
                                gridHexagon.hexColor = baseColor;
                            }
                            else {
                                gridHexagon.hexColor = otherColors[xItem - 1];
                            }
                            gridHexagon.buildPaths();
                            this.addHexagon(gridHexagon);
                        }
                    }
                    this.reorderHexList();
                };
                ClientHexBoard.prototype.getHexAtPoint = function (clickX, clickY) {
                    var lastClick = null;
                    clickX += this.viewPort.x;
                    clickY += this.viewPort.y;
                    for (var i = 0; i < this.hexList.length; i++) {
                        var gridHexagon = this.hexList[i];
                        var x = gridHexagonConstants_4.GridHexagonConstants.width * 3 / 4 * gridHexagon.x;
                        var z = gridHexagon.z * gridHexagonConstants_4.GridHexagonConstants.height() + ((gridHexagon.x % 2 === 1) ? (-gridHexagonConstants_4.GridHexagonConstants.height() / 2) : 0);
                        z -= gridHexagon.getDepthHeight();
                        z += gridHexagon.y * gridHexagonConstants_4.GridHexagonConstants.depthHeight();
                        if (drawingUtilities_2.DrawingUtils.pointInPolygon(clickX - x, clickY - z, gridHexagonConstants_4.GridHexagonConstants.hexagonTopPolygon())) {
                            lastClick = gridHexagon;
                        }
                        if (drawingUtilities_2.DrawingUtils.pointInPolygon(clickX - x, clickY - z, gridHexagonConstants_4.GridHexagonConstants.hexagonDepthLeftPolygon((gridHexagon.height + 1) * gridHexagonConstants_4.GridHexagonConstants.depthHeight()))) {
                            lastClick = gridHexagon;
                        }
                        if (drawingUtilities_2.DrawingUtils.pointInPolygon(clickX - x, clickY - z, gridHexagonConstants_4.GridHexagonConstants.hexagonDepthBottomPolygon((gridHexagon.height + 1) * gridHexagonConstants_4.GridHexagonConstants.depthHeight()))) {
                            lastClick = gridHexagon;
                        }
                        if (drawingUtilities_2.DrawingUtils.pointInPolygon(clickX - x, clickY - z, gridHexagonConstants_4.GridHexagonConstants.hexagonDepthRightPolygon((gridHexagon.height + 1) * gridHexagonConstants_4.GridHexagonConstants.depthHeight()))) {
                            lastClick = gridHexagon;
                        }
                    }
                    return lastClick;
                };
                ClientHexBoard.prototype.drawBoard = function (context) {
                    context.save();
                    context.translate(-this.viewPort.x, -this.viewPort.y);
                    context.lineWidth = 1;
                    for (var i = 0; i < this.hexList.length; i++) {
                        var gridHexagon = this.hexList[i];
                        if (this.shouldDraw(gridHexagon)) {
                            this.drawHexagon(context, gridHexagon);
                            var sprites = this.clientSpriteManager.spritesMap[gridHexagon.x + "-" + gridHexagon.z];
                            if (sprites) {
                                for (var j = 0; j < sprites.length; j++) {
                                    var sprite = sprites[j];
                                    sprite.draw(context);
                                }
                            }
                        }
                    }
                    this.clientSpriteManager.draw(context);
                    context.restore();
                };
                ClientHexBoard.prototype.shouldDraw = function (gridHexagon) {
                    var x = gridHexagon.getRealX();
                    var y = gridHexagon.getRealY();
                    return x > this.viewPort.x - this.viewPort.padding &&
                        x < this.viewPort.x + this.viewPort.width + this.viewPort.padding &&
                        y > this.viewPort.y - this.viewPort.padding &&
                        y < this.viewPort.y + this.viewPort.height + this.viewPort.padding;
                };
                ClientHexBoard.prototype.drawHexagon = function (context, gridHexagon) {
                    var x = gridHexagon.getRealX();
                    var y = gridHexagon.getRealY();
                    context.save();
                    context.translate(x, y);
                    gridHexagon.draw(context);
                    context.restore();
                };
                return ClientHexBoard;
            }(hexBoard_1.HexBoard));
            exports_11("ClientHexBoard", ClientHexBoard);
        }
    }
});
System.register("client/clientSpriteManager", ["common/spriteManager", "client/hexLibraries/AssetManager", "common/hexLibraries/gridHexagonConstants"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var spriteManager_1, assetManager_1, gridHexagonConstants_5;
    var ClientSpriteManager, ClientBaseSprite, ClientSixDirectionSprite, ClientHeliSprite;
    return {
        setters:[
            function (spriteManager_1_1) {
                spriteManager_1 = spriteManager_1_1;
            },
            function (assetManager_1_1) {
                assetManager_1 = assetManager_1_1;
            },
            function (gridHexagonConstants_5_1) {
                gridHexagonConstants_5 = gridHexagonConstants_5_1;
            }],
        execute: function() {
            ClientSpriteManager = (function (_super) {
                __extends(ClientSpriteManager, _super);
                function ClientSpriteManager(clientHexBoard) {
                    _super.call(this);
                    this.clientHexBoard = clientHexBoard;
                }
                ClientSpriteManager.prototype.addSprite = function (sprite) {
                    _super.prototype.addSprite.call(this, sprite);
                    sprite.clientHexBoard = this.clientHexBoard;
                };
                ClientSpriteManager.prototype.draw = function (context) {
                    for (var i = 0; i < this.sprites.length; i++) {
                        var sprite = this.sprites[i];
                        if (sprite.tile == null && sprite.shouldDraw()) {
                            sprite.draw(context);
                        }
                    }
                };
                ClientSpriteManager.prototype.tick = function () {
                    _super.prototype.tick.call(this);
                };
                return ClientSpriteManager;
            }(spriteManager_1.SpriteManager));
            exports_12("ClientSpriteManager", ClientSpriteManager);
            ClientBaseSprite = (function (_super) {
                __extends(ClientBaseSprite, _super);
                function ClientBaseSprite(totalFrames, animationSpeed) {
                    _super.call(this);
                    this.animationFrame = 0;
                    this._drawTickNumber = 0;
                    this.animationSpeed = animationSpeed;
                    this.totalFrames = totalFrames;
                }
                ClientBaseSprite.prototype.draw = function (context) {
                    this._drawTickNumber++;
                    if (this._drawTickNumber % this.animationSpeed === 0) {
                        this.animationFrame = (this.animationFrame + 1) % this.totalFrames;
                    }
                };
                ClientBaseSprite.prototype.shouldDraw = function () {
                    var x = this.x;
                    var y = this.y;
                    var viewPort = this.clientHexBoard.viewPort;
                    return x > viewPort.x - viewPort.padding &&
                        x < viewPort.x + viewPort.width + viewPort.padding &&
                        y > viewPort.y - viewPort.padding &&
                        y < viewPort.y + viewPort.height + viewPort.padding;
                };
                return ClientBaseSprite;
            }(spriteManager_1.Sprite));
            exports_12("ClientBaseSprite", ClientBaseSprite);
            ClientSixDirectionSprite = (function (_super) {
                __extends(ClientSixDirectionSprite, _super);
                function ClientSixDirectionSprite() {
                    _super.apply(this, arguments);
                    this.currentDirection = (Math.random() * 6) | 0;
                }
                ClientSixDirectionSprite.prototype.draw = function (context) {
                    _super.prototype.draw.call(this, context);
                    context.save();
                    context.translate(this.x, this.y);
                    var assetName = this.key + '.' + this.currentDirectionToSpriteName();
                    var asset = assetManager_1.AssetManager.assets[assetName];
                    var image = asset.images[this.animationFrame];
                    context.drawImage(image, -asset.base.x, -asset.base.y - this.hoverY() - gridHexagonConstants_5.GridHexagonConstants.depthHeight() / 2);
                    context.restore();
                };
                ClientSixDirectionSprite.prototype.currentDirectionToSpriteName = function () {
                    switch (this.currentDirection) {
                        case 0:
                            return "TopLeft";
                        case 1:
                            return "Top";
                        case 2:
                            return "TopRight";
                        case 3:
                            return "BottomRight";
                        case 4:
                            return "Bottom";
                        case 5:
                            return "BottomLeft";
                        default:
                            throw "Direction not found";
                    }
                };
                ClientSixDirectionSprite.prototype.hoverY = function () {
                    return (Math.sin(this._drawTickNumber / 10)) * 12 - 6;
                };
                return ClientSixDirectionSprite;
            }(ClientBaseSprite));
            exports_12("ClientSixDirectionSprite", ClientSixDirectionSprite);
            ClientHeliSprite = (function (_super) {
                __extends(ClientHeliSprite, _super);
                function ClientHeliSprite() {
                    _super.call(this, 2, 10);
                }
                return ClientHeliSprite;
            }(ClientSixDirectionSprite));
            exports_12("ClientHeliSprite", ClientHeliSprite);
        }
    }
});
System.register("client/hexLibraries/menuManager", [], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var MenuManager;
    return {
        setters:[],
        execute: function() {
            MenuManager = (function () {
                function MenuManager(canvas) {
                    this.canvas = null;
                    this.context = null;
                    this.items = [];
                    this.selectedItem = null;
                    this.isOpen = false;
                    this.iconSize = 0;
                    this.location = null;
                    this.onClick = null;
                    this.canvas = canvas;
                    this.context = this.canvas.getContext('2d');
                    this.canvas.width = document.body.clientWidth;
                    this.canvas.height = document.body.clientHeight;
                    this.items = [];
                    this.selectedItem = null;
                    this.isOpen = false;
                    this.iconSize = 100;
                }
                MenuManager.prototype.openMenu = function (items, location, onClick) {
                    this.isOpen = true;
                    this.location = location;
                    this.items = items;
                    this.onClick = onClick;
                    this.selectedItem = null;
                };
                MenuManager.prototype.closeMenu = function () {
                    this.canvas.width = this.canvas.width;
                    this.isOpen = false;
                    this.location = null;
                    this.items = null;
                    this.onClick = null;
                    this.selectedItem = null;
                };
                MenuManager.prototype.size = function () {
                    var size = { width: this.iconSize * this.items.length, height: this.iconSize };
                    return size;
                };
                MenuManager.prototype.tap = function (x, y) {
                    if (!this.isOpen)
                        return false;
                    var size = this.size();
                    if (x >= this.location.x && y >= this.location.y &&
                        x <= this.location.x + size.width && y <= this.location.y + size.height) {
                        x -= this.location.x;
                        y -= this.location.y;
                        var ind = (x / this.iconSize) | 0;
                        this.selectedItem = this.items[ind];
                        this.onClick && this.onClick(this.selectedItem);
                        return true;
                    }
                    return false;
                };
                MenuManager.prototype.draw = function () {
                    if (!this.isOpen)
                        return;
                    this.canvas.width = this.canvas.width;
                    this.context.save();
                    this.context.translate(this.location.x, this.location.y);
                    var size = this.size();
                    this.context.lineWidth = 15;
                    this.context.lineJoin = "round";
                    this.context.strokeStyle = 'grey';
                    this.context.strokeRect(0, 0, size.width, size.height);
                    this.context.fillStyle = 'white';
                    this.context.fillRect(0, 0, size.width, size.height);
                    for (var i = 0; i < this.items.length; i++) {
                        var item = this.items[i];
                        if (this.selectedItem == item) {
                            this.context.fillStyle = 'red';
                            this.context.fillRect(i * (this.iconSize), 0, this.iconSize, this.iconSize);
                        }
                    }
                    for (var i = 0; i < this.items.length - 1; i++) {
                        this.context.fillStyle = 'grey';
                        this.context.fillRect(this.iconSize + i * (this.iconSize), 0, 2, this.iconSize);
                    }
                    for (var i = 0; i < this.items.length; i++) {
                        var item = this.items[i];
                        this.context.drawImage(item.image, i * (this.iconSize) + 5, 0 + 5, this.iconSize - 10, this.iconSize - 10);
                    }
                    this.context.restore();
                };
                return MenuManager;
            }());
            exports_13("MenuManager", MenuManager);
        }
    }
});
System.register("client/clientGameManager", ["client/clientSpriteManager", "client/utils/drawingUtilities", "client/hexLibraries/menuManager", "common/hexLibraries/hexUtils", "client/hexLibraries/clientHexBoard"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var clientSpriteManager_2, drawingUtilities_3, menuManager_1, hexUtils_2, clientHexBoard_1;
    var ClientGameManager;
    return {
        setters:[
            function (clientSpriteManager_2_1) {
                clientSpriteManager_2 = clientSpriteManager_2_1;
            },
            function (drawingUtilities_3_1) {
                drawingUtilities_3 = drawingUtilities_3_1;
            },
            function (menuManager_1_1) {
                menuManager_1 = menuManager_1_1;
            },
            function (hexUtils_2_1) {
                hexUtils_2 = hexUtils_2_1;
            },
            function (clientHexBoard_1_1) {
                clientHexBoard_1 = clientHexBoard_1_1;
            }],
        execute: function() {
            ClientGameManager = (function () {
                function ClientGameManager() {
                    var _this = this;
                    this.swipeVelocity = { x: 0, y: 0 };
                    this.tapStart = { x: 0, y: 0 };
                    this.drawIndex = 0;
                    this.fpsMeter = new window.FPSMeter(document.body, {
                        right: '5px',
                        left: 'auto',
                        heat: 1
                    });
                    this.hexBoard = new clientHexBoard_1.ClientHexBoard();
                    this.canvas = document.getElementById("hex");
                    this.context = this.canvas.getContext("2d");
                    var menu = document.getElementById("menu");
                    this.menuManager = new menuManager_1.MenuManager(menu);
                    var overlay = document.getElementById("overlay");
                    var mc = new Hammer.Manager(overlay);
                    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
                    mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
                    mc.add(new Hammer.Tap());
                    overlay.onmousemove = function (ev) {
                        var x = ev.pageX;
                        var y = ev.pageY;
                        // this.tapHex(x, y);
                    };
                    window.onresize = function () {
                        _this.canvas.width = document.body.clientWidth;
                        _this.canvas.height = document.body.clientHeight;
                    };
                    this.canvas.width = document.body.clientWidth;
                    this.canvas.height = document.body.clientHeight;
                    overlay.style.width = '100vw';
                    overlay.style.height = '100vh';
                    this.hexBoard.resize(this.canvas.width, this.canvas.height);
                    mc.on('panstart', function (ev) {
                        if (_this.menuManager.isOpen) {
                            return false;
                        }
                        _this.menuManager.closeMenu();
                        _this.swipeVelocity.x = _this.swipeVelocity.y = 0;
                        _this.tapStart.x = _this.hexBoard.viewPort.x;
                        _this.tapStart.y = _this.hexBoard.viewPort.y;
                        _this.hexBoard.setView(_this.tapStart.x - ev.deltaX, _this.tapStart.y - ev.deltaY);
                    });
                    mc.on('panmove', function (ev) {
                        if (_this.menuManager.isOpen) {
                            return false;
                        }
                        _this.hexBoard.setView(_this.tapStart.x - ev.deltaX, _this.tapStart.y - ev.deltaY);
                    });
                    mc.on('swipe', function (ev) {
                        if (_this.menuManager.isOpen) {
                            return false;
                        }
                        _this.menuManager.closeMenu();
                        _this.swipeVelocity.x = ev.velocityX * 10;
                        _this.swipeVelocity.y = ev.velocityY * 10;
                    });
                    mc.on('tap', function (ev) {
                        var x = ev.center.x;
                        var y = ev.center.y;
                        _this.tapHex(x, y);
                    });
                    this.draw();
                    fetch('http://localhost:9847/game-state', {})
                        .then(function (response) {
                        response.text()
                            .then(function (data) {
                            _this.hexBoard.initialize(JSON.parse(new Compressor().DecompressText(data)));
                        });
                    })
                        .catch(function (err) {
                        console.log('Fetch Error :-S', err);
                    });
                }
                ClientGameManager.prototype.startAction = function (item) {
                    var radius = 5;
                    var spots = this.findAvailableSpots(radius, item);
                    for (var i = 0; i < spots.length; i++) {
                        var spot = spots[i];
                        if (spot == item || spot.unit)
                            continue;
                        var path = this.hexBoard.pathFind(item, spot);
                        if (path.length > 1 && path.length <= radius + 1) {
                            spot.setHighlight(ClientGameManager.moveHighlightColor);
                            spot.setHeightOffset(.25);
                        }
                    }
                };
                ClientGameManager.prototype.findAvailableSpots = function (radius, center) {
                    var items = [];
                    for (var q = 0; q < this.hexBoard.hexList.length; q++) {
                        var item = this.hexBoard.hexList[q];
                        if (hexUtils_2.HexUtils.distance(center, item) <= radius) {
                            items.push(item);
                        }
                    }
                    return items;
                };
                ClientGameManager.prototype.draw = function () {
                    var _this = this;
                    requestAnimationFrame(function () {
                        _this.draw();
                    });
                    this.tick();
                    this.canvas.width = this.canvas.width;
                    this.hexBoard.drawBoard(this.context);
                    this.menuManager.draw();
                    this.fpsMeter.tick();
                };
                ClientGameManager.prototype.tick = function () {
                    if (Math.abs(this.swipeVelocity.x) > 0) {
                        var sign = hexUtils_2.HexUtils.mathSign(this.swipeVelocity.x);
                        this.swipeVelocity.x += 0.7 * -sign;
                        if (hexUtils_2.HexUtils.mathSign(this.swipeVelocity.x) != sign) {
                            this.swipeVelocity.x = 0;
                        }
                    }
                    if (Math.abs(this.swipeVelocity.y) > 0) {
                        var sign = hexUtils_2.HexUtils.mathSign(this.swipeVelocity.y);
                        this.swipeVelocity.y += 0.7 * -sign;
                        if (hexUtils_2.HexUtils.mathSign(this.swipeVelocity.y) != sign) {
                            this.swipeVelocity.y = 0;
                        }
                    }
                    // if (Math.abs(this.swipeVelocity.x) > 0 || Math.abs(this.swipeVelocity.y) > 0)
                    {
                        this.hexBoard.offsetView(this.swipeVelocity.x, this.swipeVelocity.y);
                    }
                    this.hexBoard.clientSpriteManager.tick();
                };
                ClientGameManager.prototype.tapHex = function (x, y) {
                    this.swipeVelocity.x = this.swipeVelocity.y = 0;
                    /* if (this.menuManager.tap(x, y)) {
                     return;
                     }
                     this.menuManager.closeMenu();*/
                    for (var i = 0; i < this.hexBoard.hexList.length; i++) {
                        var h = this.hexBoard.hexList[i];
                        h.setHighlight(null);
                        h.setHeightOffset(0);
                    }
                    var item = this.hexBoard.getHexAtPoint(x, y);
                    if (!item)
                        return;
                    var sprites = this.hexBoard.clientSpriteManager.getSpritesAtTile(item);
                    if (!sprites || sprites.length === 0) {
                        var sprite = new clientSpriteManager_2.ClientHeliSprite();
                        sprite.x = item.getRealX();
                        sprite.y = item.getRealY();
                        sprite.tile = item;
                        sprite.key = 'Heli';
                        this.hexBoard.clientSpriteManager.addSprite(sprite);
                    }
                    item.setHighlight(ClientGameManager.selectedHighlightColor);
                    item.setHeightOffset(.25);
                    this.startAction(item);
                    /*
                     this.menuManager.openMenu([
                     {image: AssetManager.instance.assets['Icon.Move'].image, action: 'Move'},
                     {image: AssetManager.instance.assets['Icon.Attack'].image, action: 'Attack'}
                     ],
                     new Point(x, y),
                     (selectedItem) => {
                     item.setHighlight(ClientGameManager.selectedHighlightColor);
                     this.menuManager.closeMenu();
                     this.startAction(item);
                     currentState = 'highlighting';
                     });
                     */
                };
                ClientGameManager.baseColor = new drawingUtilities_3.HexagonColor('#FFFFFF');
                ClientGameManager.highlightColor = new drawingUtilities_3.HexagonColor('#00F9FF');
                ClientGameManager.selectedHighlightColor = new drawingUtilities_3.HexagonColor('#6B90FF');
                ClientGameManager.moveHighlightColor = new drawingUtilities_3.HexagonColor('#BE9EFF');
                ClientGameManager.attackHighlightColor = new drawingUtilities_3.HexagonColor('#91F9CF');
                return ClientGameManager;
            }());
            exports_14("ClientGameManager", ClientGameManager);
        }
    }
});
/// <reference path="./typings/Compress.d.ts" />
/// <reference path="./node_modules/@types/core-js/index.d.ts" />
/// <reference path="./node_modules/@types/whatwg-fetch/index.d.ts" />
System.register("client/clientMain", ["client/hexLibraries/AssetManager", "client/clientGameManager"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var AssetManager_2, clientGameManager_1;
    var ClientMain;
    return {
        setters:[
            function (AssetManager_2_1) {
                AssetManager_2 = AssetManager_2_1;
            },
            function (clientGameManager_1_1) {
                clientGameManager_1 = clientGameManager_1_1;
            }],
        execute: function() {
            ClientMain = (function () {
                function ClientMain() {
                }
                ClientMain.run = function () {
                    this.loadAssets(function () {
                        new clientGameManager_1.ClientGameManager();
                    });
                };
                ClientMain.loadAssets = function (onComplete) {
                    AssetManager_2.AssetManager.completed = onComplete;
                    var size = { width: 80, height: 80 };
                    var base = { x: 40, y: 55 };
                    AssetManager_2.AssetManager.addAsset('Infantry', 'images/tower_10.png', size, base);
                    AssetManager_2.AssetManager.addAsset('Tank', 'images/tower_40.png', size, base);
                    AssetManager_2.AssetManager.addAsset('Base', 'images/tower_42.png', size, base);
                    AssetManager_2.AssetManager.addAsset('Icon.Move', 'images/icons/move.png', size, base);
                    AssetManager_2.AssetManager.addAsset('Icon.Attack', 'images/icons/attack.png', size, base);
                    AssetManager_2.AssetManager.addAsset('tile', 'images/tile.png', size, base);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.TopLeft', 0, 'images/heli/top_left_1.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.TopLeft', 1, 'images/heli/top_left_2.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.TopRight', 0, 'images/heli/top_right_1.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.TopRight', 1, 'images/heli/top_right_2.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.BottomLeft', 0, 'images/heli/bottom_left_1.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.BottomLeft', 1, 'images/heli/bottom_left_2.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.BottomRight', 0, 'images/heli/bottom_right_1.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.BottomRight', 1, 'images/heli/bottom_right_2.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.Bottom', 0, 'images/heli/down_1.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.Bottom', 1, 'images/heli/down_2.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.Top', 0, 'images/heli/up_1.png', null, null);
                    AssetManager_2.AssetManager.addAssetFrame('Heli.Top', 1, 'images/heli/up_2.png', null, null);
                    AssetManager_2.AssetManager.start();
                };
                return ClientMain;
            }());
            exports_15("ClientMain", ClientMain);
            ClientMain.run();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY2xpZW50L2hleExpYnJhcmllcy9Bc3NldE1hbmFnZXIudHMiLCIuLi8uLi8uLi9jb21tb24vdXRpbHMudHMiLCIuLi8uLi8uLi9jb21tb24vaGV4TGlicmFyaWVzL2dyaWRIZXhhZ29uQ29uc3RhbnRzLnRzIiwiLi4vLi4vLi4vY29tbW9uL2dyaWRIZXhhZ29uLnRzIiwiLi4vLi4vLi4vY29tbW9uL3Nwcml0ZU1hbmFnZXIudHMiLCIuLi8uLi8uLi9jbGllbnQvdXRpbHMvZHJhd2luZ1V0aWxpdGllcy50cyIsIi4uLy4uLy4uL2NvbW1vbi9oZXhMaWJyYXJpZXMvaGV4VXRpbHMudHMiLCIuLi8uLi8uLi9jb21tb24vaGV4Qm9hcmQudHMiLCIuLi8uLi8uLi9jb21tb24vbW9kZWxzL2hleEJvYXJkLnRzIiwiLi4vLi4vLi4vY2xpZW50L2hleExpYnJhcmllcy9jbGllbnRHcmlkSGV4YWdvbi50cyIsIi4uLy4uLy4uL2NsaWVudC9oZXhMaWJyYXJpZXMvY2xpZW50SGV4Qm9hcmQudHMiLCIuLi8uLi8uLi9jbGllbnQvY2xpZW50U3ByaXRlTWFuYWdlci50cyIsIi4uLy4uLy4uL2NsaWVudC9oZXhMaWJyYXJpZXMvbWVudU1hbmFnZXIudHMiLCIuLi8uLi8uLi9jbGllbnQvY2xpZW50R2FtZU1hbmFnZXIudHMiLCIuLi8uLi8uLi9jbGllbnQvY2xpZW50TWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7WUFlQTtnQkFBQTtnQkFzRUEsQ0FBQztnQkE5RFUsa0JBQUssR0FBWjtvQkFBQSxpQkFhQztvQkFaRzt3QkFDSSxFQUFFLENBQUMsQ0FBQyxNQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZDLElBQU0sS0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7NEJBRXhCLEtBQUcsQ0FBQyxNQUFNLEdBQUc7Z0NBQ1QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFHLEVBQUUsTUFBSSxDQUFDLENBQUM7NEJBQ2hDLENBQUMsQ0FBQzs0QkFHRixLQUFHLENBQUMsR0FBRyxHQUFHLE1BQUksQ0FBQyxVQUFVLENBQUMsTUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO3dCQUN4QyxDQUFDOzs7b0JBVkwsR0FBRyxDQUFDLENBQUMsSUFBTSxNQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQzs7cUJBV2xDO2dCQUNMLENBQUM7Z0JBRU0scUJBQVEsR0FBZixVQUFnQixJQUFZLEVBQUUsR0FBVyxFQUFFLElBQW9DLEVBQUUsSUFBMkI7b0JBQ3hHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxVQUFJLEVBQUUsVUFBSSxFQUFFLFFBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7b0JBQzFELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVNLDBCQUFhLEdBQXBCLFVBQXFCLElBQVksRUFBRSxVQUFrQixFQUFFLEdBQVcsRUFBRSxJQUFvQyxFQUFFLElBQTJCO29CQUNqSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFDLFVBQUksRUFBRSxVQUFJLEVBQUUsUUFBRyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO29CQUMvRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFHTyx3QkFBVyxHQUFuQixVQUFvQixHQUFHLEVBQUUsSUFBSTtvQkFBN0IsaUJBbUNDO29CQWxDRyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUV2QyxJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSTt3QkFDL0MsSUFBSSxFQUFFLElBQUk7d0JBQ1YsSUFBSSxFQUFFLElBQUk7d0JBQ1YsSUFBSSxFQUFFLElBQUk7d0JBQ1YsUUFBUSxFQUFFLFVBQVUsQ0FBQyxVQUFVLEtBQUssU0FBUztxQkFDaEQsQ0FBQztvQkFFTixLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDO29CQUN2RSxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLElBQUk7d0JBQ3hCLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO3dCQUN2QixDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztxQkFDM0IsQ0FBQztvQkFFTixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDakIsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQzt3QkFDbEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDO29CQUU5QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO29CQUV0QixDQUFDO29CQUVELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFFekMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7d0JBQy9DLFVBQVUsQ0FBQzs0QkFDSCxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ3JCLENBQUMsRUFDRCxHQUFHLENBQUMsQ0FBQztvQkFFYixDQUFDO2dCQUNMLENBQUM7Z0JBcEVNLHVCQUFVLEdBQStCLEVBQUUsQ0FBQztnQkFDNUMsbUJBQU0sR0FBMkIsRUFBRSxDQUFDO2dCQUNwQyxzQkFBUyxHQUFhLElBQUksQ0FBQztnQkFDM0IsMEJBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLDZCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFpRWhDLG1CQUFDO1lBQUQsQ0FBQyxBQXRFRCxJQXNFQztZQXRFRCx1Q0FzRUMsQ0FBQTs7Ozs7Ozs7Ozs7WUNyRkQ7Z0JBd0JJLGVBQVksQ0FBUyxFQUFFLENBQVM7b0JBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUM7Z0JBdkJELHNCQUFXLG9CQUFDO3lCQUFaO3dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdkIsQ0FBQzt5QkFFRCxVQUFhLEdBQVc7d0JBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsQ0FBQzs7O21CQUpBO2dCQU1ELHNCQUFXLG9CQUFDO3lCQUFaO3dCQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdkIsQ0FBQzt5QkFFRCxVQUFhLEdBQVc7d0JBQ3BCLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsQ0FBQzs7O21CQUpBO2dCQU1hLFlBQU0sR0FBcEIsVUFBcUIsR0FBVTtvQkFDM0IsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO2dCQU9NLHNCQUFNLEdBQWIsVUFBYyxjQUFxQjtvQkFDL0IsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsQ0FBQztnQkFFTSwyQkFBVyxHQUFsQixVQUFtQixjQUFxQjtvQkFDcEMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsQ0FBQztnQkFFTSxzQkFBTSxHQUFiLFVBQWMsQ0FBUyxFQUFFLENBQVM7b0JBQzlCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsQ0FBQztnQkFFTSxtQkFBRyxHQUFWLFVBQVcsQ0FBUyxFQUFFLENBQVM7b0JBQzNCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUM7Z0JBQ0wsWUFBQztZQUFELENBQUMsQUE3Q0QsSUE2Q0M7WUE3Q0QseUJBNkNDLENBQUE7WUFFRDtnQkFRSSxxQkFBWSxDQUFTLEVBQUUsQ0FBUztvQkFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQztnQkFQYSxrQkFBTSxHQUFwQixVQUFxQixHQUFnQjtvQkFDakMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQU9NLDRCQUFNLEdBQWIsVUFBYyxjQUEyQjtvQkFDckMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFFTSxpQ0FBVyxHQUFsQixVQUFtQixjQUEyQjtvQkFDMUMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFFTSw0QkFBTSxHQUFiLFVBQWMsQ0FBUyxFQUFFLENBQVM7b0JBQzlCLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFFTSx5QkFBRyxHQUFWLFVBQVcsQ0FBUyxFQUFFLENBQVM7b0JBQzNCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUM7Z0JBQ0wsa0JBQUM7WUFBRCxDQUFDLEFBN0JELElBNkJDO1lBN0JELHFDQTZCQyxDQUFBO1lBR0Q7Z0JBQTJDLHlDQUFLO2dCQUk1QywrQkFBWSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO29CQUMzRCxrQkFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixDQUFDO2dCQUVNLDBDQUFVLEdBQWpCLFVBQWtCLENBQVE7b0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxDQUFDO2dCQUVhLG9DQUFjLEdBQTVCLFVBQTZCLENBQVksRUFBRSxDQUFRO29CQUMvQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFFYSxtQ0FBYSxHQUEzQixVQUE0QixFQUFhLEVBQUUsRUFBYTtvQkFDcEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEcsQ0FBQztnQkFDTCw0QkFBQztZQUFELENBQUMsQUFyQkQsQ0FBMkMsS0FBSyxHQXFCL0M7WUFyQkQseURBcUJDLENBQUE7WUFFRDtnQkFBK0IsNkJBQUs7Z0JBSWhDLG1CQUFZLENBQWEsRUFBRSxDQUFhLEVBQUUsS0FBaUIsRUFBRSxNQUFrQjtvQkFBbkUsaUJBQWEsR0FBYixLQUFhO29CQUFFLGlCQUFhLEdBQWIsS0FBYTtvQkFBRSxxQkFBaUIsR0FBakIsU0FBaUI7b0JBQUUsc0JBQWtCLEdBQWxCLFVBQWtCO29CQUMzRSxrQkFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN6QixDQUFDO2dCQUNMLGdCQUFDO1lBQUQsQ0FBQyxBQVRELENBQStCLEtBQUssR0FTbkM7WUFURCxpQ0FTQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7WUM3R0Q7Z0JBQUE7Z0JBK0JBLENBQUM7Z0JBN0JVLDJCQUFNLEdBQWI7b0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7Z0JBQzNGLENBQUM7Z0JBQ00sZ0NBQVcsR0FBbEI7b0JBQ0ksTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLG9CQUFvQixDQUFDLGVBQWUsQ0FBQztnQkFDaEYsQ0FBQzs7Z0JBQ00sc0NBQWlCLEdBQXhCO29CQUNJLE1BQU0sQ0FBQyxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGFBQUssQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxhQUFLLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksYUFBSyxDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLGFBQUssQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcGQsQ0FBQzs7Z0JBQ00sNENBQXVCLEdBQTlCLFVBQStCLFdBQVc7b0JBQ3RDLE1BQU0sQ0FBQyxDQUFDLElBQUksYUFBSyxDQUFDLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLGFBQUssQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxhQUFLLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxJQUFJLGFBQUssQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxhQUFLLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9VLENBQUM7O2dCQUNNLDhDQUF5QixHQUFoQyxVQUFpQyxXQUFXO29CQUN4QyxNQUFNLENBQUMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNqRixJQUFJLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDNUUsSUFBSSxhQUFLLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO3dCQUMxRixJQUFJLGFBQUssQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQzt3QkFDM0YsSUFBSSxhQUFLLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZGLENBQUM7O2dCQUVNLDZDQUF3QixHQUEvQixVQUFnQyxXQUFXO29CQUN2QyxNQUFNLENBQUMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksYUFBSyxDQUFDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxhQUFLLENBQUMsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxJQUFJLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLGFBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFXLENBQUM7O2dCQUdNLDBCQUFLLEdBQUcsR0FBRyxDQUFFO2dCQUNiLCtCQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixvQ0FBZSxHQUFHLEVBQUUsQ0FBQztnQkFFaEMsMkJBQUM7WUFBRCxDQUFDLEFBL0JELElBK0JDO1lBL0JELHVEQStCQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7WUM5QkQ7Z0JBQUE7b0JBQ0ksTUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDTixNQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNOLE1BQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sV0FBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxpQkFBWSxHQUFHLENBQUMsQ0FBQztnQkFpQnJCLENBQUM7Z0JBZkcsOEJBQVEsR0FBUjtvQkFDSSxNQUFNLENBQUUsMkNBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsQ0FBQztnQkFFRCw4QkFBUSxHQUFSO29CQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsMkNBQW9CLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQywyQ0FBb0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDakgsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDM0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsMkNBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2pELE1BQU0sQ0FBRSxDQUFDLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxvQ0FBYyxHQUFkO29CQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLDJDQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQy9GLENBQUM7Z0JBRUwsa0JBQUM7WUFBRCxDQUFDLEFBdEJELElBc0JDO1lBdEJELHFDQXNCQyxDQUFBOzs7Ozs7Ozs7OztZQ3hCRDtnQkFBQTtvQkFFSSxZQUFPLEdBQWEsRUFBRSxDQUFDO29CQUN2QixlQUFVLEdBQWtDLEVBQUUsQ0FBQztnQkF1Qm5ELENBQUM7Z0JBckJHLGlDQUFTLEdBQVQsVUFBVSxNQUFjO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDMUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkUsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7d0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO29CQUNuRSxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsNEJBQUksR0FBSjtvQkFDSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzNDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQztnQkFDTCxDQUFDO2dCQUVELHdDQUFnQixHQUFoQixVQUFpQixJQUFpQjtvQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO2dCQUVMLG9CQUFDO1lBQUQsQ0FBQyxBQTFCRCxJQTBCQztZQTFCRCx5Q0EwQkMsQ0FBQTtZQUVEO2dCQUFBO2dCQVVBLENBQUM7Z0JBSFUscUJBQUksR0FBWDtnQkFFQSxDQUFDO2dCQUNMLGFBQUM7WUFBRCxDQUFDLEFBVkQsSUFVQztZQVZELDJCQVVDLENBQUE7Ozs7Ozs7Ozs7O1lDdENEO2dCQU9JLHNCQUFZLEtBQWE7b0JBTnpCLFVBQUssR0FBRyxFQUFFLENBQUM7b0JBQ1gsZUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsVUFBSyxHQUFHLEVBQUUsQ0FBQztvQkFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7b0JBR1AsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFFTCxtQkFBQztZQUFELENBQUMsQUFmRCxJQWVDO1lBZkQsdUNBZUMsQ0FBQTtZQUVEO2dCQUFBO2dCQWtEQSxDQUFDO2dCQWhEVSx1QkFBVSxHQUFqQixVQUFrQixPQUFpQztvQkFDL0MsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDNUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7b0JBQzVCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZixPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyQixDQUFDOztnQkFFTSwyQkFBYyxHQUFyQixVQUFzQixHQUFXLEVBQUUsR0FBVztvQkFDMUMsc0JBQXNCO29CQUN0QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3JELDJDQUEyQztvQkFDM0MsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO29CQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3pCLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzdDLElBQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ2xGLEdBQUcsSUFBSSxDQUFDLE9BQUssRUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekMsQ0FBQztvQkFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUNmLENBQUM7O2dCQUdNLDRCQUFlLEdBQXRCLFVBQXVCLEdBQVcsRUFBRSxRQUFnQjtvQkFDaEQsc0JBQXNCO29CQUN0QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3JELDJDQUEyQztvQkFDM0MsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO29CQUNsQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN6QixJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUU3QyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxHQUFHLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDZixDQUFDOztnQkFFTSwyQkFBYyxHQUFyQixVQUFzQixNQUFjLEVBQUUsTUFBYyxFQUFFLE9BQWdCO29CQUNsRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3JCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2xFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTTs0QkFDL0MsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xILFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQzt3QkFDekIsQ0FBQztvQkFDTCxDQUFDO29CQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ3BCLENBQUM7O2dCQUVMLG1CQUFDO1lBQUQsQ0FBQyxBQWxERCxJQWtEQztZQWxERCx1Q0FrREMsQ0FBQTs7Ozs7Ozs7Ozs7WUNwRUQ7Z0JBUUksY0FBWSxNQUFXLEVBQUUsS0FBYztvQkFQdkMsV0FBTSxHQUFRLElBQUksQ0FBQztvQkFDbkIsTUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDTixNQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNOLFNBQUksR0FBWSxJQUFJLENBQUM7b0JBQ3JCLE1BQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sTUFBQyxHQUFHLENBQUMsQ0FBQztvQkFHRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDckIscURBQXFEO29CQUVyRCx3Q0FBd0M7b0JBQ3hDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztvQkFDbEIsbUNBQW1DO29CQUNuQyw4QkFBOEI7b0JBQzlCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNYLG1DQUFtQztvQkFDbkMsNkJBQTZCO29CQUM3QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDZCxDQUFDO2dCQUVELG9CQUFLLEdBQUw7b0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO2dCQUNMLFdBQUM7WUFBRCxDQUFDLEFBM0JELElBMkJDO1lBM0JELHVCQTJCQyxDQUFBO1lBU0Q7Z0JBQUE7Z0JBc0NBLENBQUM7Z0JBcENVLGlCQUFRLEdBQWYsVUFBZ0IsRUFBRSxFQUFFLEVBQUU7b0JBQ2xCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRWhCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRWhCLElBQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7b0JBQ25CLElBQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELElBQUk7d0JBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztnQkFFTSxnQkFBTyxHQUFkLFVBQWUsSUFBSSxFQUFFLFFBQVE7b0JBQ3pCLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ25DLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7b0JBQy9DLENBQUM7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNWLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNuQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBR00saUJBQVEsR0FBZixVQUFnQixDQUFTO29CQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDekIsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDO2dCQUNMLGVBQUM7WUFBRCxDQUFDLEFBdENELElBc0NDO1lBdENELCtCQXNDQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUN0RUQ7Z0JBQUE7b0JBQ0ksWUFBTyxHQUFrQixFQUFFLENBQUM7b0JBQzVCLGFBQVEsR0FBaUMsRUFBRSxDQUFDO29CQUM1QyxjQUFTLEdBQUcsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztnQkEwRXRDLENBQUM7Z0JBeEVHLGlDQUFjLEdBQWQ7b0JBQ0ksSUFBTSxJQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRywyQ0FBb0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsMkNBQW9CLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7b0JBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBR0QsNkJBQVUsR0FBVixVQUFXLE9BQW9CO29CQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO2dCQUMxRCxDQUFDO2dCQUVELGlDQUFjLEdBQWQ7b0JBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQWhELENBQWdELENBQUMsQ0FBQztnQkFDekcsQ0FBQztnQkFFRCwrQkFBWSxHQUFaLFVBQWEsQ0FBQyxFQUFFLENBQUM7b0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztnQkFFRCwyQkFBUSxHQUFSLFVBQVMsS0FBZSxFQUFFLE1BQWdCO29CQUN0QyxJQUFNLFdBQVcsR0FBRyxJQUFJLGVBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzFDLElBQU0sU0FBUyxHQUFHLElBQUksZUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDekMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNmLElBQUksSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3pCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBTSxNQUFNLEdBQWUsRUFBRSxDQUFDO29CQUM5QixJQUFJLFVBQVUsQ0FBQztvQkFDZixJQUFJLElBQUksQ0FBQztvQkFDVCxJQUFJLElBQUksQ0FBQztvQkFDVCxJQUFJLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzNCLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDMUIsR0FBRyxHQUFHLFFBQVEsQ0FBQzt3QkFDZixHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7NEJBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQ0FDbEIsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2hCLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQ1osQ0FBQzt3QkFDTCxDQUFDO3dCQUNELElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25ELElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDckMsR0FBRyxDQUFDO2dDQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMzQixDQUFDLFFBQ00sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQzNCLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDM0IsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNyQixDQUFDO3dCQUNELElBQUksQ0FBQyxDQUFDOzRCQUNGLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUN0QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQ0FDNUMsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDOUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQUMsUUFBUSxDQUFDO2dDQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNuRSxRQUFRLENBQUM7Z0NBQ2IsSUFBSSxHQUFHLElBQUksZUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN2QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQ0FDeEgsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLG1CQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztvQ0FDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztnQ0FDL0IsQ0FBQzs0QkFDTCxDQUFDOzRCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RCLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQUVMLGVBQUM7WUFBRCxDQUFDLEFBN0VELElBNkVDO1lBN0VELCtCQTZFQyxDQUFBOzs7Ozs7Ozs7OztZQ2pGRDtnQkFBQTtnQkFJQSxDQUFDO2dCQUFELG9CQUFDO1lBQUQsQ0FBQyxBQUpELElBSUM7WUFKRCx5Q0FJQyxDQUFBOzs7O0FDSkQsNkNBQTZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPN0M7Z0JBQXVDLHFDQUFXO2dCQUFsRDtvQkFBdUMsOEJBQVc7b0JBRTlDLFNBQUksR0FBVSxJQUFJLENBQUM7b0JBRW5CLG1CQUFjLEdBQWlCLElBQUksQ0FBQztvQkFDcEMsYUFBUSxHQUFpQixJQUFJLENBQUM7b0JBQzlCLFlBQU8sR0FBVyxJQUFJLENBQUM7b0JBQ3ZCLGtCQUFhLEdBQVcsSUFBSSxDQUFDO29CQUM3QixvQkFBZSxHQUFXLElBQUksQ0FBQztvQkFDL0IsbUJBQWMsR0FBVyxJQUFJLENBQUM7b0JBQzlCLGNBQVMsR0FBc0IsSUFBSSxDQUFDO2dCQTZPeEMsQ0FBQztnQkEzT0csbUNBQU8sR0FBUCxVQUFRLElBQVk7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1AsSUFBSSxDQUFDLElBQUksR0FBRywyQkFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDckIsQ0FBQztvQkFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsb0NBQVEsR0FBUixVQUFTLFFBQXNCO29CQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUN6QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3RCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCx3Q0FBWSxHQUFaLFVBQWEsUUFBc0I7b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7d0JBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdEIsQ0FBQztnQkFDTCxDQUFDO2dCQUVELDJDQUFlLEdBQWYsVUFBZ0IsWUFBb0I7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDdEIsQ0FBQztnQkFDTCxDQUFDO2dCQUVELHNDQUFVLEdBQVY7b0JBQ0ksSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLFNBQVMsQ0FBQywyQ0FBb0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQ3JGLElBQUksQ0FBQyxhQUFhLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLDJDQUFvQixDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQzVHLElBQUksQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLDJDQUFvQixDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hILElBQUksQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxDQUFDLDJDQUFvQixDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xILENBQUM7Z0JBRUQsMkNBQWUsR0FBZjtvQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNoRCxDQUFDO2dCQUVELHlDQUFhLEdBQWIsVUFBYyxPQUFpQztvQkFDM0MsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDO29CQUNuRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDbkMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDO29CQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDckMsQ0FBQztnQkFFRCwyQ0FBZSxHQUFmLFVBQWdCLE9BQWlDO29CQUM3QyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0JBQ25ELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUNyQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0JBQ2pELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQUVELDBDQUFjLEdBQWQsVUFBZSxPQUFpQztvQkFDNUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDO29CQUNuRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDcEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDO29CQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztnQkFFRCxtQ0FBTyxHQUFQLFVBQVEsT0FBaUM7b0JBRXJDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFFZixDQUFDO3dCQUNHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDZixDQUFDOzRCQUNHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUUzQixPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsMkJBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUN2RixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsMkNBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLDJDQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSwyQ0FBb0IsQ0FBQyxLQUFLLEVBQUUsMkNBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLHlDQUF5Qzs0QkFFM0wsT0FBTyxDQUFDLFNBQVMsR0FBRywrQkFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzRCQUNwRixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDL0IsQ0FBQzt3QkFDRCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2xCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO3dCQUV0QixPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxVQUFVLENBQUM7d0JBQ3hELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUVqQyxDQUFDO29CQUNELE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxvQ0FBUSxHQUFSLFVBQVMsT0FBTztvQkFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDWixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ2pDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFDbkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDeEQsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN0QixDQUFDO2dCQUNMLENBQUM7Z0JBRUQsc0NBQVUsR0FBVjtvQkFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDMUIsQ0FBQztnQkFFRCxvQ0FBUSxHQUFSO29CQUNJLElBQU0sSUFBSSxHQUFHLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsMkNBQW9CLENBQUMsS0FBSyxDQUFDO29CQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLDJDQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUU1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDNUUsQ0FBQztvQkFFRCxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFHckMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO29CQUVqQixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELHFDQUFTLEdBQVQ7b0JBQ0ksSUFBTSxNQUFNLEdBQUcsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztvQkFFNUIsTUFBTSxDQUFDLENBQUMsR0FBRywyQ0FBb0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNaLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxDQUFDO29CQUVELE1BQU0sQ0FBQyxDQUFDLEdBQUcsMkNBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ1osTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN4QixDQUFDO29CQUdELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNkLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNkLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRUQsZ0NBQUksR0FBSixVQUFLLE9BQWlDO29CQUVsQyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLElBQU0sQ0FBQyxHQUFHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDbEgsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNMLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzdDLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBRWpDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDN0IsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUN2QixHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7NEJBQ3pCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFHWCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDN0IsQ0FBQzs0QkFFRCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ1gsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7NEJBQ2xCLHdCQUF3Qjs0QkFDeEIseUJBQXlCOzRCQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNsQixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBR2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDbkIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUVkLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQzdHOzt3RUFFNEM7NEJBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO3dCQUV6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO3dCQUN2QixDQUFDO3dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCx3Q0FBWSxHQUFaO29CQUVJLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztvQkFFckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO3dCQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQzt3QkFDM0MsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7d0JBRTNDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQzt3QkFDL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7d0JBQzNDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztvQkFDbkQsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7d0JBQy9DLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO3dCQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7d0JBRS9DLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO3dCQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVB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