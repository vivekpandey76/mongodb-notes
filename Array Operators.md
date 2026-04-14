# 🍃 MongoDB Array Operators — Complete Guide

> Master array operations in MongoDB with real-world examples, interview tips, and practice questions.

---

## 📌 Table of Contents

- [What Are Array Operators?](#-what-are-array-operators)
- [Operators Overview](#-operators-overview)
- [Query Examples](#-query-examples)
  - [Q1 — $all: Match All Tags](#q1----all-match-all-tags)
  - [Q2 — $size: Match Array Length](#q2----size-match-array-length)
  - [Q3 — $in & $elemMatch: Match Values](#q3----in--elemmatch-match-values)
  - [Q4 — $addToSet: Add Without Duplicates](#q4----addtosetto-add-without-duplicates)
  - [Q5 — $elemMatch: Multi-Condition on Array](#q5----elemmatch-multi-condition-on-array)
- [🎯 Interview Question: $push vs $addToSet](#-interview-question-push-vs-addtosetto)
- [🔐 Practice Question + Solution](#-practice-question--solution)

---

## 🧩 What Are Array Operators?

Array operators in MongoDB let you **query and manipulate array fields** inside documents — making it easy to filter documents based on array contents or update arrays atomically.

---

## 📋 Operators Overview

| Operator | Type | Purpose |
|---|---|---|
| `$in` | Query | Match if field equals **any** value from a list |
| `$all` | Query | Match if array contains **all** specified values |
| `$elemMatch` | Query | Match if **at least one** array element satisfies all conditions |
| `$size` | Query | Match if array has **exact** length |
| `$push` | Update | **Append** an element to an array (allows duplicates) |
| `$addToSet` | Update | **Append** only if value is **unique** (no duplicates) |
| `$pull` | Update | **Remove** elements matching a condition |

---

## 🔍 Query Examples

### Q1 — `$all`: Match All Tags

> **Find products that contain both `"new"` and `"limited"` tags**

```js
db.Products.find({
  tags: { $all: ["new", "limited"] }
})
```

**💡 Explanation:**
- `$all` checks that the `tags` array contains **every** value in the list.
- Order doesn't matter — `["limited", "new"]` would still match.
- The array can contain additional tags and it will still match.

---

### Q2 — `$size`: Match Array Length

> **Find products where `tags` array has exactly 2 elements**

```js
db.Products.find({
  tags: { $size: 2 }
})
```

**💡 Explanation:**
- `$size` matches documents where the array has **exactly** that many elements.
- ⚠️ `$size` does **not** support range queries (`$gt`, `$lt`). For ranges, use `$expr` with `$size`.

---

### Q3 — `$in` & `$elemMatch`: Match Values in Nested Arrays

> **Find orders where product name is either `"Fantastic Wooden Ball"` or `"Handcrafted Concrete Computer"`**

**Approach 1 — Dot Notation with `$in`:**
```js
db.Orders.find({
  "items.productName": {
    $in: ["Fantastic Wooden Ball", "Handcrafted Concrete Computer"]
  }
})
```

**Approach 2 — `$elemMatch` (Recommended for complex conditions):**
```js
db.Orders.find({
  items: {
    $elemMatch: {
      productName: {
        $in: ["Fantastic Wooden Ball", "Handcrafted Concrete Computer"]
      }
    }
  }
})
```

**💡 When to use which?**

| Situation | Use |
|---|---|
| Single field check on array of objects | Dot notation (`"items.productName"`) |
| Multiple conditions on the **same** array element | `$elemMatch` |

---

### Q4 — `$addToSet`: Add Without Duplicates

> **Add a new tag `"trending"` to all Fashion products — without duplicates**

```js
db.Products.updateMany(
  { category: "Fashion" },
  { $addToSet: { tags: "trending" } }
)
```

**💡 Explanation:**
- `updateMany` targets **all** documents matching the filter.
- `$addToSet` ensures `"trending"` is only added if it doesn't already exist.
- Safe to run multiple times — idempotent ✅

---

### Q5 — `$elemMatch`: Multi-Condition on Array Element

> **Find orders (paid via UPI) where at least one item has `quantity >= 2` AND `price > 30000`**

```js
db.Orders.find({
  paymentMethod: "UPI",
  items: {
    $elemMatch: {
      quantity: { $gte: 2 },
      price: { $gt: 30000 }
    }
  }
})
```

**💡 Why `$elemMatch` is essential here:**
- Without `$elemMatch`, MongoDB checks conditions across **different** array elements.
- With `$elemMatch`, **both** conditions must be true on the **same** element.

```
❌ Without $elemMatch → item[0].quantity >= 2, item[1].price > 30000  (wrong!)
✅ With $elemMatch    → item[0].quantity >= 2 AND item[0].price > 30000 (correct!)
```

---

## 🎯 Interview Question: `$push` vs `$addToSet`

> **"What is the difference between `$push` and `$addToSet` in MongoDB?"**

| Feature | `$push` | `$addToSet` |
|---|---|---|
| Allows duplicates | ✅ Yes | ❌ No |
| Preserves insertion order | ✅ Yes | ✅ Yes |
| Use case | Logs, history, events | Tags, roles, unique lists |
| Performance | Slightly faster | Checks uniqueness first |

**Example:**

```js
// Tags before: ["new", "sale"]

// Using $push
db.Products.updateOne(
  { _id: productId },
  { $push: { tags: "sale" } }
)
// Result: ["new", "sale", "sale"] ❌ Duplicate!

// Using $addToSet
db.Products.updateOne(
  { _id: productId },
  { $addToSet: { tags: "sale" } }
)
// Result: ["new", "sale"] ✅ No duplicate!
```

---

## 🔐 Practice Question + Solution

<details>
<summary><strong>📝 Practice: Find all orders where any item price is greater than 40,000</strong> &nbsp;👆 Click to reveal solution</summary>

<br/>

### ✅ Solution

**Approach 1 — Dot Notation:**
```js
db.Orders.find({
  "items.price": { $gt: 40000 }
})
```

**Approach 2 — Using `$elemMatch`:**
```js
db.Orders.find({
  items: {
    $elemMatch: {
      price: { $gt: 40000 }
    }
  }
})
```

### 💡 Explanation

- Both approaches work for a **single condition** on an array field.
- Dot notation (`"items.price"`) is concise and efficient for single-field checks.
- `$elemMatch` is more explicit and scales better when you add more conditions later.

### 🧠 When to prefer `$elemMatch` here?

If the requirement changes to:
> "Find orders where any item has price > 40,000 AND quantity > 1"

Then `$elemMatch` becomes **mandatory**:

```js
db.Orders.find({
  items: {
    $elemMatch: {
      price: { $gt: 40000 },
      quantity: { $gt: 1 }
    }
  }
})
```

This ensures both conditions are met by the **same item**, not different items in the array.

</details>

---

## 📚 Quick Reference Cheat Sheet

```
┌─────────────┬──────────────────────────────────────────────────┐
│  Operator   │  Use Case                                        │
├─────────────┼──────────────────────────────────────────────────┤
│  $in        │  Field matches any value in a list               │
│  $all       │  Array contains ALL listed values                │
│  $elemMatch │  At least one array element matches ALL conds    │
│  $size      │  Array has exact number of elements              │
│  $push      │  Append to array (duplicates allowed)            │
│  $addToSet  │  Append to array (duplicates NOT allowed)        │
│  $pull      │  Remove matching elements from array             │
└─────────────┴──────────────────────────────────────────────────┘
```

---

> 💬 **Found this helpful?** Drop a ⭐ on the repo and share with your study group!
>
> 🔗 Part of the **MongoDB Zero to Hero** series — follow for more!
