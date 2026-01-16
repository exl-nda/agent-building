import { useState, useEffect } from 'react';
import type { CustomNode } from '../../../types';
import { SectionHeader } from './SectionHeader';

interface SAPOperationConfigProps {
  node: CustomNode;
  onUpdate: (node: CustomNode) => void;
}

const SAPOperationConfig = ({ node, onUpdate }: SAPOperationConfigProps) => {
  const [operation, setOperation] = useState<string>(
    node.data.toolOperation?.sap?.operation || ''
  );
  const [functionName, setFunctionName] = useState<string>(
    node.data.toolOperation?.sap?.functionName || ''
  );
  const [odataEntity, setOdataEntity] = useState<string>(
    node.data.toolOperation?.sap?.odataEntity || ''
  );
  const [odataQuery, setOdataQuery] = useState<string>(
    node.data.toolOperation?.sap?.odataQuery || ''
  );
  const [parameters, setParameters] = useState<string>(
    node.data.toolOperation?.sap?.parameters || '{}'
  );
  const [recordId, setRecordId] = useState<string>(
    node.data.toolOperation?.sap?.recordId || ''
  );
  const [idocType, setIdocType] = useState<string>(
    node.data.toolOperation?.sap?.idocType || ''
  );
  const [idocData, setIdocData] = useState<string>(
    node.data.toolOperation?.sap?.idocData || ''
  );
  const [customEndpoint, setCustomEndpoint] = useState<string>(
    node.data.toolOperation?.sap?.customEndpoint || ''
  );
  const [customMethod, setCustomMethod] = useState<string>(
    node.data.toolOperation?.sap?.customMethod || 'GET'
  );
  const [customBody, setCustomBody] = useState<string>(
    node.data.toolOperation?.sap?.customBody || ''
  );

  useEffect(() => {
    if (node.id) {
      setOperation(node.data.toolOperation?.sap?.operation || '');
      setFunctionName(node.data.toolOperation?.sap?.functionName || '');
      setOdataEntity(node.data.toolOperation?.sap?.odataEntity || '');
      setOdataQuery(node.data.toolOperation?.sap?.odataQuery || '');
      setParameters(node.data.toolOperation?.sap?.parameters || '{}');
      setRecordId(node.data.toolOperation?.sap?.recordId || '');
      setIdocType(node.data.toolOperation?.sap?.idocType || '');
      setIdocData(node.data.toolOperation?.sap?.idocData || '');
      setCustomEndpoint(node.data.toolOperation?.sap?.customEndpoint || '');
      setCustomMethod(node.data.toolOperation?.sap?.customMethod || 'GET');
      setCustomBody(node.data.toolOperation?.sap?.customBody || '');
    }
  }, [node.id]);

  const handleUpdate = (field: string, value: string) => {
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        toolOperation: {
          ...node.data.toolOperation,
          sap: {
            ...node.data.toolOperation?.sap,
            [field]: value
          }
        }
      }
    };
    onUpdate(updatedNode);
  };

  const handleOperationChange = (newOperation: string) => {
    setOperation(newOperation);
    handleUpdate('operation', newOperation);
  };

  return (
    <div className="mt-6">
      <SectionHeader 
        icon={({ className }) => (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
        title="SAP Operation"
      />
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Operation Type *
          </label>
          <select
            value={operation}
            onChange={(e) => handleOperationChange(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Operation</option>
            <option value="rfc">RFC Function Call</option>
            <option value="odata_query">OData Query</option>
            <option value="odata_create">OData Create</option>
            <option value="odata_update">OData Update</option>
            <option value="odata_delete">OData Delete</option>
            <option value="bapi">BAPI Function Call</option>
            <option value="idoc">Process IDoc</option>
            <option value="custom">Custom Operation</option>
          </select>
        </div>

        {/* RFC Function Name */}
        {['rfc', 'bapi'].includes(operation) && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Function Name *
            </label>
            <input
              type="text"
              value={functionName}
              onChange={(e) => {
                setFunctionName(e.target.value);
                handleUpdate('functionName', e.target.value);
              }}
              placeholder="RFC_FUNCTION_NAME or BAPI_FUNCTION_NAME"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent font-mono"
            />
          </div>
        )}

        {/* OData Entity */}
        {operation?.startsWith('odata_') && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              OData Entity *
            </label>
            <input
              type="text"
              value={odataEntity}
              onChange={(e) => {
                setOdataEntity(e.target.value);
                handleUpdate('odataEntity', e.target.value);
              }}
              placeholder="EntitySetName (e.g., SalesOrderSet, MaterialSet)"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {/* OData Query */}
        {operation === 'odata_query' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              OData Query *
            </label>
            <textarea
              value={odataQuery}
              onChange={(e) => {
                setOdataQuery(e.target.value);
                handleUpdate('odataQuery', e.target.value);
              }}
              placeholder="$filter=Field eq 'value'&$select=Field1,Field2&$top=10"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[80px] font-mono text-xs"
            />
            <p className="mt-1 text-xs text-gray-400">
              OData query parameters ($filter, $select, $orderby, $top, etc.)
            </p>
          </div>
        )}

        {/* Record ID for update/delete */}
        {['odata_update', 'odata_delete'].includes(operation) && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Record ID / Key *
            </label>
            <input
              type="text"
              value={recordId}
              onChange={(e) => {
                setRecordId(e.target.value);
                handleUpdate('recordId', e.target.value);
              }}
              placeholder="Record key or ID"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {/* IDoc Type and Data */}
        {operation === 'idoc' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                IDoc Type *
              </label>
              <input
                type="text"
                value={idocType}
                onChange={(e) => {
                  setIdocType(e.target.value);
                  handleUpdate('idocType', e.target.value);
                }}
                placeholder="IDoc type (e.g., ORDERS05, INVOIC02)"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                IDoc Data (JSON/XML) *
              </label>
              <textarea
                value={idocData}
                onChange={(e) => {
                  setIdocData(e.target.value);
                  handleUpdate('idocData', e.target.value);
                }}
                placeholder="IDoc data in JSON or XML format"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[100px] font-mono text-xs"
              />
            </div>
          </>
        )}

        {/* Custom Operation Fields */}
        {operation === 'custom' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Custom Endpoint *
              </label>
              <input
                type="text"
                value={customEndpoint}
                onChange={(e) => {
                  setCustomEndpoint(e.target.value);
                  handleUpdate('customEndpoint', e.target.value);
                }}
                placeholder="/sap/opu/odata/sap/... or custom path"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                HTTP Method *
              </label>
              <select
                value={customMethod}
                onChange={(e) => {
                  setCustomMethod(e.target.value);
                  handleUpdate('customMethod', e.target.value);
                }}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Request Body (JSON)
              </label>
              <textarea
                value={customBody}
                onChange={(e) => {
                  setCustomBody(e.target.value);
                  handleUpdate('customBody', e.target.value);
                }}
                placeholder='{"field": "value"}'
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[80px] font-mono text-xs"
              />
            </div>
          </>
        )}

        {/* Parameters for RFC, BAPI, OData Create/Update */}
        {['rfc', 'bapi', 'odata_create', 'odata_update'].includes(operation) && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Parameters (JSON) *
            </label>
            <textarea
              value={parameters}
              onChange={(e) => {
                setParameters(e.target.value);
                handleUpdate('parameters', e.target.value);
              }}
              placeholder='{"PARAM1": "value1", "PARAM2": "value2"}'
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[100px] font-mono text-xs"
            />
            <p className="mt-1 text-xs text-gray-400">
              JSON object with parameter names and values. For OData create/update, this represents the entity fields.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SAPOperationConfig;
