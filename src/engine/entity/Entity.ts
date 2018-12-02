import { Destroyable } from "../constraint/Destroyable";
import { HasPosition } from "../constraint/HasPosition";
import { HasVelocity } from "../constraint/HasVelocity";
import { HasSize } from "../constraint/HasSize";
import { HasRotation } from "../constraint/HasRotation";
import { HasAnchor } from "../constraint/HasAnchor";
import { HasCenter } from "../constraint/HasCenter";

/**
 * the most abstract game object
 */
export interface Entity extends HasPosition, HasVelocity, HasSize, HasRotation, HasAnchor, HasCenter, Destroyable {

}
