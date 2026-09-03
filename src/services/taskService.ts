import { httpClient } from './httpClient'
import type { Task, NewTask } from '../types'

export async function getTasks(): Promise<Task[]> {
    const { data } = await httpClient.get<Task[]>('/tasks')
    return data
}

export async function createTask(projectId: number, body: NewTask): Promise<Task> {
    const { data } = await httpClient.post<Task>(`/projects/${projectId}/tasks`, body)
    return data
}