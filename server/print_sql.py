import sqlite3
from datetime import datetime

from LoggerSQL import LoggerSQL


def print_table(name):
    res = conn.execute("SELECT * FROM " + name)
    for i in res.fetchall():
        print(i)


if __name__ == '__main__':
    # l = LoggerSQL()
    conn = sqlite3.connect('log.sqlite', check_same_thread=False)
    print_table('JOBS')

    query = 'SELECT FILE_NAME FROM JOBS WHERE ID = 190820211338101'
    res = conn.execute(query)
    res = res.fetchall()
    print(res)



