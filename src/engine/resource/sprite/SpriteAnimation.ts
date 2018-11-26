import { DimensionSize, DimensionPosition } from "../../animation/Dimension";

export interface SpriteAnimation {

    /**
     * contains every frame of the animation
     */
    frames: {
        [pictureName: string]: {

            /**
             * contains positioning data in the sprite image
             */
            frame: DimensionSize & DimensionPosition,

            /**
             * is the image rotated?
             */
            rotated: boolean,

            /**
             * is the image trimmed?
             */
            trimmed: boolean,

            /**
             * final sprite size
             */
            spriteSourceSize: DimensionSize & DimensionPosition,
        }
    };
}
