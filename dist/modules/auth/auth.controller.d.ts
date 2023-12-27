import { AuthService } from './auth.service';
import { SignInDTO } from './dto/singIn.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDTO): Promise<any>;
}
