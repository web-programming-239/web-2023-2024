from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates


# Если вам в роутере нужны какие-то дополнительные объекты, можно его создание обернуть в функцию
def get_router(templates: Jinja2Templates):
    app = APIRouter()

    @app.get("/items/{id}", response_class=HTMLResponse)
    async def read_item(request: Request, id: str):
        return templates.TemplateResponse(
            request=request, name="item.jinja2", context={"id": id}
        )

    return app
