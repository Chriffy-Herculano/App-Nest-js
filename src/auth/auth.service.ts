import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrimaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users';

    constructor(
        private readonly jwtService: JwtService, 
        private readonly prisma: PrimaService,
        private readonly userService: UserService
    ) {}

    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience
            })
        }
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            });

            return data;
        } catch(e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    async login(email: string, password: string) {

        // Procura o usuario pelo e-mail
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        // Se não achar cai na excessão
        if(!user){
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        // Se achar o usuario e se não bater a senha hash do banco com o que está senhdo passado cai na excessão
        if(!await bcrypt.compare(password, user.password)) {
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

    async reset(password: string) {

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