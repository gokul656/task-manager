import { v4 as uuidv4 } from 'uuid';
import { User } from '../../domain/entities/user';
import UserModel from '../models/user.model';
import { UserRepository } from '../../domain/interfaces/repository/user_repository';

export class UserRepo implements UserRepository {
    async createUser(user: User): Promise<User> {
        user.uid = uuidv4().toString({})
        const savedUser = (await UserModel.create(user)).get()
        delete savedUser['password']
        return savedUser;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await UserModel.findOne({
            where: { email }
        })
        return user !== null && user.get()
    }
}