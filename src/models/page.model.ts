export interface PageModel<T>{

    content: T[],
    otalPages: number;
    totalElements: number;
    size: number;
    number: number;

}