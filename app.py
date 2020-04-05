import os
import config
from flask import Flask
from models.base_model import db
from flask_wtf.csrf import CSRFProtect


web_dir = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), 'dashboard_web')

app = Flask('Energy Monitor Dashboard', root_path=web_dir)
# csrf = CSRFProtect(app)

if os.getenv('FLASK_ENV') == 'production':
    app.config.from_object("config.ProductionConfig")
else:
    app.config.from_object("config.DevelopmentConfig")


@app.before_request
def before_request():
    db.connect()

@app.after_request
def add_header():
    # r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    # r.headers["Pragma"] = "no-cache"
    # r.headers["Expires"] = "0"
    # r.headers['Cache-Control'] = 'public, max-age=0'
    # return r
    pass



@app.teardown_request
def _db_close(exc):
    if not db.is_closed():
        print(db)
        print(db.close())
    return exc
