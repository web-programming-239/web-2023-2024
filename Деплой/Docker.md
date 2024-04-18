Dockerfile - название файла без расширения

```dockerfile
FROM python:3.10

RUN mkdir /app
WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT python3 main.py
# или
ENTRYPOINT ./run.sh
# или
ENTRYPOINT gunicorn app:app -w 1-b 0.0.0.0:8000
```


docker-compose.yaml - описывает

```yaml
version: '1.0.0'

services:
  db:
    container_name: db
    image: mariadb
    restart: always
    volumes:
      - mariadb:/var/lib/mysql
      - ./scripts/db.sql:/docker-entrypoint-initdb.d/init.sql
    entrypoint: 
      MARIADB_ROOT_PASSWORD: some-passowrd
#      MARIADB_ROOT_PASSWORD: 1234567
    ports:
      - "3306:3306"
    
  app:
    container_name: app
    build:
      context: ./app
    restart: always
    environment: 
      DB_HOST: db
      DB_PASSWORD: some-passowrd 
    ports:
      - "8080:8080"
volumes:
  mariadb:
```

## Запуск

```shell
sudo docker-compose up -d
```
### Информация о контейнерах 
```shell
sudo docker ps
```