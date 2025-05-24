FROM python:3.10.11

WORKDIR /app
COPY . /app

RUN apt-get update && apt-get install -y libzbar0
RUN apt-get update && apt-get install -y libgl1-mesa-glx
RUN pip install -r requirements.txt

CMD ["gunicorn", "run:app", "--bind", "0.0.0.0:5000"]