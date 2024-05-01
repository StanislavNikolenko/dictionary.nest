import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/decorators";
import { ApiTags } from "@nestjs/swagger";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginDto } from "./login.dto";
import { Auth } from "./auth.type";

@ApiTags('authentication')
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Sing in a user'})
  @ApiResponse({
    status: 200,
    description: 'Sign in a user',
    type: Auth,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.email, loginDto.password);
  }
}
