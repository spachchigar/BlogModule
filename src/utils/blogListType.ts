export interface Image {
    value?: {
        src: string | null
        alt: string | null
    }
    src?: string | null
    alt?: string | null
}

export interface Link {
    path: string | null
}
export interface FieldValue<T> {
    value: T
}
