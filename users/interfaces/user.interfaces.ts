import { string } from "joi";

export interface IError {
    message?: string;
    value?: string;
    param?: string | number;
}