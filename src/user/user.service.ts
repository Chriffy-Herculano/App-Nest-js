import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.tdo";
import { PrimaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

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

    //Retornando todos
    async list() {
        return this.prisma.user.findMany();
    }

    //Retornando um especifico
    async show(id: number) {

        await this.exists(id);

        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(id: number, {email, name, password, birthAt, role}: UpdatePutUserDTO) {

        await this.exists(id);

        return this.prisma.user.update({
            data:{email, name, password, birthAt: birthAt ? new Date(birthAt) : null, role},
            where: {
                id
            }
        })
    }

    async updatePartial(id: number, {email, name, password, birthAt, role}: UpdatePatchUserDTO) {

        await this.exists(id);

        const data: any = {};

        if(birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if(email) {
            data.email = email;
        }

        if(name) {
            data.name = name;
        }

        if(password) {
            data.password = password;
        }

        if(role) {
            data.role = role;
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number){
        if (!(await this.prisma.user.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe!`);
        }
    }

}