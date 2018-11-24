import { Subscription } from "./Subscription";
import { Observer } from "./Observer";

export class Subscriber<T> extends Subscription implements Observer<T> {

    protected active: boolean = true;
    protected intervalObserver: Observer<T>;

    constructor(
        destinationOrNext: Observer<T> | ((data: T) => void),
        error?: (error: T | Error) => void,
        complete?: () => void
    ) {
        super();

        if (typeof destinationOrNext === "function") {
            this.intervalObserver = new Observer();
            this.intervalObserver.next = destinationOrNext as (data: T) => void;
        } else {
            this.intervalObserver = destinationOrNext as Observer<T>;
        }

        if (error) {
            this.intervalObserver.error = error;
        }
        if (complete) {
            this.intervalObserver.complete = complete;
        }
    }

    public next(data: T): void {
        if (this.active) {
            this.intervalObserver.next(data);
        }
    }

    public error(error: T | Error): void {
        if (this.active) {

            this.active = false;
            this.intervalObserver.error(error);
        }
    }

    public complete(): void {
        if (this.active) {

            this.active = false;
            this.intervalObserver.complete();
        }
    }

    public unsubscribe(): void {

        this.active = false;
        super.unsubscribe();
    }
}
