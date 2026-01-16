import { useState, useEffect } from 'react';
import type { CustomNode } from '../../../types';
import { SectionHeader } from './SectionHeader';

interface DatabricksOperationConfigProps {
  node: CustomNode;
  onUpdate: (node: CustomNode) => void;
}

const DatabricksOperationConfig = ({ node, onUpdate }: DatabricksOperationConfigProps) => {
  const [operation, setOperation] = useState<string>(
    node.data.toolOperation?.databricks?.operation || ''
  );
  const [sqlQuery, setSqlQuery] = useState<string>(
    node.data.toolOperation?.databricks?.sqlQuery || ''
  );
  const [notebookPath, setNotebookPath] = useState<string>(
    node.data.toolOperation?.databricks?.notebookPath || ''
  );
  const [tableName, setTableName] = useState<string>(
    node.data.toolOperation?.databricks?.tableName || ''
  );
  const [catalog, setCatalog] = useState<string>(
    node.data.toolOperation?.databricks?.catalog || ''
  );
  const [schema, setSchema] = useState<string>(
    node.data.toolOperation?.databricks?.schema || ''
  );
  const [query, setQuery] = useState<string>(
    node.data.toolOperation?.databricks?.query || ''
  );
  const [tableDefinition, setTableDefinition] = useState<string>(
    node.data.toolOperation?.databricks?.tableDefinition || '{}'
  );
  const [jobId, setJobId] = useState<string>(
    node.data.toolOperation?.databricks?.jobId || ''
  );
  const [parameters, setParameters] = useState<string>(
    node.data.toolOperation?.databricks?.parameters || '{}'
  );
  const [customEndpoint, setCustomEndpoint] = useState<string>(
    node.data.toolOperation?.databricks?.customEndpoint || ''
  );
  const [customMethod, setCustomMethod] = useState<string>(
    node.data.toolOperation?.databricks?.customMethod || 'GET'
  );
  const [customBody, setCustomBody] = useState<string>(
    node.data.toolOperation?.databricks?.customBody || ''
  );

  useEffect(() => {
    if (node.id) {
      setOperation(node.data.toolOperation?.databricks?.operation || '');
      setSqlQuery(node.data.toolOperation?.databricks?.sqlQuery || '');
      setNotebookPath(node.data.toolOperation?.databricks?.notebookPath || '');
      setTableName(node.data.toolOperation?.databricks?.tableName || '');
      setCatalog(node.data.toolOperation?.databricks?.catalog || '');
      setSchema(node.data.toolOperation?.databricks?.schema || '');
      setQuery(node.data.toolOperation?.databricks?.query || '');
      setTableDefinition(node.data.toolOperation?.databricks?.tableDefinition || '{}');
      setJobId(node.data.toolOperation?.databricks?.jobId || '');
      setParameters(node.data.toolOperation?.databricks?.parameters || '{}');
      setCustomEndpoint(node.data.toolOperation?.databricks?.customEndpoint || '');
      setCustomMethod(node.data.toolOperation?.databricks?.customMethod || 'GET');
      setCustomBody(node.data.toolOperation?.databricks?.customBody || '');
    }
  }, [node.id]);

  const handleUpdate = (field: string, value: string) => {
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        toolOperation: {
          ...node.data.toolOperation,
          databricks: {
            ...node.data.toolOperation?.databricks,
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
        title="Databricks Operation"
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
            <option value="execute_sql">Execute SQL Query</option>
            <option value="run_notebook">Run Notebook</option>
            <option value="query_table">Query Table</option>
            <option value="create_table">Create Table</option>
            <option value="run_job">Run Databricks Job</option>
            <option value="custom">Custom Operation</option>
          </select>
        </div>

        {/* SQL Query for execute_sql */}
        {operation === 'execute_sql' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                SQL Query *
              </label>
              <textarea
                value={sqlQuery}
                onChange={(e) => {
                  setSqlQuery(e.target.value);
                  handleUpdate('sqlQuery', e.target.value);
                }}
                placeholder="SELECT * FROM catalog.schema.table WHERE condition = 'value'"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[120px] font-mono text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Catalog
                </label>
                <input
                  type="text"
                  value={catalog}
                  onChange={(e) => {
                    setCatalog(e.target.value);
                    handleUpdate('catalog', e.target.value);
                  }}
                  placeholder="main"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Schema
                </label>
                <input
                  type="text"
                  value={schema}
                  onChange={(e) => {
                    setSchema(e.target.value);
                    handleUpdate('schema', e.target.value);
                  }}
                  placeholder="default"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        )}

        {/* Notebook Path for run_notebook */}
        {operation === 'run_notebook' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Notebook Path *
              </label>
              <input
                type="text"
                value={notebookPath}
                onChange={(e) => {
                  setNotebookPath(e.target.value);
                  handleUpdate('notebookPath', e.target.value);
                }}
                placeholder="/Users/username/notebook_name or /Shared/notebook_name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Parameters (JSON)
              </label>
              <textarea
                value={parameters}
                onChange={(e) => {
                  setParameters(e.target.value);
                  handleUpdate('parameters', e.target.value);
                }}
                placeholder='{"param1": "value1", "param2": "value2"}'
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[100px] font-mono text-xs"
              />
            </div>
          </>
        )}

        {/* Table operations */}
        {['query_table', 'create_table'].includes(operation) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Table Name *
              </label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => {
                  setTableName(e.target.value);
                  handleUpdate('tableName', e.target.value);
                }}
                placeholder="table_name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Catalog *
                </label>
                <input
                  type="text"
                  value={catalog}
                  onChange={(e) => {
                    setCatalog(e.target.value);
                    handleUpdate('catalog', e.target.value);
                  }}
                  placeholder="main"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Schema *
                </label>
                <input
                  type="text"
                  value={schema}
                  onChange={(e) => {
                    setSchema(e.target.value);
                    handleUpdate('schema', e.target.value);
                  }}
                  placeholder="default"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            {operation === 'query_table' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Query (WHERE clause or full query)
                </label>
                <textarea
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    handleUpdate('query', e.target.value);
                  }}
                  placeholder="WHERE column = 'value' OR SELECT * FROM table WHERE..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[80px] font-mono text-xs"
                />
              </div>
            )}
            {operation === 'create_table' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Table Definition (JSON) *
                </label>
                <textarea
                  value={tableDefinition}
                  onChange={(e) => {
                    setTableDefinition(e.target.value);
                    handleUpdate('tableDefinition', e.target.value);
                  }}
                  placeholder='{"columns": [{"name": "id", "type": "bigint"}, {"name": "name", "type": "string"}]}'
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[100px] font-mono text-xs"
                />
                <p className="mt-1 text-xs text-gray-400">
                  JSON object defining table columns and their types.
                </p>
              </div>
            )}
          </>
        )}

        {/* Job ID for run_job */}
        {operation === 'run_job' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Job ID *
              </label>
              <input
                type="text"
                value={jobId}
                onChange={(e) => {
                  setJobId(e.target.value);
                  handleUpdate('jobId', e.target.value);
                }}
                placeholder="123456789012345"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Parameters (JSON)
              </label>
              <textarea
                value={parameters}
                onChange={(e) => {
                  setParameters(e.target.value);
                  handleUpdate('parameters', e.target.value);
                }}
                placeholder='{"param1": "value1", "param2": "value2"}'
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
                placeholder="/api/2.0/..."
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
      </div>
    </div>
  );
};

export default DatabricksOperationConfig;
