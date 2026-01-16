from services.tools.base import BaseEnterpriseTool
from schemas.tools import ToolCreate


class DatabricksTool(BaseEnterpriseTool):
    def __init__(self, tool: ToolCreate):
        super().__init__(tool)
    
    def to_code(self) -> str:
        return self.render_template("tools/databricks/databricks.jinja",
            name=self.tool.name.lower().replace(" ", "_"),
            workspace_url=self.tool.config.get("workspace_url", ""),
            cluster_id=self.tool.config.get("cluster_id", ""),
            sql_warehouse_id=self.tool.config.get("sql_warehouse_id", ""),
            auth_type=self.tool.config.get("auth_type", "token"),
            access_token=self.tool.config.get("access_token", ""),
            client_id=self.tool.config.get("client_id", ""),
            client_secret=self.tool.config.get("client_secret", ""),
            azure_client_id=self.tool.config.get("azure_client_id", ""),
            azure_client_secret=self.tool.config.get("azure_client_secret", ""),
            azure_tenant_id=self.tool.config.get("azure_tenant_id", ""),
            api_version=self.tool.config.get("api_version", "2.0"),
            default_catalog=self.tool.config.get("default_catalog", ""),
            default_schema=self.tool.config.get("default_schema", ""),
        )

    def to_node(self) -> dict:
        return {
            "name": self.tool.name,
            "type": "databricks",
            "workspace_url": self.tool.config.get("workspace_url", ""),
            "cluster_id": self.tool.config.get("cluster_id", ""),
            "sql_warehouse_id": self.tool.config.get("sql_warehouse_id", ""),
            "auth_type": self.tool.config.get("auth_type", "token"),
            "api_version": self.tool.config.get("api_version", "2.0"),
            "default_catalog": self.tool.config.get("default_catalog", ""),
            "default_schema": self.tool.config.get("default_schema", ""),
        }

    def get_agent_fn(self, agent_label: str, agent_description: str, system_prompt: str, user_prompt: str, tool_name: str, agent_input: str, agent_output: str) -> str:
        return self.render_template("tools/databricks/agent_fn.jinja", 
            agent_label=self.sanitize_to_func_name(agent_label), 
            agent_description=agent_description, 
            system_prompt=system_prompt, 
            user_prompt=user_prompt, 
            tool_name=self.sanitize_to_func_name(tool_name), 
            agent_input=agent_input, 
            agent_output=agent_output
        )
