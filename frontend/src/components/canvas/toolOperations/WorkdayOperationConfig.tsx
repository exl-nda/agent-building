import { useState, useEffect } from 'react';
import type { CustomNode } from '../../../types';
import { SectionHeader } from './SectionHeader';

interface WorkdayOperationConfigProps {
  node: CustomNode;
  onUpdate: (node: CustomNode) => void;
}

const WorkdayOperationConfig = ({ node, onUpdate }: WorkdayOperationConfigProps) => {
  const [operation, setOperation] = useState<string>(
    node.data.toolOperation?.workday?.operation || ''
  );
  const [reportName, setReportName] = useState<string>(
    node.data.toolOperation?.workday?.reportName || ''
  );
  const [reportData, setReportData] = useState<string>(
    node.data.toolOperation?.workday?.reportData || '{}'
  );
  const [serviceName, setServiceName] = useState<string>(
    node.data.toolOperation?.workday?.serviceName || ''
  );
  const [documentType, setDocumentType] = useState<string>(
    node.data.toolOperation?.workday?.documentType || ''
  );
  const [documentId, setDocumentId] = useState<string>(
    node.data.toolOperation?.workday?.documentId || ''
  );
  const [documentData, setDocumentData] = useState<string>(
    node.data.toolOperation?.workday?.documentData || '{}'
  );
  const [parameters, setParameters] = useState<string>(
    node.data.toolOperation?.workday?.parameters || '{}'
  );
  const [customEndpoint, setCustomEndpoint] = useState<string>(
    node.data.toolOperation?.workday?.customEndpoint || ''
  );
  const [customMethod, setCustomMethod] = useState<string>(
    node.data.toolOperation?.workday?.customMethod || 'GET'
  );
  const [customBody, setCustomBody] = useState<string>(
    node.data.toolOperation?.workday?.customBody || ''
  );

  useEffect(() => {
    if (node.id) {
      setOperation(node.data.toolOperation?.workday?.operation || '');
      setReportName(node.data.toolOperation?.workday?.reportName || '');
      setReportData(node.data.toolOperation?.workday?.reportData || '{}');
      setServiceName(node.data.toolOperation?.workday?.serviceName || '');
      setDocumentType(node.data.toolOperation?.workday?.documentType || '');
      setDocumentId(node.data.toolOperation?.workday?.documentId || '');
      setDocumentData(node.data.toolOperation?.workday?.documentData || '{}');
      setParameters(node.data.toolOperation?.workday?.parameters || '{}');
      setCustomEndpoint(node.data.toolOperation?.workday?.customEndpoint || '');
      setCustomMethod(node.data.toolOperation?.workday?.customMethod || 'GET');
      setCustomBody(node.data.toolOperation?.workday?.customBody || '');
    }
  }, [node.id]);

  const handleUpdate = (field: string, value: string) => {
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        toolOperation: {
          ...node.data.toolOperation,
          workday: {
            ...node.data.toolOperation?.workday,
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
        title="Workday Operation"
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
            <option value="get_report">Get Report</option>
            <option value="put_report">Put/Update Report</option>
            <option value="get_document">Get Document</option>
            <option value="put_document">Put/Update Document</option>
            <option value="web_service">Call Web Service</option>
            <option value="custom">Custom Operation</option>
          </select>
        </div>

        {/* Report Name for report operations */}
        {['get_report', 'put_report'].includes(operation) && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Report Name *
            </label>
            <input
              type="text"
              value={reportName}
              onChange={(e) => {
                setReportName(e.target.value);
                handleUpdate('reportName', e.target.value);
              }}
              placeholder="Report name (e.g., Worker_Report, Payroll_Report)"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Report Data for put_report */}
        {operation === 'put_report' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Report Data (JSON) *
            </label>
            <textarea
              value={reportData}
              onChange={(e) => {
                setReportData(e.target.value);
                handleUpdate('reportData', e.target.value);
              }}
              placeholder='{"field1": "value1", "field2": "value2"}'
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[100px] font-mono text-xs"
            />
          </div>
        )}

        {/* Service Name for web_service */}
        {operation === 'web_service' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Service Name *
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => {
                setServiceName(e.target.value);
                handleUpdate('serviceName', e.target.value);
              }}
              placeholder="Web service name (e.g., Human_Resources, Financial_Management)"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Document Type for document operations */}
        {['get_document', 'put_document'].includes(operation) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Document Type *
              </label>
              <input
                type="text"
                value={documentType}
                onChange={(e) => {
                  setDocumentType(e.target.value);
                  handleUpdate('documentType', e.target.value);
                }}
                placeholder="Document type (e.g., Worker_Document, Payroll_Document)"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            {operation === 'get_document' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Document ID *
                </label>
                <input
                  type="text"
                  value={documentId}
                  onChange={(e) => {
                    setDocumentId(e.target.value);
                    handleUpdate('documentId', e.target.value);
                  }}
                  placeholder="Document ID"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}
            {operation === 'put_document' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Document Data (JSON) *
                </label>
                <textarea
                  value={documentData}
                  onChange={(e) => {
                    setDocumentData(e.target.value);
                    handleUpdate('documentData', e.target.value);
                  }}
                  placeholder='{"field1": "value1", "field2": "value2"}'
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[100px] font-mono text-xs"
                />
              </div>
            )}
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
                placeholder="/ccx/service/customreport2/tenant/..."
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

        {/* Parameters for get_report, web_service */}
        {['get_report', 'web_service'].includes(operation) && (
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
            <p className="mt-1 text-xs text-gray-400">
              JSON object with parameter names and values for the report or web service.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkdayOperationConfig;
