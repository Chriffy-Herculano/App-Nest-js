import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: `e@r,@6P*W)c]kO2#dZ"}4?-2'rY@k$4=`
    })]
})

export class AuthModule {
    
}