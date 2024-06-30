import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericService } from 'src/generic/service/crud.service';
import { classToPlain } from 'class-transformer';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository);
  }

  // async create(t: any): Promise<any> {
  //   const entity = this.repository.create(t);
  //   console.log("hihihihi")
  //   return classToPlain(await this.repository.save(entity));
  // }


  findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email: email } });
  }

}
