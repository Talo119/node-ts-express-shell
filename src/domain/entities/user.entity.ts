import { CustomError } from "../errors/custom.error";

export class UsertEntity{
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string[],
        public img?: string,
    ) {}

    static fromObject( object: {[key: string]: any} ){
        const {id, _id, name, email, emailValidated, password, role, img} = object;

        if (!_id && !id) {
            throw CustomError.badRequest('Missing ID');
        }

        if(!name) throw CustomError.badRequest('Missing Name');
        if(!email) throw CustomError.badRequest('Missing Email');
        if(!password) throw CustomError.badRequest('Missing Password');
        if(!role) throw CustomError.badRequest('Missing Role');
        if(emailValidated === undefined) throw CustomError.badRequest('Missing Email validated');

        return new UsertEntity( _id || id,name, email,emailValidated,password, role, img);
    }
}