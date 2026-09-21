import { Eye } from 'lucide-react';
import { stepIcons } from './stepIcons';

export default function StepIcon({ name, size = 38 }) {
  const Icon = stepIcons[name] ?? Eye;
  return <Icon size={size} strokeWidth={2.25} aria-hidden="true" />;
}
