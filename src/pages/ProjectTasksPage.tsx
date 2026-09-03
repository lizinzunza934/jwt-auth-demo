import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTask, getTasks } from '../services/taskService'
import { getProjects } from '../services/projectService'
import type { Task, TaskPriority } from '../types'

export function ProjectTasksPage() {
    const { projectId } = useParams<{ projectId: string }>()
    const navigate = useNavigate()

    const [tasks, setTasks] = useState<Task[]>([])
    const [projectName, setProjectName] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<TaskPriority>('HIGH')
    const [assigneeId, setAssigneeId] = useState<number>(2)
    const [dueDate, setDueDate] = useState('2030-12-31')

    const numericProjectId = Number(projectId)

    useEffect(() => {
        loadData()
    }, [numericProjectId])

    async function loadData() {
        setLoading(true)
        setError(null)
        try {
            const [allTasks, projects] = await Promise.all([getTasks(), getProjects()])

            setTasks(allTasks.filter((t) => t.projectId === numericProjectId))

            const currentProject = projects.find((p) => p.id === numericProjectId)
            if (currentProject) {
                setProjectName(currentProject.name)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar los datos')
        } finally {
            setLoading(false)
        }
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        if (!title.trim()) return
        try {
            await createTask(numericProjectId, {
                title: title.trim(),
                description: description.trim() || 'Sin descripción',
                priority,
                assigneeId: Number(assigneeId),
                dueDate
            })
            setTitle('')
            setDescription('')
            setPriority('HIGH')
            setAssigneeId(2)
            setDueDate('2027-12-31')
            loadData()
        } catch (err) {
            alert('No se pudo crear la tarea')
        }
    }

    const statusLabels: Record<string, { label: string, color: 'default' | 'warning' | 'success' }> = {
        TODO: { label: 'Por hacer', color: 'default' },
        IN_PROGRESS: { label: 'En curso', color: 'warning' },
        DONE: { label: 'Hecha', color: 'success' }
    }

    return (
        <Box maxWidth={960} mx="auto" mt={6} px={2}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{ mb: 2 }}
            >
                Volver a Proyectos
            </Button>

            <Typography variant="h4" gutterBottom>
                Gestor de Tareas
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 3, fontWeight: 'bold' }}>
                Proyecto: {projectName ? `${projectName} (ID: ${numericProjectId})` : `ID: ${numericProjectId}`}
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Nueva Tarea</Typography>
                <form onSubmit={handleCreate}>
                    <Stack spacing={2}>
                        <TextField
                            label="Título *"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            label="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            size="small"
                            multiline
                            rows={2}
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Prioridad</InputLabel>
                                <Select
                                    value={priority}
                                    label="Prioridad"
                                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                                >
                                    <MenuItem value="LOW">LOW</MenuItem>
                                    <MenuItem value="MED">MED</MenuItem>
                                    <MenuItem value="HIGH">HIGH</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Fecha límite"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                size="small"
                            />

                            <TextField
                                label="Asignado (ID)"
                                type="number"
                                value={assigneeId}
                                onChange={(e) => setAssigneeId(Number(e.target.value))}
                                fullWidth
                                size="small"
                            />
                        </Stack>

                        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
                            Crear Tarea
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <TableContainer component={Paper}>
                {loading && <Box p={3}><Typography color="text.secondary">Cargando tareas...</Typography></Box>}
                {error && <Box p={3}><Alert severity="error">{error}</Alert></Box>}
                {!loading && !error && tasks.length === 0 && (
                    <Box p={3}><Typography color="text.secondary">No hay tareas en este proyecto.</Typography></Box>
                )}

                {!loading && !error && tasks.length > 0 && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Título</b></TableCell>
                                <TableCell><b>Estado</b></TableCell>
                                <TableCell><b>Prioridad</b></TableCell>
                                <TableCell><b>Fecha límite</b></TableCell>
                                <TableCell><b>Asignado</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task) => {
                                const statusInfo = statusLabels[task.status] || { label: task.status, color: 'default' }
                                return (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>
                                            <Chip label={statusInfo.label} size="small" color={statusInfo.color} />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={task.priority}
                                                size="small"
                                                color={task.priority === 'HIGH' ? 'error' : task.priority === 'MED' ? 'warning' : 'default'}
                                            />
                                        </TableCell>
                                        <TableCell>{task.dueDate || '—'}</TableCell>
                                        <TableCell>{task.assigneeId ?? '—'}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    )
}