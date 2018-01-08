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

export interface Task {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly createdDate: Date;
  readonly updatedDate: Date;
  readonly userIds: number[];
  readonly comments: Comment[];
}

export interface Comment {
  id: number;
  body: string;
}
