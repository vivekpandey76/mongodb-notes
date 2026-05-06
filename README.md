# 🍃 MongoDB — Complete Notes, Cheat Sheet & Learning Guide (2026)

> The most comprehensive, beginner-to-advanced **MongoDB tutorial & reference** on GitHub — covering **27 structured parts** from basics to Replication, Sharding, Transactions, Atlas Search, Aggregation Pipelines, Indexing, Triggers, and **MongoDB with Node.js Integration**.

[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/vivekpandey76/mongodb-notes?style=for-the-badge&logo=github)](https://github.com/vivekpandey76/mongodb-notes/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/vivekpandey76/mongodb-notes/pulls)

<!-- SEO Keywords: MongoDB tutorial, MongoDB cheat sheet, MongoDB notes, MongoDB for beginners, MongoDB aggregation pipeline, MongoDB indexing, MongoDB Atlas, MongoDB replication, MongoDB sharding, MongoDB transactions, MongoDB triggers, MongoDB Node.js, Mongoose CRUD, NoSQL database guide, MongoDB complete course -->

---

## 📺 Watch the Full Course on YouTube

[![Watch Full MongoDB Course on YouTube](https://img.youtube.com/vi/rOjFGCFEOIM/maxresdefault.jpg)](https://www.youtube.com/watch?v=rOjFGCFEOIM)

### ▶️ [Watch Full MongoDB Course — Zero to Advanced](https://www.youtube.com/watch?v=rOjFGCFEOIM)

[![YouTube](https://img.shields.io/badge/YouTube-Watch%20Now-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=rOjFGCFEOIM)

> 🎓 **27 structured parts** — from absolute beginner to production-grade MongoDB. Every concept in this repo is explained live with real examples, debugging tips, and best practices.

**If this course helps you, please take 5 seconds to:**

| Action | Why It Matters |
|--------|----------------|
| 👍 **[Like the video](https://www.youtube.com/watch?v=rOjFGCFEOIM)** | Helps YouTube recommend it to more developers |
| 🔔 **[Subscribe to the channel](https://www.youtube.com/watch?v=rOjFGCFEOIM)** | Get notified when new tutorials drop |
| 💬 **Drop a comment** | Ask questions, share feedback — I read every one! |
| 🌟 **Star this repo** | Helps others discover this free resource |

> 💡 Your likes, comments and subscriptions directly motivate me to create more **free, high-quality content** like this. Every single interaction counts!

---

## 📖 Overview

This repository is a **structured, hands-on MongoDB learning guide** — the perfect reference for developers going from zero to production-ready MongoDB skills. Each part is a focused, self-contained Markdown file packed with **real code examples**, clear explanations, and practical tips.

🔗 **Related Repositories:**
- 📦 **[mongodb-dataset](https://github.com/vivekpandey76/mongodb-dataset)** — Ready-to-use E-commerce JSON datasets (Customers, Orders, Products, Reviews) to practice queries in this guide.
- 🟢 **[mongodb-nodejs-project](https://github.com/vivekpandey76/mongodb-nodejs-project)** — Full **MongoDB + Node.js Integration** with Express & Mongoose — complete CRUD API.

---

## 📂 Repository Structure

```
mongodb-notes/
│
├── 📁 docs/
│   ├── 📁 01-fundamentals/          ← What is MongoDB, Atlas Setup
│   ├── 📁 02-querying/              ← CRUD, Operators, Cursor, Projection, Regex
│   ├── 📁 03-data-modelling/        ← Embedding, Referencing, Soft Delete
│   ├── 📁 04-advanced-operations/   ← Array Operators, Updates, Bulk Write, Indexing
│   ├── 📁 05-aggregation/           ← Basic → Advanced → Expert Pipelines
│   ├── 📁 06-atlas-search/          ← Atlas Search, Fuzzy, Autocomplete
│   └── 📁 07-production/            ← Triggers, Transactions, Sharding, Replication
│
├── 📁 assets/
│   └── 📁 images/                   ← Architecture diagrams (PNG)
│
├── 📁 examples/
│   └── mongoose-crud-example.js     ← Node.js + Mongoose integration example
│
├── README.md                        ← You are here
├── CHANGELOG.md                     ← Release history
├── CONTRIBUTING.md                  ← How to contribute
├── CODE_OF_CONDUCT.md               ← Community standards
└── LICENSE                          ← MIT License
```

---

## 📚 Table of Contents

### 🟢 01 · Fundamentals

| # | File | What You'll Learn |
|---|------|-------------------|
| 01 | [Introduction to MongoDB](./docs/01-fundamentals/01-introduction-to-mongodb.md) | NoSQL vs SQL, documents, collections, why MongoDB |
| 02 | [MongoDB Atlas Setup](./docs/01-fundamentals/02-mongodb-atlas-setup.md) | Cloud setup, cluster creation, connection strings |

### 🔍 02 · Querying

| # | File | What You'll Learn |
|---|------|-------------------|
| 03 | [Basic Queries](./docs/02-querying/01-basic-queries.md) | `find`, `findOne`, filtering documents |
| 04 | [CRUD Operations](./docs/02-querying/02-crud-operations.md) | `insertOne`, `updateOne`, `deleteOne`, `replaceOne` |
| 05 | [Comparison Operators](./docs/02-querying/03-comparison-operators.md) | `$eq`, `$ne`, `$gt`, `$lt`, `$in`, `$nin` |
| 06 | [Logical Operators](./docs/02-querying/04-logical-operators.md) | `$and`, `$or`, `$not`, `$nor` |
| 09 | [Data Types](./docs/02-querying/05-data-types.md) | BSON types, ObjectId, Date, Number, String |
| 10 | [Cursor Methods](./docs/02-querying/06-cursor-methods.md) | `skip()`, `limit()`, `sort()` for pagination |
| 11 | [Projection](./docs/02-querying/07-projection.md) | Include/exclude fields, `$slice`, `$elemMatch` |
| 15 | [Query Operators](./docs/02-querying/08-query-operators.md) | `$exists`, `$type`, `$expr`, `$jsonSchema` |
| 16 | [Regex Searching](./docs/02-querying/09-regex-searching.md) | Pattern matching, case-insensitive search |

### 🗂️ 03 · Data Modelling

| # | File | What You'll Learn |
|---|------|-------------------|
| 07 | [Soft Delete vs Hard Delete](./docs/03-data-modelling/01-soft-delete-vs-hard-delete.md) | Patterns for safe data deletion |
| 08 | [Embedding vs Referencing](./docs/03-data-modelling/02-embedding-vs-referencing.md) | Data modelling strategies, when to use each |

### ⚙️ 04 · Advanced Operations

| # | File | What You'll Learn |
|---|------|-------------------|
| 12 | [Array Operators](./docs/04-advanced-operations/01-array-operators.md) | `$push`, `$pull`, `$addToSet`, `$all`, `$size` |
| 13 | [Advanced Update Operators](./docs/04-advanced-operations/02-advanced-update-operators.md) | `$set`, `$unset`, `$inc`, `$rename`, `$min`, `$max` |
| 14 | [Bulk Write](./docs/04-advanced-operations/03-bulk-write.md) | `bulkWrite`, ordered vs unordered operations |
| 17 | [Indexing](./docs/04-advanced-operations/04-indexing.md) | Single, compound, text, TTL indexes; `explain()` |

### 🔄 05 · Aggregation Pipeline

| # | File | What You'll Learn |
|---|------|-------------------|
| 18 | [Aggregation Basics](./docs/05-aggregation/01-aggregation-basics.md) | `$match`, `$group`, `$sort`, `$project`, `$count` |
| 19 | [Aggregation Advanced](./docs/05-aggregation/02-aggregation-advanced-lookup-facet-unwind.md) | `$lookup`, `$unwind`, `$facet` |
| 20 | [Aggregation Expert](./docs/05-aggregation/03-aggregation-expert-addfields-merge-cond.md) | `$addFields`, `$merge`, `$cond`, `$switch` |

### 🌐 06 · Atlas Search

| # | File | What You'll Learn |
|---|------|-------------------|
| 21 | [Atlas Search Basics](./docs/06-atlas-search/01-atlas-search-basics.md) | Atlas Search, analyzers, index configuration |
| 22 | [Fuzzy & Compound Search](./docs/06-atlas-search/02-atlas-fuzzy-and-compound-search.md) | Fuzzy search, compound queries, scoring |
| 23 | [Autocomplete & Custom Search](./docs/06-atlas-search/03-atlas-autocomplete-and-custom-search.md) | Autocomplete, custom search, stored source |

### 🚀 07 · Production

| # | File | What You'll Learn |
|---|------|-------------------|
| 24 | [Triggers](./docs/07-production/01-triggers.md) | Database triggers, scheduled triggers, event-driven logic |
| 25 | [Transactions](./docs/07-production/02-transactions.md) | ACID transactions, sessions, multi-document writes |
| 26 | [Sharding](./docs/07-production/03-sharding.md) | Horizontal scaling, shard keys, mongos, chunks |
| 27 | [Replication](./docs/07-production/04-replication.md) | Replica sets, primary/secondary, failover, oplog |

---

## 🗺️ Recommended Learning Path

```
🟢 Beginner      ──▶  01-fundamentals  →  02-querying (Parts 03–06, 09)
🟡 Intermediate  ──▶  03-data-modelling  →  02-querying (Parts 10–11, 15–16)
🔴 Advanced      ──▶  04-advanced-operations  →  05-aggregation  →  06-atlas-search
🚀 Expert        ──▶  07-production  →  examples/mongoose-crud-example.js
```

> **💡 Tip:** Pair each part with the [full YouTube course](https://www.youtube.com/watch?v=rOjFGCFEOIM) for the best learning experience. Like & subscribe to support more free content! 🙌

---

## 💡 Key Concepts at a Glance

| Concept | Section |
|---------|---------|
| **Core CRUD & Queries** | `02-querying` Parts 03–04 |
| **Filtering & Operators** | `02-querying` Parts 05–06, 15 |
| **Data Modelling** | `03-data-modelling` |
| **Performance & Pagination** | `02-querying` Part 10, `04-advanced-operations` Part 17 |
| **Array & Update** | `04-advanced-operations` Parts 12–14 |
| **Search & Regex** | `02-querying` Part 16, `06-atlas-search` |
| **Aggregation Pipeline** | `05-aggregation` |
| **Triggers & Automation** | `07-production` Part 24 |
| **Transactions (ACID)** | `07-production` Part 25 |
| **Sharding (Scale-out)** | `07-production` Part 26 |
| **Replication & HA** | `07-production` Part 27 |
| **Node.js Integration** | [mongodb-nodejs-project](https://github.com/vivekpandey76/mongodb-nodejs-project) |

---

---

## 📦 Practice Datasets

Use the ready-made E-commerce dataset to practice queries:

### 🔗 [→ mongodb-dataset — E-commerce JSON Datasets](https://github.com/vivekpandey76/mongodb-dataset)

```bash
# Clone the dataset repo
git clone https://github.com/vivekpandey76/mongodb-dataset.git
cd mongodb-dataset

# Import via mongoimport
mongoimport --db ecommerce --collection Customers --file Customer-dataset.json --jsonArray
mongoimport --db ecommerce --collection Orders   --file OrdersCollection.json  --jsonArray
mongoimport --db ecommerce --collection Products --file Products-dataset.json  --jsonArray
mongoimport --db ecommerce --collection Reviews  --file Reviews-dataset.json   --jsonArray
```

**Collections available:** `Customers` · `Orders` · `Products` · `Reviews` · `CustomerLarge` · `CustomerOtp`

---

## 🚀 Quick Start

### Prerequisites

- MongoDB installed locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [MongoDB Shell (mongosh)](https://www.mongodb.com/docs/mongodb-shell/) or [MongoDB Compass](https://www.mongodb.com/products/compass)
- Node.js `v18+` (for the Node.js integration examples)

### Setup

```bash
# 1. Clone this repository
git clone https://github.com/vivekpandey76/mongodb-notes.git
cd mongodb-notes

# 2. Start reading — open any file in docs/ to begin
# Recommended start: docs/01-fundamentals/01-introduction-to-mongodb.md

# 3. Run the Node.js example
node examples/mongoose-crud-example.js

# 4. Clone & load the practice datasets
git clone https://github.com/vivekpandey76/mongodb-dataset.git
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
2. Create your feature branch: `git checkout -b feature/add-notes`
3. Commit your changes: `git commit -m 'docs: add notes for Part X'`
4. Push to the branch: `git push origin feature/add-notes`
5. Open a Pull Request

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).

---

## ⭐ Show Your Support

If these notes helped you, please **star ⭐ this repository** — it helps others discover it and keeps this resource growing!

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Copyright © 2024 [Vivek Pandey](https://github.com/vivekpandey76)

---

> Made with ❤️ by [Vivek Pandey](https://github.com/vivekpandey76) for the developer community | Happy Learning! 🍃
