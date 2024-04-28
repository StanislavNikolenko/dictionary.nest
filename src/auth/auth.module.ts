import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { ConfigService } from "@nestjs/config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: "120s" },
        secret: configService.get<string>("SECRET"),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    {
      provide: "APP_GUARD",
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
