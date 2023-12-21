``### fetch
мы умеем по отдельности:
- принимать запросы, используя flask
- создавать html страницы, используя react
Осталось совместить 

Для этого в js есть функция `fetch()`. Она позволяет отправлять http запрос на сервер и использовать результат внутри react приложения. Она принимает url запроса, дополнительные параметры (хедеры, метод, и ещё кучу всего) и возвращает **промис**

```javascript
fetch("http://localhost:8080/users").then((res) => console.log(res))
```
https://learn.javascript.ru/fetch

по умолчанию отправляется get запрос с какими-то дефолтными хедерами (больше всего нас волнует хедер 'Content-Type', используемый сервером для обработки тела запроса)
Если нам нужно что-то из этого переопределить, запрос будет чуть более громоздким

```javascript
fetch("http://localhost:8080/create", 
	  {  
		    method: "POST",  
		    body: JSON.stringify({username: username, password: password}),  
		    headers: {'Content-Type': 'application/json'},  // так как мы шлём json, нужно явно это показать
		}
	 ).then(r => console.log(r))
```

### React router
Предположим, что вы хотите создать 2 страницы:
- users со списком пользователей, доступную по адресу /users
- create_user с возможностью создать пользователя, доступную по адресу /create_user
Эта проблема хорошо решается при помощи отдельной библиотеки - react-router-dom. Используется она просто
```jsx
const router = createBrowserRouter([  // создаем роутер
    {  
        path: "/users",  // путь
        element: <Users/>,  // компонент, доступный по этому пути
    },  
    {  
        path: "/create_user",  
        element: <CreateUser/>  
    },  
]);  
  
const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(  
  <React.StrictMode>  
      <RouterProvider router={router}/> // используем роутер
  </React.StrictMode>);
```

### Пример проекта
В папке example рядом лежит пример проекта, с использованием Flask, flask-sqlalchemy(с базой данных sqlite - это база данных, хранящая всю информацию в одном файле. Её часто используют для примеров, чтобы не поднимать полноценную базу данных, типа mysql или postgresql, но для больших проектов она не годится, из-за очень ограниченного функционала), react (находится в папке web)
Чтобы запустилось, нужно 
- установить все библиотеки
	- `pip install requirements.txt` в папке example
	- `npm install` в папке web
- отдельно запустить flask приложение (файл app.py) и react приложение (npm run start, находясь в папке web)