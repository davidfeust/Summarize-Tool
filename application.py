import os
import flask_cors
from flask import Flask, request, session, jsonify, abort, send_from_directory, render_template, make_response
from werkzeug.utils import secure_filename
from flask_cors import cross_origin, CORS
import logging
from datetime import datetime

# import server.Summarizer as sum
# from server.T5 import T5
# from server.Bart import Bart
# from server.LoggerSQL import LoggerSQL

# logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('T5 SERVER ')

# path
CURR_PATH = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = os.path.join(CURR_PATH, 'server/articles')
SUMMARIES_FOLDER = os.path.join(CURR_PATH, 'server/summaries')
TIME_PATTERN = "%d/%m/%Y %H:%M:%S:%f"

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'html', 'doc', 'docx'}

# app
application = Flask(__name__)
# application = Flask(__name__, static_folder='frontend/build', static_url_path='')

application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
application.config['CORS_HEADERS'] = 'Content-Type'
# application.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

flask_cors.CORS(application, expose_headers='Authorization')

# # model = T5()
# model = Bart()
# log_db = LoggerSQL()
# ids = 0

# TODO: needs to be change
# SHARE_LINK = 'https://www.hilostudent.com/summary/'
SHARE_LINK = ''


def get_id():
    global ids
    res = datetime.now().strftime("%d%m%Y%H%M%S")
    res += str(ids)
    ids += 1
    return int(res)


def get_max(max_num, max_per, num_words):
    try:
        max_per = float(max_per)
        return int(num_words * max_per)
    except ValueError:
        try:
            max_num = int(max_num)
            return max_num
        except ValueError:
            return -1


@application.route('/test')
def test():
    return '<p>Hello World!</p>\n'


@application.route('/')
def home():
    return '<h1>Hello Home!</h1>\n'


# # @application.route("/", defaults={"path": ""})
# # @application.route("/<string:path>")
# # def index(path):
# #     print('index(path)', path)
# #     return send_from_directory(application.static_folder, "index.html")
# #
# #
# # @application.route("/<string:path>/<job_id>")
# # def catch_all(path, job_id):
# #     print('catch_all(path, job_id)', path, job_id)
# #     if path == 'images':
# #         return send_from_directory('frontend/build/images', job_id, as_attachment=True)
# #     else:
# #         return send_from_directory(application.static_folder, "index.html")
#
#
# @application.errorhandler(404)
# def resource_not_found(e):
#     return jsonify(error=str(e)), 404
#
#
# @application.route('/test', methods=['POST', 'GET'])
# @cross_origin()
# def test():
#     return 'TEST!!'
#
#
# @application.route('/summarize', methods=['POST'])
# @cross_origin()
# def file_upload():
#     st = datetime.now().strftime(TIME_PATTERN)
#     if not os.path.isdir(UPLOAD_FOLDER):
#         os.mkdir(UPLOAD_FOLDER)
#     logger.info('start summarize')
#
#     file = request.files['file']
#     max_num = request.form['max_num']
#     max_per = request.form['max_per']
#     category = request.form['category']
#     job_id = get_id()
#
#     filename = secure_filename(file.filename)
#     title, _ = os.path.splitext(filename)
#     temp_path = os.path.join(UPLOAD_FOLDER, filename)
#
#     # TODO: Check that the file is not harmful
#     file.save(temp_path)
#     session['uploadFilePath'] = temp_path
#
#     content = sum.read_file(temp_path)
#     num_words = len(content.split())
#     max_l = get_max(max_num, max_per, num_words)
#
#     summary = model.summarizer(content, max_l)
#
#     summary_name = 'Summary_' + title + '##' + str(job_id) + '.txt'
#     path = os.path.join(SUMMARIES_FOLDER, summary_name)
#
#     with open(path, 'w+', encoding="utf-8") as f:
#         f.write(summary)
#
#     et = datetime.now().strftime(TIME_PATTERN)
#
#     log_db.add_job(job_id, 'summarize', st, et, filename, max_num, max_per, category, summary_name)
#
#     title = title.replace('_', ' ')
#     os.remove(temp_path)
#
#     logger.info('done summarize')
#     return jsonify({'summary': summary, 'link': SHARE_LINK + str(job_id), 'title': title})
#
#
# @cross_origin()
# @application.route('/get_summary', methods=['POST', 'GET'])
# def summary_share():
#     logger.info('start summary')
#     job_id = request.args.get('id')
#     print('jjjj', job_id)
#     if job_id == 'undefined':
#         return jsonify({'OK': False})
#
#     filename = log_db.get_summary_file(job_id)
#     print('filename', filename)
#     if filename is None:
#         # page not found error
#         abort(404, description="Resource not found")
#
#     path = os.path.join(SUMMARIES_FOLDER, filename)
#     print('path', path)
#     with open(path, 'r', encoding="utf-8") as f:
#         summary = f.read()
#
#     title = filename.split('##')[0]
#     title, _ = os.path.splitext(title)
#     title = title.replace('_', ' ')
#
#     logger.info('done summary')
#     return jsonify({'summary': summary, 'link': SHARE_LINK + str(job_id), 'title': title})
#
#
# @cross_origin()
# @application.route('/original', methods=['POST'])
# def save_original():
#     st = datetime.now().strftime(TIME_PATTERN)
#     logger.info('start original')
#
#     file = request.files['file']
#     filename = secure_filename(file.filename)
#     temp_path = os.path.join(UPLOAD_FOLDER, filename)
#     file.save(temp_path)
#     session['uploadFilePath'] = temp_path
#
#     content = sum.read_file(temp_path)
#     os.remove(temp_path)
#     job_id = get_id()
#     filename = filename + '##' + str(job_id)
#     path = os.path.join(UPLOAD_FOLDER, filename)
#     path += '.txt'
#     with open(path, 'w', encoding="utf-8") as f:
#         f.write(str(content))
#
#     et = datetime.now().strftime(TIME_PATTERN)
#     log_db.add_job(job_id, 'original', st, et, filename)
#
#     logger.info('done original')
#     return jsonify({'job_id': job_id})
#
#
# @cross_origin()
# @application.route('/show_article', methods=['POST', 'GET'])
# def show_original():
#     st = datetime.now().strftime(TIME_PATTERN)
#     logger.info('start show_article')
#
#     job_id = request.args.get('id')
#     file_name = log_db.get_content_file(job_id)
#     if file_name is None:
#         # page not found error
#         abort(404, description="Resource not found")
#
#     path = os.path.join(UPLOAD_FOLDER, file_name)
#     with open(path + '.txt', 'r', encoding="utf-8") as f:
#         content = f.read()
#
#     title = file_name.split('##')[0]
#     title, _ = os.path.splitext(title)
#     title = title.replace('_', ' ')
#
#     et = datetime.now().strftime(TIME_PATTERN)
#     # log_db.add_job(job_id, 'show_article', st, et, filename, max_num, max_per, category, summary_name)
#
#     logger.info('done show_article')
#     return jsonify({'content': content, 'title': title})
#
#
# @cross_origin()
# @application.route('/login', methods=['POST', 'GET'])
# def login():
#     logger.info('start login')
#     first_name = request.form['first_name']
#     last_name = request.form['last_name']
#     email = request.form['email']
#
#     if 'category' in request.form:
#         category = request.form['category']
#         log_db.add_user_and_statistics(first_name, last_name, email, datetime.now().strftime(TIME_PATTERN), category)
#     else:
#         log_db.add_user(first_name, last_name, email, datetime.now().strftime(TIME_PATTERN))
#
#     logger.info('done login')
#     return jsonify({'OK': True})
#
#
# @application.after_request
# def add_header(r):
#     """
#     Add headers to both force latest IE rendering engine or Chrome Frame,
#     and also to cache the rendered page for 10 minutes.
#     """
#     r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
#     r.headers["Pragma"] = "no-cache"
#     r.headers["Expires"] = "0"
#     r.headers['Cache-Control'] = 'public, max-age=0'
#     return r
#
#
# if __name__ == "__main__":
#     application.secret_key = os.urandom(24)
#     # application.run(debug=False, host="0.0.0.0", use_reloader=False)
#     application.run(debug=True, host="0.0.0.0", use_reloader=False)

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
