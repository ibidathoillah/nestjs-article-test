export class CollectBookDTO {
    id: number
    name: string
    description: string

    constructor(partial: Partial<CollectBookDTO>) {
        Object.assign(this, partial)
    }
}