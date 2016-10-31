import {GridHexagon} from "./gridHexagon";
export class SpriteManager {

    sprites: Sprite[] = [];

    addSprite(sprite: Sprite) {
        this.sprites.push(sprite);
    }

    tick() {
        for (var i = 0; i < this.sprites.length; i++) {
            var sprite = this.sprites[i];
            sprite.tick();
        }
    }

    getSpriteAtTile(item: GridHexagon): Sprite {

        for (var i = 0; i < this.sprites.length; i++) {
            var sprite = this.sprites[i];
            if (sprite.tile.x == item.x && sprite.tile.y == item.y && sprite.tile.z == item.z)
                return sprite;
        }
        return null;
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