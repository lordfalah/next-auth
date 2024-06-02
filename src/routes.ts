/**
 * An array of routes that are accessible to the public
 * these route do not required auth
 * @type {string[]}
 */

export const publicRoute = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for auth
 * these route will redirect logged in user to /setting
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-reset",
];

/**
 * the prefix for API auth routes
 * routes that star with this prefix are used for API auth
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The deffault redirect path after login
 * @type {string}
 */

export const DEFFAULT_LOGIN_REDIRECT = "/setting";
