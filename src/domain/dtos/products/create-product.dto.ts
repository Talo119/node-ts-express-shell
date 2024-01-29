import { Validators } from "../../../config";

export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string,
    ) {}

    static create(props: {[key: string]: any}): [string?, CreateProductDto?]{
        const {
            name,
            available,
            price,
            description,
            user,
            category,
        } = props;

        let availableBoolean = available;

        if(!name) return ['Missing name', undefined];
        if(!price) return ['Missing price', undefined];
        if(!description) return ['Missing description', undefined];

        if(!user) return ['Missing user', undefined];
        if(!Validators.isMongoId(user)) return ['Invalid user ID', undefined];

        if(!category) return ['Missing category', undefined];
        if(!Validators.isMongoId(category)) return ['Invalid category ID', undefined];

        if (typeof available !== "boolean") {
            availableBoolean = ( available === 'true' );
        }

        return [
            undefined, 
            new CreateProductDto(
                name,
                !!available,
                price,
                description,
                user,
                category
            )];
    }
}