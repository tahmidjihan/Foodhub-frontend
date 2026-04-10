declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Backend API URL (public - accessible in browser)
     * Example: http://localhost:3001 or https://food-backend-rust-omega.vercel.app
     */
    NEXT_PUBLIC_BACKEND: string;
  }
}
