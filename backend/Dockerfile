# Crea nuestra imagen inicial basada en Python 3.8..
FROM python:3.8

# Exponer puertos..
EXPOSE 5000

# Indicamos a Python que no genere .pyc..
ENV PYTHONDONTWRITEBYTECODE 1

# Desactiva almacenamiento en búfer..
ENV PYTHONUNBUFFERED 1

# Requisitos de instalación usando pip..
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

# Establece el directorio de trabajo y agregue archivos Flask API..
WORKDIR /app
ADD . /app