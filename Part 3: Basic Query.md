# 📘 MongoDB Basic Queries

This section covers the fundamental MongoDB concepts and basic commands required before learning CRUD operations.

---

## 📖 Definitions

* **Database** → A container that holds collections
* **Collection** → A group of related documents (similar to a table in SQL)
* **Document** → A single record stored in JSON-like format (BSON internally)

---

## 🧾 Example Document

```json
{
  "name": "Vivek",
  "age": 24,
  "role": "Backend Developer"
}
```

---

## 📊 Show All Databases

```js
show dbs
```

👉 Displays all existing databases

---

## 📂 Create / Switch Database

```js
use myFirstDB
```

👉

* Switches to database if it exists
* Creates a new database on first insert

---

## 📁 Show Collections

```js
show collections
```

👉 Lists all collections in the current database

---

## 🧾 Create Collection (Optional)

```js
db.createCollection("users")
```

👉 MongoDB can automatically create collections when inserting data

---

## ➕ Insert Document

```js
db.users.insertOne({
  name: "Vivek",
  age: 24,
  role: "Backend Developer"
})
```

👉

* Creates collection if it does not exist
* Inserts one document

---

## ➕ Insert Multiple Documents

```js
db.users.insertMany([
  { name: "Rahul", age: 25, role: "Frontend Developer" },
  { name: "Amit", age: 26, role: "Full Stack Developer" }
])
```

---

## 👀 View Documents

```js
db.users.find()
```

👉 Displays all documents in the collection

---

👉
* Permanently deletes the `users` collection and all its documents
* Returns `true` on success
> ⚠️ **Warning:** This action is irreversible. All data in the collection will be lost.
---
## 🗑️ Drop the Current Database
```js
// First switch to the database you want to drop
use myFirstDB

// Then drop it
db.dropDatabase()
```
👉 Deletes the entire current database along with all its collections and documents
> ⚠️ **Warning:** This action is irreversible. All collections and documents will be permanently deleted.
---
## ✅ Verify After Dropping
```js
show dbs         // database should no longer appear
show collections // collection should no longer appear
```
👉 Empty databases are not shown in `show dbs` — this is expected MongoDB behaviour


