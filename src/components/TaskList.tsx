import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Task } from '../types'

interface TaskListProps {
    tasks: Task[]
    loading: boolean
    error: string | null
    onDelete: (id: number) => void
    onToggleStatus: (task: Task) => void
}

export function TaskList({ tasks, loading, error, onDelete, onToggleStatus }: TaskListProps) {
    if (loading) return <Typography color="text.secondary">Cargando tareas...</Typography>
    if (error) return <Alert severity="error">{error}</Alert>
    if (tasks.length === 0) return <Typography color="text.secondary">Este proyecto no tiene tareas.</Typography>

    return (
        <List>
            {tasks.map((task) => (
                <ListItem key={task.id} divider sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <ListItemText
                        primary={task.title}
                        secondary={
                            <Stack direction="row" spacing={1} mt={0.5}>
                                <Chip label={task.status} size="small" color={task.status === 'DONE' ? 'success' : 'default'} />
                                <Chip label={task.priority} size="small" variant="outlined" />
                                {task.dueDate && <Typography variant="caption" color="text.secondary">📅 {task.dueDate}</Typography>}
                            </Stack>
                        }
                    />
                    <Stack direction="row" spacing={1} mt={1}>
                        <Button size="small" variant="outlined" onClick={() => onToggleStatus(task)}>
                            Estado
                        </Button>
                        <Button size="small" color="error" onClick={() => onDelete(task.id)}>
                            Borrar
                        </Button>
                    </Stack>
                </ListItem>
            ))}
        </List>
    )
}