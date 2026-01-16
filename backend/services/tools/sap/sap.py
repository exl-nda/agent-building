from services.tools.base import BaseEnterpriseTool
from schemas.tools import ToolCreate


class SAPTool(BaseEnterpriseTool):
    def __init__(self, tool: ToolCreate):
        super().__init__(tool)
    
    def to_code(self) -> str:
        return self.render_template("tools/sap/sap.jinja",
            name=self.tool.name.lower().replace(" ", "_"),
            system_url=self.tool.config.get("system_url", ""),
            system_number=self.tool.config.get("system_number", ""),
            client=self.tool.config.get("client", ""),
            application_server=self.tool.config.get("application_server", ""),
            auth_type=self.tool.config.get("auth_type", "basic"),
            username=self.tool.config.get("username", ""),
            password=self.tool.config.get("password", ""),
            oauth_token_endpoint=self.tool.config.get("oauth_token_endpoint", ""),
            rfc_destination=self.tool.config.get("rfc_destination", ""),
            api_version=self.tool.config.get("api_version", "v1"),
        )

    def to_node(self) -> dict:
        return {
            "name": self.tool.name,
            "type": "sap",
            "system_url": self.tool.config.get("system_url", ""),
            "system_number": self.tool.config.get("system_number", ""),
            "client": self.tool.config.get("client", ""),
            "application_server": self.tool.config.get("application_server", ""),
            "auth_type": self.tool.config.get("auth_type", "basic"),
            "rfc_destination": self.tool.config.get("rfc_destination", ""),
            "api_version": self.tool.config.get("api_version", "v1"),
        }

    def get_agent_fn(self, agent_label: str, agent_description: str, system_prompt: str, user_prompt: str, tool_name: str, agent_input: str, agent_output: str) -> str:
        return self.render_template("tools/sap/agent_fn.jinja", 
            agent_label=self.sanitize_to_func_name(agent_label), 
            agent_description=agent_description, 
            system_prompt=system_prompt, 
            user_prompt=user_prompt, 
            tool_name=self.sanitize_to_func_name(tool_name), 
            agent_input=agent_input, 
            agent_output=agent_output
        )
