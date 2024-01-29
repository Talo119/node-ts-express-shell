import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";


export class ProductService {
    constructor() {}

    async createProduct(createProductDto: CreateProductDto) {

        const productExists = await ProductModel.findOne({name: createProductDto.name});
        if(productExists) throw CustomError.badRequest( 'Product already exists.' );

        try {
            const product = new ProductModel({
                ...createProductDto,
            });
            await product.save()

            return product;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }

    async getProducts( paginationDto: PaginationDto ) {
        const { page, limit } = paginationDto;
        try {
            const [products, total ] = await Promise.all([
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit( limit )
                    .populate('user', 'name email')
                    .populate('category', 'name available'),
                ProductModel.countDocuments()
            ]);

            return {
                page: page,
                limit: limit,
                total:total,
                next: `/api/products?page${ (page + 1) }&limit=${ limit }`,
                prev:  (page -1 > 0) ? `/api/products?page${ (page - 1) }&limit=${ limit }` : null,
                products: products.map( product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    user: product.user,
                    category: product.category,
                }))
            }
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}