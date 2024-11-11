export type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

type Location = {
  zip: number;
  country: string;
  city: string;
  street: string;
  building: number;
};

export type Price = {
  data: string;
  price: string;
};

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  avatar?: string | null;
}

export interface Company {
  id: number;
  companyName: string;
  service: string;
  description: string;
  createdDate: string;
  location: Location;
  capital: number;
}
