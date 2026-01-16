from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
import uvicorn
from api.llms import router as llm_router
from api.flows import router as flow_router
from api.tools import router as tool_router
from api.chatbot import router as chatbot_router
from core.startup import startup
from core.constants import PROJECT_NAME

app = FastAPI(title=f"{PROJECT_NAME} API", description=f"{PROJECT_NAME} API", version="0.0.1")


@app.on_event("startup")
async def startup_event():
    """Run startup tasks when the application starts."""
    startup()


# CORS middleware configuration
origins = [
    "http://localhost:5173",  # Default Vite dev server
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
router = APIRouter(prefix="/api")
router.include_router(llm_router)
router.include_router(flow_router)
router.include_router(tool_router)
router.include_router(chatbot_router)
app.include_router(router)


@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/api/health")


@app.api_route("/api/health", methods=["GET", "HEAD"])
def read_health():
    return {"status": "ok"}


if __name__ == "__main__":
    # Use import string format when reload=True or workers>1
    # Startup will be called via the @app.on_event("startup") handler
    uvicorn.run("main:app", host="0.0.0.0", port=8000, workers=1, log_level='debug', access_log=True, reload=True)
    