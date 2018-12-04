import { Injectable } from "@qhun-engine/base";

import { TransitionInBound } from "./TransitionInBound";

/**
 * implements a transition ease in out calculation
 */
@Injectable()
export class EaseInOut implements TransitionInBound {

    public inBound: true = true;

    public calculate(x: number): number {

        // based on f(x) = x^2 / (x^2 + (1 - x)^2)
        return x ** 2 / (x ** 2 + (1 - x) ** 2);
    }
}
