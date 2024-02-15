import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.tdo";
import { PrimaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrimaService) {}

    async create({name, email, password}: CreateUserDTO){

        return await this.prisma.user.create({
            data: {
                name,
                email,
                password
            },
            //Após ele inserir posso escolher qual campo eu quero que ele traz (que foi inserido) não obrigatorio
            select: {
                id: true
            }
        });

    }

}