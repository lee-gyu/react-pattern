import { createFileRoute } from '@tanstack/react-router'
import CompoundPattern from 'src/pages/CompoundPattern'

export const Route = createFileRoute('/compound')({
  component: CompoundPattern,
})
