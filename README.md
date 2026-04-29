# 🍃 MongoDB — Complete Notes, Cheat Sheet & Learning Guide (Parts 1–27) 

> The most comprehensive, beginner-to-advanced **MongoDB tutorial & reference** on GitHub — covering **27 structured parts** from basics to Replication, Sharding, Transactions, Atlas Search, Aggregation Pipelines, Indexing, Triggers, and **MongoDB with Node.js Integration**.

[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/vivekpandey76/mongodb-notes?style=for-the-badge&logo=github)](https://github.com/vivekpandey76/mongodb-notes/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/vivekpandey76/mongodb-notes/pulls)

---

<!-- SEO Keywords: MongoDB tutorial, MongoDB cheat sheet, MongoDB notes, MongoDB for beginners, MongoDB aggregation pipeline, MongoDB indexing, MongoDB Atlas, MongoDB replication, MongoDB sharding, MongoDB transactions, MongoDB triggers, MongoDB Node.js, Mongoose CRUD, NoSQL database guide, MongoDB complete course, mongodb learning guide, mongodb query operators, mongodb full course, mongodb with express -->

## 📖 What's Inside?

This repository is a **structured, hands-on MongoDB learning guide** — the perfect reference for developers going from zero to production-ready MongoDB skills. Each part is a focused, self-contained Markdown file packed with **real code examples**, clear explanations, and practical tips.

🔗 **Related Repositories:**
- 📦 **[mongodb-dataset](https://github.com/vivekpandey76/mongodb-dataset)** — Ready-to-use E-commerce JSON datasets (Customers, Orders, Products, Reviews) to practice queries in this guide.
- 🟢 **[mongodb-nodejs-project](https://github.com/vivekpandey76/mongodb-nodejs-project)** — Full **MongoDB + Node.js Integration** with Express & Mongoose — complete CRUD API (Part 27 companion project).

---

## 📚 Table of Contents

Click any part to open it directly:

| # | Topic | What You'll Learn |
|---|-------|-------------------|
| 01 | [📌 What is MongoDB?](./Part%201%3A%20What%20is%20mongodb.md) | NoSQL vs SQL, documents, collections, why MongoDB |
| 02 | [☁️ MongoDB Atlas Setup](./Part%202%3A%20Mongodb%20atlas.md) | Cloud setup, cluster creation, connection strings |
| 03 | [🔍 Basic Queries](./Part%203%3A%20Basic%20Query.md) | `find`, `findOne`, filtering documents |
| 04 | [✏️ CRUD Operations](./Part%204%3A%20Crud.md) | `insertOne`, `updateOne`, `deleteOne`, `replaceOne` |
| 05 | [⚖️ Comparison Operators](./Part%205%3A%20Comparison%20Operator.md) | `$eq`, `$ne`, `$gt`, `$lt`, `$in`, `$nin` |
| 06 | [🔗 Logical Operators](./Part%206%3A%20Logical%20Operator.md) | `$and`, `$or`, `$not`, `$nor` |
| 07 | [🗑️ Soft Delete vs Hard Delete](./Part%207%3A%20Soft%20Delete%20vs%20Hard%20Delete.md) | Patterns for safe data deletion |
| 08 | [🔗 Embedding vs Referencing](./Part%208%3A%20Embedding%20vs%20Referencing.md) | Data modelling strategies, when to use each |
| 09 | [🗂️ Data Types](./Part%209%3A%20Data%20Types.md) | BSON types, ObjectId, Date, Number, String |
| 10 | [📄 Cursor Methods](./Part%2010%3A%20Cursor%20%28skip%2Climit%2Csort%29.md) | `skip()`, `limit()`, `sort()` for pagination |
| 11 | [🔎 Projection](./Part%2011%3A%20Projection%20in%20mongodb.md) | Include/exclude fields, `$slice`, `$elemMatch` |
| 12 | [📦 Array Operators](./Part%2012%3A%20Array%20Operators.md) | `$push`, `$pull`, `$addToSet`, `$all`, `$size` |
| 13 | [🛠️ Advanced Update Operators](./Part%2013%3A%20Advance%20update%20Operators.md) | `$set`, `$unset`, `$inc`, `$rename`, `$min`, `$max` |
| 14 | [📝 Bulk Write](./Part%2014%3A%20Bulk%20Write.md) | `bulkWrite`, ordered vs unordered operations |
| 15 | [🧮 Query Operators](./Part%2015%3A%20Query%20Operators.md) | `$exists`, `$type`, `$expr`, `$jsonSchema` |
| 16 | [🔤 Regex Searching](./Part%2016%3A%20Regex%20Searching.md) | Pattern matching, case-insensitive search |
| 17 | [⚡ Indexing](./Part%2017%3A%20Indexing.md) | Single, compound, text, TTL indexes; `explain()` |
| 18 | [🔄 Aggregation Basics](./Part%2018%3A%20Aggregation%20Basic.md) | `$match`, `$group`, `$sort`, `$project`, `$count` |
| 19 | [🔄 Aggregation Advanced](./Part%2019%3A%20Aggregation%20Advance%20%28lookup%2C%20facet%2C%20unwind%29.md) | `$lookup`, `$unwind`, `$facet` |
| 20 | [🔄 Aggregation Expert](./Part%2020%3A%20Aggregation%20Advance%20%28%24addfields%2C%24merge%2C%24cond%29.md) | `$addFields`, `$merge`, `$cond`, `$switch` |
| 21 | [🌐 MongoDB Atlas — Part 1](./Part%2021%3A%20Mongodb%20Atlas%20Part%201.md) | Atlas Search basics, analyzers, index config |
| 22 | [🌐 MongoDB Atlas — Fuzzy & Compound](./Part%2022%3A%20Mongodb%20atlas%28Fuzzy%2Ccompound%29.md) | Fuzzy search, compound queries, scoring |
| 23 | [🌐 MongoDB Atlas — Autocomplete & Custom Search](./Part%2023%3A%20Mongodb%20Atlas%28Autocomplete%2CCustom%20search%2C%20storedSource%29.md) | Autocomplete, custom search, stored source |
| 24 | [⚙️ Triggers in MongoDB](./Part%2024%3A%20Triggers%20in%20Mongodb.md) | Database triggers, scheduled triggers, event-driven logic |
| 25 | [🔒 Transactions in MongoDB](./Part%2025%3A%20Transactions%20in%20Mongodb.md) | ACID transactions, sessions, multi-document writes |
| 26 | [🌍 Sharding in MongoDB](./Part%2026%3A%20Sharding%20in%20Mongodb.md) | Horizontal scaling, shard keys, mongos, chunks |
| 27 | [♻️ Replication in MongoDB](./Part%2027%3A%20Replication%20in%20Mongodb.md) | Replica sets, primary/secondary, failover, oplog |

---

## 📺 YouTube Playlist — Complete Explanations

### 🎬 [→ Watch the Full MongoDB Playlist on YouTube](https://www.youtube.com/playlist?list=PLkFShEMrLia0s46qqN4CykmOrkGoPyHnW)

> **Check out the complete playlist with in-depth explanations for every concept!** Each video walks through the topics covered in these notes with live examples, debugging tips, and best practices.

**Don't forget to:**
- ✅ **Like** the videos if they help you
- 🔔 **Subscribe** to the channel for more MongoDB tutorials
- 💬 Comment with questions or topics you'd like covered next

---

## 🟢 Part 27 — MongoDB with Node.js Integration & CRUD

> **The final part of this series goes full-stack!** Learn how to connect MongoDB to a Node.js + Express application using Mongoose, and build a complete REST API.

### 🔗 [→ View the Node.js Integration Project](https://github.com/vivekpandey76/mongodb-nodejs-project)

| Feature | Detail |
|---------|--------|
| **Runtime** | Node.js (v16+) |
| **Framework** | Express.js |
| **Database** | MongoDB (local) |
| **ODM** | Mongoose |
| **CRUD** | Create, Read, Update, Soft-Delete |

**API Endpoints:**

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/users` | Create a new user |
| `GET` | `/users` | Get all users |
| `GET` | `/users/:id` | Get user by ID |
| `PUT` | `/users/:id` | Update user |
| `DELETE` | `/users/:id` | Soft-delete user |

**User Schema:** `name`, `email`, `age`, `phone`, `isDeleted` (soft delete pattern)

> **Note:** Delete is a **soft delete** — it sets `isDeleted: true` instead of permanently removing the document.

---

## 📦 Practice Datasets

Want real data to practice queries? Use the ready-made E-commerce dataset:

### 🔗 [→ mongodb-dataset — E-commerce JSON Datasets](https://github.com/vivekpandey76/mongodb-dataset)

#### Option 1 — Manual Import (via Mongo Shell / Compass)

```bash
# 1. Create the database
use ecommerce

# 2. Import each collection
db.Customers.insertMany([/* paste Customer-dataset.json content */])
db.Orders.insertMany([/* paste OrdersCollection.json content */])
db.Products.insertMany([/* paste Products-dataset.json content */])
db.Reviews.insertMany([/* paste Reviews-dataset.json content */])
db.CustomerLarge.insertMany([/* paste CustomerLarge.json content */])
db.CustomerOtp.insertMany([/* paste CustomerOtp.json content */])
```

#### Option 2 — Script-Based Import (Automated)

```bash
# Clone the dataset repo
git clone https://github.com/vivekpandey76/mongodb-dataset.git
cd mongodb-dataset

# Run the import script (if provided)
node import.js
# or use mongoimport:
mongoimport --db ecommerce --collection Customers --file Customer-dataset.json --jsonArray
mongoimport --db ecommerce --collection Orders --file OrdersCollection.json --jsonArray
mongoimport --db ecommerce --collection Products --file Products-dataset.json --jsonArray
mongoimport --db ecommerce --collection Reviews --file Reviews-dataset.json --jsonArray
```

**Collections available:**
- 👤 `Customers` — customer profiles
- 📦 `Orders` — order history
- 🛍️ `Products` — product catalogue
- ⭐ `Reviews` — product reviews
- 👥 `CustomerLarge` — large dataset for performance/indexing tests
- 🔐 `CustomerOtp` — OTP verification data

---

## 🚀 Getting Started with This Guide

### Prerequisites

- MongoDB installed locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [MongoDB Shell (mongosh)](https://www.mongodb.com/docs/mongodb-shell/) or [MongoDB Compass](https://www.mongodb.com/products/compass)
- Node.js `v18+` (for the Node.js integration part)

### Quick Start

```bash
# 1. Clone this notes repository
git clone https://github.com/vivekpandey76/mongodb-notes.git
cd mongodb-notes

# 2. Browse the parts in order
# Open any Part X.md file to start learning

# 3. Clone & run the Node.js project (Part 27)
git clone https://github.com/vivekpandey76/mongodb-nodejs-project.git
cd mongodb-nodejs-project
npm install
node server.js

# 4. Clone & load the practice datasets
git clone https://github.com/vivekpandey76/mongodb-dataset.git
```

---

## 🗺️ Recommended Learning Path

```
🟢 Beginner     ──▶  Parts  1 → 2 → 3 → 4 → 5 → 6 → 9
🟡 Intermediate ──▶  Parts  7 → 8 → 10 → 11 → 12 → 13 → 14 → 15 → 16
🔴 Advanced     ──▶  Parts  17 → 18 → 19 → 20 → 21 → 22 → 23
🚀 Expert       ──▶  Parts  24 → 25 → 26 → 27 (+ Node.js project)
```

**💡 Tip:** Pair each part from the table of contents with the corresponding video from the YouTube playlist for the best learning experience!

---

## 💡 Key Concepts at a Glance

| Concept | Parts |
|---------|-------|
| **Core CRUD & Queries** | Parts 3, 4 |
| **Filtering & Operators** | Parts 5, 6, 15 |
| **Data Modelling** | Parts 7, 8, 9 |
| **Performance & Pagination** | Parts 10, 11, 17 |
| **Array & Update** | Parts 12, 13, 14 |
| **Search & Regex** | Parts 16, 21, 22, 23 |
| **Aggregation Pipeline** | Parts 18, 19, 20 |
| **Triggers & Automation** | Part 24 |
| **Transactions (ACID)** | Part 25 |
| **Sharding (Scale-out)** | Part 26 |
| **Replication & HA** | Part 27 |
| **Node.js Integration** | [mongodb-nodejs-project](https://github.com/vivekpandey76/mongodb-nodejs-project) |

---

## 📂 Repository Structure

```
mongodb-notes/
├── README.md                                              ← You are here
├── LICENSE                                               ← MIT License
├── CONTRIBUTING.md                                       ← How to contribute
├── CODE_OF_CONDUCT.md                                    ← Community standards
├── CHANGELOG.md                                          ← Release history
├── index.js                                              ← Example scripts
├── Part 1:  What is mongodb.md
├── Part 2:  Mongodb atlas.md
├── Part 3:  Basic Query.md
├── Part 4:  Crud.md
├── Part 5:  Comparison Operator.md
├── Part 6:  Logical Operator.md
├── Part 7:  Soft Delete vs Hard Delete.md
├── Part 8:  Embedding vs Referencing.md
├── Part 9:  Data Types.md
├── Part 10: Cursor (skip,limit,sort).md
├── Part 11: Projection in mongodb.md
├── Part 12: Array Operators.md
├── Part 13: Advance update Operators.md
├── Part 14: Bulk Write.md
├── Part 15: Query Operators.md
├── Part 16: Regex Searching.md
├── Part 17: Indexing.md
├── Part 18: Aggregation Basic.md
├── Part 19: Aggregation Advance (lookup, facet, unwind).md
├── Part 20: Aggregation Advance ($addfields,$merge,$cond).md
├── Part 21: Mongodb Atlas Part 1.md
├── Part 22: Mongodb atlas(Fuzzy,compound).md
├── Part 23: Mongodb Atlas(Autocomplete,Custom search,storedSource).md
├── Part 24: Triggers in Mongodb.md
├── Part 25: Transactions in Mongodb.md
├── Part 26: Sharding in Mongodb.md
└── Part 27: Replication in Mongodb.md
```

---

## 🔗 Related Repositories

| Repository | Description | Link |
|------------|-------------|------|
| 📦 **mongodb-dataset** | E-commerce JSON datasets for practice | [→ Visit](https://github.com/vivekpandey76/mongodb-dataset) |
| 🟢 **mongodb-nodejs-project** | MongoDB + Node.js + Express CRUD API | [→ Visit](https://github.com/vivekpandey76/mongodb-nodejs-project) |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Please read the **[Contributing Guide](CONTRIBUTING.md)** before submitting a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/add-notes`)
3. Commit your changes (`git commit -m 'Add notes for Part X'`)
4. Push to the branch (`git push origin feature/add-notes`)
5. Open a Pull Request

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold its standards.

---

## ⭐ Show Your Support

If these notes helped you, please **star ⭐ this repository** — it helps others discover it and keeps this resource growing for the community!

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Copyright © 2024 [Vivek Pandey](https://github.com/vivekpandey76)

---

> Made with ❤️ by [Vivek Pandey](https://github.com/vivekpandey76) for the developer community | Happy Learning! 🍃
