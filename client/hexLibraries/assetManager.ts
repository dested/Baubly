export interface Asset {
    name: string;
    size: {width: number;height: number};
    base: {x: number;y: number};
    image: HTMLImageElement;
}
export interface AssetItem {
    size: {width: number;height: number};
    base: {x: number;y: number};
    url: string;
}
export class AssetManager {
    static assetQueue: {[key: string]: AssetItem} = {};
    static assets: {[key: string]: Asset} = {};
    static completed: ()=>void = null;
    static $assetsLoaded = 0;
    static $assetsRequested = 0;


    static start() {
        for (const name in this.assetQueue) {
            if (this.assetQueue.hasOwnProperty(name)) {
                const img = new Image();

                img.onload = (((that, img, name) => () => {
                    that.$imageLoaded(img, name);
                }))(this, img, name);


                img.src = this.assetQueue[name].url;
            }
        }
    }

    static addAsset(name, url, size, base) {
        this.assetQueue[name] = {base, size, url};
        this.$assetsRequested++;
    }

    static  $imageLoaded(img, name) {
        this.assets[name] = {
            image: img,
            size: null,
            base: null,
            name: name
        };
        this.assets[name].size = this.assetQueue[name].size || {width: img.width, height: img.height};
        this.assets[name].base = this.assetQueue[name].base || {
                x: this.assets[name].size.width / 2,
                y: this.assets[name].size.height / 2
            };

        this.$assetsLoaded++;
        if (this.$assetsLoaded === this.$assetsRequested) {
            setTimeout(() => {
                    this.completed();
                },
                100);

        }
    }
}