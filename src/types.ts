export interface AuthResponse {
    token: string
}

export interface Project {
    id: number
    name: string
    description?: string
    ownerId: number
    createdAt: string
}

export interface NewProject {
    name: string
    description?: string
}

export const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? '/api' : 'https://d3ujwk09smrk9z.cloudfront.net')

export const TOKEN_KEY = 'jwt-auth-demo-token'