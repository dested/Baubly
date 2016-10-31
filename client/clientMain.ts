/// <reference path="./typings/Compress.d.ts" />
/// <reference path="./node_modules/@types/core-js/index.d.ts" />
/// <reference path="./node_modules/@types/whatwg-fetch/index.d.ts" />

import {AssetManager } from "./hexLibraries/AssetManager";
import {ClientGameManager} from "./clientGameManager";

export class ClientMain {
    static run() {
       this.loadAssets(()=>{
           new ClientGameManager();
       });

    }

    private static loadAssets(onComplete) {
        AssetManager.completed=onComplete;
        var size = { width: 80, height: 80 };
        var base = { x: 40, y: 55 };
        AssetManager.addAsset('Infantry', 'images/tower_10.png', size, base);
        AssetManager.addAsset('Tank', 'images/tower_40.png', size, base);
        AssetManager.addAsset('Base', 'images/tower_42.png', size, base);


        AssetManager.addAsset('Icon.Move', 'images/icons/move.png', size, base);
        AssetManager.addAsset('Icon.Attack', 'images/icons/attack.png', size, base);

        AssetManager.addAsset('tile', 'images/tile.png', size, base);

        AssetManager.start();
    }
}

ClientMain.run();
