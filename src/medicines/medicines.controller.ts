import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('medicines')
export class MedicinesController {
  constructor(private svc: MedicinesService) {}

  @Get()
  search(@Query('query') q: string, @Query('page') page = '1', @Query('limit') limit = '20') {
    return this.svc.search(q, parseInt(page), parseInt(limit));
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }
}
