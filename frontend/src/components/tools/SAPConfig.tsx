import React from 'react';

interface SAPConfigProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: (updater: (prev: any) => any) => void;
}

export const SAPConfig: React.FC<SAPConfigProps> = ({
  formData,
  onInputChange,
  setFormData,
}) => {
  return (
    <div className="space-y-6 bg-gray-700/30 p-4 rounded-lg">
      <div className="p-3 bg-blue-900/20 text-blue-400 rounded-lg border border-blue-800 mb-4">
        <p className="font-medium text-sm">SAP Integration</p>
        <p className="text-xs mt-1 text-blue-300">Backend functionality coming soon. Configuration will be saved for future implementation.</p>
      </div>

      <h3 className="text-lg font-medium text-white">SAP Configuration</h3>
      
      {/* Connection Settings */}
      <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-300">Connection Settings</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            SAP System URL *
          </label>
          <input
            type="url"
            name="config.system_url"
            value={formData.config?.system_url || ''}
            onChange={onInputChange}
            placeholder="https://your-sap-system.com"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            System Number
          </label>
          <input
            type="text"
            name="config.system_number"
            value={formData.config?.system_number || ''}
            onChange={onInputChange}
            placeholder="00"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Client
          </label>
          <input
            type="text"
            name="config.client"
            value={formData.config?.client || ''}
            onChange={onInputChange}
            placeholder="100"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Application Server
          </label>
          <input
            type="text"
            name="config.application_server"
            value={formData.config?.application_server || ''}
            onChange={onInputChange}
            placeholder="sap-server.example.com"
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
            value={formData.config?.auth_type || 'basic'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="basic">Basic Authentication</option>
            <option value="sso">Single Sign-On (SSO)</option>
            <option value="certificate">Certificate</option>
            <option value="oauth">OAuth 2.0</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            name="config.username"
            value={formData.config?.username || ''}
            onChange={onInputChange}
            placeholder="SAP Username"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="config.password"
            value={formData.config?.password || ''}
            onChange={onInputChange}
            placeholder="SAP Password"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        {formData.config?.auth_type === 'oauth' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              OAuth Token Endpoint
            </label>
            <input
              type="url"
              name="config.oauth_token_endpoint"
              value={formData.config?.oauth_token_endpoint || ''}
              onChange={onInputChange}
              placeholder="https://your-sap-system.com/oauth/token"
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
            RFC Destination
          </label>
          <input
            type="text"
            name="config.rfc_destination"
            value={formData.config?.rfc_destination || ''}
            onChange={onInputChange}
            placeholder="RFC_DEST"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            API Version
          </label>
          <select
            name="config.api_version"
            value={formData.config?.api_version || 'v1'}
            onChange={onInputChange}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
            <option value="v1">v1</option>
            <option value="v2">v2</option>
            <option value="odata_v2">OData v2</option>
            <option value="odata_v4">OData v4</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SAPConfig;
