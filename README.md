# 🍃 MongoDB — Complete Notes & Cheat Sheet

> A comprehensive, beginner-to-advanced MongoDB guide with **22 structured parts** — covering everything from basics to Atlas Search, Aggregation Pipelines, Indexing, and beyond.

[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/?style=for-the-badge)](.)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](.)

---

## 📖 What's Inside?

This repository is a **structured, hands-on MongoDB learning guide** — great for developers who want to go from zero to production-ready MongoDB skills. Each part is a focused, self-contained Markdown file with real code examples and clear explanations.

---

## 📚 Table of Contents

Click any part to open it directly:

| # | Topic | What You'll Learn |
|---|-------|------------------|
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

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB installed locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) account

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-username/mongodb-notes.git
cd mongodb-notes

# 2. Install dependencies
npm install

# 3. Run the example scripts
node index.js
```

---

## 🗺️ Learning Path

Follow this recommended order if you're just getting started:

```
Beginner  ──▶  Part 1 → 2 → 3 → 4 → 5 → 6 → 9
Intermediate ──▶  Part 7 → 8 → 10 → 11 → 12 → 13 → 14 → 15 → 16
Advanced  ──▶  Part 17 → 18 → 19 → 20 → 21 → 22
```

---

## 📂 Repository Structure

```
mongodb-notes/
├── README.md                          ← You are here
├── index.js                           ← Example scripts
├── Part 1: What is mongodb.md
├── Part 2: Mongodb atlas.md
├── Part 3: Basic Query.md
├── Part 4: Crud.md
├── Part 5: Comparison Operator.md
├── Part 6: Logical Operator.md
├── Part 7: Soft Delete vs Hard Delete.md
├── Part 8: Embedding vs Referencing.md
├── Part 9: Data Types.md
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
└── Part 22: Mongodb atlas(Fuzzy,compound).md
```

---

## 💡 Key Concepts at a Glance

| Concept | Parts |
|---------|-------|
| **Core CRUD** | Parts 3, 4 |
| **Filtering & Operators** | Parts 5, 6, 15 |
| **Data Modelling** | Parts 7, 8, 9 |
| **Performance & Pagination** | Parts 10, 11, 17 |
| **Array & Update** | Parts 12, 13, 14 |
| **Search** | Parts 16, 21, 22 |
| **Aggregation Pipeline** | Parts 18, 19, 20 |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/add-notes`)
3. Commit your changes (`git commit -m 'Add notes for Part X'`)
4. Push to the branch (`git push origin feature/add-notes`)
5. Open a Pull Request

---

## ⭐ Show Your Support

If these notes helped you, please **star ⭐ this repository** — it helps others discover it!

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

> Made with ❤️ for the developer community | Happy Learning! 🍃
