import sqlite3

def dict_factory(cursor, row):
    fields = []

    for column in cursor.description:
        fields.append(column[0])
    
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class KitterDB:
    def __init__(self, filename):
        self.filename = filename
        self.conn = sqlite3.connect(filename)
        self.conn.row_factory = dict_factory
        self.cursor = self.conn.cursor()

    def getPosts(self):
        self.cursor.execute("SELECT * FROM posts")
        return self.cursor.fetchall()
    
    def getPost(self, id):
        data = [id]
        self.cursor.execute("SELECT * FROM posts WHERE id = ?", data)
        return self.cursor.fetchone()
    
    def createPost(self, username, meow, cat_name, cat_color, date):
        data = [username, meow, cat_name, cat_color, date]
        self.cursor.execute("INSERT INTO posts (username, meow, cat_name, cat_color, date) VALUES (?, ?, ?, ?, ?)", data)
        self.conn.commit()

    def updatePost(self, id, username, meow, cat_name, cat_color, date):
        data = [username, meow, cat_name, cat_color, date, id]
        self.cursor.execute("UPDATE posts SET username = ?, meow = ?, cat_name = ?, cat_color = ?, date = ? WHERE id = ?", data)
        self.conn.commit()
        return id

    def deletePost(self, id):
        data = [id]
        self.cursor.execute("DELETE FROM posts WHERE id = ?", data)
        self.conn.commit()