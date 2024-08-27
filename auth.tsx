import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface User {
  id: string;
  username: string;
  password: string;
}

const users: User[] = [];

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const register = async (username: string, password: string): Promise<User> => {
  const hashedPassword = await hashPassword(password);
  const newUser: User = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

export const login = async (username: string, password: string): Promise<string> => {
  const user = users.find(user => user.username === username);
  if (!user) {
    throw new Error('User not found');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
  return token;
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const isAuthenticated = (token: string): boolean => {
  try {
    const decoded = verifyToken(token);
    return !!decoded;
  } catch (error) {
    return false;
  }
};