FROM tiangolo/uwsgi-nginx-flask:python3.6-alpine3.7

# RUN apk add --no-cache --virtual .build-deps gcc musl-dev
# RUN pip install cython
# RUN apk del .build-deps gcc musl-dev

COPY ./app /app
WORKDIR /app

RUN pip install requests pymongo