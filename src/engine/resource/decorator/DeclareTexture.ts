import { Injector } from "../../di/Injector";
import { ResourceLoader } from "../ResourceLoader";
import { ImageResource } from "../sprite/ImageResource";
import { AfterConstructionHook } from "../../util/decorators/AfterConstructionHook";
import { RenderableEntity } from "../../entity/RenderableEntity";
import { ResourceError } from "../../exception/ResourceError";

/**
 * declares that this `RenderableEntity` should have the given texture.
 * @param textureUrl the texture url
 */
export function DeclareTexture(textureUrl: string): ClassDecorator {

    // tslint:disable-next-line ban-types
    return <T extends Function>(target: T) => {

        // get resource loader to declare the texture
        const loader = Injector.getInstance().instantiateClass(ResourceLoader);

        // declare the resource result
        let resourceResult: ImageResource;

        // declare this resource!
        loader.declare(loader.loadImage, textureUrl).then(resource => {

            // set the resource of the entity
            resourceResult = resource;
        });

        // overwrite class ctor
        return AfterConstructionHook((entity: RenderableEntity) => {

            // check for resource result
            if (!resourceResult) {

                // prepare error message
                let errorMessage: string = "This entity has been constructed before the texture resource has been available! ";
                errorMessage += `Entity was ${entity.constructor.name}. Make sure that the resource at ${textureUrl} exists!`;

                // throw error
                throw new ResourceError(errorMessage);
            }

            // set the texture
            entity.setTexture(resourceResult);

        })(target);
    };
}