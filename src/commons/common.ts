export interface IPointUser {
  username: string;
  point: number;
}

export interface IInfoUser {
  id: number;
  username: string;
  name: string;
  totalPoints: number;
  totalQuestions: number;
  dateJoin: Date;
  rank: number;
}
