import { IType, TValidator } from './Type';
export interface ISetType extends IType {
    of(validator: TValidator): ISetType;
}
export declare const setTypeProto: Object;