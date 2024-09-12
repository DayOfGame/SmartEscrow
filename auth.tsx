import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface IUser {
  id: string;
  username: string;
  encryptedPassword: string;
}

const registeredUsers: IUser[] = [];

const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const registerUser = async (username: string, password: string): Promise<IUser> => {
  const hashedPassword = await encryptPassword(password);
  const newUser: IUser = {
    id: Date.now().toString(),
    username,
    encryptedPassword: hashedPassword,
  };
  registeredUsers.push(newUser);
  return newUser;
};

export const loginUser = async (username: string, password: string): Promise<string> => {
  const user = registeredUsers.find(user => user.username === username);
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.encryptedPassword);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const authToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  return authToken;
};

export const validateToken = (token: string): jwt.JwtPayload | string => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const userIsAuthenticated = (token: string): boolean => {
  try {
    const decodedToken = validateToken(token);
    return !!decodedToken;
  } catch (error) {
    return false;
  }
};