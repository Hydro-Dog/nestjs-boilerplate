/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
	ArgumentMetadata,
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// pipe fires before each controller where we set it--------------------------------------------
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata) {
		if (value instanceof Object && this.isEmpty(value)) {
			throw new HttpException(
				'Validation failed: no body',
				HttpStatus.BAD_REQUEST,
			);
		}

		const { metatype } = metadata;
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);
		const errors = await validate(object);

		const errorsArr = errors.map(error => {
			for (const err of Object.values(error.constraints)) {
				return err;
			}
		});

		if (errors.length > 0) {
			throw new HttpException(
				`Validation failed: ${errorsArr}`,
				HttpStatus.BAD_REQUEST,
			);
		}
		return value;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}

	private isEmpty(value: Object) {
		return !Object.keys(value).length;
	}
}
