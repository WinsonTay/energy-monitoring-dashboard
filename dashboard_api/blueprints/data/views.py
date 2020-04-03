from flask import Blueprint, jsonify
from random import randint
import datetime as dt
from models.generator import Generator,Record
from datetime import timedelta
users_api_blueprint = Blueprint('users_api',
                             __name__,
                             template_folder='templates')

@users_api_blueprint.route('/<int:year>/<int:month>/<int:day>', methods=['GET'])
def index(year,month,day):
    gen1 = Generator.get_by_id(1)
    gen2 = Generator.get_by_id(2)
    gen3 = Generator.get_by_id(3)

    date = dt.datetime(year,month,day).strftime('%Y-%m-%d')

    if len(gen1.daily_record(year,month,day)) > 0:
        data={   "date":date,
                "gen_record" :[{"name":gen1.name , "power":[value.kWH for value in gen1.daily_record(year,month,day)]},
                        {"name":gen2.name , "power":[value.kWH for value in gen2.daily_record(year,month,day)]},
                        {"name":gen3.name , "power":[value.kWH for value in gen3.daily_record(year,month,day)]},
                    ]  
        }
    else:
          data={"date":date,
                "gen_record" :[{"name":gen1.name , "power":[randint(50,100) for i in range(0,25)]},
                        {"name":gen2.name , "power":[randint(50,100) for i in range(0,25)]},
                        {"name":gen3.name , "power":[randint(50,100) for i in range(0,25)]},
                    ]  
        }
        
             
    #write code here to produce 
    return jsonify(data)

@users_api_blueprint.route('/generated/<int:year>/<int:month>/<int:day>',methods=['GET'])
def power_generated(year,month,day):
    generators = Generator.select().order_by(Generator.created_at.asc())
    date_select = dt.datetime(year,month,day,0,0,0).strftime('%Y-%m-%d')
    #create a seven day list from the selection date input
    seven_day = [dt.datetime(year,month,day) - timedelta(days=i) for i in range(7)]
    data = []
    for gen in generators:
        data_list = []
        for i in reversed(range(7)):
            data_list.append(dict({'date': seven_day[i].date().strftime('%Y-%m-%d'),
                                   'power': gen.power_generated(seven_day[i].date().year, seven_day[i].date().month, seven_day[i].date().day),
                                    }
                                
            ))
        
        data.append(dict({ 'generator_id':gen.id,
                           'generator_name':gen.name,
                           'power_generated':data_list,
        }))  
    return jsonify(data)

