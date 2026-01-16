import React from 'react';

interface SalesforceConfigProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
}

export const SalesforceConfig: React.FC<SalesforceConfigProps> = ({
  formData,
  onInputChange,
  setFormData,
}) => {
  return (
    <div className="space-y-6 bg-gray-700/30 p-4 rounded-lg">
      <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg border border-blue-800 mb-4">
        <p className="font-medium text-sm">Salesforce Integration</p>
        <p className="text-xs mt-1 text-blue-300">Backend functionality coming soon. Configuration will be saved for future implementation.</p>
      </div>

      <h3 className="text-lg font-medium text-white">Salesforce Configuration</h3>
      
      {/* Connection Settings */}
      <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300">Connection Settings</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Instance URL *
          </label>
          <input
            type="url"
            name="config.instance_url"
            value={formData.config?.instance_url || ''}
            onChange={onInputChange}
            placeholder="https://yourinstance.salesforce.com"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Environment
          </label>
          <select
            name="config.environment"
            value={formData.config?.environment || 'production'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="production">Production</option>
            <option value="sandbox">Sandbox</option>
            <option value="custom">Custom Domain</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            API Version
          </label>
          <select
            name="config.api_version"
            value={formData.config?.api_version || 'v59.0'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="v59.0">v59.0</option>
            <option value="v58.0">v58.0</option>
            <option value="v57.0">v57.0</option>
            <option value="v56.0">v56.0</option>
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
            <option value="oauth">OAuth 2.0 (Username/Password)</option>
            <option value="oauth_jwt">OAuth 2.0 (JWT Bearer)</option>
            <option value="session_id">Session ID</option>
            <option value="access_token">Access Token</option>
          </select>
        </div>

        {formData.config?.auth_type === 'oauth' && (
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
                placeholder="Salesforce Username"
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
                placeholder="Salesforce Password"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Security Token
              </label>
              <input
                type="password"
                name="config.security_token"
                value={formData.config?.security_token || ''}
                onChange={onInputChange}
                placeholder="Security Token (if required)"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
          </>
        )}

        {formData.config?.auth_type === 'oauth_jwt' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Consumer Key (Client ID) *
              </label>
              <input
                type="text"
                name="config.consumer_key"
                value={formData.config?.consumer_key || ''}
                onChange={onInputChange}
                placeholder="Connected App Consumer Key"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Consumer Secret (Client Secret) *
              </label>
              <input
                type="password"
                name="config.consumer_secret"
                value={formData.config?.consumer_secret || ''}
                onChange={onInputChange}
                placeholder="Connected App Consumer Secret"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Username *
              </label>
              <input
                type="text"
                name="config.username"
                value={formData.config?.username || ''}
                onChange={onInputChange}
                placeholder="Salesforce Username"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
              />
            </div>
          </>
        )}

        {formData.config?.auth_type === 'session_id' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Session ID *
            </label>
            <input
              type="password"
              name="config.session_id"
              value={formData.config?.session_id || ''}
              onChange={onInputChange}
              placeholder="Salesforce Session ID"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
            />
          </div>
        )}

        {formData.config?.auth_type === 'access_token' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Access Token *
            </label>
            <input
              type="password"
              name="config.access_token"
              value={formData.config?.access_token || ''}
              onChange={onInputChange}
              placeholder="Salesforce Access Token"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
            />
          </div>
        )}
      </div>

      {/* API Settings */}
      <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300">API Settings</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            API Type
          </label>
          <select
            name="config.api_type"
            value={formData.config?.api_type || 'rest'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="rest">REST API</option>
            <option value="soap">SOAP API</option>
            <option value="bulk">Bulk API</option>
            <option value="streaming">Streaming API</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Default Object
          </label>
          <input
            type="text"
            name="config.default_object"
            value={formData.config?.default_object || ''}
            onChange={onInputChange}
            placeholder="Account, Contact, Lead, etc."
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SalesforceConfig;
