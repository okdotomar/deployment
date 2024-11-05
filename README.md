# My Kitter Project

## Resource

**Posts**

Attributes:

* username (string)
* meow (string)
* cat_name (string)
* cat_color (string)
* date (string)

## Schema

```sql
CREATE TABLE posts (
id INTEGER PRIMARY KEY,
username TEXT,
meow TEXT,
cat_name TEXT,
cat_color TEXT
date TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve post collection       | GET    | /kitter/posts
Retrieve post member           | GET    | /kitter/posts/*\<id\>*
Create post member             | POST   | /kitter/posts
Update post member             | PUT    | /kitter/posts/*\<id\>*
Delete post member             | DELETE | /kitter/posts/*\<id\>*