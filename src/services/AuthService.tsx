import jwt from 'jsonwebtoken-promisified';

const secretKey = 'KiVesd'; 

// create a token
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
         throw new Error("Invalid credentials");
      }

      const token = generateToken(username)

      // Store the token in localStorage
      localStorage.setItem('token', await token);

      return token;
   } catch (error) {
      console.error("Authentication error:", error);
      return null;
   }
};


// Retrieve the token from localStorage
export const getToken = (): string | null => {
   return localStorage.getItem('token');
};

const validateUser = (username: string, password: string): boolean => {
   return username === 'thisisadmin' && password === 'KiVesd';
};
