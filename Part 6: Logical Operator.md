# 🍃 MongoDB Logical Operators

> **Master complex filtering in MongoDB** — combine multiple conditions using AND, OR, NOT, and NOR logic to write powerful, interview-ready queries.

---

## 🎬 Video Tutorial

<div align="center">

[![MongoDB Basic Query](https://img.youtube.com/vi/_3AB2R5F3ig/maxresdefault.jpg)](https://www.youtube.com/watch?v=_3AB2R5F3ig)

### 📺 [Watch This Video](https://youtu.be/yp_dxjs-a-s) &nbsp;|&nbsp; 🎵 [Full MongoDB Playlist](https://www.youtube.com/playlist?list=PLkFShEMrLia0s46qqN4CykmOrkGoPyHnW) &nbsp;|&nbsp; 🔔 Subscribe for more!

> 💛 **Support me** — If this helped you, please **like 👍**, **share 🔗**, **subscribe 🔔**, and follow the full playlist to learn MongoDB from scratch!

</div>

---

## 📚 Table of Contents

- [What Are Logical Operators?](#-what-are-logical-operators)
- [Operator Reference](#-operator-reference)
- [Query Examples](#-query-examples)
  - [$and — All Must Match](#1--and--all-conditions-must-match)
  - [$or — At Least One Matches](#2--or--at-least-one-condition-matches)
  - [$not — Negates a Condition](#3--not--negates-a-condition)
  - [$nor — None Should Match](#4--nor--none-of-the-conditions-match)
  - [Combined Operators](#5--combined-operators)
- [Practice Problem & Solution](#-practice-problem--solution)
- [Quick Tips](#-quick-tips)

---

## 🧠 What Are Logical Operators?

Logical operators let you **combine multiple filter conditions** in a single MongoDB query. Instead of filtering by just one field, you can express complex rules like:

- "Price must be high **AND** stock must be available"
- "Category is Fashion **OR** price is under 30,000"
- "Status must **NOT** be cancelled"

### When to use them?
| Scenario | Operator to Use |
|----------|----------------|
| All conditions must be true | `$and` |
| At least one condition must be true | `$or` |
| A condition must be false | `$not` |
| None of the conditions should be true | `$nor` |

---

## 📋 Operator Reference

| Operator | Meaning | Syntax Style |
|----------|---------|--------------|
| `$and` | **All** conditions must be true | Array of condition objects |
| `$or` | **At least one** condition must be true | Array of condition objects |
| `$not` | **Negates** a single condition | Wraps a comparison operator |
| `$nor` | **None** of the conditions should be true | Array of condition objects |

---

## 🔍 Query Examples

### 1. `$and` — All Conditions Must Match

> Use `$and` when **every** condition must be satisfied simultaneously.

**Find all products where price > 50,000 AND stock > 100:**

```js
// Explicit $and syntax
db.Products.find({
  $and: [
    { price: { $gt: 50000 } },
    { stock: { $gt: 100 } }
  ]
})

// Shorthand (implicit $and) — works when fields are different
db.Products.find({
  price: { $gt: 50000 },
  stock: { $gt: 100 }
})
```

> 💡 **Note:** The implicit shorthand works perfectly when conditions are on **different fields**. Use explicit `$and` when applying multiple conditions to the **same field** or for readability.

---

**Find all orders where status is "shipped" AND payment method is "UPI":**

```js
db.Orders.find({
  $and: [
    { status: "shipped" },
    { paymentMethod: "UPI" }
  ]
})
```

---

### 2. `$or` — At Least One Condition Matches

> Use `$or` when you want documents that satisfy **any one** (or more) of the given conditions.

**Find all products where category is "Fashion" OR price < 30,000:**

```js
db.Products.find({
  $or: [
    { category: "Fashion" },
    { price: { $lt: 30000 } }
  ]
})
```

---

**Find all customers where totalSpent > 100,000 OR state is "North Carolina":**

```js
db.Customers.find({
  $or: [
    { totalSpent: { $gt: 100000 } },
    { state: "North Carolina" }
  ]
})
```

---

### 3. `$not` — Negates a Condition

> Use `$not` to **reverse** a comparison — it returns documents where the condition is **false** (or the field doesn't exist).

**Find all products where category is NOT "Fashion":**

```js
// Using $ne (not equal) — simpler and more common
db.Products.find({
  category: { $ne: "Fashion" }
})

// Using $not — more explicit negation
db.Products.find({
  category: { $not: { $eq: "Fashion" } }
})
```

> 💡 **When to prefer `$not`:** Use `$not` when negating a range or regex, e.g., `{ price: { $not: { $gt: 50000 } } }`. For simple inequality, `$ne` is cleaner.

---

### 4. `$nor` — None of the Conditions Match

> Use `$nor` when you want documents that **fail all** the listed conditions — the opposite of `$or`.

**Find all orders where status is NOT "cancelled" AND payment method is NOT "UPI":**

```js
db.Orders.find({
  $nor: [
    { status: "cancelled" },
    { paymentMethod: "UPI" }
  ]
})
```

> 💡 **How to think about `$nor`:** `$nor` is equivalent to `NOT (A OR B)`, which by De Morgan's law means `(NOT A) AND (NOT B)`. A document must fail **every** condition to be included.

---

### 5. Combined Operators

> Real-world queries often combine multiple operators for **complex filtering**.

**Find products where price is between 20,000–60,000, category is NOT "Electronics", and average rating > 2:**

```js
// Explicit $and style
db.Products.find({
  $and: [
    { price: { $gt: 20000, $lt: 60000 } },
    { category: { $ne: "Electronics" } },
    { "ratings.average": { $gt: 2 } }
  ]
})

// Shorthand (implicit $and) — cleaner when no field conflicts
db.Products.find({
  price: { $gt: 20000, $lt: 60000 },
  category: { $ne: "Electronics" },
  "ratings.average": { $gt: 2 }
})
```

> 💡 **Dot notation** (`"ratings.average"`) is used to query fields inside **nested documents**.

---

## 🎯 Practice Problem & Solution

### Problem

> **Find all reviews where `rating` is greater than or equal to 3 AND `verified` is `true`.**

---

### Solution

```js
// Method 1: Explicit $and
db.Reviews.find({
  $and: [
    { rating: { $gte: 3 } },
    { verified: true }
  ]
})

// Method 2: Implicit $and (shorthand — preferred for different fields)
db.Reviews.find({
  rating: { $gte: 3 },
  verified: true
})
```

### Why both work?
Both queries produce **identical results**. The shorthand (Method 2) is more concise and commonly used in production. Use Method 1 (explicit `$and`) when:
- You need multiple conditions on the **same field**
- You're combining `$and` with `$or` in a complex query
- You want to keep the query visually readable for teammates

### Expected Output Shape
```json
{
  "_id": "...",
  "productId": "...",
  "userId": "...",
  "rating": 4,
  "verified": true,
  "comment": "Great product!"
}
```

---

## ⚡ Quick Tips

| Tip | Details |
|-----|---------|
| **Implicit vs Explicit `$and`** | Use implicit (shorthand) for different fields; use explicit when mixing with `$or` or applying multiple operators to the same field |
| **`$nor` = NOT OR** | Useful for exclusion lists — "give me everything that is none of these" |
| **`$not` wraps operators** | `$not` must wrap a comparison operator, not a plain value: `{ $not: { $eq: "x" } }` ✅ not `{ $not: "x" }` ❌ |
| **Dot notation for nested fields** | Use `"ratings.average"` (in quotes) to query inside embedded documents |
| **Performance** | Place the most selective condition first inside `$and` arrays — MongoDB evaluates left to right |

---

> 🙌 **Contributed by:** Vivek Pandey  
> 📅 **Last Updated:** 2026  
> ⭐ If this helped you, consider starring the repo!
