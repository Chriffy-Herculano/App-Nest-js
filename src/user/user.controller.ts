import { Controller, Post, Body, Get, Put, Patch, Delete, UseInterceptors, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "src/user/dto/create-user.tdo";
import { UpdatePatchUserDTO } from "src/user/dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "src/user/dto/update-put-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    //Insert
    
    @Roles(Role.Admin)
    @Post() //name, email, password OU o body mas aqui especifico qual quero pegar
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data);
    }

    //Retorna todos
    @Roles(Role.Admin)
    @Get() 
    async list() {
        //return {users:[]};
        return this.userService.list();
    }

    //Retorna um específico
    @Roles(Role.Admin)
    @Get(':id') //ParseIntPipe transforma em number
    async show(@ParamId() id: number) {
        console.log(id)
        //return {user:{}, id}
        return this.userService.show(id);
    }

    //Alteração completa / precisa passar todos os se não ele vai ficar null
    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
        return this.userService.update(id, data);
    }

    //Alteração parcial
    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
        return this.userService.updatePartial(id, data);
    }

    @Roles(Role.Admin)
    @Delete(':id') //estou apenas pegando o id e transformando ele em number usando o ParseIntPipe
    async delete(@ParamId() id: number) {
        return this.userService.delete(id);
    }
}