import {GameBoard} from "./GameBoard";
import {HexBoardModel} from "../common/models/hexBoard";
import {StaticServer} from "./staticServer";
export class ServerMain {
    public static board:HexBoardModel;
    static run() {
        this.initialize();
        this.startStaticServer();
    }

    private static initialize() {
        this.board = GameBoard.generateBoard();
    }

    private static startStaticServer() {
        new StaticServer()
    }
}

ServerMain.run();
