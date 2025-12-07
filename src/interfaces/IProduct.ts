interface IProduct {    // contrato de tipado de TYPESCRIPT
    // id: number, ANULAMOS PORQUE MONGODB NOS DA UN ID NUEVO Y SE DUPLICARIA
    name: string,
    description: string,
    stock: number,
    category: string,
    price: number
}
export default IProduct