import { authenticateUser, getToken } from "./AuthService";

// Mock localStorage for testing
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

test("authenticateUser returns a token on valid credentials", async () => {
  const token = await authenticateUser && authenticateUser("thisisadmin", "KiVesb");
  expect(token).not.toBeNull();
});

test("authenticateUser returns null on invalid credentials", async () => {
  const token = await authenticateUser("invaliduser", "invalidpassword");
  expect(token).toBeNull();
});

test("getToken retrieves token from localStorage", () => {
  localStorage.setItem("token", "test-token");
  const token = getToken();
  expect(token).toBe("test-token");
});
