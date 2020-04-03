from models.base_model import BaseModel
from models.generator import Generator,Record
import datetime
import peewee as pw

def addData():
    if Generator.get_or_none(Generator.id == 1) == None:
        gen1 =Generator(name='Generator 1')
        gen1.save()
        gen2=Generator(name='Generator 2')
        gen2.save()
        gen3=Generator(name='Generator 3')
        gen3.save()
