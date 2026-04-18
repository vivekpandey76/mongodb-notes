# 📘 What is MongoDB?

---

## 🍃 MongoDB — Simple Definition

> MongoDB is a **NoSQL database** that stores data in **JSON-like documents**
> instead of rows and columns like traditional SQL databases.

Think of it like this:

| SQL (Traditional) | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |

---

## 🗄️ mongod — The Server

**mongod** = **Mongo** + **D**aemon (background process)

```bash
mongod
```

> `mongod` is the **actual MongoDB server** that runs in the background.
> It is responsible for:

* Storing all your data on disk
* Listening for incoming connections (default port **27017**)
* Handling read and write operations
* Managing memory and data files

💡 **Simple words:** `mongod` is the **engine** — without it running,
nothing else works.

---

## 🖥️ mongo Shell — The Client

```bash
mongosh
```

> `mongosh` (MongoDB Shell) is a **command-line client** you use to
> **talk to the mongod server**.

* You type queries here
* It sends them to `mongod`
* `mongod` processes and returns the result

💡 **Simple words:** Shell is like a **messenger** — you give it
instructions, it talks to the server for you.

---

## 🧭 MongoDB Compass — The GUI Client

> **Compass** is the **official visual tool** (GUI) for MongoDB.
> It does the same job as the shell — but with a **point and click interface**.

✅ No need to remember commands
✅ Visually browse collections and documents
✅ Run queries with a form-based interface
✅ See charts and indexes visually

💡 **Simple words:** Compass is the **visual version** of the shell —
easier for beginners and great for exploring data.

---

## 🔄 How They All Work Together

```
You (Developer)
      │
      ├──▶ mongosh (Shell)      ──┐
      │                           │
      └──▶ Compass (GUI)        ──┼──▶ mongod (Server) ──▶ 💾 Data on Disk
                                  │
      ┌──▶ Your App (Node.js etc) ┘
```

> Both the shell and Compass are just **clients**.
> `mongod` is the **only one actually storing your data**.

---

## 📦 Quick Summary

| Term | What it is | Simple meaning |
|---|---|---|
| **MongoDB** | NoSQL Document Database | Stores data as JSON-like docs |
| **mongod** | Database Server | The engine that runs in background |
| **mongosh** | Shell Client | Command-line tool to run queries |
| **Compass** | GUI Client | Visual tool to explore data |

---

> 💡 **Remember:** Start `mongod` first → then connect via `mongosh` or Compass.
> No server = no database.

> 🙌 **Contributed by:** Vivek Pandey  
> 📅 **Last Updated:** 2026  
> ⭐ If this helped you, consider starring the repo!
