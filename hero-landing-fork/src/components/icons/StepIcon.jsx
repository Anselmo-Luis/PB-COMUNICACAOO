import { Eye } from 'lucide-react';
import { stepIcons } from './stepIcons';

export default function StepIcon({ name, size = 26 }) {
  const Icon = stepIcons[name] ?? Eye;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
