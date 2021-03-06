import { Vector } from "../math/Vector";
import { Camera } from "../camera/Camera";
import { Tile } from "./Tile";
import { TileworldResource } from "../resource/tileset/TileworldResource";
import { Destroyable } from "../constraint/Destroyable";
import { WorldPerspective } from "./WorldPerspective";
import { Loadable } from "../resource/Loadable";

export interface World<T extends TileworldResource = TileworldResource> extends Destroyable {

    /**
     * create a perspective camera for this world
     * @param initialPosition the initial position of the camera in the world
     * @param zoomScale the initial zoom scale of this camera
     */
    createCamera(initialPosition: Vector, zoomScale: number): Camera;

    /**
     * get the perspective of the world
     */
    getPerspective(): WorldPerspective;

    /**
     * get all available tiles for the given layer. first dimension is Y coordinate
     * and second dimension is the X coordinate
     * @param layer the layer to get the layout for
     */
    getLayout(layer: number): Tile[][];

    /**
     * get a two dimensional array with blocking tile information
     * @param layer the layer to get the data from
     */
    getCollisionLayout(layer: number): boolean[][];

    /**
     * get the size of the world in pixel
     */
    getSize(): Vector;

    /**
     * get the size of one tile in pixel
     */
    getTileSize(): Vector;

    /**
     * get the amount of tiles on x and y axis
     */
    getTileNumbers(): Vector;

    /**
     * get the amount of layers in this world
     */
    getLayerCount(): number;

    /**
     * set the resource that will be loaded when the world loads
     * @param resource the loadable world resource
     */
    setResource(resource: Loadable<T>): void;

    /**
     * loads the world and its dependencies
     */
    load(): Promise<void>;

    /**
     * check if the world is loaded
     */
    isLoaded(): boolean;
}
