import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StablecoinService } from './stablecoin.service';
import { CreateStablecoinDto } from './dto/create-stablecoin.dto';
import { UpdateStablecoinDto } from './dto/update-stablecoin.dto';

@Controller('stablecoin')
export class StablecoinController {
  constructor(private readonly stablecoinService: StablecoinService) {}

  @Post()
  create(@Body() createStablecoinDto: CreateStablecoinDto) {
    return this.stablecoinService.create(createStablecoinDto);
  }

  @Get()
  findAll() {
    return this.stablecoinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stablecoinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStablecoinDto: UpdateStablecoinDto) {
    return this.stablecoinService.update(+id, updateStablecoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stablecoinService.remove(+id);
  }
}
