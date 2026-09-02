import { httpClient } from './httpClient'
import type { NewProject, Project } from '../types'

export async function getProjects(): Promise<Project[]> {
    const { data } = await httpClient.get<Project[]>('/projects')
    return data
}

export async function createProject(body: NewProject): Promise<Project> {
    const { data } = await httpClient.post<Project>('/projects', body)
    return data
}
