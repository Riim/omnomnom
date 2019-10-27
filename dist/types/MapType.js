import { addTypeValidators } from '../addTypeValidators';
import { isNonZeroSize } from '../lib/utils';
import { validationState } from '../validationState';
import { typeProto } from './Type';
export const mapTypeProto = {
    __proto__: typeProto,
    keys(validator) {
        return addTypeValidators(this, true, {
            validator: (map) => {
                for (let [key] of map) {
                    let prevKeypath = validationState.currentKeypath;
                    validationState.currentKeypath = validationState.currentKeypath + `[${key}]`;
                    if (!validator(key)) {
                        if (!validationState.errorKeypatch) {
                            validationState.errorKeypatch = validationState.currentKeypath;
                        }
                        validationState.currentKeypath = prevKeypath;
                        return false;
                    }
                    validationState.currentKeypath = prevKeypath;
                }
                return true;
            }
        });
    },
    values(validator) {
        return addTypeValidators(this, true, {
            validator: (map) => {
                for (let [key, value] of map) {
                    let prevKeypath = validationState.currentKeypath;
                    validationState.currentKeypath = validationState.currentKeypath + `[${key}]`;
                    if (!validator(value)) {
                        if (!validationState.errorKeypatch) {
                            validationState.errorKeypatch = validationState.currentKeypath;
                        }
                        validationState.currentKeypath = prevKeypath;
                        return false;
                    }
                    validationState.currentKeypath = prevKeypath;
                }
                return true;
            }
        });
    },
    get nonEmpty() {
        return addTypeValidators(this, true, { validator: isNonZeroSize });
    }
};
