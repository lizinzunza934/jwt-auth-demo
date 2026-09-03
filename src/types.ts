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

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MED' | 'HIGH'

export interface Task {
    id: number
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    projectId: number
    assigneeId?: number
    dueDate?: string
}

export interface NewTask {
    title: string
    description?: string
    priority: TaskPriority
    assigneeId?: number
    dueDate?: string
}