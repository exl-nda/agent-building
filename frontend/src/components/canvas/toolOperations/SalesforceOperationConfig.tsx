import { useState, useEffect } from 'react';
import type { CustomNode } from '../../../types';
import { SectionHeader } from './SectionHeader';

interface SalesforceOperationConfigProps {
  node: CustomNode;
  onUpdate: (node: CustomNode) => void;
}

const SalesforceOperationConfig = ({ node, onUpdate }: SalesforceOperationConfigProps) => {
  const [operation, setOperation] = useState<string>(
    node.data.toolOperation?.salesforce?.operation || ''
  );
  const [object, setObject] = useState<string>(
    node.data.toolOperation?.salesforce?.object || ''
  );
  const [soqlQuery, setSoqlQuery] = useState<string>(
    node.data.toolOperation?.salesforce?.soqlQuery || ''
  );
  const [fields, setFields] = useState<string>(
    node.data.toolOperation?.salesforce?.fields || '{}'
  );
  const [recordId, setRecordId] = useState<string>(
    node.data.toolOperation?.salesforce?.recordId || ''
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    node.data.toolOperation?.salesforce?.searchQuery || ''
  );
  const [apexClass, setApexClass] = useState<string>(
    node.data.toolOperation?.salesforce?.apexClass || ''
  );
  const [apexMethod, setApexMethod] = useState<string>(
    node.data.toolOperation?.salesforce?.apexMethod || ''
  );
  const [parameters, setParameters] = useState<string>(
    node.data.toolOperation?.salesforce?.parameters || '{}'
  );

  useEffect(() => {
    if (node.id) {
      setOperation(node.data.toolOperation?.salesforce?.operation || '');
      setObject(node.data.toolOperation?.salesforce?.object || '');
      setSoqlQuery(node.data.toolOperation?.salesforce?.soqlQuery || '');
      setFields(node.data.toolOperation?.salesforce?.fields || '{}');
      setRecordId(node.data.toolOperation?.salesforce?.recordId || '');
      setSearchQuery(node.data.toolOperation?.salesforce?.searchQuery || '');
      setApexClass(node.data.toolOperation?.salesforce?.apexClass || '');
      setApexMethod(node.data.toolOperation?.salesforce?.apexMethod || '');
      setParameters(node.data.toolOperation?.salesforce?.parameters || '{}');
    }
  }, [node.id]);

  const handleUpdate = (field: string, value: string) => {
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        toolOperation: {
          ...node.data.toolOperation,
          salesforce: {
            ...node.data.toolOperation?.salesforce,
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
        title="Salesforce Operation"
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
            <option value="query">Query Records (SOQL)</option>
            <option value="create">Create Record</option>
            <option value="update">Update Record</option>
            <option value="delete">Delete Record</option>
            <option value="search">Search Records</option>
            <option value="get_by_id">Get Record by ID</option>
            <option value="apex">Call Apex Method</option>
          </select>
        </div>

        {/* Object selector for most operations */}
        {operation && ['query', 'create', 'update', 'delete', 'search', 'get_by_id'].includes(operation) && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Salesforce Object *
            </label>
            <input
              type="text"
              value={object}
              onChange={(e) => {
                setObject(e.target.value);
                handleUpdate('object', e.target.value);
              }}
              placeholder="Account, Contact, Lead, Opportunity, etc."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {/* SOQL Query for query operation */}
        {operation === 'query' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              SOQL Query *
            </label>
            <textarea
              value={soqlQuery}
              onChange={(e) => {
                setSoqlQuery(e.target.value);
                handleUpdate('soqlQuery', e.target.value);
              }}
              placeholder="SELECT Id, Name, Email FROM Contact WHERE AccountId = '{account_id}'"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[100px] font-mono text-xs"
            />
            <p className="mt-1 text-xs text-gray-400">
              Use SOQL syntax. You can use placeholders like {'{account_id}'} that will be replaced at runtime.
            </p>
          </div>
        )}

        {/* Fields JSON for create/update */}
        {['create', 'update'].includes(operation) && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Field Values (JSON) *
            </label>
            <textarea
              value={fields}
              onChange={(e) => {
                setFields(e.target.value);
                handleUpdate('fields', e.target.value);
              }}
              placeholder='{"Name": "John Doe", "Email": "john@example.com", "Phone": "555-1234"}'
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[100px] font-mono text-xs"
            />
            <p className="mt-1 text-xs text-gray-400">
              JSON object with field names and values. For update, include the record ID.
            </p>
          </div>
        )}

        {/* Record ID for update/delete/get_by_id */}
        {['update', 'delete', 'get_by_id'].includes(operation) && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Record ID *
            </label>
            <input
              type="text"
              value={recordId}
              onChange={(e) => {
                setRecordId(e.target.value);
                handleUpdate('recordId', e.target.value);
              }}
              placeholder="003000000000000AAA"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent font-mono"
            />
          </div>
        )}

        {/* Search query for search operation */}
        {operation === 'search' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Search Query *
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleUpdate('searchQuery', e.target.value);
              }}
              placeholder="FIND {search_term} IN ALL FIELDS RETURNING Account(Id, Name), Contact(Id, Name)"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent font-mono"
            />
          </div>
        )}

        {/* Apex class and method for apex operation */}
        {operation === 'apex' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Apex Class Name *
              </label>
              <input
                type="text"
                value={apexClass}
                onChange={(e) => {
                  setApexClass(e.target.value);
                  handleUpdate('apexClass', e.target.value);
                }}
                placeholder="MyApexClass"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Apex Method Name *
              </label>
              <input
                type="text"
                value={apexMethod}
                onChange={(e) => {
                  setApexMethod(e.target.value);
                  handleUpdate('apexMethod', e.target.value);
                }}
                placeholder="myMethod"
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
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[80px] font-mono text-xs"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesforceOperationConfig;
