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
                function AssetManager(completed) {
                    this.assetQueue = {};
                    this.assets = {};
                    this.completed = null;
                    this.$assetsLoaded = 0;
                    this.$assetsRequested = 0;
                    this.completed = completed;
                }
                AssetManager.prototype.start = function () {
                    for (var name_1 in this.assetQueue) {
                        if (this.assetQueue.hasOwnProperty(name_1)) {
                            var img = new Image();
                            img.onload = ((function (that, img, name) { return function () {
                                that.$imageLoaded(img, name);
                            }; }))(this, img, name_1);
                            img.src = this.assetQueue[name_1].url;
                        }
                    }
                };
                AssetManager.prototype.addAsset = function (name, url, size, base) {
                    this.assetQueue[name] = { base: base, size: size, url: url };
                    this.$assetsRequested++;
                };
                AssetManager.prototype.$imageLoaded = function (img, name) {
                    var _this = this;
                    this.assets[name] = {
                        image: img,
                        size: null,
                        base: null,
                        name: name
                    };
                    this.assets[name].size = this.assetQueue[name].size || { width: img.width, height: img.height };
                    this.assets[name].base = this.assetQueue[name].base || {
                        x: this.assets[name].size.width / 2,
                        y: this.assets[name].size.height / 2
                    };
                    this.$assetsLoaded++;
                    if (this.$assetsLoaded === this.$assetsRequested) {
                        setTimeout(function () {
                            _this.completed();
                        }, 100);
                    }
                };
                return AssetManager;
            }());
            exports_1("AssetManager", AssetManager);
        }
    }
});
System.register("common/hexLibraries/HexUtils", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Node, distance, orderBy;
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
            exports_2("Node", Node);
            exports_2("distance", distance = function (p1, p2) {
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
            });
            exports_2("orderBy", orderBy = function (list, callback) {
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
            });
        }
    }
});
System.register("common/utils", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
                Point.prototype.Offset = function (windowLocation) {
                    return new Point(this.x + windowLocation.x, this.y + windowLocation.y);
                };
                Point.prototype.NegatePoint = function (windowLocation) {
                    return new Point(this.x - windowLocation.x, this.y - windowLocation.y);
                };
                Point.prototype.Negate = function (x, y) {
                    return new Point(this.x - (x | 0), this.y - (y | 0));
                };
                Point.prototype.Set = function (x, y) {
                    this.x = x;
                    this.y = y;
                };
                return Point;
            }());
            exports_3("Point", Point);
            DoublePoint = (function () {
                function DoublePoint(x, y) {
                    this.x = x;
                    this.y = y;
                }
                DoublePoint.create = function (pos) {
                    return new DoublePoint(pos.x, pos.y);
                };
                DoublePoint.prototype.Offset = function (windowLocation) {
                    return new DoublePoint(this.x + windowLocation.x, this.y + windowLocation.y);
                };
                DoublePoint.prototype.NegatePoint = function (windowLocation) {
                    return new DoublePoint(this.x - windowLocation.x, this.y - windowLocation.y);
                };
                DoublePoint.prototype.Negate = function (x, y) {
                    return new DoublePoint(this.x - (x | 0), this.y - (y | 0));
                };
                DoublePoint.prototype.et = function (x, y) {
                    this.x = x;
                    this.y = y;
                };
                return DoublePoint;
            }());
            exports_3("DoublePoint", DoublePoint);
            IntersectingRectangle = (function (_super) {
                __extends(IntersectingRectangle, _super);
                function IntersectingRectangle(x, y, width, height) {
                    _super.call(this, x, y);
                    this.Width = width;
                    this.Height = height;
                }
                IntersectingRectangle.prototype.Intersects = function (p) {
                    return this.x < p.x && this.x + this.Width > p.x && this.y < p.y && this.y + this.Height > p.y;
                };
                IntersectingRectangle.IntersectsRect = function (r, p) {
                    return r.x < p.x && r.x + r.Width > p.x && r.y < p.y && r.y + r.Height > p.y;
                };
                IntersectingRectangle.IntersectRect = function (r1, r2) {
                    return !(r2.x > r1.x + r1.Width || r2.x + 0 < r1.x || r2.y > r1.y + r1.Height || r2.y + 0 < r1.y);
                };
                return IntersectingRectangle;
            }(Point));
            exports_3("IntersectingRectangle", IntersectingRectangle);
            Rectangle = (function (_super) {
                __extends(Rectangle, _super);
                function Rectangle(x, y, width, height) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    if (width === void 0) { width = 0; }
                    if (height === void 0) { height = 0; }
                    _super.call(this, x, y);
                    this.Width = width;
                    this.Height = height;
                }
                return Rectangle;
            }(Point));
            exports_3("Rectangle", Rectangle);
        }
    }
});
System.register("client/hexLibraries/gridHexagonConstants", ["common/utils"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
                GridHexagonConstants.width = 80;
                GridHexagonConstants.heightSkew = .7;
                GridHexagonConstants.depthHeightSkew = .3;
                return GridHexagonConstants;
            }());
            exports_4("GridHexagonConstants", GridHexagonConstants);
        }
    }
});
System.register("client/utils/drawingUtilities", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var HexagonColor, DrawingUtilities;
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
                    this.darkBorder = DrawingUtilities.colorLuminance(color, -0.45);
                    this.dark1 = DrawingUtilities.colorLuminance(color, -0.4);
                    this.dark2 = DrawingUtilities.colorLuminance(color, -0.55);
                    this.dark3 = DrawingUtilities.colorLuminance(color, -0.65);
                }
                return HexagonColor;
            }());
            exports_5("HexagonColor", HexagonColor);
            DrawingUtilities = (function () {
                function DrawingUtilities() {
                }
                DrawingUtilities.drawCircle = function (context) {
                    context.beginPath();
                    context.arc(0, 0, 5, 0, 2 * Math.PI, false);
                    context.fillStyle = 'black';
                    context.fill();
                    context.lineWidth = 5;
                    context.stroke();
                };
                ;
                DrawingUtilities.colorLuminance = function (hex, lum) {
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
                DrawingUtilities.pointInPolygon = function (pointX, pointY, polygon) {
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
                return DrawingUtilities;
            }());
            exports_5("DrawingUtilities", DrawingUtilities);
        }
    }
});
///<reference path="../typings/path2d.d.ts"/>
System.register("client/hexLibraries/GridHexagon", ["client/hexLibraries/gridHexagonConstants", "client/hexLibraries/AssetManager"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var gridHexagonConstants_1, AssetManager_1;
    var GridHexagon;
    return {
        setters:[
            function (gridHexagonConstants_1_1) {
                gridHexagonConstants_1 = gridHexagonConstants_1_1;
            },
            function (AssetManager_1_1) {
                AssetManager_1 = AssetManager_1_1;
            }],
        execute: function() {
            GridHexagon = (function () {
                function GridHexagon() {
                    this.x = 0;
                    this.y = 0;
                    this.z = 0;
                    this.height = 0;
                    this.icon = null;
                    this.highlightColor = null;
                    this.hexColor = null;
                    this.topPath = null;
                    this.leftDepthPath = null;
                    this.bottomDepthPath = null;
                    this.rightDepthPath = null;
                    this.drawCache = null;
                }
                GridHexagon.prototype.getDepthHeight = function () {
                    return Math.max(1, (this.height) * gridHexagonConstants_1.GridHexagonConstants.depthHeight());
                };
                GridHexagon.prototype.setIcon = function (name) {
                    if (name) {
                        this.icon = AssetManager_1.AssetManager.instance.assets[name];
                    }
                    else {
                        this.icon = null;
                    }
                    this.invalidate();
                };
                GridHexagon.prototype.setColor = function (hexColor) {
                    if (this.hexColor != hexColor) {
                        this.hexColor = hexColor;
                        this.invalidate();
                    }
                };
                GridHexagon.prototype.setHighlight = function (hexColor) {
                    if (this.highlightColor != hexColor) {
                        this.highlightColor = hexColor;
                        this.invalidate();
                    }
                };
                GridHexagon.prototype.buildPaths = function () {
                    var depthHeight = this.getDepthHeight();
                    this.topPath = GridHexagon.buildPath(gridHexagonConstants_1.GridHexagonConstants.hexagonTopPolygon());
                    this.leftDepthPath = GridHexagon.buildPath(gridHexagonConstants_1.GridHexagonConstants.hexagonDepthLeftPolygon(depthHeight));
                    this.bottomDepthPath = GridHexagon.buildPath(gridHexagonConstants_1.GridHexagonConstants.hexagonDepthBottomPolygon(depthHeight));
                    this.rightDepthPath = GridHexagon.buildPath(gridHexagonConstants_1.GridHexagonConstants.hexagonDepthRightPolygon(depthHeight));
                };
                GridHexagon.prototype.getDrawingColor = function () {
                    return this.highlightColor || this.hexColor;
                };
                GridHexagon.prototype.drawLeftDepth = function (context) {
                    context.strokeStyle = this.getDrawingColor().dark1;
                    context.stroke(this.leftDepthPath);
                    context.fillStyle = this.getDrawingColor().dark1;
                    context.fill(this.leftDepthPath);
                };
                GridHexagon.prototype.drawBottomDepth = function (context) {
                    context.strokeStyle = this.getDrawingColor().dark2;
                    context.stroke(this.bottomDepthPath);
                    context.fillStyle = this.getDrawingColor().dark2;
                    context.fill(this.bottomDepthPath);
                };
                GridHexagon.prototype.drawRightDepth = function (context) {
                    context.strokeStyle = this.getDrawingColor().dark3;
                    context.stroke(this.rightDepthPath);
                    context.fillStyle = this.getDrawingColor().dark3;
                    context.fill(this.rightDepthPath);
                };
                GridHexagon.prototype.drawTop = function (context) {
                    /*
                     if ((this.y + this.height) != 1)
                     context.strokeStyle = this.getDrawingColor().darkBorder;
                     else
                     context.strokeStyle = this.getDrawingColor().color;
                     */
                    if (this.highlightColor || this.icon) {
                        context.strokeStyle = this.getDrawingColor().darkBorder;
                        context.stroke(this.topPath);
                    }
                    else {
                        context.strokeStyle = this.getDrawingColor().darkBorder;
                        context.stroke(this.topPath);
                    }
                    context.fillStyle = this.getDrawingColor().color;
                    context.fill(this.topPath);
                };
                GridHexagon.prototype.drawIcon = function (context) {
                    if (this.icon) {
                        context.save();
                        context.translate(-this.icon.base.x, -this.icon.base.y);
                        var width = this.icon.size.width;
                        var height = this.icon.size.height;
                        context.drawImage(this.icon.image, 0, 0, width, height);
                        context.restore();
                    }
                };
                GridHexagon.prototype.invalidate = function () {
                    this.drawCache = null;
                };
                GridHexagon.prototype.envelope = function () {
                    var size = { width: 0, height: 0 };
                    size.width = gridHexagonConstants_1.GridHexagonConstants.width;
                    size.height = gridHexagonConstants_1.GridHexagonConstants.height();
                    if (this.icon) {
                        size.height = Math.max(size.height, this.icon.base.y + size.height / 2);
                    }
                    size.height += this.getDepthHeight();
                    size.width += 12;
                    size.height += 6;
                    return size;
                };
                GridHexagon.prototype.hexCenter = function () {
                    var center = { x: 0, y: 0 };
                    center.y = gridHexagonConstants_1.GridHexagonConstants.height() / 2;
                    if (this.icon) {
                        center.y = Math.max(center.y, this.icon.base.y);
                    }
                    center.x = gridHexagonConstants_1.GridHexagonConstants.width / 2;
                    if (this.icon) {
                        center.x = center.x;
                    }
                    center.x += 6;
                    center.y += 6;
                    return center;
                };
                GridHexagon.prototype.draw = function (context) {
                    var center = this.hexCenter();
                    if (this.drawCache) {
                        context.drawImage(this.drawCache, -center.x, -center.y);
                    }
                    else {
                        var c = GridHexagon.getCacheImage(this.height, this.icon, this.highlightColor || this.hexColor);
                        if (!c) {
                            var can = document.createElement('canvas');
                            var ctx = can.getContext('2d');
                            var size = this.envelope();
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
                            GridHexagon.setCacheImage(this.height, this.icon, this.hexColor, can);
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
                GridHexagon.prototype.getNeighbors = function () {
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
                GridHexagon.getCacheImage = function (height, icon, hexColor) {
                    var c = (icon ? icon.name : '') + "-" + height + "-" + hexColor.color;
                    return GridHexagon.caches[c];
                };
                GridHexagon.setCacheImage = function (height, icon, hexColor, img) {
                    var c = (icon ? icon.name : '') + "-" + height + "-" + hexColor.color;
                    GridHexagon.caches[c] = img;
                };
                GridHexagon.buildPath = function (path) {
                    var p2d = new Path2D();
                    for (var i = 0; i < path.length; i++) {
                        var point = path[i];
                        p2d.lineTo(point.x, point.y);
                    }
                    return p2d;
                };
                GridHexagon.caches = {};
                return GridHexagon;
            }());
            exports_6("GridHexagon", GridHexagon);
        }
    }
});
System.register("common/models/hexBoard", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var HexBoardModel;
    return {
        setters:[],
        execute: function() {
            HexBoardModel = (function () {
                function HexBoardModel() {
                }
                return HexBoardModel;
            }());
            exports_7("HexBoardModel", HexBoardModel);
        }
    }
});
System.register("client/hexLibraries/HexBoard", ["client/hexLibraries/gridHexagonConstants", "common/hexLibraries/HexUtils", "client/hexLibraries/GridHexagon", "client/utils/drawingUtilities"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var gridHexagonConstants_2, HexUtils_1, GridHexagon_1, drawingUtilities_1;
    var HexBoard;
    return {
        setters:[
            function (gridHexagonConstants_2_1) {
                gridHexagonConstants_2 = gridHexagonConstants_2_1;
            },
            function (HexUtils_1_1) {
                HexUtils_1 = HexUtils_1_1;
            },
            function (GridHexagon_1_1) {
                GridHexagon_1 = GridHexagon_1_1;
            },
            function (drawingUtilities_1_1) {
                drawingUtilities_1 = drawingUtilities_1_1;
            }],
        execute: function() {
            HexBoard = (function () {
                function HexBoard() {
                    this.hexList = [];
                    this.hexBlock = {};
                    this.boardSize = { width: 0, height: 0 };
                    this.viewPort = { x: 0, y: 0, width: 400, height: 400, padding: gridHexagonConstants_2.GridHexagonConstants.width * 2 };
                }
                HexBoard.prototype.xyToHexIndex = function (x, y) {
                    return this.hexBlock[x + y * 5000];
                };
                HexBoard.prototype.resize = function (width, height) {
                    this.viewPort.width = width;
                    this.viewPort.height = height;
                };
                HexBoard.prototype.setSize = function (width, height) {
                    this.boardSize.width = width;
                    this.boardSize.height = height;
                };
                HexBoard.prototype.offsetView = function (x, y) {
                    this.viewPort.x += x;
                    this.viewPort.y += y;
                    this.constrainViewPort();
                };
                HexBoard.prototype.setView = function (x, y) {
                    this.viewPort.x = x;
                    this.viewPort.y = y;
                };
                HexBoard.prototype.constrainViewPort = function () {
                    this.viewPort.x = Math.max(this.viewPort.x, 0 - this.viewPort.padding);
                    this.viewPort.y = Math.max(this.viewPort.y, 0 - this.viewPort.padding);
                    var size = this.gameDimensions();
                    this.viewPort.x = Math.min(this.viewPort.x, size.width + this.viewPort.padding - this.viewPort.width);
                    this.viewPort.y = Math.min(this.viewPort.y, size.height + this.viewPort.padding - this.viewPort.height);
                };
                HexBoard.prototype.initialize = function (board) {
                    var str = board.boardStr;
                    this.setSize(board.width, board.height);
                    var baseColor = new drawingUtilities_1.HexagonColor('#AFFFFF');
                    var otherColors = [];
                    for (var i = 0; i < 15; i++) {
                        otherColors[i] = new drawingUtilities_1.HexagonColor(drawingUtilities_1.DrawingUtilities.colorLuminance('#AFF000', (i / 15)));
                    }
                    var ys = str.split('|');
                    for (var y = 0; y < ys.length; y++) {
                        var yItem = ys[y].split('');
                        for (var x = 0; x < yItem.length; x += 2) {
                            var xItem = parseInt(yItem[x]);
                            // if (xItem == 0) continue;
                            var gridHexagon = new GridHexagon_1.GridHexagon();
                            gridHexagon.x = x / 2;
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
                HexBoard.prototype.gameDimensions = function () {
                    var size = { width: 0, height: 0 };
                    size.width = gridHexagonConstants_2.GridHexagonConstants.width * 3 / 4 * this.boardSize.width;
                    size.height = gridHexagonConstants_2.GridHexagonConstants.height() * this.boardSize.height;
                    return size;
                };
                HexBoard.prototype.getHexAtPoint = function (clickX, clickY) {
                    var lastClick = null;
                    clickX += this.viewPort.x;
                    clickY += this.viewPort.y;
                    for (var i = 0; i < this.hexList.length; i++) {
                        var gridHexagon = this.hexList[i];
                        var x = gridHexagonConstants_2.GridHexagonConstants.width * 3 / 4 * gridHexagon.x;
                        var z = gridHexagon.z * gridHexagonConstants_2.GridHexagonConstants.height() + ((gridHexagon.x % 2 === 1) ? (-gridHexagonConstants_2.GridHexagonConstants.height() / 2) : 0);
                        z -= gridHexagon.height * gridHexagonConstants_2.GridHexagonConstants.depthHeight();
                        z += gridHexagon.y * gridHexagonConstants_2.GridHexagonConstants.depthHeight();
                        if (drawingUtilities_1.DrawingUtilities.pointInPolygon(clickX - x, clickY - z, gridHexagonConstants_2.GridHexagonConstants.hexagonTopPolygon())) {
                            lastClick = gridHexagon;
                        }
                        if (drawingUtilities_1.DrawingUtilities.pointInPolygon(clickX - x, clickY - z, gridHexagonConstants_2.GridHexagonConstants.hexagonDepthLeftPolygon((gridHexagon.height + 1) * gridHexagonConstants_2.GridHexagonConstants.depthHeight()))) {
                            lastClick = gridHexagon;
                        }
                        if (drawingUtilities_1.DrawingUtilities.pointInPolygon(clickX - x, clickY - z, gridHexagonConstants_2.GridHexagonConstants.hexagonDepthBottomPolygon((gridHexagon.height + 1) * gridHexagonConstants_2.GridHexagonConstants.depthHeight()))) {
                            lastClick = gridHexagon;
                        }
                        if (drawingUtilities_1.DrawingUtilities.pointInPolygon(clickX - x, clickY - z, gridHexagonConstants_2.GridHexagonConstants.hexagonDepthRightPolygon((gridHexagon.height + 1) * gridHexagonConstants_2.GridHexagonConstants.depthHeight()))) {
                            lastClick = gridHexagon;
                        }
                    }
                    return lastClick;
                };
                HexBoard.prototype.addHexagon = function (hexagon) {
                    this.hexList.push(hexagon);
                    this.hexBlock[hexagon.x + hexagon.z * 5000] = hexagon;
                };
                HexBoard.prototype.reorderHexList = function () {
                    this.hexList = HexUtils_1.orderBy(this.hexList, function (m) { return (m.z - m.y) * 1000 + (m.x % 2) * -200 + m.height; });
                };
                HexBoard.prototype.drawBoard = function (context) {
                    context.save();
                    context.translate(-this.viewPort.x, -this.viewPort.y);
                    context.lineWidth = 1;
                    for (var i = 0; i < this.hexList.length; i++) {
                        var gridHexagon = this.hexList[i];
                        this.drawHexagon(context, gridHexagon);
                    }
                    context.restore();
                };
                HexBoard.prototype.drawHexagon = function (context, gridHexagon) {
                    var x = gridHexagonConstants_2.GridHexagonConstants.width * 3 / 4 * gridHexagon.x;
                    var z = gridHexagon.z * gridHexagonConstants_2.GridHexagonConstants.height() + ((gridHexagon.x % 2 === 1) ? (-gridHexagonConstants_2.GridHexagonConstants.height() / 2) : 0);
                    z -= gridHexagon.height * gridHexagonConstants_2.GridHexagonConstants.depthHeight();
                    z += gridHexagon.y * gridHexagonConstants_2.GridHexagonConstants.depthHeight();
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
                };
                HexBoard.prototype.pathFind = function (start, finish) {
                    var mypathStart = new HexUtils_1.Node(null, start);
                    var mypathEnd = new HexUtils_1.Node(null, finish);
                    var aStar = [];
                    var open = [mypathStart];
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
                        if (node.x === mypathEnd.x && node.y === mypathEnd.y) {
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
                                path = new HexUtils_1.Node(node, n);
                                if (!aStar[path.value()]) {
                                    path.g = node.g + HexUtils_1.distance(n, node.item) + (Math.abs((node.item.y + node.item.height) - (n.y + n.height)) * 2);
                                    path.f = path.g + HexUtils_1.distance(n, finish);
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
System.register("client/hexLibraries/MenuManager", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
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
            exports_9("MenuManager", MenuManager);
        }
    }
});
/// <reference path="./typings/Compress.d.ts" />
/// <reference path="./node_modules/@types/core-js/index.d.ts" />
/// <reference path="./node_modules/@types/whatwg-fetch/index.d.ts" />
System.register("client/clientMain", ["client/hexLibraries/AssetManager", "common/hexLibraries/HexUtils", "client/hexLibraries/HexBoard", "client/hexLibraries/MenuManager", "client/utils/drawingUtilities"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var AssetManager_2, HexUtils_2, HexBoard_1, MenuManager_1, drawingUtilities_2;
    var ClientMain;
    function startApp() {
        var baseColor = new drawingUtilities_2.HexagonColor('#FFFFFF');
        var highlightColor = new drawingUtilities_2.HexagonColor('#51F9FF');
        var selectedHighlightColor = new drawingUtilities_2.HexagonColor('#51F900');
        var moveHighlightColor = new drawingUtilities_2.HexagonColor('#99F920');
        var attackHighlightColor = new drawingUtilities_2.HexagonColor('#91F9CF');
        var possiblePoints = [];
        var hexBoard = new HexBoard_1.HexBoard();
        var canvas = document.getElementById("hex");
        var menu = document.getElementById("menu");
        var menuManager = new MenuManager_1.MenuManager(menu);
        var overlay = document.getElementById("overlay");
        var mc = new Hammer.Manager(overlay);
        mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
        mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Tap());
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        hexBoard.resize(canvas.width, canvas.height);
        var swipeVelocity = { x: 0, y: 0 };
        var tapStart = { x: 0, y: 0 };
        mc.on('panstart', function (ev) {
            if (menuManager.isOpen) {
                return false;
            }
            menuManager.closeMenu();
            swipeVelocity.x = swipeVelocity.y = 0;
            tapStart.x = hexBoard.viewPort.x;
            tapStart.y = hexBoard.viewPort.y;
            hexBoard.setView(tapStart.x - ev.deltaX, tapStart.y - ev.deltaY);
        });
        mc.on('panmove', function (ev) {
            if (menuManager.isOpen) {
                return false;
            }
            hexBoard.setView(tapStart.x - ev.deltaX, tapStart.y - ev.deltaY);
        });
        mc.on('swipe', function (ev) {
            if (menuManager.isOpen) {
                return false;
            }
            menuManager.closeMenu();
            swipeVelocity.x = ev.velocityX * 10;
            swipeVelocity.y = ev.velocityY * 10;
        });
        var selectedItem;
        var currentState = 'none';
        mc.on('tap', function (ev) {
            var x = ev.center.x;
            var y = ev.center.y;
            swipeVelocity.x = swipeVelocity.y = 0;
            if (menuManager.tap(x, y)) {
                return;
            }
            menuManager.closeMenu();
            for (var i = 0; i < hexBoard.hexList.length; i++) {
                var h = hexBoard.hexList[i];
                h.setHighlight(null);
            }
            var item = hexBoard.getHexAtPoint(x, y);
            if (!item)
                return;
            if (currentState == 'highlighting') {
                for (var p = 0; p < possiblePoints.length; p++) {
                    var pItem = possiblePoints[p];
                    if (pItem == item) {
                        item.setUnit(selectedItem.unit);
                        item.setColor(selectedItem.hexColor);
                        selectedItem.setUnit(null);
                        break;
                    }
                }
                currentState = 'none';
                return;
            }
            selectedItem = null;
            currentState = 'none';
            if (item.unit) {
                currentState = 'highlighted';
                item.setHighlight(highlightColor);
                selectedItem = item;
                menuManager.openMenu([
                    { image: AssetManager_2.AssetManager.instance.assets['Icon.Move'].image, action: 'Move' },
                    { image: AssetManager_2.AssetManager.instance.assets['Icon.Attack'].image, action: 'Attack' }
                ], { x: x, y: y }, function (selectedItem) {
                    item.setHighlight(selectedHighlightColor);
                    menuManager.closeMenu();
                    startAction(item, selectedItem.action);
                    currentState = 'highlighting';
                });
            }
        });
        function startAction(item, action) {
            possiblePoints = [];
            switch (item.unit) {
                case 'Infantry':
                    switch (action) {
                        case "Move":
                            var radius = 2;
                            var spots = findAvailableSpots(radius, item);
                            for (var i = 0; i < spots.length; i++) {
                                var spot = spots[i];
                                if (spot == item || spot.unit)
                                    continue;
                                var path = hexBoard.pathFind(item, spot);
                                if (path.length > 0 && path.length <= radius + 1) {
                                    possiblePoints.push(spot);
                                    spot.setHighlight(moveHighlightColor);
                                }
                            }
                            break;
                        case "Attack":
                            var radius = 2;
                            var spots = findAvailableSpots(radius, item);
                            for (var i = 0; i < spots.length; i++) {
                                var spot = spots[i];
                                if (spot == item)
                                    continue;
                                if (!spot.unit || item.hexColor == spot.hexColor) {
                                    continue;
                                }
                                var path = hexBoard.pathFind(item, spot);
                                if (path.length > 1 && path.length <= radius + 1) {
                                    possiblePoints.push(spot);
                                    spot.setHighlight(attackHighlightColor);
                                }
                            }
                            break;
                    }
                    break;
                case 'Tank':
                    switch (action) {
                        case "Move":
                            var radius = 5;
                            var spots = findAvailableSpots(radius, item);
                            for (var i = 0; i < spots.length; i++) {
                                var spot = spots[i];
                                if (spot == item || spot.unit)
                                    continue;
                                var path = hexBoard.pathFind(item, spot);
                                if (path.length > 1 && path.length <= radius + 1) {
                                    possiblePoints.push(spot);
                                    spot.setHighlight(moveHighlightColor);
                                }
                            }
                            break;
                        case "Attack":
                            var radius = 5;
                            var spots = findAvailableSpots(radius, item);
                            for (var i = 0; i < spots.length; i++) {
                                var spot = spots[i];
                                if (spot == item)
                                    continue;
                                if (!spot.unit || item.hexColor == spot.hexColor) {
                                    continue;
                                }
                                var path = hexBoard.pathFind(item, spot);
                                if (path.length > 1 && path.length <= radius + 1) {
                                    possiblePoints.push(spot);
                                    spot.setHighlight(attackHighlightColor);
                                }
                            }
                            break;
                    }
                    break;
                case 'Base':
                    break;
            }
        }
        function findAvailableSpots(radius, center) {
            var items = [];
            for (var q = 0; q < hexBoard.hexList.length; q++) {
                var item = hexBoard.hexList[q];
                if (HexUtils_2.distance(center, item) <= radius) {
                    items.push(item);
                }
            }
            return items;
        }
        var context = canvas.getContext("2d");
        function draw() {
            requestAnimationFrame(draw);
            tick();
            canvas.width = canvas.width;
            hexBoard.drawBoard(context);
            menuManager.draw();
        }
        function tick() {
            if (Math.abs(swipeVelocity.x) > 0) {
                var sign = mathSign(swipeVelocity.x);
                swipeVelocity.x += 0.7 * -sign;
                if (mathSign(swipeVelocity.x) != sign) {
                    swipeVelocity.x = 0;
                }
            }
            if (Math.abs(swipeVelocity.y) > 0) {
                var sign = mathSign(swipeVelocity.y);
                swipeVelocity.y += 0.7 * -sign;
                if (mathSign(swipeVelocity.y) != sign) {
                    swipeVelocity.y = 0;
                }
            }
            hexBoard.offsetView(swipeVelocity.x, swipeVelocity.y);
        }
        function mathSign(f) {
            if (f < 0)
                return -1;
            else if (f > 0)
                return 1;
            return 0;
        }
        draw();
        fetch('http://localhost:9847/game-state', {})
            .then(function (response) {
            // Examine the text in the response  
            response.text()
                .then(function (data) {
                hexBoard.initialize(JSON.parse(new Compressor().DecompressText(data)));
            });
        })
            .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
    }
    return {
        setters:[
            function (AssetManager_2_1) {
                AssetManager_2 = AssetManager_2_1;
            },
            function (HexUtils_2_1) {
                HexUtils_2 = HexUtils_2_1;
            },
            function (HexBoard_1_1) {
                HexBoard_1 = HexBoard_1_1;
            },
            function (MenuManager_1_1) {
                MenuManager_1 = MenuManager_1_1;
            },
            function (drawingUtilities_2_1) {
                drawingUtilities_2 = drawingUtilities_2_1;
            }],
        execute: function() {
            ClientMain = (function () {
                function ClientMain() {
                }
                ClientMain.run = function () {
                    AssetManager_2.AssetManager.instance = new AssetManager_2.AssetManager(startApp);
                    var size = { width: 80, height: 80 };
                    var base = { x: 40, y: 55 };
                    AssetManager_2.AssetManager.instance.addAsset('Infantry', 'images/tower_10.png', size, base);
                    AssetManager_2.AssetManager.instance.addAsset('Tank', 'images/tower_40.png', size, base);
                    AssetManager_2.AssetManager.instance.addAsset('Base', 'images/tower_42.png', size, base);
                    AssetManager_2.AssetManager.instance.addAsset('Icon.Move', 'images/icons/move.png', size, base);
                    AssetManager_2.AssetManager.instance.addAsset('Icon.Attack', 'images/icons/attack.png', size, base);
                    AssetManager_2.AssetManager.instance.start();
                };
                return ClientMain;
            }());
            exports_10("ClientMain", ClientMain);
            ClientMain.run();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY2xpZW50L2hleExpYnJhcmllcy9Bc3NldE1hbmFnZXIudHMiLCIuLi8uLi8uLi9jb21tb24vaGV4TGlicmFyaWVzL0hleFV0aWxzLnRzIiwiLi4vLi4vLi4vY29tbW9uL3V0aWxzLnRzIiwiLi4vLi4vLi4vY2xpZW50L2hleExpYnJhcmllcy9ncmlkSGV4YWdvbkNvbnN0YW50cy50cyIsIi4uLy4uLy4uL2NsaWVudC91dGlscy9kcmF3aW5nVXRpbGl0aWVzLnRzIiwiLi4vLi4vLi4vY2xpZW50L2hleExpYnJhcmllcy9HcmlkSGV4YWdvbi50cyIsIi4uLy4uLy4uL2NvbW1vbi9tb2RlbHMvaGV4Qm9hcmQudHMiLCIuLi8uLi8uLi9jbGllbnQvaGV4TGlicmFyaWVzL0hleEJvYXJkLnRzIiwiLi4vLi4vLi4vY2xpZW50L2hleExpYnJhcmllcy9NZW51TWFuYWdlci50cyIsIi4uLy4uLy4uL2NsaWVudC9jbGllbnRNYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztZQU1BO2dCQVVJLHNCQUFZLFNBQVM7b0JBVHJCLGVBQVUsR0FBRyxFQUFFLENBQUM7b0JBQ2hCLFdBQU0sR0FBMkIsRUFBRSxDQUFDO29CQUNwQyxjQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNqQixrQkFBYSxHQUFHLENBQUMsQ0FBQztvQkFDbEIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO29CQU1qQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFFL0IsQ0FBQztnQkFFRCw0QkFBSyxHQUFMO29CQUNJLEdBQUcsQ0FBQyxDQUFDLElBQU0sTUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZDLElBQU0sR0FBRyxH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R0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO3dCQUMvQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQzt3QkFDM0MsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQzt3QkFDL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7d0JBQzNDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQzt3QkFFL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7d0JBQzNDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO3dCQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVB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