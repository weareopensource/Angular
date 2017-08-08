import {TypedRecord} from 'typed-immutable-record';

export interface IUser {
  firstName: string;
  lastName: string;
  roles: Array<string>;
  username: string;
  email: string;
};
export interface IMessage {
  type: string;
  message: string;
};

export interface IUserRecord extends TypedRecord<IUserRecord>, IUser {
};

export interface ISession {
  toggleSideNav: boolean;
  token: string;
  user: IUser;
  hasError: boolean;
  isLoading: boolean;
  hasMessage: string;
  actionType: string;
  };

export interface ISessionRecord extends TypedRecord<ISessionRecord>,
  ISession {
};
