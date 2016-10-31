import {GridHexagon} from "./gridHexagon";
export class SpriteManager {

    sprites: Sprite[] = [];

    addSprite(sprite: Sprite) {
        this.sprites.push(sprite);
    }

    tick() {

    }

}

export class Sprite {
    public x: number;
    public y: number;
    tile: GridHexagon;

    public key: string;

    public tick() {

    }
}