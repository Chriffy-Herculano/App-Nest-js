import { Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { CreateUserDTO } from "src/dto/create-user.tdo";
import { UpdatePatchUserDTO } from "src/dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "src/dto/update-put-user.dto";

@Controller('users')
export class UserController {

    //Insert
    @Post() //name, email, password OU o body mas aqui especifico qual quero pegar
    async create(@Body() {name, email, password}: CreateUserDTO) {
        return {name, email, password};
    }

    //Retorna todos
    @Get() 
    async list() {
        return {users:[]};
    }

    //Retorna um específico
    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return {user:{}, id}
    }

    //Alteração completa / precisa passar todos os se não ele vai ficar null
    @Put(':id')
    async update(@Body() {name, email, password}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'put',
            name, email, password,
            id
        }
    }

    //Alteração parcial
    @Patch(':id')
    async updatePartial(@Body() {name, email, password}: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: 'patch',
            name, email, password,
            id
        }
    }

    @Delete(':id') //estou apenas pegando o id e transformando ele em number usando o ParseIntPipe
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            id
        };
    }
}