import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UsertEntity } from "../../domain";
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';



export class AuthService {

    constructor() {}

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({email: registerUserDto.email});

        if (existUser) throw CustomError.badRequest('Email already exist.');

        try {
            const user = new UserModel(registerUserDto);

            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();

            const {password, ...rest} = UsertEntity.fromObject(user);

            return {
                user:{...rest},
                 token: 'abc'
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto){

        try {
            const existUser = await UserModel.findOne({email: loginUserDto.email});

            if ( !existUser ) throw CustomError.badRequest('User does not exist.');
    
            if( !bcryptAdapter.compare(loginUserDto.password, existUser.password) ) throw CustomError.badRequest('Password not valid.'); 
    
            const {password, ...rest} = UsertEntity.fromObject(existUser);
            
            const token = await JwtAdapter.generateToken({id: existUser.id, email: existUser.email});

            if(!token) throw CustomError.internalServer('Error while creating JWT');

            return {
                user:{...rest},
                token: token
            }; 
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
        
    }

}