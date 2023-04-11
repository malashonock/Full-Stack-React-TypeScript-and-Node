import bcrypt from 'bcryptjs';

const hashPassword = async (plainTextPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashedPassword;
};

const comparePasswords = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
  const match = await bcrypt.compare(plainTextPassword, hashedPassword);
  return match;
};

export default {
  hashPassword,
  comparePasswords
}