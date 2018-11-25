import { Destroyable } from "../constraint/Destroyable";
import { Vector } from "../math/Vector";

/**
 * the most abstract game object
 */
export interface Entity extends Destroyable {

    /**
     * get the position of this entity
     */
    getPosition(): Vector;

    /**
     * set the new position for this entity
     * @param position the new position
     */
    setPosition(position: Vector): ThisType<Entity>;

    /**
     * get the anchor point of this entity
     */
    getAnchor(): Vector;

    /**
     * set the anchor point for this entity
     * @param anchor the new anchor point
     */
    setAnchor(anchor: Vector): ThisType<Entity>;

    /**
     * get the size of the entity
     */
    getSize(): Vector;

    /**
     * set the new size of the entity
     * @param size the new size
     */
    setSize(size: Vector): ThisType<Entity>;

    /**
     * get the current rotation in radians
     */
    getRotation(): number;

    /**
     * set the new rotation in radians
     * @param rotation the new rotation in radians
     */
    setRotation(rotation: number): ThisType<Entity>;
}
