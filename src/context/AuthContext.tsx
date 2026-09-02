import { createContext, useState, type ReactNode } from 'react'
import * as authService from '../services/authService'
import { getApiErrorMessage } from '../services/httpClient'

interface LoginResult {
    success: boolean
    error?: string
}

export interface AuthContextValue {
    isAuthenticated: boolean
    login: (username: string, password: string) => Promise<LoginResult>
    logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(authService.getToken()))

    async function handleLogin(username: string, password: string): Promise<LoginResult> {
        try {
            const token = await authService.login(username, password)
            authService.saveToken(token)
            setIsAuthenticated(true)
            return { success: true }
        } catch (err) {
            return { success: false, error: getApiErrorMessage(err) }
        }
    }

    function handleLogout() {
        authService.clearToken()
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    )
}
