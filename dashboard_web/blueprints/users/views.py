from flask import Blueprint, render_template , request ,redirect , flash, url_for , session , escape , Flask
from werkzeug.security import generate_password_hash , check_password_hash
from werkzeug.utils import secure_filename
# from models import *
from flask_login import login_user, logout_user, login_required , current_user

# from models import user as u
users_blueprint = Blueprint('users',
                            __name__,
                            template_folder='templates')


@users_blueprint.route('/', methods=['GET'])
def new():
    return render_template('users/new.html')
