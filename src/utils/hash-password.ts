import { hashSync } from 'bcrypt';

export const createHashedPassword = async (
  password: string,
): Promise<string> => {
  const saltOrRounds = 10;
  return hashSync(password, saltOrRounds);
};
