import { RenderContext } from "../RenderContext";
import { BaseRenderContext } from "../BaseRenderContext";
import { Singleton } from "../../constraint/Singleton";
import { RenderableEntity } from "../../entity/RenderableEntity";

/**
 * the webgl render context
 */
@Singleton()
export class WebGLRenderContext extends BaseRenderContext implements RenderContext {

    constructor(
        private canvas: HTMLCanvasElement,
        private context: WebGLRenderingContext
    ) { super(); }

    /**
     * @inheritdoc
     */
    public drawEntity(entity: RenderableEntity): void {
        // @todo: implement
    }
}
