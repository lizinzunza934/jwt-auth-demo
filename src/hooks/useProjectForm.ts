import { useState } from 'react'
import { createProject } from '../services/projectService'

interface UseProjectFormOptions {
    onSuccess?: () => void
}

export function useProjectForm({ onSuccess }: UseProjectFormOptions = {}) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const valid = name.trim().length >= 3

    function reset() {
        setName('')
        setDescription('')
        setError(null)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!valid || submitting) return

        setSubmitting(true)
        setError(null)

        try {
            await createProject({
                name: name.trim(),
                description: description.trim() || undefined,
            })
            reset()
            onSuccess?.()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear el proyecto')
        } finally {
            setSubmitting(false)
        }
    }

    return {
        name,
        setName,
        description,
        setDescription,
        submitting,
        error,
        valid,
        handleSubmit,
    }
}