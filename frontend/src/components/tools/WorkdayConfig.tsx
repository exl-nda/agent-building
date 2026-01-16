import React from 'react';

interface WorkdayConfigProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
}

export const WorkdayConfig: React.FC<WorkdayConfigProps> = ({
  formData,
  onInputChange,
  setFormData,
}) => {
  return (
    <div className="space-y-6 bg-gray-700/30 p-4 rounded-lg">
      <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg border border-blue-800 mb-4">
        <p className="font-medium text-sm">Workday Integration</p>
        <p className="text-xs mt-1 text-blue-300">Backend functionality coming soon. Configuration will be saved for future implementation.</p>
      </div>

      <h3 className="text-lg font-medium text-white">Workday Configuration</h3>
      
      {/* Connection Settings */}
      <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300">Connection Settings</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Workday Tenant URL *
          </label>
          <input
            type="url"
            name="config.tenant_url"
            value={formData.config?.tenant_url || ''}
            onChange={onInputChange}
            placeholder="https://wd2-impl.workday.com"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Tenant Name
          </label>
          <input
            type="text"
            name="config.tenant_name"
            value={formData.config?.tenant_name || ''}
            onChange={onInputChange}
            placeholder="Your Tenant Name"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Environment
          </label>
          <select
            name="config.environment"
            value={formData.config?.environment || 'Implementation'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="Implementation">Implementation</option>
            <option value="Sandbox">Sandbox</option>
            <option value="Production">Production</option>
          </select>
        </div>
      </div>

      {/* Authentication */}
      <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300">Authentication</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Auth Type
          </label>
          <select
            name="config.auth_type"
            value={formData.config?.auth_type || 'oauth'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="oauth">OAuth 2.0</option>
            <option value="basic">Basic Authentication</option>
            <option value="certificate">Certificate</option>
          </select>
        </div>

        {formData.config?.auth_type === 'oauth' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Client ID *
              </label>
              <input
                type="text"
                name="config.client_id"
                value={formData.config?.client_id || ''}
                onChange={onInputChange}
                placeholder="OAuth Client ID"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Client Secret *
              </label>
              <input
                type="password"
                name="config.client_secret"
                value={formData.config?.client_secret || ''}
                onChange={onInputChange}
                placeholder="OAuth Client Secret"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Refresh Token
              </label>
              <input
                type="password"
                name="config.refresh_token"
                value={formData.config?.refresh_token || ''}
                onChange={onInputChange}
                placeholder="OAuth Refresh Token (optional)"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
          </>
        )}

        {formData.config?.auth_type === 'basic' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Username *
              </label>
              <input
                type="text"
                name="config.username"
                value={formData.config?.username || ''}
                onChange={onInputChange}
                placeholder="Workday Username"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="config.password"
                value={formData.config?.password || ''}
                onChange={onInputChange}
                placeholder="Workday Password"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
          </>
        )}
      </div>

      {/* API Settings */}
      <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300">API Settings</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            API Version
          </label>
          <select
            name="config.api_version"
            value={formData.config?.api_version || 'v40.0'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="v40.0">v40.0</option>
            <option value="v39.0">v39.0</option>
            <option value="v38.0">v38.0</option>
            <option value="v37.0">v37.0</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Service Name
          </label>
          <input
            type="text"
            name="config.service_name"
            value={formData.config?.service_name || ''}
            onChange={onInputChange}
            placeholder="Human_Resources, Financial_Management, etc."
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Report Format
          </label>
          <select
            name="config.report_format"
            value={formData.config?.report_format || 'json'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="json">JSON</option>
            <option value="xml">XML</option>
            <option value="csv">CSV</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default WorkdayConfig;
