export class CollectRoleDTO {
    id: number
    name: string

    constructor(partial: Partial<CollectRoleDTO>) {
        Object.assign(this, partial)
    }
}