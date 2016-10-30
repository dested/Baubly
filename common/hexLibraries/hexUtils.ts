export class HexagonColor {
    color = "";
    darkBorder = "";
    dark1 = "";
    dark2 = "";
    dark3 = "";

    constructor(color) {
        this.color = color;
        this.darkBorder = DrawingUtilities.colorLuminance(color, -0.45);
        this.dark1 = DrawingUtilities.colorLuminance(color, -0.4);
        this.dark2 = DrawingUtilities.colorLuminance(color, -0.55);
        this.dark3 = DrawingUtilities.colorLuminance(color, -0.65);
    }
}


export class Node {
    parent = null;
    x = 0;
    y = 0;
    item = null;
    f = 0;
    g = 0;
    constructor(parent, piece) {
        this.parent = parent;
        // array index of this Node in the world linear array

        // the location coordinates of this Node
        this.x = piece.x;
        this.y = piece.z;
        this.item = piece;
        // the distanceFunction cost to get
        // TO this Node from the START
        this.f = 0;
        // the distanceFunction cost to get
        // from this Node to the GOAL
        this.g = 0
    }

    value() {
        return this.x + (this.y * 5000);
    }
}

export const distance = (p1, p2) => {
    const x1 = p1.x;
    const y1 = p1.z;

    const x2 = p2.x;
    const y2 = p2.z;

    const du = x2 - x1;
    const dv = (y2 + ((x2 / 2) | 0)) - (y1 + ((x1 / 2) | 0));
    if ((du >= 0 && dv >= 0) || (du < 0 && dv < 0))
        return Math.max(Math.abs(du), Math.abs(dv));
    else
        return Math.abs(du) + Math.abs(dv);
}

export const orderBy = (list, callback) => {
    const itms = [];
    for (var i = 0; i < list.length; i++) {
        const obj = list[i];
        itms.push({ item: obj, val: callback(obj) });
    }
    itms.sort((a, b) => (a.val - b.val));
    list = [];
    for (var i = 0; i < itms.length; i++) {
        const obj1 = itms[i];
        list.push(obj1.item);
    }
    return list;
}

export class DrawingUtilities {
    static drawCircle(context) {
        context.beginPath();
        context.arc(0, 0, 5, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        context.lineWidth = 5;
        context.stroke();
    };
    static colorLuminance(hex, lum) {
        // validate hex string
        hex = hex.replace(new RegExp('[^0-9a-f]', 'gi'), '');
        // convert to decimal and change luminosity
        let rgb = '#';
        for (let i = 0; i < 3; i++) {
            const c = parseInt(hex.substr(i * 2, 2), 16);
            const cs = (Math.round(Math.min(Math.max(0, c + c * lum), 255)) | 0).toString(16);
            rgb += (`00${cs}`).substr(cs.length);
        }
        return rgb;
    };
    static pointInPolygon(pointX, pointY, polygon) {
        let isInside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            if (polygon[i].y > pointY !== polygon[j].y > pointY &&
                pointX < (polygon[j].x - polygon[i].x) * (pointY - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
                isInside = !isInside;
            }
        }
        return isInside;
    };

}

