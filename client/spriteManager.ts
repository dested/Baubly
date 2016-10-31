
import {ClientGameManager} from "./clientGameManager";
import {SpriteManager, Sprite} from "../common/spriteManager";
export class ClientSpriteManager extends SpriteManager {

    constructor(private clientGameManager: ClientGameManager) {
        super();
    }

    draw() {

    }

    tick() {
        super.tick();
    }

}

export class ClientSprite extends Sprite{

}