export type IUser = {
  id: number;
  name: string;
  email: string;
};

export interface IUserRepository {
  save(user: IUser): Promise<void>;
  findByEmail(email: string): Promise<IUser | undefined>;
}
