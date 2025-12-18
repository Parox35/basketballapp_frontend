import { customError, minLength, required, schema, validate } from "@angular/forms/signals";

export interface AuthResponseDto {
    id: number;
    firstName: string;
    lastName: string
    email: string;
    password: string;
    dateOfBirth: Date;
    phoneNumber: string;
    admin: boolean;
}

export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    dateOfBirth: Date;
    phoneNumber: string;
}

export const userRegisterSchema = schema<UserRegister>( context => {
    // First name and last name are required
    required(context.firstName);
    required(context.lastName);
    // Email must be a valid email format
    required(context.email);
    // Password must be at least 8 characters long
    required(context.password);
    minLength(context.password, 8);
    // Password confirmation must match password
    required(context.passwordConfirm);
    minLength(context.passwordConfirm, 8);
    // Custom validator to check if password and passwordConfirm match
    validate(context.passwordConfirm, passwordContext => {
        const password = passwordContext.valueOf(context.password);
        const passwordConfirm = passwordContext.value();

        if (password !== passwordConfirm) {
            return customError({ kind:'password-mismatch', message:'Password and confirmation do not match'});
        }

        return null;
    });
});