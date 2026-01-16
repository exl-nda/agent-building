import type { NodeType } from '../store/useFlowStore';

export interface CustomNode {
  id: string;
  type: NodeType;
  data: {
    type: NodeType;
    label: string;
    description?: string;
    node?: {
      inputFormat?: string;  // For input format selection (e.g., 'messages[-1]["content"]')
      outputMode?: 'text' | 'structured';  // For output mode selection
      systemPrompt?: string;  // System prompt for LLM nodes
      userPrompt?: string;    // User prompt template  
    }
    llm?: {
      alias: string;        // Unique identifier for the LLM
      provider: string;     // The provider (e.g., 'openai', 'anthropic')
      model: string;        // The model identifier
      type?: 'api' | 'local';
    };
    tool?: {
      id: string;
      name: string;
      description: string;
      type?: string; // Add type field
    } | null;
    // Add tool-specific operation configs
    toolOperation?: {
      // Salesforce
      salesforce?: {
        operation?: 'query' | 'create' | 'update' | 'delete' | 'search' | 'get_by_id' | 'apex';
        object?: string;
        soqlQuery?: string;
        fields?: string; // JSON string
        recordId?: string;
        searchQuery?: string;
        apexClass?: string;
        apexMethod?: string;
        parameters?: string; // JSON string
      };
      // SAP
      sap?: {
        operation?: 'rfc' | 'odata_query' | 'odata_create' | 'odata_update' | 'odata_delete' | 'bapi' | 'idoc' | 'custom';
        functionName?: string;
        odataEntity?: string;
        odataQuery?: string;
        parameters?: string; // JSON string
        recordId?: string;
        idocType?: string;
        idocData?: string;
        customEndpoint?: string;
        customMethod?: string;
        customBody?: string;
      };
      // Workday
      workday?: {
        operation?: 'get_report' | 'put_report' | 'get_document' | 'put_document' | 'web_service' | 'custom';
        reportName?: string;
        reportData?: string; // JSON string
        serviceName?: string;
        documentType?: string;
        documentId?: string;
        documentData?: string; // JSON string
        parameters?: string; // JSON string
        customEndpoint?: string;
        customMethod?: string;
        customBody?: string;
      };
      // Databricks
      databricks?: {
        operation?: 'execute_sql' | 'run_notebook' | 'query_table' | 'create_table' | 'run_job' | 'custom';
        sqlQuery?: string;
        notebookPath?: string;
        tableName?: string;
        catalog?: string;
        schema?: string;
        query?: string;
        tableDefinition?: string; // JSON string
        jobId?: string;
        parameters?: string; // JSON string
        customEndpoint?: string;
        customMethod?: string;
        customBody?: string;
      };
    };
  };
  position: {
    x: number;
    y: number;
  };
}
