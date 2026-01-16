import React from 'react';

interface DatabricksConfigProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
}

export const DatabricksConfig: React.FC<DatabricksConfigProps> = ({
  formData,
  onInputChange,
  setFormData,
}) => {
  return (
    <div className="space-y-6 bg-gray-700/30 p-4 rounded-lg">
      <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg border border-blue-800 mb-4">
        <p className="font-medium text-sm">Databricks Integration</p>
        <p className="text-xs mt-1 text-blue-300">Backend functionality coming soon. Configuration will be saved for future implementation.</p>
      </div>

      <h3 className="text-lg font-medium text-white">Databricks Configuration</h3>
      
      {/* Connection Settings */}
      <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300">Connection Settings</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Workspace URL *
          </label>
          <input
            type="url"
            name="config.workspace_url"
            value={formData.config?.workspace_url || ''}
            onChange={onInputChange}
            placeholder="https://your-workspace.cloud.databricks.com"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Cluster ID
          </label>
          <input
            type="text"
            name="config.cluster_id"
            value={formData.config?.cluster_id || ''}
            onChange={onInputChange}
            placeholder="1234-567890-abc123"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            SQL Warehouse ID
          </label>
          <input
            type="text"
            name="config.sql_warehouse_id"
            value={formData.config?.sql_warehouse_id || ''}
            onChange={onInputChange}
            placeholder="Optional: SQL Warehouse ID"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
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
            value={formData.config?.auth_type || 'token'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="token">Personal Access Token</option>
            <option value="oauth">OAuth 2.0</option>
            <option value="azure_client_secret">Azure Client Secret</option>
            <option value="aws_iam">AWS IAM</option>
          </select>
        </div>

        {formData.config?.auth_type === 'token' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Personal Access Token *
            </label>
            <input
              type="password"
              name="config.access_token"
              value={formData.config?.access_token || ''}
              onChange={onInputChange}
              placeholder="dapi..."
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
            />
          </div>
        )}

        {formData.config?.auth_type === 'oauth' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Client ID
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
                Client Secret
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
          </>
        )}

        {formData.config?.auth_type === 'azure_client_secret' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Azure Client ID
              </label>
              <input
                type="text"
                name="config.azure_client_id"
                value={formData.config?.azure_client_id || ''}
                onChange={onInputChange}
                placeholder="Azure Client ID"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Azure Client Secret
              </label>
              <input
                type="password"
                name="config.azure_client_secret"
                value={formData.config?.azure_client_secret || ''}
                onChange={onInputChange}
                placeholder="Azure Client Secret"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Azure Tenant ID
              </label>
              <input
                type="text"
                name="config.azure_tenant_id"
                value={formData.config?.azure_tenant_id || ''}
                onChange={onInputChange}
                placeholder="Azure Tenant ID"
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
            value={formData.config?.api_version || '2.0'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="2.0">2.0</option>
            <option value="2.1">2.1</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Default Catalog
          </label>
          <input
            type="text"
            name="config.default_catalog"
            value={formData.config?.default_catalog || ''}
            onChange={onInputChange}
            placeholder="main"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Default Schema
          </label>
          <input
            type="text"
            name="config.default_schema"
            value={formData.config?.default_schema || ''}
            onChange={onInputChange}
            placeholder="default"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DatabricksConfig;
