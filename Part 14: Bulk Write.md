# 🚀 MongoDB `bulkWrite()` — Complete Guide

> Perform multiple write operations (insert, update, delete) in a **single database call** — faster & more efficient.

---

## 📌 Table of Contents

- [What is bulkWrite?](#-what-is-bulkwrite)
- [Why use bulkWrite?](#-why-use-bulkwrite)
- [When to use bulkWrite?](#-when-to-use-bulkwrite)
- [Syntax](#-syntax)
- [Operations Supported](#-operations-supported)
- [Examples](#-examples)
  - [Q1 — Fashion Products](#q1--fashion-products-add-tag--reduce-stock)
  - [Q2 — Customer Operations](#q2--insert-update--delete-customer)
- [Practice Problem & Solution](#-practice-problem--solution)
- [ordered vs unordered](#-ordered-vs-unordered)

---

## 💡 What is bulkWrite?

`bulkWrite()` allows you to perform **multiple write operations** in a single database call.

Instead of hitting the database multiple times:

```js
// ❌ Inefficient — 3 separate DB calls
db.Products.updateMany({ category: "Fashion" }, { $addToSet: { tags: "trending" } });
db.Products.updateMany({ stock: { $gt: 100 } }, { $inc: { stock: -10 } });
db.Products.deleteOne({ _id: someId });
```

You send everything in **one request**:

```js
// ✅ Efficient — 1 single DB call
db.Products.bulkWrite([
  { updateMany: { filter: { category: "Fashion" }, update: { $addToSet: { tags: "trending" } } } },
  { updateMany: { filter: { stock: { $gt: 100 } }, update: { $inc: { stock: -10 } } } },
  { deleteOne:  { filter: { _id: someId } } }
])
```

---

## ✅ Why use bulkWrite?

| Benefit | Description |
|---|---|
| ⚡ **Single round-trip** | All operations sent in one request — no repeated DB connections |
| 📉 **Lower latency** | Eliminates per-call network overhead; critical at scale |
| 🔗 **Mix operations** | Combine inserts, updates, and deletes in one batch |
| 🛡️ **Ordered control** | Choose whether to stop on error or continue |
| 📊 **Result summary** | Returns counts of inserted, updated, deleted docs |

---

## 🕐 When to use bulkWrite?

| Scenario | Use bulkWrite? | Reason |
|---|---|---|
| Importing / seeding 100s of docs | ✅ Yes | Massive latency savings vs looping `insertOne` |
| Batch price / stock updates | ✅ Yes | Many updates sent in one shot |
| Mixed insert + delete in same job | ✅ Yes | Only `bulkWrite` supports mixed ops |
| Single document insert | ❌ No | `insertOne` is simpler and sufficient |
| One-off ad-hoc update | ❌ No | `updateOne` is cleaner; no batching benefit |

---

## 📋 Syntax

```js
db.collection.bulkWrite(
  [
    { insertOne:  { document: { /* doc */ } } },
    { updateOne:  { filter: { /* criteria */ }, update: { $set: { /* fields */ } } } },
    { updateMany: { filter: { /* criteria */ }, update: { $set: { /* fields */ } } } },
    { deleteOne:  { filter: { /* criteria */ } } },
    { deleteMany: { filter: { /* criteria */ } } },
    { replaceOne: { filter: { /* criteria */ }, replacement: { /* new doc */ } } }
  ],
  {
    ordered: true  // true = stop on first error | false = continue on error
  }
)
```

---

## 🔧 Operations Supported

| Operation | Description |
|---|---|
| `insertOne` | Insert a single document |
| `updateOne` | Update the first matching document |
| `updateMany` | Update all matching documents |
| `deleteOne` | Delete the first matching document |
| `deleteMany` | Delete all matching documents |
| `replaceOne` | Replace an entire matching document |

---

## 📝 Examples

### Q1 — Fashion Products: Add tag & reduce stock

> - Update all **Fashion** products → add tag `"trending"`
> - Reduce **stock by 10** for all products where `stock > 100`

```js
db.Products.bulkWrite([
  {
    updateMany: {
      filter: { category: "Fashion" },
      update: { $addToSet: { tags: "trending" } }   // adds only if not already present
    }
  },
  {
    updateMany: {
      filter: { stock: { $gt: 100 } },
      update: { $inc: { stock: -10 } }              // decrements stock by 10
    }
  }
])
```

**Operators used:**
- `$addToSet` — adds to array only if value doesn't already exist (prevents duplicates)
- `$inc` — increments or decrements a numeric field

---

### Q2 — Insert, Update & Delete Customer

> - ➕ Insert a new customer
> - 🔄 Set `isVerified: true` for a specific customer
> - ❌ Delete a customer by email

```js
db.Customers.bulkWrite([
  {
    insertOne: {
      document: {
        name:    "John Doe",
        email:   "john.doe@example.com",
        phone:   "9876543210",
        address: {
          city:  "New York",
          state: "California"
        }
      }
    }
  },
  {
    updateOne: {
      filter: { email: "chaim98@hotmail.com" },
      update: { $set: { isVerified: true } }
    }
  },
  {
    deleteOne: {
      filter: { email: "evans11@gmail.com" }
    }
  }
])
```

---

## 🏋️ Practice Problem & Solution

**Perform the following on the `Products` collection:**

- ❌ Delete all products where `stock > 120`
- 🔄 Update all products where `stock < 120` → set `isVerified: false`

### ✅ Solution

```js
db.Products.bulkWrite([
  {
    deleteMany: {
      filter: { stock: { $gt: 120 } }              // ❌ remove high-stock items first
    }
  },
  {
    updateMany: {
      filter: { stock: { $lt: 120 } },             // 🔄 flag remaining as unverified
      update: { $set: { isVerified: false } }
    }
  }
],
{ ordered: true })   // ⚠️ delete MUST run before update
```

> **Why `ordered: true` here?**
> The `deleteMany` must run **before** `updateMany`. If unordered, MongoDB might update documents that are about to be deleted — wasted writes. `ordered: true` guarantees strict sequencing.

> **Note:** Documents with `stock === 120` are intentionally untouched — neither `> 120` nor `< 120` — which is exactly what the problem requires.

---

## ⚙️ `ordered` vs `unordered`

```js
// ordered: true (default) — stops on first error
db.collection.bulkWrite([...], { ordered: true })

// ordered: false — continues even if some operations fail
db.collection.bulkWrite([...], { ordered: false })
```

| | `ordered: true` | `ordered: false` |
|---|---|---|
| On error | Stops immediately | Skips failed op, continues |
| Use when | Ops depend on each other | Ops are independent |
| Performance | Slightly slower | Faster (parallel possible) |
| Example | delete → then update | mass independent inserts |

---

## 📊 Return Value

```js
{
  acknowledged: true,
  insertedCount: 1,
  matchedCount:  3,
  modifiedCount: 3,
  deletedCount:  2,
  upsertedCount: 0,
  upsertedIds:   {}
}
```

---

## 🔑 Key Operators Quick Reference

| Operator | Use |
|---|---|
| `$set` | Set a field to a value |
| `$inc` | Increment / decrement a number |
| `$addToSet` | Add to array (no duplicates) |
| `$push` | Add to array (allows duplicates) |
| `$gt` | Greater than |
| `$lt` | Less than |
| `$gte` | Greater than or equal |
| `$lte` | Less than or equal |

---

> 💬 **Pro tip:** Always test your filters with a `find()` query before running `bulkWrite()` in production to confirm you're targeting the right documents.

> 🙌 **Contributed by:** Vivek Pandey  
> 📅 **Last Updated:** 2026  
> ⭐ If this helped you, consider starring the repo!
