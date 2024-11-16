import React from 'react';
import { Music2, Mail, Building2, MapPin, Layout, Calendar, Ruler, Settings2 } from 'lucide-react';
import { useCreateWidget } from '../hooks/useCreateWidget';
import { WidgetPreview } from './WidgetPreview';
import { WidgetForm } from './WidgetForm';
import { WidgetSuccess } from './WidgetSuccess';
import { Logo } from './Logo';

export default function WidgetMaker() {
  const { mutate: createWidget, data: widgetData, isLoading, isSuccess } = useCreateWidget();

  if (isSuccess && widgetData) {
    return <WidgetSuccess widgetData={widgetData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-48 h-48 mx-auto mb-6 bg-brand-blue rounded-2xl p-4">
            <Logo className="drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Live Music Locator
          </h1>
          <p className="text-xl text-brand-blue">
            Create your custom live music events widget in minutes
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <WidgetForm onSubmit={createWidget} isLoading={isLoading} />
          <WidgetPreview />
        </div>
      </div>
    </div>
  );
}