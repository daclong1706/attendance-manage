import os
from dotenv import load_dotenv
import pymysql
pymysql.install_as_MySQLdb()


load_dotenv()

db_host = '103.200.23.126'
db_port = '3306'
db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']
db_host = os.environ['DB_HOST']
db_port = os.environ['DB_PORT']

class Config:
    """Local MySQL connection string here"""
    # SQLALCHEMY_DATABASE_URI = "mysql://{db_user}:{db_password}@localhost:3306/{db_name}".format(
    # db_user=db_user, db_password=db_password, db_name=db_name)
    
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    
    """phpMyAdmin connection string here"""
    # SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{db_user}@localhost:3306/{db_name}".format(
    # db_user=db_user, db_password=db_password, db_name=db_name)

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY= os.environ['JWT_SECRET_KEY']