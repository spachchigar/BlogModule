export interface Image {
    value?: {
        src: string | null,
        alt: string | null,
    },
    src?: string | null,
    alt?: string | null,

}

export interface Link {
    url: string,
    anchor: string | null,
    target: string | null,
    text: string | null
}
export interface FieldValue<T> {
    value: T;
}

