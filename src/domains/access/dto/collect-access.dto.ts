export class CollectAccessDTO {
    id: number
    name: string

    constructor(partial: Partial<CollectAccessDTO>) {
        Object.assign(this, partial)
    }
}