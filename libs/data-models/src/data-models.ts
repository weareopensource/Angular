export interface Authenticate {
  email: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  roles: string[];
}

export interface MenuItem {
  order: number;
  link: string;
  name: string;
  icon: string;
  roles?: string[];
}
