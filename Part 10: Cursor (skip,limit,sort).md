# 🍃 MongoDB Cursors — Complete Guide

> A **cursor** is a pointer to the result set of a query. Instead of loading all documents into memory at once, MongoDB returns a cursor that lets you iterate, filter, and control data retrieval efficiently.

---

## 📌 Why Cursors Matter

| Problem | Cursor Solution |
|---|---|
| Large datasets crash memory | Fetches documents in **batches**, not all at once |
| Unordered results | `.sort()` gives full control over ordering |
| Need specific page of data | `.skip()` + `.limit()` enables clean **pagination** |
| Iterating each document | `.forEach()` processes documents one-by-one |

---

## ⚙️ How a Cursor Works

```
db.collection.find(query)
       │
       ▼
  [ CURSOR ]  ◄── pointer to result set (lazy — not loaded yet)
       │
       ├── .sort()    → define order
       ├── .skip()    → jump ahead N documents
       ├── .limit()   → cap total results
       └── .forEach() → iterate and process
```

> 💡 MongoDB **does not execute** the query until you begin iterating the cursor. This is called **lazy evaluation**.

---

## 🔧 Common Cursor Methods

### 1. `limit(n)` — Restrict results

Returns at most `n` documents from the result set.

```js
db.Products.find().limit(5)
// Returns first 5 products
```

---

### 2. `skip(n)` — Jump ahead

Skips the first `n` documents — essential for **pagination**.

```js
db.Customers.find().skip(10)
// Skips first 10, returns the rest
```

> ⚠️ Large `skip()` values can be slow on huge collections. For production pagination, prefer **range-based queries** using indexed fields.

---

### 3. `sort({ field: 1 | -1 })` — Order results

| Value | Meaning |
|---|---|
| `1` | Ascending (A → Z, low → high) |
| `-1` | Descending (Z → A, high → low) |

```js
db.Orders.find().sort({ totalAmount: -1 })  // Highest first
db.Products.find().sort({ name: 1 })         // Alphabetical
```

---

### 4. `forEach(callback)` — Iterate documents

Runs a function for every document in the cursor.

```js
db.Orders.find().forEach(order => print(order.orderId))
```

---

### 5. `count()` vs `countDocuments()` — Count results

```js
// ❌ Deprecated — avoid
db.Orders.find({ status: "paid" }).count()

// ✅ Recommended — not a cursor method, but the correct approach
db.Orders.countDocuments({ status: "paid" })
```

> `countDocuments()` is accurate and respects filters. The old `count()` had edge cases with sharded clusters.

---

## 🧪 Practical Query Examples

### Q1 — Get the latest 5 orders (most recent first)

```js
db.Orders.find()
  .sort({ orderDate: -1 })
  .limit(5)
```

**Logic:** Sort by date descending → take top 5.

---

### Q2 — Pagination: Skip first 10, get next 5 customers

```js
db.Customers.find()
  .skip(10)
  .limit(5)
```

**Logic:** Page 1 = `.skip(0).limit(5)` | Page 2 = `.skip(5).limit(5)` | Page 3 = `.skip(10).limit(5)`

---

### Q3 — Top 3 most expensive products

```js
db.Products.find()
  .sort({ price: -1 })
  .limit(3)
```

---

### Q4 — Print every orderId using forEach

```js
db.Orders.find().forEach(order => print(order.orderId))
```

---

### Q5 — Count UPI orders

```js
// Modern approach ✅
db.Orders.countDocuments({ paymentMethod: "UPI" })

// Old way (deprecated) ❌
db.Orders.find({ paymentMethod: "UPI" }).count()
```

---

### Q6 — Products with stock > 100, sorted by rating

```js
db.Products.find({ stock: { $gt: 100 } })
  .sort({ "ratings.average": -1 })
```

**Logic:** Filter first (reduces documents) → then sort remaining results.

---

### Q7 — Page 2 of orders sorted by highest totalAmount (5 per page)

```js
// Page 1
db.Orders.find().sort({ totalAmount: -1 }).skip(0).limit(5)

// Page 2
db.Orders.find().sort({ totalAmount: -1 }).skip(5).limit(5)

// Page N (general formula)
db.Orders.find().sort({ totalAmount: -1 }).skip((N - 1) * 5).limit(5)
```

---

## 🏆 Practice Problem

**Get top 3 customers who spent the most**

<details>
<summary>💡 Hint (click to reveal)</summary>

Think about: Which field holds total spending? What sort order gives "most"? How many do you want?

</details>

<details>
<summary>✅ Answer</summary>

```js
db.Customers.find()
  .sort({ totalSpent: -1 })
  .limit(3)
```

> Assumes customers have a `totalSpent` field. If spending is stored in Orders, you'd use an **aggregation pipeline** with `$group` to sum per customer first.

</details>

---

## 🔗 Cursor Method Chaining Order

MongoDB processes cursor methods in this internal order regardless of how you chain them:

```
find() → sort() → skip() → limit()
```

So even if you write `.limit(5).sort({...})`, MongoDB always sorts before limiting. Chain in any order — MongoDB handles it correctly.

---

## 📚 Quick Reference Cheatsheet

```js
// Template: find → sort → skip → limit → iterate

db.Collection.find({ <filter> })      // 1. Filter documents
  .sort({ <field>: <1|-1> })          // 2. Sort results
  .skip(<n>)                          // 3. Skip N documents
  .limit(<n>)                         // 4. Take N documents
  .forEach(<callback>)                // 5. Iterate (optional)

// Count (not a cursor method)
db.Collection.countDocuments({ <filter> })
```

---

## 🛠️ Real-world Pagination Pattern

```js
function getPage(pageNumber, pageSize = 10) {
  return db.Orders.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
}

getPage(1)  // First page
getPage(2)  // Second page
getPage(3)  // Third page
```

---

> 🙌 **Contributed by:** Vivek Pandey  
> 📅 **Last Updated:** 2026  
> ⭐ If this helped you, consider starring the repo!
