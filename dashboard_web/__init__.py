from app import app
from flask import render_template, flash , url_for ,redirect
from dashboard_web.blueprints.users.views import users_blueprint
from models.query import addData
import logging
from flask_assets import Environment, Bundle
from .util.assets import bundles
# from flask_login import login_user , LoginManager , current_user


assets = Environment(app)
assets.register(bundles)
#Login manager init
# login_manager = LoginManager()
# login_manager.init_app(app)
if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)

# login_manager.login_view = "users.show,id=3"
# login_manager.login_message ="What The Hell"
app.register_blueprint(users_blueprint, url_prefix="/users")

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(401)
def not_authorized(e):
    return render_template('401.html'), 404

@app.route("/")
def home():
    app.logger.debug('this is a DEBUG message')
    return render_template('users/index.html')
    # return render_template('home.html')

# @login_manager.user_loader
# def load_user(user_id):
#     return User.get_or_none(User.id==user_id)
