import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-move.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
