import { PersonaType } from '#/lib/utils';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object | undefined ? RecursivePartial<T[P]> :
    T[P];
};

interface DatabaseRecord {
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface Business extends DatabaseRecord {
	name: string;
	logo: string;
	description?: string;
	email?: string;
	phoneNumber?: string;
	registrationNumber?: string;
	address?: string;
}

export type Persona = {
  name: string;
  description: string;
  short: string;
  introduction: string;
  avatar: string;
  attributes: string;
};

export type Personas = {
	[key in PersonaType]: Persona;
};
