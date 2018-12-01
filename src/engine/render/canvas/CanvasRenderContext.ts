import { RenderContext } from "../RenderContext";
import { Singleton } from "../../constraint/Singleton";
import { BaseRenderContext } from "../BaseRenderContext";
import { RenderableEntity } from "../../entity/RenderableEntity";
import { ImageResource } from "../../resource/sprite/ImageResource";
import { Vector } from "../../math/Vector";
import { RenderableTileWorld } from "../../resource/tileset/RenderableTileWorld";
import { TileworldPerspective } from "../../resource/tileset/TileworldPerspective";
import { TilePerspectiveRendering } from "../util/TileRendering";

/**
 * the canvas rendering context
 */
@Singleton()
export class CanvasRenderContext extends BaseRenderContext implements RenderContext {

    constructor(
        private canvas: HTMLCanvasElement,
        private context: CanvasRenderingContext2D
    ) { super(); }

    /**
     * @inheritdoc
     */
    public before(): void {

        // clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * @inheritdoc
     */
    public drawEntity(entity: RenderableEntity): void {

        // does this entity has a valid texture?
        if (entity.getTexture()) {

            // get the image
            const image = entity.getTexture().getData();

            // get the anchor point to check where to draw the image in order
            // to be at the entities position
            const currentImageVector = Vector.from(image.width, image.height);
            const currentPosition = entity
                // get current
                .getPosition()
                // add anchor point based of the width
                .add(
                    currentImageVector.multiply(
                        // multiply the image width/height by the anchor point
                        entity.getAnchor()
                    )
                ).substract(currentImageVector)
                // finally add the max size of the entity
                .add(entity.getSize().multiply(Vector.HALF));

            // draw the image
            this.context.translate(currentPosition.x, currentPosition.y);
            this.context.translate(currentImageVector.x / 2, currentImageVector.y / 2);
            this.context.rotate(entity.getRotation());
            this.context.drawImage(image, -(currentImageVector.x / 2), -(currentImageVector.y / 2));

            // reset transform matrix
            this.context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    /**
     * @inheritdoc
     */
    public drawTileWorld(world: RenderableTileWorld, renderer: TilePerspectiveRendering): void {

        // draw the given tileworld
        const layers = world.getLayerCount();
        const size = world.getWorldSize();
        const tileSize = world.getTileDimension();

        // get static offset for the given perspective
        const staticOffset = renderer.getOffset(size.w, size.h, tileSize.w, tileSize.h);

        // iterate over all tiles that should be drawn
        for (let l = 0; l < layers; l++) {
            for (let y = 0; y < size.h; y++) {
                for (let x = 0; x < size.w; x++) {

                    // get the image for this coordinate
                    const tileImage = world.getTileImageByCoordinate(l, x, y);

                    // draw if image is available
                    if (tileImage) {

                        // calculate the drawing position based on the perspective
                        const drawingPosition = renderer
                            // translate to perspective
                            .getDrawingCoordinate(x, y, tileSize.w, tileSize.h)
                            // add static offset
                            .add(staticOffset);

                        // draw the image at the calculated position
                        this.context.drawImage(tileImage, drawingPosition.x, drawingPosition.y);
                    }
                }
            }
        }
    }

    /**
     * @inheritdoc
     */
    public drawText(text: string, position: Vector): void {

        this.context.transform(1, 0, 0, 1, 0, 0);

        this.context.font = "12px Arial";
        this.context.fillStyle = "black";
        this.context.fillText(text, position.x, position.y);
    }

    /**
     * @inheritdoc
     */
    public drawImageAtPosition(image: ImageResource, position: Vector, dimension?: Vector): void {

        if (dimension) {
            this.context.drawImage(image.getData(), position.x, position.y, dimension.x, dimension.y);
        } else {
            this.context.drawImage(image.getData(), position.x, position.y);
        }
    }
}
