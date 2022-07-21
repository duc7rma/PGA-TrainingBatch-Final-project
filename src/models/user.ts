export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IUser {
  profile_id: string,
  login: string
  firstName: string
  lastName: string,
  dateOfLoginAttempt: string,
  countOfLoginAttempts: string,
  forceChangePassword: string
}

export interface IUserList {
  profile_id: string,
          vendor: string,
          fistName: string | null,
          lastName: string | null,
          created: string,
          last_login: string,
          access_level:string,
          vendor_id: string,
          storeName: string | null,
          product: string,
          order: {
              order_as_buyer: number,
              order_as_buyer_total: string
          },
          wishlist: string
}

export interface INewUser {
  firstName: string,
  lastName: string,
  email: string;
  password: string;
  confirm_password: string;
  membership_id: string | number,
  forceChangePassword:string | number,
  taxExempt:string | number,
  paymentRailsType:string,
  access_level: string | number,
  roles: string[]
}

export interface IUserTypes {
  value: string | number;
  label: string;
}

export interface ICountry {
  code: string;
  currency_id: string | number;
  id: string | undefined;
  code3: string;
  enabled: string | number;
  active_currency: string | null;
  is_fraudlent: string;
  country: string;
}

export interface IFilters {
  address: string,
  count: string | number,
  country: string,
  date_range: string[],
  date_type: string,
  memberships: (string|number)[],
  order_by: string,
  page: string | number,
  phone: string,
  search: string,
  sort: string,
  state: string,
  status: string[],
  types: (string|number)[],
  tz: string | number,
}

export interface IStates {
  state_id: string, 
  country_code: string, 
  region_code: null, 
  state: string, 
  code: string
}

export interface userRemove {
  id: string;
  delete: number;
}