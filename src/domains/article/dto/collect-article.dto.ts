export class CollectArticleDTO {
    id: number
    title: string
    body: string

    constructor(partial: Partial<CollectArticleDTO>) {
        Object.assign(this, partial)
    }
}