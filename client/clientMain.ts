/// <reference path="./typings/Compress.d.ts" />
/// <reference path="./node_modules/@types/core-js/index.d.ts" />
/// <reference path="./node_modules/@types/whatwg-fetch/index.d.ts" />

import {AssetManager } from "./hexLibraries/AssetManager";
import {HexagonColor, distance } from "../common/hexLibraries/HexUtils";
import {HexBoard} from "./hexLibraries/HexBoard";
import {MenuManager} from "./hexLibraries/MenuManager";
declare var Hammer;

export class ClientMain {
    static run() {
        AssetManager.instance = new AssetManager(startApp);
        var size = { width: 80, height: 80 };
        var base = { x: 40, y: 55 };
        AssetManager.instance.addAsset('Infantry', 'images/tower_10.png', size, base);
        AssetManager.instance.addAsset('Tank', 'images/tower_40.png', size, base);
        AssetManager.instance.addAsset('Base', 'images/tower_42.png', size, base);


        AssetManager.instance.addAsset('Icon.Move', 'images/icons/move.png', size, base);
        AssetManager.instance.addAsset('Icon.Attack', 'images/icons/attack.png', size, base);

        AssetManager.instance.start();

    }
}

ClientMain.run();

function startApp() {
    var baseColor = new HexagonColor('#FFFFFF');

    var highlightColor = new HexagonColor('#51F9FF');
    var selectedHighlightColor = new HexagonColor('#51F900');

    var moveHighlightColor = new HexagonColor('#99F920');
    var attackHighlightColor = new HexagonColor('#91F9CF');


    var possiblePoints = [];

    var hexBoard = new HexBoard();

    var canvas = <HTMLCanvasElement>document.getElementById("hex");
    var menu = document.getElementById("menu");

    var menuManager = new MenuManager(menu);

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

    mc.on('panstart',
        function(ev) {
            if (menuManager.isOpen) {
                return false;
            }
            menuManager.closeMenu();
            swipeVelocity.x = swipeVelocity.y = 0;
            tapStart.x = hexBoard.viewPort.x;
            tapStart.y = hexBoard.viewPort.y;
            hexBoard.setView(tapStart.x - ev.deltaX, tapStart.y - ev.deltaY);
        });
    mc.on('panmove',
        function(ev) {
            if (menuManager.isOpen) {
                return false;
            }
            hexBoard.setView(tapStart.x - ev.deltaX, tapStart.y - ev.deltaY);
        });

    mc.on('swipe',
        function(ev) {
            if (menuManager.isOpen) {
                return false;
            }
            menuManager.closeMenu();
            swipeVelocity.x = ev.velocityX * 10;
            swipeVelocity.y = ev.velocityY * 10;
        });

    var selectedItem;
    var currentState = 'none';

    mc.on('tap',
        function(ev) {
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
            if (!item) return;

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
                        { image: AssetManager.instance.assets['Icon.Move'].image, action: 'Move' },
                        { image: AssetManager.instance.assets['Icon.Attack'].image, action: 'Attack' }
                    ],
                    { x: x, y: y },
                    function(selectedItem) {
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
                    if (spot == item || spot.unit) continue;
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
                    if (spot == item) continue;
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
                    if (spot == item || spot.unit) continue;
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
                    if (spot == item) continue;
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
            if (distance(center, item) <= radius) {
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
        if (f < 0) return -1;
        else if (f > 0) return 1;
        return 0;
    }

    draw();

    fetch('http://localhost:9847/game-state',{})
        .then(response => {
            // Examine the text in the response  
            response.text()
                .then(data => {
                    hexBoard.initialize(JSON.parse(new Compressor().DecompressText(data)));
                });
        })
        .catch((err) => {
            console.log('Fetch Error :-S', err);
        });

}