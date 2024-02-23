
export class CreateUserDto{
    constructor(user){
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.age = user.age;
        this.password = user.password;

    }
}

export class getUserDto{
    constructor(userDb){
        this.firstName = userDb.firstName;
        this.lastName = userDb.lastName;
        this.email = userDb.email;
        this.age = userDb.age;
    }
}

