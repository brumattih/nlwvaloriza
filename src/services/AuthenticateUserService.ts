import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepositories } from "../repositories/UserRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const userRepositories = getCustomRepository(UserRepositories);

        const user = await userRepositories.findOne({
            email
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Invalid credentials");
        }

        const token = sign(
            {
                email: user.email
            },
            "5e840d2e814e05011433a3e3ddbb3365",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

    }
}

export { AuthenticateUserService };