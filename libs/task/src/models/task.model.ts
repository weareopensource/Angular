export interface Task {
  readonly id: number;
  title: string;
  description: string;
  readonly createdDate: Date;
  readonly updatedDate: Date;
  readonly userIds: Array<number>;
  readonly comments: Array<Comment>;
}
