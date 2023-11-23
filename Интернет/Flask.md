Теперь давайте поговорим про то, как принимать и отправлять запросы используя питон

Для того, чтобы **принимать** http запросы в питоне есть несколько фреймворков, мы будем использовать Flask

Так выглядит простейшее приложение на фласке
```python
from flask import Flask
app = Flask(__name__)  # вроде это нужно для правильной работы импортов
# можно не вникать

@app.route("/hello") # путь, при попытке запроса на который будет вызываться функция ниже
# например http://test.org/hello
# @ - это декораторы, если пока не знаете, что это - забейте
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run() # запуск приложения
```


```python
@app.route("/", methods=["GET"])
# просто / означает корень сайта, http://test.org
# в methods перечислены методы, которыми можно делать запрос
def hello():
	return "Hello World!"
```

```python
@app.route("/<some_value>", methods=["GET"])
# всё, что будет после / попадет в функцию в аргументе some_value
def hello(some_value):
	return some_value # для http://test.org/test вернёт "test"
```

Но как мы помним аргументы и много другой информации можно передавать прямо внутри HTTP запроса, что про это думает фласк?
Для взаимодействия с информацией внутри запроса здесь есть переменная request
```python
from flask import request


@app.route('/login', methods=['GET'])
def login():
	return request.args.get("user")
```

В request лежит всё, что можно достать из запроса. Например
```python
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['the_file']
        f.save('uploads/uploaded_file.txt')
    
```

В post запросах очень часто шлют json'ы, для этого у `request` есть специальное поле `json`
```python
@app.route('/login', methods=['POST'])
def login():
	print(request.json) # распаршенный в json словарь
	return "test"
```

```python
@app.route('/error')
def error():
	abort(500) # возрващает клиенту дефолтру страницу и код ошибки - 500

@app.route('/error_with_desc')
def erro_with_desc():
	abort(500, 'сервер сгорел') # можно также вернуть описание
```

Помимо строк, можно возвращать любые "простые" типы данных: числа, списки, словари и тд
```python
@app.route('/test')
def test():
	return json.dupms([{"name": "123", "password": "123"}])
```

можно почитать https://pythonru.com/uroki/3-osnovy-flask

### Requests
Как проверить работоспособность созданного сервера? Нужно отправить на него запрос. GET запросы можно отправлять прямо из браузера, но с POST запросами такое не прокатит.

В Питоне есть удобная библиотека для запросов - **requests**
```bash
pip install requests
```

```python
import requests

r = requests.post("http://localhost:8000/test", json={"field-1": "vaule-1"})
```

можно отправлять и get запросы:
```python
r = requests.get("http://localhost:8000/test", params={"p1": 123})
```


### Задания
- напишите приложение, обрабатывающее запросы:
	- get `/test` -> возвращает 'Hello, world'
	- get `/test2` -> принимает http аргумент (не аргумент функции) `name`, возвращает "Hello, \*name\*". Если аргумент не передан, верните ошибку 400
	- post `/test3` -> принимает json с полями 'username', 'password'. Добавьте валидацию пароля (по любым правилам, но я советую [такие](https://thepasswordgame.com/)). Если пароль не проходит валидацию, возвращайте ошибку 400
	- протестируйте эти запросы через браузер(кроме последнего) и из питона(используя requests)
- создайте приложение, умеющее создавать пользователей с ролями (и сохранять их в памяти, пока мы не умеем работать с базами данных), и умеющее проверять, есть ли у пользователя право совершать определённый запрос:
	- post `/create_user` -> принимает json с полями 'username', 'password', 'role'. Поддерживаются роли 'GUEST' и 'ADMIN'. для некорректных данных верните ошибку 400
	- get `role` -> принимает логин, возвращает роль пользователя. Если такого пользователя нет, возвращает 404 
	- get `users` -> Принимает логин и пароль. Проверят, существует ли такой пользователеь, правильно ли введен пароль. Доступен только админу, возвращает список всех пользователей с ролями и паролями. Если какие-то проверки не прошли, возвращает 403
- создайте приложение, в которое можно загрузить файл, получить список файлов и загрузить определенный:
	- post `upload` -> принимает файл, сохраняет его в определенную папку
	- get `files` -> возвращает список доступных для скачивания файлов https://pynative.com/python-list-files-in-a-directory/
	- get `download/*filename*` -> позволяет скачать файл https://docs-python.ru/packages/veb-frejmvork-flask-python/funktsija-send-from-directory/