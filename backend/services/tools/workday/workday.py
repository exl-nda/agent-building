from services.tools.base import BaseEnterpriseTool
from schemas.tools import ToolCreate


class WorkdayTool(BaseEnterpriseTool):
    def __init__(self, tool: ToolCreate):
        super().__init__(tool)
    
    def to_code(self) -> str:
        return self.render_template("tools/workday/workday.jinja",
            name=self.tool.name.lower().replace(" ", "_"),
            tenant_url=self.tool.config.get("tenant_url", ""),
            tenant_name=self.tool.config.get("tenant_name", ""),
            environment=self.tool.config.get("environment", "Implementation"),
            auth_type=self.tool.config.get("auth_type", "oauth"),
            client_id=self.tool.config.get("client_id", ""),
            client_secret=self.tool.config.get("client_secret", ""),
            refresh_token=self.tool.config.get("refresh_token", ""),
            username=self.tool.config.get("username", ""),
            password=self.tool.config.get("password", ""),
            api_version=self.tool.config.get("api_version", "v40.0"),
            service_name=self.tool.config.get("service_name", ""),
            report_format=self.tool.config.get("report_format", "json"),
        )

    def to_node(self) -> dict:
        return {
            "name": self.tool.name,
            "type": "workday",
            "tenant_url": self.tool.config.get("tenant_url", ""),
            "tenant_name": self.tool.config.get("tenant_name", ""),
            "environment": self.tool.config.get("environment", "Implementation"),
            "auth_type": self.tool.config.get("auth_type", "oauth"),
            "api_version": self.tool.config.get("api_version", "v40.0"),
            "service_name": self.tool.config.get("service_name", ""),
            "report_format": self.tool.config.get("report_format", "json"),
        }

    def get_agent_fn(self, agent_label: str, agent_description: str, system_prompt: str, user_prompt: str, tool_name: str, agent_input: str, agent_output: str) -> str:
        return self.render_template("tools/workday/agent_fn.jinja", 
            agent_label=self.sanitize_to_func_name(agent_label), 
            agent_description=agent_description, 
            system_prompt=system_prompt, 
            user_prompt=user_prompt, 
            tool_name=self.sanitize_to_func_name(tool_name), 
            agent_input=agent_input, 
            agent_output=agent_output
        )
