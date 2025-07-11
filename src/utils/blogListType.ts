export interface Image{
    src:string|null,
    alt:string|null,
}

export interface Link{
    url:string,
    anchor:string|null,
    target:string|null,
    text:string|null
}
export interface FieldValue<T>{
    value:T;
}

