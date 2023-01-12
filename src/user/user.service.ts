import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.entity';
import { UserRepository } from './model/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ){}

  async createUser(createUser: CreateUserDto){
    const user = await this.userRepository.findOneBy({ register: createUser.register });

    if (user) throw new BadRequestException('User already exists.');

    const newUser = this.userRepository.create(createUser);
    
    await this.userRepository.save(newUser);

    const { password, ...userReturn } = newUser;
    
    return userReturn;
  }

  async getUsers() {
    return this.userRepository.find({ 
      select: ['idUser', 'name', 'register', 'created_at'] 
    });
  }

  async getOneUser(register: string) {
    const user = await this.userRepository.findOneBy({ register });

    if (!user) throw new NotFoundException('User not found.');
    
    return user;
  }

  async updateUser(updateUser: UpdateUserDto){
    const user = await this.userRepository.findOneBy({ register: updateUser.register });

    if (!user) throw new NotFoundException('User not found.');

    const userUpdate = await this.userRepository.update(user.idUser, { ...updateUser })

    return userUpdate;
  }

  async deleteUser(idUser: number){
    const user = await this.userRepository.findOneBy({ idUser });

    if (!user) throw new NotFoundException('User not found.');

    await this.userRepository.remove(user)
  }
}
