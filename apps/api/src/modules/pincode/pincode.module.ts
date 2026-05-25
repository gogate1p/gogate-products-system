import { Module } from '@nestjs/common';
import { PincodeController } from './pincode.controller';
import { PincodeService } from './pincode.service';

@Module({ controllers: [PincodeController], providers: [PincodeService] })
export class PincodeModule {}
