import { useState } from 'react';
import type { WidgetConfig } from '../types';

interface UseWidgetFormProps {
  onSubmit: (config: WidgetConfig) => void;
}

export function useWidgetForm({ onSubmit }: UseWidgetFormProps) {
  const [config, setConfig] = useState<WidgetConfig>({
    name: '',
    email: '',
    organization: '',
    location: '',
    depth: 3,
    width: 400,
    timeFrame: 'tonight',
    range: 10,
    displayElements: {
      artistName: true,
      venue: true,
      time: true,
      price: false,
      genre: false,
    },
    design: 'minimal',
  });

  const updateConfig = (updates: Partial<WidgetConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
  };

  return {
    config,
    updateConfig,
    handleSubmit,
  };
}