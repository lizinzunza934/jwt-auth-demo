import axios from 'axios'
import { getApiBaseUrl } from '../config/apiUrl'
import { TOKEN_KEY } from '../types'

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
    localStorage.removeItem(TOKEN_KEY)
}

export async function login(username: string, password: string): Promise<string> {
    const { data } = await axios.post<{ token: string }>(
        `${getApiBaseUrl()}/auth/login`,
        { username: username.trim(), password },
    )
    return data.token
}