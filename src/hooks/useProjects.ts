import { useCallback, useEffect, useState } from 'react'
import { getProjects } from '../services/projectService'
import type { Project } from '../types'

interface UseProjectsResult {
    projects: Project[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export function useProjects(): UseProjectsResult {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [reloadKey, setReloadKey] = useState(0)

    const refetch = useCallback(() => {
        setReloadKey((key) => key + 1)
    }, [])

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)

        getProjects()
            .then((data) => {
                if (!cancelled) setProjects(data)
            })
            .catch((err: unknown) => {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar proyectos')
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [reloadKey])

    return { projects, loading, error, refetch }
}

