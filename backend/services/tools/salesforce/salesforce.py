from services.tools.base import BaseEnterpriseTool
from schemas.tools import ToolCreate


class SalesforceTool(BaseEnterpriseTool):
    def __init__(self, tool: ToolCreate):
        super().__init__(tool)
    
    def to_code(self) -> str:
        return self.render_template("tools/salesforce/salesforce.jinja",
            name=self.tool.name.lower().replace(" ", "_"),
            instance_url=self.tool.config.get("instance_url", ""),
            environment=self.tool.config.get("environment", "production"),
            api_version=self.tool.config.get("api_version", "v59.0"),
            auth_type=self.tool.config.get("auth_type", "oauth"),
            username=self.tool.config.get("username", ""),
            password=self.tool.config.get("password", ""),
            security_token=self.tool.config.get("security_token", ""),
            consumer_key=self.tool.config.get("consumer_key", ""),
            consumer_secret=self.tool.config.get("consumer_secret", ""),
            session_id=self.tool.config.get("session_id", ""),
            access_token=self.tool.config.get("access_token", ""),
            api_type=self.tool.config.get("api_type", "rest"),
            default_object=self.tool.config.get("default_object", ""),
        )

    def to_node(self) -> dict:
        return {
            "name": self.tool.name,
            "type": "salesforce",
            "instance_url": self.tool.config.get("instance_url", ""),
            "environment": self.tool.config.get("environment", "production"),
            "api_version": self.tool.config.get("api_version", "v59.0"),
            "auth_type": self.tool.config.get("auth_type", "oauth"),
            "api_type": self.tool.config.get("api_type", "rest"),
            "default_object": self.tool.config.get("default_object", ""),
        }

    def get_agent_fn(self, agent_label: str, agent_description: str, system_prompt: str, user_prompt: str, tool_name: str, agent_input: str, agent_output: str) -> str:
        return self.render_template("tools/salesforce/agent_fn.jinja", 
            agent_label=self.sanitize_to_func_name(agent_label), 
            agent_description=agent_description, 
            system_prompt=system_prompt, 
            user_prompt=user_prompt, 
            tool_name=self.sanitize_to_func_name(tool_name), 
            agent_input=agent_input, 
            agent_output=agent_output
        )
