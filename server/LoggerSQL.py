import sqlite3


class LoggerSQL:

    def __init__(self):
        self.conn = sqlite3.connect('server/log.sqlite', check_same_thread=False)

        self.conn.execute('''
                CREATE TABLE IF NOT EXISTS JOBS (
                ID INTEGER PRIMARY KEY NOT NULL,
                TYPE TEXT NOT NULL,
                START_TIME TIME NOT NULL,
                END_TIME TIME NOT NULL,
                FILE_NAME TEXT,
                MAX_NUM INT,
                MAX_PERCENTAGE double,
                CATEGORY TEXT,
                SUMMARY TEXT
            );
               ''')

        self.conn.execute('''
                CREATE TABLE IF NOT EXISTS USERS (
                USER_ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                FIRST_NAME TEXT NOT NULL,
                LAST_NAME TEXT NOT NULL,
                EMAIL TIME NOT NULL,
                REGISTRATION_TIME TIME
            );
               ''')

        self.conn.execute('''
                CREATE TABLE IF NOT EXISTS STATISTICS (
                USER_ID INTEGER PRIMARY KEY NOT NULL,
                CATEGORY TEXT,
                TIME TIME
            );
               ''')

    def add_job(self, job_id, job_type, start_time, end_time, file_name, max_num=None, max_per=None, category=None,
                summary=None):
        query = 'INSERT INTO JOBS (ID,TYPE,START_TIME,END_TIME,FILE_NAME,MAX_NUM,MAX_PERCENTAGE,CATEGORY,SUMMARY) ' \
                'VALUES (?,?,?,?,?,?,?,?,?)'
        self.conn.execute(query,
                          (job_id, job_type, start_time, end_time, file_name, max_num, max_per, category, summary))
        self.conn.commit()

    def add_user(self, first_name, last_name, email, time):
        query = 'INSERT INTO USERS (FIRST_NAME,LAST_NAME,EMAIL,REGISTRATION_TIME) ' \
                'VALUES (?,?,?,?)'
        self.conn.execute(query, (first_name, last_name, email, time))
        self.conn.commit()
        res = self.conn.execute('SELECT last_insert_rowid()')
        return res.fetchall()[0][0]

    def add_statistics(self, user_id, category, time):
        query = 'INSERT INTO STATISTICS (USER_ID, CATEGORY, TIME) VALUES (?,?,?)'
        self.conn.execute(query, (user_id, category, time))
        self.conn.commit()

    def add_user_and_statistics(self, first_name, last_name, email, time, category):
        user_id = self.add_user(first_name, last_name, email, time)
        self.add_statistics(user_id, category, time)

    def get_summary_file(self, job_id):
        query = 'SELECT SUMMARY FROM JOBS WHERE ID = '
        res = self.conn.execute(query + str(job_id))
        res = res.fetchall()
        if len(res) == 0:
            return None
        return res[0][0]

    def get_content_file(self, job_id):
        query = 'SELECT FILE_NAME FROM JOBS WHERE ID = '
        res = self.conn.execute(query + str(job_id))
        res = res.fetchall()
        if len(res) == 0:
            return None
        return res[0][0]

    def print_table(self, table):
        print(table + ":")
        res = self.conn.execute("SELECT * FROM " + table)
        for i in res.fetchall():
            print(i)
