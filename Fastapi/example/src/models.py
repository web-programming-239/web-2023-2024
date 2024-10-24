from pydantic import BaseModel


class TestData(BaseModel):
    text: str
    num: int


class TestResponse(BaseModel):
    detail: str
    num: int
