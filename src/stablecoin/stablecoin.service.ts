import { Injectable } from '@nestjs/common';
import { CreateStablecoinDto } from './dto/create-stablecoin.dto';
import { UpdateStablecoinDto } from './dto/update-stablecoin.dto';

@Injectable()
export class StablecoinService {
  create(createStablecoinDto: CreateStablecoinDto) {
    return 'This action adds a new stablecoin';
  }

  findAll() {
    return `This action returns all stablecoin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stablecoin`;
  }

  update(id: number, updateStablecoinDto: UpdateStablecoinDto) {
    return `This action updates a #${id} stablecoin`;
  }

  remove(id: number) {
    return `This action removes a #${id} stablecoin`;
  }
}
