export interface Article {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly createdDate: Date;
  readonly updatedDate: Date;
  readonly userIds: number[];
  readonly mediaIds: number[];
}
