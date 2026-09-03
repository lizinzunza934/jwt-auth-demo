import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../types'

interface ProjectListProps {
    projects: Project[]
    loading: boolean
    error: string | null
}

export function ProjectList({ projects, loading, error }: ProjectListProps) {
    const navigate = useNavigate()

    if (loading) {
        return (
            <Stack alignItems="center" py={4}>
                <CircularProgress />
            </Stack>
        )
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    if (projects.length === 0) {
        return <Typography color="text.secondary">No hay proyectos.</Typography>
    }

    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                Proyectos ({projects.length})
            </Typography>
            <List>
                {projects.map((project) => (
                    <ListItem key={project.id} divider sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                        <ListItemText
                            primary={project.name}
                            secondary={project.description || `ID ${project.id}`}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(`/projects/${project.id}/tasks`)}
                        >
                            Ver Tareas
                        </Button>
                    </ListItem>
                ))}
            </List>
        </>
    )
}