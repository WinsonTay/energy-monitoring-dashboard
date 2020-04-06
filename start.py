from app import app
import dashboard_api
import dashboard_web
import logging



if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)
