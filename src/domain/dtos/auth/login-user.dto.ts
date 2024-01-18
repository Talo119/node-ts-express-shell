import { regularExps } from "../../../config";


export class LoginUserDto{

    constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create( object: { [key: string]: any  } ): [string?, LoginUserDto?]{

        const { email, password } = object;

        
        if( !password ) return ['Missing password', undefined];
        //if( !password.length ) return ['Password too short.', undefined];

        if( !regularExps.email.test( email ) ) return ['Email is not valid.', undefined];

        return [undefined, new LoginUserDto( email, password )];
    }
}