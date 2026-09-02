import { API_URL } from '../types'

export function getApiBaseUrl(): string {
    return API_URL.replace(/\/$/, '')
}
