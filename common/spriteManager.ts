import {GridHexagon} from "./gridHexagon";
export class SpriteManager {

    sprites: Sprite[] = [];
    spritesMap: {[tileKey: number]: Sprite[]} = {};

    addSprite(sprite: Sprite) {
        this.sprites.push(sprite);
        if (sprite.tile) {
            var sprites = this.spritesMap[sprite.tile.x + "-" + sprite.tile.z];
            sprites = sprites || [];
            sprites.push(sprite);
            this.spritesMap[sprite.tile.x + "-" + sprite.tile.z] = sprites;
        }
    }

    tick() {
        for (var i = 0; i < this.sprites.length; i++) {
            var sprite = this.sprites[i];
            sprite.tick();
        }
    }

    getSpritesAtTile(item: GridHexagon): Sprite[] {
        return this.spritesMap[item.x+"-"+item.z];
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