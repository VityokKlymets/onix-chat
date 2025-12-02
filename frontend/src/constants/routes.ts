export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  CHAT: "/chat",

  // Dynamic routes
  USER: (id: string | number) => `/users/${id}`,
  PROJECT: (projectId: string | number) => `/projects/${projectId}`,

  // Groups (optional)
  SETTINGS: {
    ROOT: "/settings",
    ACCOUNT: "/settings/account",
    SECURITY: "/settings/security",
  },

  // 404
  NOT_FOUND: "*",
} as const;
