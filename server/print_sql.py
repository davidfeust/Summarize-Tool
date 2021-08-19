import sqlite3
from datetime import datetime

from LoggerSQL import LoggerSQL


# def print_table(name):
#     res = conn.execute("SELECT * FROM " + name)
#     for i in res.fetchall():
#         print(i)


if __name__ == '__main__':
    l = LoggerSQL()
    conn = sqlite3.connect('log.sqlite', check_same_thread=False)
    l.print_table('JOBS')
    # r = l.add_user_and_statistics('d', 'sdff', 'DF@WE.c', datetime.now(), 'catge')
    # print(r)
    # print_table('USERS')
    # print_table('STATISTICS')
    # l.print_table('USERS')
    # res = conn.execute('SELECT (julianday(CURRENT_TIMESTAMP) ) FROM jobs;')
    # q = '''
    # CAST(strftime('%s', end_time) as integer) -
    # CAST(strftime('%s', start-time) as integer)
    # '''
    # res = conn.execute("SELECT CAST(strftime('%s', CURRENT_TIMESTAMP) as integer) FROM jobs;")
    # res = conn.execute("SELECT category, count(category) FROM jobs group by category;")
    # for i in res.fetchall():
    #     print(i)
    # print(res.fetchall())



