import { useState } from 'react';
import { z } from 'zod';
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
    coordinates: {
      lat: 0,
      lng: 0
    },
    depth: 3,
    width: 400,
    timeFrame: 'tonight',
    range: 2,
    displayElements: {
      artistName: true,
      venue: true,
      time: true,
      price: false,
      genre: false,
    },
    design: 'minimal',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateConfig = (updates: Partial<WidgetConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const updatedFields = Object.keys(updates);
    if (updatedFields.length > 0) {
      setErrors(prev => {
        const next = { ...prev };
        updatedFields.forEach(field => delete next[field]);
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(config);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    config,
    updateConfig,
    handleSubmit,
    errors,
    isLoading
  };
}