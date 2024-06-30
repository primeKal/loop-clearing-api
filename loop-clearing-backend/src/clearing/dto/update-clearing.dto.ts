import { PartialType } from '@nestjs/swagger';
import { CreateClearingDto } from './create-clearing.dto';

export class UpdateClearingDto extends PartialType(CreateClearingDto) {}
