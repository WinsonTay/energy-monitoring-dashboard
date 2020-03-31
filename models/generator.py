from models.base_model import BaseModel
from playhouse.hybrid import hybrid_property, hybrid_method
import datetime
from datetime import timedelta
import peewee as pw

class Generator(BaseModel):
    name = pw.CharField(unique=True)
    
    @hybrid_method
    def daily_record(self,year,month,day):
        date_request=datetime.datetime(year,month,day,0,0,0)
        date_request_end= date_request + timedelta(days=1)
        record = Record.select().where((Record.generator==self) & (Record.record_time >= date_request) & (Record.record_time<=date_request_end))
        if len(record) >= 0:
            return record

        return 0

    @hybrid_method
    def power_generated(self,year,month,day):
        date_req = datetime.datetime(year,month,day,0,0,0)
        date_req_end = date_req + timedelta(days=1)
        record = Record.select().where((Record.generator==self) & (Record.record_time >= date_req) & (Record.record_time<=date_req_end))
        if len(record) > 0:
            power_generated = record[-1].kWH - record[0].kWH
            return power_generated
        else: 
            return 0


class Record(BaseModel):
    kWH = pw.FloatField(null=False)
    voltage_3p = pw.FloatField(null=False)
    generator = pw.ForeignKeyField(Generator, backref='records')
    record_time = pw.DateTimeField(default=datetime.datetime.now) 
   
    class Meta:
        indexes = (
            (('generator', 'record_time'), True),
        )

