export interface RegisterParams {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'USER';
}

export interface Location {
  id: number;
  zip: number;
  country: string;
  city: string;
  street: string;
  building: number;
}

export interface Price {
  id: number;
  price: number;
  date: string;
}

export type LoginParams = Pick<RegisterParams, 'email' | 'password'>;

export type RegisterResponse = {
  id: number;
  surname: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  role: 'USER';
};

export interface Company {
  id: number;
  companyName: string;
  service: string;
  description: string;
  capital: number;
  createdDate: string;
  userId: number;
  location: Location;
  prices: Price[];
  createdAt: '2024-10-17T16:46:02.414Z';
  updatedAt: '2024-10-17T16:46:02.414Z';
}

export type CreateCompanyData = Pick<
  Company,
  | 'companyName'
  | 'service'
  | 'description'
  | 'capital'
  | 'createdDate'
  | 'userId'
> & {
  location: Omit<Location, 'id'>;
} & {
  prices: Omit<Price, 'id'>[];
};

interface Meta {
  count: number;
  lastPage: number;
  previous: number;
  next: number;
}

export type ResponseData<T> = {
  data: T[];
  meta: Meta;
};
