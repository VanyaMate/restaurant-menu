export interface IMapper<From, To> {
    convert (from: From): To;
}