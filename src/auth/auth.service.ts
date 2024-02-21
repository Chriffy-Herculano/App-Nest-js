import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrimaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService, 
        private readonly prisma: PrimaService
    ) {}

    async createToken() {
        //return this.jwtService.sign();
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

        return user;
    }

    async forget() {

    }

    async reset() {

    }
}