import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IUserCredentials {
  id: string;
  username: string;
  hashedPassword: string;
}

const registeredUsers: IUserCredentials[] = [];

const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, 10);
};

export const registerNewUser = async (username: string, plainPassword: string): Promise<IUserCredentials> => {
  const hashedPassword = await hashPassword(plainPassword);
  const newUser: IUserCredentials = {
    id: Date.now().toString(),
    username,
    hashedPassword,
  };
  registeredUsers.push(newUser);
  return newUser;
};

export const authenticateUserAndGetToken = async (username: string, plainPassword: string): Promise<string> => {
  const user = registeredUsers.find(userRecord => userRecord.username === username);
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordMatch = await bcrypt.compare(plainPassword, user.hashedPassword);
  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }
  const authToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  return authToken;
};

export const decodeAndValidateToken = (token: string): jwt.JwtPayload | string => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const isUserAuthenticated = (token: string): boolean => {
  try {
    const decodedToken = decodeAndValidateToken(token);
    return !!decodedToken;
  } catch (error) {
    return false;
  }
};