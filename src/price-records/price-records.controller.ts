import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PriceRecordsService } from './price-records.service';

@Controller('prices')
export class PriceRecordsController {
  constructor(private svc: PriceRecordsService) {}

  @Get()
  list(@Query('medicine_id') medicineId?: string) {
    if (!medicineId) return { error: 'medicine_id required' };
    return this.svc.findByMedicine(medicineId);
  }

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }
}
