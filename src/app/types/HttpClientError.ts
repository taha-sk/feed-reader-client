import { ValidationError } from "./ValidationError";

export interface HttpClientError {
    errors: ValidationError[];
    status_code: number;
    error_message: string;
    error_body: any;
}