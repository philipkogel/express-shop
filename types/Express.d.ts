declare namespace Express {
  export interface Request {
    user: any
    cart: any
    isAuthenticated: boolean
  }
}
