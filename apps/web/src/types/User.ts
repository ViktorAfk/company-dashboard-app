export type Role = 'user' | 'admin' | 'super admin';

type Location = {
  zip: number;
  country: string;
  city: string;
  street: string;
  building: number;
};

type Price = {
  data: string;
  price: string;
};

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: Role;
  password: string;
  telephoneNumber: string;
  logoUrl: string;
  prices: Price[];
  userId: number;
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
