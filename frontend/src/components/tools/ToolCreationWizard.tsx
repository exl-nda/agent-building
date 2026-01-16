import React, { useState, useCallback, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCheck, FiX, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { ToolTypeSelector } from './ToolTypeSelector';
import { WebSearchConfig } from './WebSearchConfig';
import { RAGConfig } from './RAGConfig';
import { CodeEditorConfig } from './CodeEditorConfig';
import { APICallConfig } from './APICallConfig';
import { SAPConfig } from './SAPConfig';
import { DatabricksConfig } from './DatabricksConfig';
import { WorkdayConfig } from './WorkdayConfig';
import { SalesforceConfig } from './SalesforceConfig';

type ToolType = 'rag' | 'web_search' | 'custom_code' | 'agent' | 'api_call' | 'llm_tool' | 'mcp_server' | 'sap' | 'databricks' | 'workday' | 'salesforce';

interface ToolBase {
  name: string;
  description: string;
  type: ToolType;
  config: any;
  code: string;
  is_active: boolean;
  parameters: any[];
}

interface ToolCreationWizardProps {
  formData: ToolBase;
  setFormData: (updater: (prev: ToolBase) => ToolBase) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onPreview: () => Promise<void>;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  previewCode: string;
  isSubmitting: boolean;
  isGeneratingPreview: boolean;
  editingTool: any;
  serverUrl: string;
  generateDefaultRAGPrompt: () => void;
  generateDefaultWebSearchPrompt: () => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

type WizardStep = 'type' | 'basic' | 'config' | 'preview' | 'review';

const steps: { key: WizardStep; label: string; description: string }[] = [
  { key: 'type', label: 'Tool Type', description: 'Select the type of tool' },
  { key: 'basic', label: 'Basic Info', description: 'Name and description' },
  { key: 'config', label: 'Configuration', description: 'Tool-specific settings' },
  { key: 'preview', label: 'Preview Code', description: 'Review generated code' },
  { key: 'review', label: 'Review', description: 'Final review and submit' },
];

export const ToolCreationWizard: React.FC<ToolCreationWizardProps> = ({
  formData,
  setFormData,
  onInputChange,
  onPreview,
  onSubmit,
  onCancel,
  previewCode,
  isSubmitting,
  isGeneratingPreview,
  editingTool,
  generateDefaultRAGPrompt,
  generateDefaultWebSearchPrompt,
  isFullscreen,
  toggleFullscreen,
}) => {
  // Start at type step for new tools, or basic step if editing (type is locked)
  const [currentStep, setCurrentStep] = useState<WizardStep>(editingTool ? 'basic' : 'type');
  const [stepErrors, setStepErrors] = useState<Record<WizardStep, string | null>>({
    type: null,
    basic: null,
    config: null,
    preview: null,
    review: null,
  });

  // Reset to first step when starting a new tool creation
  useEffect(() => {
    if (!editingTool && currentStep !== 'type') {
      setCurrentStep('type');
    }
  }, [editingTool]);

  const currentStepIndex = steps.findIndex(s => s.key === currentStep);
  const totalSteps = steps.length;

  const validateStep = useCallback((step: WizardStep): boolean => {
    let isValid = true;
    const errors: Record<WizardStep, string | null> = { ...stepErrors };

    switch (step) {
      case 'type':
        if (!formData.type) {
          errors.type = 'Please select a tool type';
          isValid = false;
        } else {
          errors.type = null;
        }
        break;
      case 'basic':
        if (!formData.name || formData.name.trim() === '') {
          errors.basic = 'Tool name is required';
          isValid = false;
        } else {
          errors.basic = null;
        }
        break;
      case 'config':
        // Type-specific validation can be added here
        errors.config = null;
        break;
      case 'preview':
        // For custom_code, preview is not required
        if (formData.type !== 'custom_code' && (!previewCode || previewCode.trim() === '')) {
          errors.preview = 'Please generate preview code first';
          isValid = false;
        } else {
          errors.preview = null;
        }
        break;
      case 'review':
        errors.review = null;
        break;
    }

    setStepErrors(errors);
    return isValid;
  }, [formData, previewCode, stepErrors]);

  const handleNext = useCallback(async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    // If moving to preview step, generate preview code first (except for custom_code)
    // Skip generation if preview code already exists (e.g., when editing)
    if (currentStep === 'config' && formData.type !== 'custom_code' && !previewCode) {
      try {
        await onPreview();
        // Proceed to preview step after generating code
        const nextStepIndex = currentStepIndex + 1;
        if (nextStepIndex < totalSteps) {
          setCurrentStep(steps[nextStepIndex].key);
        }
      } catch (error) {
        console.error('Failed to generate preview:', error);
        // Don't proceed if preview generation failed
        return;
      }
    } else {
      const nextStepIndex = currentStepIndex + 1;
      if (nextStepIndex < totalSteps) {
        setCurrentStep(steps[nextStepIndex].key);
      }
    }
  }, [currentStep, currentStepIndex, totalSteps, validateStep, onPreview, formData.type, previewCode]);

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].key);
    }
  }, [currentStepIndex]);

  const handleStepClick = useCallback((step: WizardStep, index: number) => {
    // Only allow clicking on completed steps or current step
    if (index <= currentStepIndex) {
      setCurrentStep(step);
    }
  }, [currentStepIndex]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'type':
        return (
          <div>
            <ToolTypeSelector
              value={formData.type}
              onChange={(e) => {
                const syntheticEvent = {
                  target: {
                    name: 'type',
                    value: e.target.value,
                    type: 'select-one'
                  }
                } as React.ChangeEvent<HTMLSelectElement>;
                onInputChange(syntheticEvent);
              }}
              disabled={!!editingTool}
            />
            {stepErrors.type && (
              <p className="mt-2 text-sm text-red-400">{stepErrors.type}</p>
            )}
          </div>
        );

      case 'basic':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-600 rounded-md bg-gray-800 text-white p-2"
                value={formData.name}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-600 rounded-md bg-gray-800 text-white p-2"
                value={formData.description}
                onChange={onInputChange}
              />
            </div>
            <div className="flex items-center">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                checked={formData.is_active}
                onChange={onInputChange}
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-300">
                Active
              </label>
            </div>
            {stepErrors.basic && (
              <p className="text-sm text-red-400">{stepErrors.basic}</p>
            )}
          </div>
        );

      case 'config':
        return (
          <div className="space-y-4">
            {formData.type === 'web_search' && (
              <WebSearchConfig
                formData={formData}
                onInputChange={onInputChange}
                onGenerateDefaultPrompt={generateDefaultWebSearchPrompt}
              />
            )}
            {formData.type === 'rag' && (
              <RAGConfig
                formData={formData}
                onInputChange={onInputChange}
                onGenerateDefaultPrompt={generateDefaultRAGPrompt}
                setFormData={setFormData}
              />
            )}
            {formData.type === 'custom_code' && (
              <CodeEditorConfig
                code={formData.code || ''}
                onCodeChange={(value: string) => setFormData(prev => ({
                  ...prev,
                  code: value || ''
                }))}
                previewCode={previewCode}
                isPreview={false}
                language="python"
              />
            )}
            {formData.type === 'api_call' && (
              <APICallConfig
                formData={formData}
                onInputChange={onInputChange}
                setFormData={setFormData}
              />
            )}
            {formData.type === 'sap' && (
              <SAPConfig
                formData={formData}
                onInputChange={onInputChange}
                setFormData={setFormData}
              />
            )}
            {formData.type === 'databricks' && (
              <DatabricksConfig
                formData={formData}
                onInputChange={onInputChange}
                setFormData={setFormData}
              />
            )}
            {formData.type === 'workday' && (
              <WorkdayConfig
                formData={formData}
                onInputChange={onInputChange}
                setFormData={setFormData}
              />
            )}
            {formData.type === 'salesforce' && (
              <SalesforceConfig
                formData={formData}
                onInputChange={onInputChange}
                setFormData={setFormData}
              />
            )}
            {(formData.type === 'mcp_server' || formData.type === 'llm_tool' || formData.type === 'agent') && (
              <div className="p-4 bg-yellow-900/20 text-yellow-400 rounded-lg border border-yellow-800">
                <p className="font-medium">
                  {formData.type === 'mcp_server' && 'MCP Server Integration Tool'}
                  {formData.type === 'llm_tool' && 'LLM Tool Integration Tool'}
                  {formData.type === 'agent' && 'AI Agent Tool'}
                </p>
                <p className="text-sm mt-1">This feature is not yet supported. Check back in a future update!</p>
              </div>
            )}
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-4">
            {formData.type === 'custom_code' ? (
              <div>
                <p className="text-sm text-gray-400 mb-4">
                  For custom code tools, the code you wrote will be used directly.
                </p>
                <CodeEditorConfig
                  code={formData.code || ''}
                  onCodeChange={(value: string) => setFormData(prev => ({
                    ...prev,
                    code: value || ''
                  }))}
                  previewCode={previewCode}
                  isPreview={true}
                  language="python"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Generated Code
                  </label>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="text-gray-400 hover:text-gray-200"
                    title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
                  </button>
                </div>
                {!previewCode && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={onPreview}
                      disabled={isGeneratingPreview}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingPreview ? 'Generating...' : 'Generate Preview Code'}
                    </button>
                  </div>
                )}
                {previewCode && (
                  <div className="relative h-96 w-full bg-gray-900 p-4 rounded-md overflow-auto">
                    {isFullscreen && (
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          type="button"
                          onClick={toggleFullscreen}
                          className="text-gray-300 hover:text-white"
                        >
                          <FiX size={20} />
                        </button>
                      </div>
                    )}
                    <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">
                      {previewCode || 'No code generated'}
                    </pre>
                  </div>
                )}
                {stepErrors.preview && (
                  <p className="mt-2 text-sm text-red-400">{stepErrors.preview}</p>
                )}
              </div>
            )}
          </div>
        );

      case 'review':
        return (
          <div className="space-y-4">
            <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Tool Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="text-gray-400 w-24">Type:</span>
                    <span className="text-white">{formData.type}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-24">Name:</span>
                    <span className="text-white">{formData.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-24">Description:</span>
                    <span className="text-white">{formData.description || 'No description'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-24">Status:</span>
                    <span className="text-white">{formData.is_active ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
            </div>
            {previewCode && formData.type !== 'custom_code' && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Generated Code Preview</h3>
                <div className="bg-gray-900 p-3 rounded-md max-h-48 overflow-auto">
                  <pre className="text-gray-200 text-xs font-mono whitespace-pre-wrap">
                    {previewCode.substring(0, 500)}{previewCode.length > 500 ? '...' : ''}
                  </pre>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Progress Steps */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {editingTool ? 'Edit Tool' : 'Create New Tool'}
          </h2>
          <span className="text-sm text-gray-400">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isClickable = index <= currentStepIndex;

            return (
              <React.Fragment key={step.key}>
                <button
                  type="button"
                  onClick={() => handleStepClick(step.key, index)}
                  disabled={!isClickable}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                    ${isCurrent
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }
                    ${isClickable && !isCurrent ? 'cursor-pointer' : ''}
                  `}
                >
                  {isCompleted ? (
                    <FiCheck className="w-4 h-4" />
                  ) : (
                    <span className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-600 text-xs">
                      {index + 1}
                    </span>
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`
                    h-0.5 w-8
                    ${isCompleted ? 'bg-blue-600' : 'bg-gray-700'}
                  `} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-1">
            {steps[currentStepIndex].label}
          </h3>
          <p className="text-sm text-gray-400">
            {steps[currentStepIndex].description}
          </p>
        </div>
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="sticky bottom-0 bg-gray-800 px-6 py-4 border-t border-gray-700">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <div className="flex space-x-3">
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center"
              >
                <FiChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
            )}
            {currentStepIndex < totalSteps - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isGeneratingPreview}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Next
                <FiChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting || (formData.type !== 'custom_code' && !previewCode)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : editingTool ? 'Update Tool' : 'Create Tool'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
