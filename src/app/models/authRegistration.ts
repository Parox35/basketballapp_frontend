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
    required(context.firstName, { message: 'Le prénom est requis' });
    required(context.lastName, { message: 'Le nom de famille est requis' });
    // Email must be a valid email format
    required(context.email, { message: 'Email est requis' });
    // Password must be at least 8 characters long
    required(context.password, { message: 'Mot de passe requis' });
    minLength(context.password, 8, { message: 'Mot de passe doit contenir au moins 8 caractères' });
    // Password confirmation must match password
    required(context.passwordConfirm, { message: 'Confirmation du mot de passe requise' });
    minLength(context.passwordConfirm, 8, { message: 'Confirmation du mot de passe doit contenir au moins 8 caractères' });
    // Custom validator to check if password and passwordConfirm match
    validate(context.passwordConfirm, passwordContext => {
        const password = passwordContext.valueOf(context.password);
        const passwordConfirm = passwordContext.value();

        if (password !== passwordConfirm) {
            return customError({ kind:'password-mismatch', message:'Les mots de passe ne correspondent pas' });
        }

        return null;
    });
    // Date of birth is required
    required(context.dateOfBirth, { message: 'La date de naissance est requise' });
    validate(context.dateOfBirth, dobContext => {
        const dob = dobContext.value();
        const today = new Date();
        if (dob >= today) {
            return customError({ kind: 'invalid-dob', message: 'La date de naissance est invalide' });
        }
        return null;
    });
    // Phone number is required
    required(context.phoneNumber, { message: 'Le numéro de téléphone est requis' });
});