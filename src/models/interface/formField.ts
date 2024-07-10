import {ErrorObject} from "@/models/interface/errorObject";

export interface FormField {
    [key: string]: string | ErrorObject
    name: string,
    phone: string,
    email: string
    errors: ErrorObject
}