export interface User {
  _id?: string;
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  roles: Array<string>;
}
