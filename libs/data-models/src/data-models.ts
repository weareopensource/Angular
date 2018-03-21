export interface Authenticate {
  email: string;
  password: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  roles: Array<string>;
}

export interface MenuItem {
  order: number;
  link: string;
  name: string;
  icon: string;
  roles?: Array<string>;
}

export interface Task {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly createdDate: Date;
  readonly updatedDate: Date;
  readonly userIds: Array<number>;
  readonly comments: Array<Comment>;
}

export interface Comment {
  id: number;
  body: string;
}
