import { KEY_STATE } from './constants';
import { ITypes, typesProto } from './Types';
import { TValidator } from './types/Type';
import { validationState } from './validationState';

export { ITypes } from './Types';
export { IType, TValidator } from './types/Type';

export interface IOmNamNam extends ITypes {
	(validator: TValidator, value: any): true;
}

export const om: IOmNamNam = ((validator: TValidator, value: any): true => {
	validationState.errorKeypatch = null;

	if (!validator(value)) {
		if (validationState.errorKeypatch) {
			throw TypeError(`Type mismatch at "${validationState.errorKeypatch}"`);
		}

		throw TypeError('Type mismatch');
	}

	return true;
}) as any;
(om as any).__proto__ = typesProto;
om[KEY_STATE] = {
	validators: [],
	andMode: false
};

export { om as default };