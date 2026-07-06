from fastapi import FastAPI

app = FastAPI(
    title="EV Efficiency Optimizer",
    version="1.0.0"
)

@app.get("/")
def home():
    return {"message": "EV Efficiency Optimizer Backend is Running!"}

@app.get("/health")
def health():
    return {"status": "healthy"}