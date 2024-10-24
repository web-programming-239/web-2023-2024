### Установка
```bash
pip install fastapi uvicorn
```
используем venv

### Простейшее приложение

```python
from fastapi import FastAPI 
app = FastAPI()

@app.get("/") 
async def root(): 
	return {"message": "Hello World"}

```

чтобы запустить:
```python
import uvicorn  
  
uvicorn.run(app, host="0.0.0.0", port=5000)
```

либо через консоль, подробнее [тут](https://fastapi.tiangolo.com/tutorial/first-steps/#interactive-api-docs)
Откуда берется uvicorn и что такое ASGI/WSGI можно прочитать, например, [здесь](https://habr.com/ru/articles/482936/)

Fastapi из коробки умеет генерировать openapi спецификацию исходя из кода приложения и сразу поднимает swagger, позволяющий тестировать все ваши запросы. Увидеть это чудо можно перейдя на `/docs`

http://localhost:5000/docs

Но генерирует спецификацию он не при помощи магии (к сожалению) и если вы не указываете типы принимаемых/возвращаемых значений, то fastapi их угадать не сможет.

Для типизации в fastapi принято везде использовать [pydantic](https://docs.pydantic.dev/latest/)
В случае некорректных входных/возвращаемых данных fastapi выкинет ошибку


### Статика и шаблоны

Будем использовать шаблонизатор jinja2. Его нужно установить

```bash
pip install jinja2
```

Всё написано [тут](https://fastapi.tiangolo.com/advanced/templates/#using-jinja2templates)
Обратите внимание на workdir при запуске приложения, иначе fastapi может не найти указанные папки. В идее это можно указать в конфигурации запуска
![resources/Pasted image 20241024014851.png](resources/Pasted%20image%2020241024014851.png)
Если запускаете через консоль, то workdir - это та папка, в которой вы находитесь в момент выполнения команды



###  Задания
### Задание 1: Использование Pydantic для валидации входных данных

**Описание задания:**

1. Создайте Pydantic модель для описания книги с полями: title, author, year (год издания)
2. Создайте API маршрут, который принимает данные о новой книге в виде JSON и возвращает их обратно, подтверждая успешный прием.
3. Убедитесь, что Pydantic модель валидирует все входные данные и возвращает ошибку, если данные некорректны. Для отправки запросов используйте swagger доступный по /docs

#### Задание 2: библиотека
1) Создайте класс Library для хранения списка книг
2) Должно быть методы: add(Book), get_all(), get_filtered(Filter). Подумайте, как вы хотите фильтровать книги и должен быть реализован этот фильтр. Возможно, будет удобно создать еще одну Pydantic модель для этого.
3) Этот класс используйте в следующем задании.
#### Задание 3: Обработка параметров запроса

1. Создайте класс Library для хранения списка книг
2. Создайте API маршрут, который возвращает список книг.
3. Позвольте пользователю фильтровать книги по автору и году издания, используя параметры запроса (query parameters).
4. Убедитесь, что фильтрация работает корректно, и протестируйте ее через Swagger.

#### Задание 4: Указание response_model

1. Добавьте ко всем запросам response_model

#### Задание 5: Использование шаблонов HTML страниц

**Описание задания:**

1. Установите Jinja2 или другой шаблонизатор и настройте FastAPI для использования HTML шаблонов.
2. Создайте HTML шаблон для отображения списка книг. Все пути, связанные с шаблонами должны быть в другом роутере. Все запросы к апи перевесьте на /api
3. Напишите API маршрут, который обрабатывает GET запросы по URL /books/ и рендерит HTML страницу с использованием шаблона, передавая данные о книгах в шаблон.