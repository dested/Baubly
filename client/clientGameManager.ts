import {HexagonColor} from "./utils/drawingUtilities";
import {HexBoard} from "./hexLibraries/hexBoard";
import {MenuManager} from "./hexLibraries/menuManager";
import {HexUtils} from "../common/hexLibraries/hexUtils";
import {GridHexagon} from "./hexLibraries/gridHexagon";
declare var Hammer;
export class ClientGameManager {
    private menuManager: MenuManager;
    private hexBoard: HexBoard;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    static baseColor = new HexagonColor('#FFFFFF');
    static highlightColor = new HexagonColor('#00F9FF');
    static selectedHighlightColor = new HexagonColor('#6B90FF');
    static moveHighlightColor = new HexagonColor('#BE9EFF');
    static attackHighlightColor = new HexagonColor('#91F9CF');


    swipeVelocity = {x: 0, y: 0};
    tapStart = {x: 0, y: 0};

    constructor() {

        this.hexBoard = new HexBoard();

        this.canvas = <HTMLCanvasElement>document.getElementById("hex");
        this.context = this.canvas.getContext("2d");
        var menu = document.getElementById("menu");

        this.menuManager = new MenuManager(menu);

        var overlay = document.getElementById("overlay");

        var mc = new Hammer.Manager(overlay);
        mc.add(new Hammer.Pan({threshold: 0, pointers: 0}));
        mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Tap());
        /*window.onresize = ()=> {
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight;
        };*/
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';

        this.hexBoard.resize(this.canvas.width, this.canvas.height);


        mc.on('panstart', (ev)=> {
            if (this.menuManager.isOpen) {
                return false;
            }
            this.menuManager.closeMenu();
            this.swipeVelocity.x = this.swipeVelocity.y = 0;
            this.tapStart.x = this.hexBoard.viewPort.x;
            this.tapStart.y = this.hexBoard.viewPort.y;
            this.hexBoard.setView(this.tapStart.x - ev.deltaX, this.tapStart.y - ev.deltaY);
        });
        mc.on('panmove', (ev)=> {
            if (this.menuManager.isOpen) {
                return false;
            }
            this.hexBoard.setView(this.tapStart.x - ev.deltaX, this.tapStart.y - ev.deltaY);
        });

        mc.on('swipe', (ev)=> {
            if (this.menuManager.isOpen) {
                return false;
            }
            this.menuManager.closeMenu();
            this.swipeVelocity.x = ev.velocityX * 10;
            this.swipeVelocity.y = ev.velocityY * 10;
        });


        mc.on('tap', (ev) => {
            var x = <number> ev.center.x;
            var y = <number> ev.center.y;
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
            if (!item) return;

            item.setHighlight(ClientGameManager.selectedHighlightColor);
            item.setHeightOffset(1);
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
        });


        this.draw();

        fetch('http://localhost:9847/game-state', {})
            .then(response => {
                response.text()
                    .then(data => {
                        this.hexBoard.initialize(JSON.parse(new Compressor().DecompressText(data)));
                    });
            })
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            });


    }

    startAction(item: GridHexagon) {
        var radius = 5;
        var spots = this.findAvailableSpots(radius, item);
        for (var i = 0; i < spots.length; i++) {
            var spot = spots[i];
            if (spot == item || spot.unit) continue;
            var path = this.hexBoard.pathFind(item, spot);
            if (path.length > 1 && path.length <= radius + 1) {
                spot.setHighlight(ClientGameManager.moveHighlightColor);
                spot.setHeightOffset(.75);
            }
        }
    }


    findAvailableSpots(radius, center) {
        var items = [];
        for (var q = 0; q < this.hexBoard.hexList.length; q++) {
            var item = this.hexBoard.hexList[q];
            if (HexUtils.distance(center, item) <= radius) {
                items.push(item);
            }
        }

        return items;

    }

    draw() {
        requestAnimationFrame(()=> {
            this.draw();
        });
        this.tick();
        this.canvas.width = this.canvas.width;
        this.hexBoard.drawBoard(this.context);
        this.menuManager.draw();
    }

    tick() {
        if (Math.abs(this.swipeVelocity.x) > 0) {
            var sign = HexUtils.mathSign(this.swipeVelocity.x);
            this.swipeVelocity.x += 0.7 * -sign;
            if (HexUtils.mathSign(this.swipeVelocity.x) != sign) {
                this.swipeVelocity.x = 0;
            }
        }

        if (Math.abs(this.swipeVelocity.y) > 0) {
            var sign = HexUtils.mathSign(this.swipeVelocity.y);
            this.swipeVelocity.y += 0.7 * -sign;
            if (HexUtils.mathSign(this.swipeVelocity.y) != sign) {
                this.swipeVelocity.y = 0;
            }
        }
        // if (Math.abs(this.swipeVelocity.x) > 0 || Math.abs(this.swipeVelocity.y) > 0)
        {
            this.hexBoard.offsetView(this.swipeVelocity.x, this.swipeVelocity.y);
        }

    }

}