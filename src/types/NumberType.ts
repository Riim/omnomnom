import { addTypeValidators } from './addTypeValidators';
import { IType, typeProto } from './Type';

export interface INumberType extends IType {
	min(minValue: number): INumberType;
	max(maxValue: number): INumberType;
	between(minValue: number, maxValue: number): INumberType;
	positive: INumberType;
	negative: INumberType;
	integer: INumberType;
}

export const numberTypeProto: Object = {
	__proto__: typeProto,

	min(minValue: number): INumberType {
		return addTypeValidators(this, numberTypeProto, true, [(num: number) => num >= minValue]);
	},

	max(maxValue: number): INumberType {
		return addTypeValidators(this, numberTypeProto, true, [(num: number) => num <= maxValue]);
	},

	between(minValue: number, maxValue: number): INumberType {
		return this.min(minValue).max(maxValue);
	},

	get positive(): INumberType {
		return this.min(0);
	},

	get negative(): INumberType {
		return addTypeValidators(this, numberTypeProto, true, [(num: number) => num < 0]);
	},

	get integer(): INumberType {
		return addTypeValidators(this, numberTypeProto, true, [
			(num: number) => Number.isInteger(num)
		]);
	}
};