import React from 'react';
import { Music2 } from 'lucide-react';
import { useCreateWidget } from '../hooks/useCreateWidget';
import { WidgetPreview } from './WidgetPreview';
import { WidgetForm } from './WidgetForm';
import { WidgetSuccess } from './WidgetSuccess';
import { Logo } from './Logo';
import { useWidgetForm } from '../hooks/useWidgetForm';

export default function WidgetMaker() {
  const { mutate: createWidget, data: widgetData, isLoading, isSuccess } = useCreateWidget();
  const { config, updateConfig, handleSubmit, errors } = useWidgetForm({
    onSubmit: createWidget,
  });

  if (isSuccess && widgetData) {
    return <WidgetSuccess widgetData={widgetData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-brand-blue rounded-2xl p-4">
            <Logo className="drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Live Music Locator
          </h1>
          <p className="text-xl text-brand-blue">
            Create your custom live music events widget in minutes
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <WidgetForm 
              config={config}
              onConfigChange={updateConfig}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              errors={errors}
            />
          </div>
          
          <div className="lg:w-[480px] lg:flex-shrink-0 sticky top-8">
            <WidgetPreview config={config} />
          </div>
        </div>
      </div>
    </div>
  );
}