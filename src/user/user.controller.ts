import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from "@nestjs/common";

@Controller('users')
export class UserController {

    //Insert
    @Post()
    async create(@Body() body) {
        return {body};
    }

    //Retorna todos
    @Get() 
    async list() {
        return {users:[]};
    }

    //Retorna um específico
    @Get(':id')
    async show(@Param() param) {
        return {user:{}, param}
    }

    //Alteração completa
    @Put(':id')
    async update(@Body() body, @Param() params) {
        return {
            method: 'put',
            body,
            params
        }
    }

    //Alteração parcial
    @Patch(':id')
    async updatePartial(@Body() body, @Param() params) {
        return {
            method: 'patch',
            body,
            params
        }
    }

    @Delete(':id')
    async delete(@Param() params) {
        return {
            params
        };
    }
}