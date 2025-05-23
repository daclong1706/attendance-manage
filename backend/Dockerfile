FROM python:3.10.11

WORKDIR /app
COPY . /app

RUN apt-get update && apt-get install -y libzbar0
RUN pip install -r requirements.txt

CMD ["gunicorn", "run:app"]