from flask import Flask, request
from kitterdb import KitterDB

app = Flask(__name__)

@app.route("/kitter/posts/<int:post_id>", methods=["OPTIONS"])
def options_cors(post_id):
    return "", 204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

@app.route("/kitter/posts", methods=["GET"])
def retrieve_posts():
    db = KitterDB("kitterdb.db")
    posts = db.getPosts()
    return posts, 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/kitter/posts/<int:post_id>", methods=["GET"])
def retrieve_post(post_id):
    db = KitterDB("kitterdb.db")
    if not db.getPost(post_id):
        return "Post not found", 404
    post = db.getPost(post_id)
    return post, 200, {"Access-Control-Allow-Origin":"*"}

@app.route("/kitter/posts", methods=["POST"])
def create_post():
    # db.saveRecord({"name": request.form["name"]})
    db = KitterDB("kitterdb.db")
    username = request.form["username"]
    meow = request.form["meow"]
    cat_name = request.form["cat_name"]
    cat_color = request.form["cat_color"]
    date = request.form["date"]
    db.createPost(username, meow, cat_name, cat_color, date)
    return "Created", 201, {"Access-Control-Allow-Origin":"*"}

@app.route("/kitter/posts/<int:post_id>", methods=["PUT"])
def update_post(post_id):
    db = KitterDB("kitterdb.db")
    print("connected to db")
    if db.getPost(post_id):
        print("got post")
        username = request.form["username"]
        meow = request.form["meow"]
        cat_name = request.form["cat_name"]
        cat_color = request.form["cat_color"]
        date = request.form["date"]
        db.updatePost(post_id, username, meow, cat_name, cat_color, date)
        print("updated post")
        return "Updated", 200, {"Access-Control-Allow-Origin":"*"}
    return "Post not found", 404

@app.route("/kitter/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    db = KitterDB("kitterdb.db")
    if db.getPost(post_id):
        db.deletePost(post_id)
        return "Deleted", 200, {"Access-Control-Allow-Origin":"*"}
    return "Post not found", 404


def run():    
    app.run(port=8081, host="0.0.0.0")

if __name__ == "__main__":
    run()