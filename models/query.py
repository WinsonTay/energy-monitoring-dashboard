from models.base_model import BaseModel
from models.generator import Generator,Record
import datetime
import peewee as pw

gen1 = Generator.get_by_id(1)
