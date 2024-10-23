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
  avatar: string | null;
  companyName: string;
  service: string;
  description: string;
  capital: number;
  createdDate: Date;
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
  | 'userId'
  | 'createdDate'
> & {
  location: Omit<Location, 'id'>;
};

interface Meta {
  count: number;
  lastPage: number;
  prev: number | null;
  next: number | null;
}

export type ResponseData<T> = {
  data: T;
  meta: Meta;
};
