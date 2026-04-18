# 🍃 MongoDB Aggregation Pipeline — Complete Guide

> **Master MongoDB Aggregation from scratch** — with real-world examples, stage-by-stage breakdowns, and practice problems with solutions.

[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

---

## 📌 Table of Contents

- [What is Aggregation?](#-what-is-aggregation)
- [Pipeline Concept](#-pipeline-concept)
- [Core Stages](#-core-stages)
  - [$match](#-match)
  - [$project](#-project)
  - [$group](#-group)
  - [$sort](#-sort)
  - [$limit](#-limit)
- [Solved Examples](#-solved-examples)
- [Practice Problems & Solutions](#-practice-problems--solutions)
- [Quick Reference Cheat Sheet](#-quick-reference-cheat-sheet)
- [When to Use Which Stage](#-when-to-use-which-stage)

---

## 🔍 What is Aggregation?

**Aggregation** in MongoDB is a framework to **process, transform, and analyze documents** in a collection — instead of just fetching raw data.

Think of it as a **data pipeline on your database**:

```
Raw Documents → [Stage 1] → [Stage 2] → [Stage 3] → Meaningful Results
```

> 💡 **Analogy:** Imagine a water treatment plant. Water (raw data) flows through multiple filters (stages), and what comes out at the end is clean, structured, and useful.

---

## ⚙️ Pipeline Concept

MongoDB Aggregation uses a **pipeline** — an ordered array of stages. Each stage:
- **Takes documents** as input
- **Transforms them** in some way
- **Passes the result** to the next stage

```js
db.collection.aggregate([
  { $stage1: { ... } },  // Step 1: Filter / Transform
  { $stage2: { ... } },  // Step 2: Group / Sort
  { $stage3: { ... } },  // Step 3: Shape the output
])
```

> ⚠️ **Order matters!** Just like `.filter().map().sort()` in JavaScript — the sequence of stages directly affects your result.

---

## 🧱 Core Stages

---

### 🔵 `$match`

**What it does:** Filters documents — works exactly like `find()`.

**When to use it:**
- At the **very beginning** of a pipeline to reduce the dataset early (improves performance)
- Any time you want to **apply conditions** (like `WHERE` in SQL)

**Syntax:**
```js
{ $match: { field: condition } }
```

**Supported operators:** `$eq`, `$gt`, `$lt`, `$gte`, `$lte`, `$ne`, `$in`, `$nin`, `$and`, `$or`, etc.

```js
// Match documents where status is "active"
{ $match: { status: "active" } }

// Match with multiple conditions
{ $match: { age: { $gte: 18 }, country: "India" } }
```

> 🏆 **Best Practice:** Always use `$match` as early as possible in the pipeline. It reduces the number of documents flowing through subsequent stages, making your query faster.

---

### 🟡 `$project`

**What it does:** Controls which fields to **include, exclude, or reshape** in the output — like `SELECT` in SQL.

**When to use it:**
- To **hide sensitive fields** (e.g., passwords, internal IDs)
- To **rename fields** or create **computed fields**
- To **reduce payload size** when you don't need all fields

**Syntax:**
```js
{ $project: { field: 1 } }   // Include
{ $project: { field: 0 } }   // Exclude
{ $project: { _id: 0, name: 1, email: 1 } }  // Include name/email, hide _id
```

> ⚠️ **Note:** You can't mix include (1) and exclude (0) in the same `$project` — except for `_id`, which can always be explicitly excluded.

---

### 🟠 `$group`

**What it does:** **Groups documents** by a field and applies **accumulator expressions** — like `GROUP BY` in SQL.

**When to use it:**
- To compute **totals, averages, counts, min/max**
- To **summarize data** at a higher level (per category, per user, per day)

**Syntax:**
```js
{
  $group: {
    _id: "$fieldToGroupBy",   // null = group ALL documents together
    newField: { $accumulatorOperator: "$field" }
  }
}
```

**Common Accumulators:**

| Operator | Description | Example |
|---|---|---|
| `$sum` | Adds values (or counts with `1`) | `{ $sum: "$price" }` |
| `$avg` | Calculates average | `{ $avg: "$score" }` |
| `$min` | Returns minimum value | `{ $min: "$age" }` |
| `$max` | Returns maximum value | `{ $max: "$salary" }` |
| `$count` | Counts documents (v5.0+) | `{ $count: {} }` |
| `$push` | Collects values into an array | `{ $push: "$name" }` |
| `$addToSet` | Collects unique values | `{ $addToSet: "$tag" }` |
| `$first` | First value in group | `{ $first: "$date" }` |
| `$last` | Last value in group | `{ $last: "$date" }` |

---

### 🟢 `$sort`

**What it does:** **Sorts documents** by one or more fields — like `ORDER BY` in SQL.

**When to use it:**
- To get **top N** results (combine with `$limit`)
- To present results in a **specific order** (rankings, leaderboards)

**Syntax:**
```js
{ $sort: { field: 1 } }   // Ascending (A→Z, 0→9)
{ $sort: { field: -1 } }  // Descending (Z→A, 9→0)
```

> 💡 **Tip:** `$sort` before `$limit` = get top N. `$sort` after `$group` = sort aggregated results.

---

### 🔴 `$limit`

**What it does:** **Restricts** the number of documents flowing to the next stage.

**When to use it:**
- To get **top N results** (Top 3 products, Top 5 customers)
- To **paginate** results (combine with `$skip`)

**Syntax:**
```js
{ $limit: N }  // Pass only the first N documents
```

---

## ✅ Solved Examples

All examples use these sample collections:

- **`Orders`** — `{ _id, customerId, status, totalAmount, paymentMethod }`
- **`Customers`** — `{ _id, name, email, totalSpent }`
- **`Products`** — `{ _id, name, category, price }`

---

### Q1 — Find all orders with status "shipped"

**Concept used:** `$match`

```js
db.Orders.aggregate([
  {
    $match: {
      status: "shipped"
    }
  }
])
```

💬 **Explanation:** `$match` filters documents exactly like `find()`. Only documents where `status === "shipped"` pass through.

---

### Q2 — Find customers with `totalSpent > 100000`, show only name & email

**Concept used:** `$match` → `$project`

```js
db.Customers.aggregate([
  {
    $match: {
      totalSpent: { $gt: 100000 }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1
    }
  }
])
```

💬 **Explanation:**
- `$match` first narrows the dataset to high-value customers
- `$project` then shapes the output — `_id: 0` hides it, `name: 1` and `email: 1` include those fields

---

### Q3 — Find total number of orders

**Concept used:** `$group` with `$sum: 1`

```js
db.Orders.aggregate([
  {
    $group: {
      _id: null,
      totalNumberOfOrders: { $sum: 1 }
    }
  }
])
```

💬 **Explanation:** `_id: null` means "don't group by anything — treat the whole collection as one group". `$sum: 1` counts one per document.

---

### Q4 — Total revenue generated

**Concept used:** `$group` with multiple accumulators

```js
db.Orders.aggregate([
  {
    $group: {
      _id: null,
      totalNumberOfOrders: { $sum: 1 },
      totalRevenueGenerated: { $sum: "$totalAmount" }
    }
  }
])
```

💬 **Explanation:** Two accumulators in one `$group` stage — count of orders AND sum of `totalAmount`. Note the `"$"` prefix when referencing a field value.

---

### Q5 — Total revenue per order status

**Concept used:** `$group` by a field

```js
db.Orders.aggregate([
  {
    $group: {
      _id: "$status",
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$totalAmount" }
    }
  }
])
```

💬 **Explanation:** `_id: "$status"` creates one group per unique status value (e.g., "shipped", "pending", "delivered"). Results show metrics broken down by each status.

**Sample Output:**
```json
[
  { "_id": "shipped",   "totalOrders": 120, "totalRevenue": 540000 },
  { "_id": "pending",   "totalOrders": 45,  "totalRevenue": 190000 },
  { "_id": "delivered", "totalOrders": 230, "totalRevenue": 980000 }
]
```

---

### Q6 — Find top 3 most expensive products

**Concept used:** `$sort` + `$limit`

```js
db.Products.aggregate([
  {
    $sort: { price: -1 }
  },
  {
    $limit: 3
  }
])
```

💬 **Explanation:** Sort descending by price (most expensive first), then limit to 3 documents. This is the classic "Top N" pattern.

---

### Q7 — Average product price per category

**Concept used:** `$group` with `$avg`

```js
db.Products.aggregate([
  {
    $group: {
      _id: "$category",
      totalProductsPerCategory: { $sum: 1 },
      averageProductPrice: { $avg: "$price" }
    }
  }
])
```

💬 **Explanation:** Groups by `category`, then for each group: counts products and averages price. `$avg` automatically handles the math across all documents in the group.

---

### Q8 — Total spending per customer who used UPI, show customerId & totalSpent

**Concept used:** `$match` → `$group` → `$project`

```js
db.Orders.aggregate([
  {
    $match: {
      paymentMethod: "UPI"
    }
  },
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$totalAmount" }
    }
  },
  {
    $project: {
      _id: 0,
      customerId: "$_id",
      totalSpent: 1
    }
  }
])
```

💬 **Explanation:** This is a 3-stage pipeline:
1. `$match` — keep only UPI orders
2. `$group` — sum up spending per customer
3. `$project` — rename `_id` to `customerId` for a cleaner output (and hide `_id`)

---

## 🏋️ Practice Problems & Solutions

---

### Problem: Find top 2 customers by `totalSpent`

**Concepts needed:** `$sort` + `$limit`

<details>
<summary>💡 Hint (click to expand)</summary>

Think about:
1. Which collection has `totalSpent`?
2. To get the "top" ones, what direction should you sort?
3. How do you restrict to only 2 results?

</details>

<details>
<summary>✅ Solution (click to expand)</summary>

```js
db.Customers.aggregate([
  {
    $sort: {
      totalSpent: -1  // Descending — highest spenders first
    }
  },
  {
    $limit: 2  // Keep only the top 2
  }
])
```

**Optional — show only name and totalSpent:**
```js
db.Customers.aggregate([
  {
    $sort: { totalSpent: -1 }
  },
  {
    $limit: 2
  },
  {
    $project: {
      _id: 0,
      name: 1,
      totalSpent: 1
    }
  }
])
```

**Sample Output:**
```json
[
  { "name": "Priya Sharma",  "totalSpent": 520000 },
  { "name": "Rohit Verma",   "totalSpent": 410000 }
]
```

</details>

---

### Bonus Problems (Try on your own!)

**Level: Easy**
1. Find all orders with `totalAmount` greater than 5000
2. Show only the `name` and `category` of all products (hide `_id`)
3. Count the total number of customers

**Level: Medium**
4. Find the most expensive product in each category
5. Find total orders placed by each customer
6. Find all customers whose name starts with "A" (hint: use regex in `$match`)

**Level: Hard**
7. Find the top 5 customers by number of orders placed
8. Find average order value per payment method, sorted by average descending
9. Find categories where average price is greater than 1000

---

## 📋 Quick Reference Cheat Sheet

```
┌─────────────┬────────────────────────────┬─────────────────────────┐
│   Stage     │       Purpose              │      SQL Equivalent     │
├─────────────┼────────────────────────────┼─────────────────────────┤
│  $match     │ Filter documents           │  WHERE                  │
│  $project   │ Include/exclude fields     │  SELECT                 │
│  $group     │ Group + aggregate          │  GROUP BY               │
│  $sort      │ Order results              │  ORDER BY               │
│  $limit     │ Restrict count             │  LIMIT                  │
│  $skip      │ Offset (for pagination)    │  OFFSET                 │
│  $lookup    │ Join with another collection│  JOIN                  │
│  $unwind    │ Flatten array fields       │  (no direct equivalent) │
│  $count     │ Count documents            │  COUNT(*)               │
│  $addFields │ Add computed fields        │  computed columns       │
└─────────────┴────────────────────────────┴─────────────────────────┘
```

---

## 🎯 When to Use Which Stage

| Your Goal | Stage(s) to Use |
|---|---|
| Filter by a condition | `$match` |
| Show/hide specific fields | `$project` |
| Count all documents | `$group` with `_id: null, count: {$sum:1}` |
| Sum/average a field | `$group` with `$sum` / `$avg` |
| Group stats by category | `$group` with `_id: "$category"` |
| Get top N results | `$sort` + `$limit` |
| Filter AND get top N | `$match` → `$sort` → `$limit` |
| Per-group stats + clean output | `$group` → `$project` |
| Filter + group + rename | `$match` → `$group` → `$project` |
| Paginate results | `$sort` → `$skip` → `$limit` |

---

## 💡 Key Rules to Remember

1. **`$match` early** — always filter before grouping/sorting for better performance
2. **`_id` in `$group`** — required; use `null` for global aggregation, `"$field"` for grouped
3. **`"$fieldName"` vs `"fieldName"`** — prefix with `$` when referencing a field's **value**
4. **Pipeline order matters** — each stage receives output of the previous stage
5. **`$project` after `$group`** — use it to rename `_id` or clean up the output shape



