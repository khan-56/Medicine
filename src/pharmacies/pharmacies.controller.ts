import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';

@Controller('pharmacies')
export class PharmaciesController {
  constructor(private svc: PharmaciesService) {}

  @Get()
  list(@Query('near') near?: string) {
    return this.svc.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }
}
