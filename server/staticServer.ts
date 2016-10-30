///<reference path="../Common/typings/Compress.d.ts"/>
debugger;
var express = require('express');
var cors = require('cors');
import {ServerMain} from "./serverMain";

export class StaticServer {

    constructor() {

        var app = express();
        app.use(cors());

        app.get('/game-state', (req, res) => {
            var m = new Compressor().CompressText(JSON.stringify(ServerMain.board));
            console.log('sending data');
            res.send(m);
        });


        app.listen(9847);
        console.log('starting server');
    }
}