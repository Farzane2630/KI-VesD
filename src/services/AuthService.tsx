import jwt from 'jsonwebtoken-promisified';

const secretKey = import.meta.env.VITE_MY_APP_SECRET_KEY;
const secretUsername = import.meta.env.VITE_MY_APP_SECRET_KUSERNAME;


// Create the token
const generateToken = async (username: string): Promise<string> => {
  const token = await jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return token;
};

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string | null> => {
  try {
    const isValidUser = validateUser(username, password);

    if (!isValidUser) {
      throw new Error('Invalid credentials');
    }

    const token = await generateToken(username);

    // Set the token as an HttpOnly cookie
    setTokenCookie(token);

    return token;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Retrieve the token from cookies
export const getToken = (): string | null => {
  return getCookie('token');
};

const validateUser = (username: string, password: string): boolean => {
  return username === secretUsername && password === secretKey;
};

// Helper function to set HttpOnly cookie
const setTokenCookie = (token: string): void => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 60 * 1000); // 1 hour expiration

  document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/; HttpOnly`;
};

// Helper function to get cookie value by name
const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};
