import { createFileRoute } from '@tanstack/react-router'
import Recursive from 'src/pages/Recursive'

export const Route = createFileRoute('/recursive')({
  component: Recursive,
})
