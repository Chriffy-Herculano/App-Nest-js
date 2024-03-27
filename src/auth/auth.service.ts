import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrimaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService, 
        private readonly prisma: PrimaService,
        private readonly userService: UserService
    ) {}

    async createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: 'login',
                audience: 'users'
            })
        }
    }

    // async checkToken(token: string) {
    //     return this.jwtService.verify();
    // }

    async login(email: string, password: string) {

        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        });

        if(!user){
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if(!user){
            throw new UnauthorizedException('E-mail está incorreto.');
        }

        //TO DO: Enviar o e-mail...

        return true;
    }

    async reset(password: string, token: string) {

        //TO DO: Validar o token...

        const id = 0;

        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            }
        });

        return this.createToken(user);
    }

    //async register(data: AuthRegisterDTO) {
        
        //const user = await this.userService.create(data);

        //return this.createToken(user);
    //}
}