from fastapi.routing import APIRouter

from src.models import TestData, TestResponse

app = APIRouter()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    """
    В питоне это называется docstring. Её можно использовать для документрирования методов/классов/переменных.
    Fastapi сам пробросит её в сгенерированную документацию
    """
    return {"message": f"Hello {name}"}


# так можно указать формат принимаемых данных
@app.post("/with_body")
def with_body(data: TestData):
    print(data.text)
    print(data.num)


# а так еще и возвращаемых
@app.post("/with_documented_response", response_model=TestResponse)
def with_response(data: TestData):
    print(data.text)
    print(data.num)
    return TestResponse(detail="tes", num=123)
