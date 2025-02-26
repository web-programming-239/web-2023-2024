
До этого мы работали с HTTP - протоколом, в котором клиент делает запрос на сервер и сервер отвечает на этот запрос. Но как быть, если нам нужно, чтобы сервер мог отправлять данные клиенту первым, а не ждать, пока тот отправит запрос(например, чтобы сделать чат)? Можно сделать так:
- Клиент отправляет запрос на сервер
- Сервер ничего не отвечает, но при этом не закрывает соединение
- Клиент, не получив ни ответа не ошибки, ждёт
- Как только на сервер получает данные, которые нужно передать клиенту, он формирует ответ на этот запрос

Такой метод называется **long polling**. В некоторых ситуациях он применяется, но есть проблема - очень много накладных расходов (на каждое сообщение от сервера, клиент должен отправить запрос, который не имеет никакого смысла. В то же время, пока запрос от клиента не дошел, сервер не может ничего отправить, что делает проблематичным применение этого метода, когда интервалы между сообщениями очень маленькие)

Есть и другой вариант - **[WebSockets](https://ru.hexlet.io/blog/posts/chto-takoe-websocket-i-kak-oni-voobsche-rabotayut)**. О них сегодня и поговорим

**WebSockets** - это соединение, которое открывается между клиентом и сервером, и после открытия работает в 2 стороны, то есть как клиент, так и сервер могут отправлять сообщения. В отличие от HTTP, отвечать на эти сообщения не обязательно. В Браузере сокеты выглядят так:
![](Pasted%20image%2020240208022741.png)
_У них есть отдельная вкладка - ws_
![](Pasted%20image%2020240208022848.png)
_Если выбрать сокет, в нём нас будет интересовать вкладка сообщения_

При этом открывается сокет при помощи отправки HTTP запроса, на который сервер должен определенным образом ответить. В этом запросе как и в любом другом HTTP запросе можно использовать хедеры и параметры (хотя вряд-ли вам это понадобится)
![](Pasted%20image%2020240208022951.png)


### SocketIO
https://socket.io/how-to/use-with-react

Веб сокетами из коробки (из стандартной библиотеки js) пользоваться можно, однако с ними есть ряд стандартных проблем (самая главная - они очень любят закрываться сами, нужно следить за этим и вовремя их переоткрывать), которые уже решены в более высокоуровневых библиотеках

Одна из них - **SocketIO**, которой мы и будем пользоваться.
В ней есть некоторый дополнительный функционал, которого нет в обычных сокетах

Первое отличие - в SocketIO у каждого сообщения есть поле свой тип(event). Отправитель сообщения должен указывать этот тип. На любой тип можно повесить обработчик.

на стороне сервера всё выглядит очень просто:
```python
import uvicorn
from fastapi import FastAPI
import socketio

# Создаем асинхронный сервер Socket.IO
sio = socketio.AsyncServer(async_mode="asgi")
app = FastAPI()

# Интегрируем Socket.IO с FastAPI
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)

# Обработчик подключения клиента
@sio.event
async def connect(sid, environ):
    print(f"Клиент подключился: {sid}")
    await sio.emit("message", {"data": "Вы подключены"}, room=sid)

# Обработчик отключения клиента
@sio.event
async def disconnect(sid):
    print(f"Клиент отключился: {sid}")

# Обработчик стандартного события "message"
@sio.event
async def message(sid, data):
    print(f"Стандартное сообщение от {sid}: {data}")

# Обработчик пользовательского события "chat_message"
@sio.on("chat_message")
async def handle_chat_message(sid, data):
    print(f"Сообщение чата от {sid}: {data}")
    # Отправляем ответ конкретному клиенту
    await sio.emit("chat_response", {"data": "Сообщение получено"}, room=sid)
    # Если нужно отправить сообщение всем клиентам:
    # await sio.emit("chat_response", {"data": "Новое сообщение"}, broadcast=True)

if __name__ == "__main__":
    uvicorn.run(socket_app, host="0.0.0.0", port=8000)

```

Здесь в метод `on()` нужно передать тип. Этот обработчик будет вызываться только для сообщений с типом msg
метод `emit()` позволяет отправить сообщение в ответ. Чтобы отправить сообщение всем подключенным пользователям, можно использовать `emit("test", "123", broadcast=True)`

На стороне клиента чуть сложнее
Создание сокета
```javascript
const socket = io("localhost:5000", {transports: ['websocket']});
```

Дальше нам как и на сервере нужно повесить хендлеры на разные события
```javascript
socket.on('connect', () => {
	console.log("connected")
});
socket.on('disconnect', () => {
	console.log("disconnected")
});
socket.on('new-msg', (value) => {
	console.log(value)
});
```

И всё бы ничего, но тут надо вспомнить, что мы живем в реакте. Если делать так при создании каждый раз при пересоздании компонента, то мы получим миллион хендлеров на каждое событие. Поэтому при уничтожении компонента нужно удалить все созданные этим компонентом хендлеры. 
Для этого можно использовать хук `useEffect()`

```javascript
useEffect(() => {  
    function onConnect() {  
        setIsConnected(true);  
    }  
  
    function onDisconnect() {  
        setIsConnected(false);  
    }  
  
    function onFooEvent(value) {  
        console.log(value)  
    }  
  
    socket.on('connect', onConnect);  
    socket.on('disconnect', onDisconnect);  
    socket.on('test', onFooEvent);  
  
    return () => {  
        socket.off('connect', onConnect);  
        socket.off('disconnect', onDisconnect);  
        socket.off('test', onFooEvent);  
    };  
}, [socket]);
```


### Задания
- Создать страницу с чатом (можно отправлять сообщения, все полученные сообщения тут же отрисовываются)
- Создать страницу с регистрацией (пока что на ней должна быть возможность просто ввести имя), на ней кнопка "подключиться", при нажатии на которую, пользователь попадёт в чат
- Из чата должна быть возможность вернуться на страницу регистрации и поменять имя
- Было бы неплохо запоминать имя пользователя и не заставлять вводить его заново при перезагрузке страницы, для этого можно использовать `localStorage`
