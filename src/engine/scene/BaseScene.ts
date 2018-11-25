import { Scene } from "./Scene";
import { Entity } from "../entity/Entity";

/**
 * a simple scene object wich implements the boilerplate part of the Scene interface
 */
export abstract class BaseScene implements Scene {

    /**
     * indicator if the scene has done its loading phase
     */
    protected sceneLoaded: boolean = false;

    /**
     * the stack of currently existing entities in this scene
     */
    protected entities: Entity[] = [];

    /**
     * @inheritdoc
     */
    public isLoaded(): boolean {

        return this.sceneLoaded;
    }

    /**
     * @inheritdoc
     */
    public async loadScene(): Promise<void> {

        // no loading nessesary
        this.sceneLoaded = true;

        return;
    }

    /**
     * @inheritdoc
     */
    public async unloadScene(): Promise<void> {

        // no unloading nessesary
        this.sceneLoaded = false;

        return;
    }

    /**
     * @inheritdoc
     */
    public addEntity(...entities: Entity[]): this {

        this.entities.push(...entities);
        return this;
    }

    /**
     * @inheritdoc
     */
    public getEntities(): Entity[] {

        return this.entities;
    }
}
