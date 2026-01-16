import React from 'react';
import {
    FiCode,
    FiGlobe,
    FiDatabase,
    FiSearch,
    FiServer,
    FiCloud,
    FiCpu,
    FiMessageSquare,
    FiBox,
    FiLink
} from 'react-icons/fi';
import { Icon } from '@iconify/react';

type ToolType = 'rag' | 'web_search' | 'custom_code' | 'agent' | 'api_call' | 'llm_tool' | 'mcp_server' | 'sap' | 'databricks' | 'workday' | 'salesforce';

interface ToolTypeOption {
    value: ToolType;
    label: string;
    icon: React.ReactNode;
    group: 'integrations' | 'core' | 'ai';
}

interface ToolTypeSelectorProps {
    value: ToolType;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const toolTypeOptions: ToolTypeOption[] = [
    // Integrations
    { value: 'sap', label: 'SAP', icon: <Icon icon="simple-icons:sap" className="w-4 h-4" />, group: 'integrations' },
    { value: 'workday', label: 'Workday', icon: <Icon icon="arcticons:workday" className="w-4 h-4" />, group: 'integrations' },
    { value: 'salesforce', label: 'Salesforce', icon: <FiCloud className="w-4 h-4" />, group: 'integrations' },
    { value: 'databricks', label: 'Databricks', icon: <FiDatabase className="w-4 h-4" />, group: 'integrations' },

    // Core Tools
    { value: 'api_call', label: 'API Call', icon: <FiLink className="w-4 h-4" />, group: 'core' },
    { value: 'custom_code', label: 'Custom Code', icon: <FiCode className="w-4 h-4" />, group: 'core' },

    // AI Tools
    { value: 'rag', label: 'RAG', icon: <FiDatabase className="w-4 h-4" />, group: 'ai' },
    { value: 'web_search', label: 'Web Search', icon: <FiSearch className="w-4 h-4" />, group: 'ai' },
    { value: 'agent', label: 'Agent', icon: <FiCpu className="w-4 h-4" />, group: 'ai' },
    { value: 'llm_tool', label: 'LLM Tool', icon: <FiMessageSquare className="w-4 h-4" />, group: 'ai' },
    { value: 'mcp_server', label: 'MCP Server', icon: <FiServer className="w-4 h-4" />, group: 'ai' },
];

const groupLabels = {
    integrations: 'Integrations',
    core: 'Core Tools',
    ai: 'AI Tools',
};

export const ToolTypeSelector: React.FC<ToolTypeSelectorProps> = ({
    value,
    onChange,
    disabled = false,
}) => {
    const groupedOptions = {
        integrations: toolTypeOptions.filter(opt => opt.group === 'integrations'),
        core: toolTypeOptions.filter(opt => opt.group === 'core'),
        ai: toolTypeOptions.filter(opt => opt.group === 'ai'),
    };

    return (
        <div className="space-y-4">
            {Object.entries(groupedOptions).map(([groupKey, options]) => (
                <div key={groupKey} className="space-y-2">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {groupLabels[groupKey as keyof typeof groupLabels]}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                        {options.map((option) => {
                            const isSelected = value === option.value;
                            return (
                                <label
                                    key={option.value}
                                    className={`
                    relative flex flex-col items-center justify-center p-2 rounded-md border cursor-pointer transition-all duration-200
                    ${isSelected
                                            ? 'border-blue-500 bg-blue-500/10 shadow-md shadow-blue-500/20'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'
                                        }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                                >
                                    <input
                                        type="radio"
                                        name="tool-type"
                                        value={option.value}
                                        checked={isSelected}
                                        onChange={onChange}
                                        disabled={disabled}
                                        className="sr-only"
                                    />
                                    <div className={`
                    mb-1 transition-colors duration-200
                    ${isSelected ? 'text-blue-400' : 'text-gray-400'}
                  `}>
                                        {option.icon}
                                    </div>
                                    <span className={`
                    text-xs font-medium text-center leading-tight
                    ${isSelected ? 'text-blue-300' : 'text-gray-300'}
                  `}>
                                        {option.label}
                                    </span>
                                    {isSelected && (
                                        <div className="absolute top-1 right-1">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                        </div>
                                    )}
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};
