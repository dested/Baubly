System.register("common/models/HexBoard", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HexBoardModel;
    return {
        setters:[],
        execute: function() {
            HexBoardModel = (function () {
                function HexBoardModel() {
                }
                return HexBoardModel;
            }());
            exports_1("HexBoardModel", HexBoardModel);
        }
    }
});
///<reference path="../common/typings/Compress.d.ts"/>
System.register("server/gameBoard", ["common/models/HexBoard"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var HexBoard_1;
    var GameBoard;
    function random(bottom, top) {
        return (Math.random() * (top - bottom) + bottom) | 0;
    }
    return {
        setters:[
            function (HexBoard_1_1) {
                HexBoard_1 = HexBoard_1_1;
            }],
        execute: function() {
            GameBoard = (function () {
                function GameBoard() {
                }
                GameBoard.generateBoard = function () {
                    var board = new HexBoard_1.HexBoardModel();
                    var boardStr = "";
                    board.width = 84 * 5;
                    board.height = 84 * 5;
                    noise.seed(Math.random());
                    for (var y = 0; y < board.height; y++) {
                        for (var x = 0; x < board.width; x++) {
                            var str = 0;
                            if (random(0, 100) < 10) {
                                str = 0;
                            }
                            else {
                                if (random(0, 100) < 15)
                                    str = 2;
                                else if (random(0, 100) < 6)
                                    str = 1;
                                else
                                    str = 1;
                            }
                            var value = Math.abs(noise.simplex2(x / 90, y / 90)) * 90;
                            boardStr += (value / 10 | 0).toString();
                            boardStr += ((value / 30 | 0) + 1).toString();
                        }
                        boardStr += "|";
                    }
                    board.boardStr = boardStr;
                    return board;
                };
                GameBoard.makeId = function () {
                    function gen(count) {
                        var out = "";
                        for (var i = 0; i < count; i++) {
                            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                        }
                        return out;
                    }
                    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
                };
                return GameBoard;
            }());
            exports_2("GameBoard", GameBoard);
            /*
             * A speed-improved perlin and simplex noise algorithms for 2D.
             *
             * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
             * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
             * Better rank ordering method by Stefan Gustavson in 2012.
             * Converted to Javascript by Joseph Gentle.
             *
             * Version 2012-03-09
             *
             * This code was placed in the public domain by its original author,
             * Stefan Gustavson. You may use it as you see fit, but
             * attribution is appreciated.
             *
             */
            (function (global) {
                var module = global.noise = {};
                function Grad(x, y, z) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
                Grad.prototype.dot2 = function (x, y) {
                    return this.x * x + this.y * y;
                };
                Grad.prototype.dot3 = function (x, y, z) {
                    return this.x * x + this.y * y + this.z * z;
                };
                var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
                    new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
                    new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
                var p = [151, 160, 137, 91, 90, 15,
                    131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
                    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
                    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
                    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
                    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
                    135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
                    5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
                    223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
                    251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
                    49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
                    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
                // To remove the need for index wrapping, double the permutation table length
                var perm = new Array(512);
                var gradP = new Array(512);
                // This isn't a very good seeding function, but it works ok. It supports 2^16
                // different seed values. Write something better if you need more seeds.
                module.seed = function (seed) {
                    if (seed > 0 && seed < 1) {
                        // Scale the seed out
                        seed *= 65536;
                    }
                    seed = Math.floor(seed);
                    if (seed < 256) {
                        seed |= seed << 8;
                    }
                    for (var i = 0; i < 256; i++) {
                        var v;
                        if (i & 1) {
                            v = p[i] ^ (seed & 255);
                        }
                        else {
                            v = p[i] ^ ((seed >> 8) & 255);
                        }
                        perm[i] = perm[i + 256] = v;
                        gradP[i] = gradP[i + 256] = grad3[v % 12];
                    }
                };
                module.seed(0);
                /*
                 for(var i=0; i<256; i++) {
                 perm[i] = perm[i + 256] = p[i];
                 gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
                 }*/
                // Skewing and unskewing factors for 2, 3, and 4 dimensions
                var F2 = 0.5 * (Math.sqrt(3) - 1);
                var G2 = (3 - Math.sqrt(3)) / 6;
                var F3 = 1 / 3;
                var G3 = 1 / 6;
                // 2D simplex noise
                module.simplex2 = function (xin, yin) {
                    var n0, n1, n2; // Noise contributions from the three corners
                    // Skew the input space to determine which simplex cell we're in
                    var s = (xin + yin) * F2; // Hairy factor for 2D
                    var i = Math.floor(xin + s);
                    var j = Math.floor(yin + s);
                    var t = (i + j) * G2;
                    var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
                    var y0 = yin - j + t;
                    // For the 2D case, the simplex shape is an equilateral triangle.
                    // Determine which simplex we are in.
                    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
                    if (x0 > y0) {
                        i1 = 1;
                        j1 = 0;
                    }
                    else {
                        i1 = 0;
                        j1 = 1;
                    }
                    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
                    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
                    // c = (3-sqrt(3))/6
                    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
                    var y1 = y0 - j1 + G2;
                    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
                    var y2 = y0 - 1 + 2 * G2;
                    // Work out the hashed gradient indices of the three simplex corners
                    i &= 255;
                    j &= 255;
                    var gi0 = gradP[i + perm[j]];
                    var gi1 = gradP[i + i1 + perm[j + j1]];
                    var gi2 = gradP[i + 1 + perm[j + 1]];
                    // Calculate the contribution from the three corners
                    var t0 = 0.5 - x0 * x0 - y0 * y0;
                    if (t0 < 0) {
                        n0 = 0;
                    }
                    else {
                        t0 *= t0;
                        n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
                    }
                    var t1 = 0.5 - x1 * x1 - y1 * y1;
                    if (t1 < 0) {
                        n1 = 0;
                    }
                    else {
                        t1 *= t1;
                        n1 = t1 * t1 * gi1.dot2(x1, y1);
                    }
                    var t2 = 0.5 - x2 * x2 - y2 * y2;
                    if (t2 < 0) {
                        n2 = 0;
                    }
                    else {
                        t2 *= t2;
                        n2 = t2 * t2 * gi2.dot2(x2, y2);
                    }
                    // Add contributions from each corner to get the final noise value.
                    // The result is scaled to return values in the interval [-1,1].
                    return 70 * (n0 + n1 + n2);
                };
                // 3D simplex noise
                module.simplex3 = function (xin, yin, zin) {
                    var n0, n1, n2, n3; // Noise contributions from the four corners
                    // Skew the input space to determine which simplex cell we're in
                    var s = (xin + yin + zin) * F3; // Hairy factor for 2D
                    var i = Math.floor(xin + s);
                    var j = Math.floor(yin + s);
                    var k = Math.floor(zin + s);
                    var t = (i + j + k) * G3;
                    var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
                    var y0 = yin - j + t;
                    var z0 = zin - k + t;
                    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
                    // Determine which simplex we are in.
                    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
                    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
                    if (x0 >= y0) {
                        if (y0 >= z0) {
                            i1 = 1;
                            j1 = 0;
                            k1 = 0;
                            i2 = 1;
                            j2 = 1;
                            k2 = 0;
                        }
                        else if (x0 >= z0) {
                            i1 = 1;
                            j1 = 0;
                            k1 = 0;
                            i2 = 1;
                            j2 = 0;
                            k2 = 1;
                        }
                        else {
                            i1 = 0;
                            j1 = 0;
                            k1 = 1;
                            i2 = 1;
                            j2 = 0;
                            k2 = 1;
                        }
                    }
                    else {
                        if (y0 < z0) {
                            i1 = 0;
                            j1 = 0;
                            k1 = 1;
                            i2 = 0;
                            j2 = 1;
                            k2 = 1;
                        }
                        else if (x0 < z0) {
                            i1 = 0;
                            j1 = 1;
                            k1 = 0;
                            i2 = 0;
                            j2 = 1;
                            k2 = 1;
                        }
                        else {
                            i1 = 0;
                            j1 = 1;
                            k1 = 0;
                            i2 = 1;
                            j2 = 1;
                            k2 = 0;
                        }
                    }
                    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
                    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
                    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
                    // c = 1/6.
                    var x1 = x0 - i1 + G3; // Offsets for second corner
                    var y1 = y0 - j1 + G3;
                    var z1 = z0 - k1 + G3;
                    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
                    var y2 = y0 - j2 + 2 * G3;
                    var z2 = z0 - k2 + 2 * G3;
                    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
                    var y3 = y0 - 1 + 3 * G3;
                    var z3 = z0 - 1 + 3 * G3;
                    // Work out the hashed gradient indices of the four simplex corners
                    i &= 255;
                    j &= 255;
                    k &= 255;
                    var gi0 = gradP[i + perm[j + perm[k]]];
                    var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
                    var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
                    var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];
                    // Calculate the contribution from the four corners
                    var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
                    if (t0 < 0) {
                        n0 = 0;
                    }
                    else {
                        t0 *= t0;
                        n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
                    }
                    var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
                    if (t1 < 0) {
                        n1 = 0;
                    }
                    else {
                        t1 *= t1;
                        n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
                    }
                    var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
                    if (t2 < 0) {
                        n2 = 0;
                    }
                    else {
                        t2 *= t2;
                        n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
                    }
                    var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
                    if (t3 < 0) {
                        n3 = 0;
                    }
                    else {
                        t3 *= t3;
                        n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
                    }
                    // Add contributions from each corner to get the final noise value.
                    // The result is scaled to return values in the interval [-1,1].
                    return 32 * (n0 + n1 + n2 + n3);
                };
                // ##### Perlin noise stuff
                function fade(t) {
                    return t * t * t * (t * (t * 6 - 15) + 10);
                }
                function lerp(a, b, t) {
                    return (1 - t) * a + t * b;
                }
                // 2D Perlin Noise
                module.perlin2 = function (x, y) {
                    // Find unit grid cell containing point
                    var X = Math.floor(x), Y = Math.floor(y);
                    // Get relative xy coordinates of point within that cell
                    x = x - X;
                    y = y - Y;
                    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
                    X = X & 255;
                    Y = Y & 255;
                    // Calculate noise contributions from each of the four corners
                    var n00 = gradP[X + perm[Y]].dot2(x, y);
                    var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
                    var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
                    var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
                    // Compute the fade curve value for x
                    var u = fade(x);
                    // Interpolate the four results
                    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
                };
                // 3D Perlin Noise
                module.perlin3 = function (x, y, z) {
                    // Find unit grid cell containing point
                    var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
                    // Get relative xyz coordinates of point within that cell
                    x = x - X;
                    y = y - Y;
                    z = z - Z;
                    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
                    X = X & 255;
                    Y = Y & 255;
                    Z = Z & 255;
                    // Calculate noise contributions from each of the eight corners
                    var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
                    var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
                    var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
                    var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
                    var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
                    var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
                    var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
                    var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);
                    // Compute the fade curve value for x, y, z
                    var u = fade(x);
                    var v = fade(y);
                    var w = fade(z);
                    // Interpolate
                    return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
                };
            })(this);
        }
    }
});
System.register("server/main", ["server/gameBoard"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var GameBoard_1;
    var Main;
    return {
        setters:[
            function (GameBoard_1_1) {
                GameBoard_1 = GameBoard_1_1;
            }],
        execute: function() {
            Main = (function () {
                function Main() {
                }
                Main.run = function () {
                    var board = GameBoard_1.GameBoard.generateBoard();
                    var m = new Compressor().CompressText(JSON.stringify(board));
                    console.log(m);
                };
                return Main;
            }());
            exports_3("Main", Main);
            Main.run();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL21vZGVscy9IZXhCb2FyZC50cyIsIi4uLy4uLy4uL3NlcnZlci9nYW1lQm9hcmQudHMiLCIuLi8uLi8uLi9zZXJ2ZXIvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUE7Z0JBQUE7Z0JBSUEsQ0FBQztnQkFBRCxvQkFBQztZQUFELENBQUMsQUFKRCxJQUlDO1lBSkQseUNBSUMsQ0FBQTs7OztBQ0pELHNEQUFzRDs7Ozs7O0lBTXRELGdCQUFnQixNQUFhLEVBQUUsR0FBVTtRQUNyQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7Ozs7WUFFRDtnQkFBQTtnQkFtREEsQ0FBQztnQkFqRFUsdUJBQWEsR0FBcEI7b0JBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSx3QkFBYSxFQUFFLENBQUM7b0JBQ2hDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBRXRCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUNwQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs0QkFDbkMsSUFBSSxHQUFHLEdBQUcs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QUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUM7Z0JBRUYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN2RixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5RSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQzlCLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO29CQUNqRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUMvRixFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUc7b0JBQzlGLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRztvQkFDL0YsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO29CQUM1RixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztvQkFDN0YsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtvQkFDaEcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7b0JBQzNGLEdBQUcsRUFBRSxFQUFFLEVB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RSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNYLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osRUFBRSxJQUFJLEVBQUUsQ0FBQzt3QkFDVCxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFFLHNDQUFzQztvQkFDNUUsQ0FBQztvQkFDRCxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNYLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osRUFBRSxJQUFJLEVBQUUsQ0FBQzt3QkFDVCxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztvQkFDRCxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNYLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osRUFBRSxJQUFJLEVBQUUsQ0FBQzt3QkFDVCxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztvQkFDRCxtRUFBbUU7b0JBQ25FLGdF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LENBQUM7d0JBQ1QsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLEVBQUUsSUFBSSxFQUFFLENBQUM7d0JBQ1QsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUUsc0NBQXNDO29CQUNoRixDQUFDO29CQUNELElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLEVBQUUsSUFBSSxFQUFFLENBQUM7d0JBQ1QsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxDQUFDO29CQUNELElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDWCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLEVBQUUsSUFBSSxFQUFFLENBQUM7d0JBQ1QsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxDQUFDO29CQUNELElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFF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Q0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN0RSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3RFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRTlFLDJDQUEyQztvQkFDM0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFaEIsY0FBYztvQkFDZCxNQUFNLENBQUMsSUFBSSxDQUNQLElBQUksQ0FDQSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzNCLElBQUksQ0FDQSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzNCLENBQUMsQ0FBQyxDQUFDO2dCQUNYLENBQUMsQ0FBQztZQUVOLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7WUN6YVQ7Z0JBQUE7Z0JBTUEsQ0FBQztnQkFMVSxRQUFHLEdBQVY7b0JBQ0ksSUFBSSxLQUFLLEdBQUcscUJBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3RCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNsQixDQUFDO2dCQUNMLFdBQUM7WUFBRCxDQUFDLEFBTkQsSUFNQztZQU5ELHVCQU1DLENBQUE7WUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMifQ==