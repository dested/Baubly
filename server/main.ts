import {GameBoard} from "./GameBoard";
export class Main {
    static run() {
        let board = GameBoard.generateBoard();
        var m = new Compressor().CompressText(JSON.stringify(board));
        console.log(m)
    }
}

Main.run();
