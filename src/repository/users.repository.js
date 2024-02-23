import { CreateUserDto, getUserDto } from "../dao/dto/user.dto.js";

export class userRepository {
    constructor(dao) {
        this.dao = dao;
    }
    async getUsers() {
        const users = await this.dao.get();
        return users;
    }
    async createUser(user) {
        const userDto = new CreateUserDto(user);
        const userCreated = await this.dao.post(userDto);
        const userDtoCreated = new getUserDto(userCreated);
        return userDtoCreated
    }
}

