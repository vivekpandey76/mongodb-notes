# 🗄️ MongoDB Comparison Operators

> A practical reference guide for filtering documents using MongoDB's comparison query operators — with real-world examples and a hands-on practice problem.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Operator Reference](#operator-reference)
- [Examples](#examples)
  - [1. $eq — Equality Match](#1-eq--equality-match)
  - [2. $ne — Not Equal](#2-ne--not-equal)
  - [3. $gt / $lt — Range (Exclusive)](#3-gt--lt--range-exclusive)
  - [4. $gte / $lte — Range (Inclusive)](#4-gte--lte--range-inclusive)
  - [5. $in — Match Any in Array](#5-in--match-any-in-array)
  - [6. $nin — Exclude Values](#6-nin--exclude-values)
  - [7. Combining Multiple Operators](#7-combining-multiple-operators)
- [Practice Problem](#practice-problem)
- [Quick Tips](#quick-tips)

---

## Overview

Comparison Operators in MongoDB are used inside `find()` queries to compare a document field's value against a specified value. They return only those documents where the condition evaluates to `true`.

**Syntax:**

```js
db.Collection.find({ fieldName: { $operator: value } })
```

Multiple operators on the same field act as an implicit **AND** — all conditions must be satisfied.

---

## Operator Reference

| Operator | Meaning                            | Example Use Case                     |
|----------|------------------------------------|--------------------------------------|
| `$eq`    | Field **equals** value             | Find orders paid via UPI             |
| `$ne`    | Field **not equals** value         | Find unverified reviews              |
| `$gt`    | Field **greater than** value       | Find products priced above ₹10,000   |
| `$gte`   | Field **greater than or equal** to | Find customers who spent ≥ ₹50,000   |
| `$lt`    | Field **less than** value          | Find products priced below ₹60,000   |
| `$lte`   | Field **less than or equal** to    | Find customers who spent ≤ ₹5,00,000 |
| `$in`    | Field matches **any** value in array | Find shipped, delivered, or cancelled orders |
| `$nin`   | Field matches **none** in array    | Exclude Fashion and Sports categories |

---

## Examples

### 1. `$eq` — Equality Match

Find all orders where the payment method is `"UPI"`.

```js
// Explicit $eq
db.Orders.find({
  paymentMethod: { $eq: "UPI" }
})

// Shorthand — equivalent, MongoDB treats plain values as implicit $eq
db.Orders.find({
  paymentMethod: "UPI"
})
```

> **Note:** `{ field: value }` and `{ field: { $eq: value } }` produce identical results. Use the shorthand for simple equality; use explicit `$eq` when combining with other operators on the same field.

---

### 2. `$ne` — Not Equal

Find all reviews that are **not** verified.

```js
db.Reviews.find({
  verified: { $ne: true }
})
```

> **Note:** `$ne` also matches documents where the field is **absent entirely**. If you need to strictly match only `false`, use `{ $eq: false }` instead.

---

### 3. `$gt` / `$lt` — Range (Exclusive)

Find all products with a price **strictly between** ₹10,000 and ₹60,000.

```js
db.Products.find({
  price: { $gt: 10000, $lt: 60000 }
})
```

> **Note:** `$gt` (greater than) and `$lt` (less than) are **exclusive** — the boundary values (10,000 and 60,000) are **not** included in the results.

---

### 4. `$gte` / `$lte` — Range (Inclusive)

Find all customers with `totalSpent` between ₹50,000 and ₹5,00,000 (both values included).

```js
db.Customers.find({
  totalSpent: { $gte: 50000, $lte: 500000 }
})
```

> **Note:** `$gte` (greater than or equal) and `$lte` (less than or equal) are **inclusive** — the boundary values are included in the results.

---

### 5. `$in` — Match Any in Array

Find all orders where status is `"shipped"`, `"delivered"`, or `"cancelled"`.

```js
db.Orders.find({
  status: { $in: ["shipped", "delivered", "cancelled"] }
})
```

> **Note:** `$in` is cleaner than chaining multiple `$or` conditions. The field only needs to match **one** element in the array to be returned.

---

### 6. `$nin` — Exclude Values

Find all products **not** in the `"Fashion"` or `"Sports"` category, with a price of ₹20,000 or above.

```js
db.Products.find({
  category: { $nin: ["Fashion", "Sports"] },
  price:    { $gte: 20000 }
})
```

> **Note:** `$nin` is the inverse of `$in`. It also matches documents where the field is absent. Multiple field conditions in one query object apply implicit **AND** — all must be true.

---

### 7. Combining Multiple Operators

Find all products where:
- `stock` is between 50 and 200 (exclusive)
- `ratings.average` is greater than 3
- `category` is NOT `"Fashion"` or `"Electronics"`

```js
db.Products.find({
  stock:              { $gt: 50, $lt: 200 },
  "ratings.average":  { $gt: 3 },
  category:           { $nin: ["Fashion", "Electronics"] }
})
```

> **Note:** Use **dot notation** (`"ratings.average"`) to query into nested/embedded objects. All three field conditions apply simultaneously as an implicit AND.

---

## Practice Problem

> **Task:** Find all orders where `totalAmount` is between ₹50,000 and ₹2,00,000 **AND** `paymentMethod` is `"UPI"` **AND** `status` is **NOT** `"cancelled"`.

<details>
<summary>💡 Click to reveal solution</summary>

```js
db.Orders.find({
  totalAmount:   { $gte: 50000, $lte: 200000 },
  paymentMethod: { $eq: "UPI" },
  status:        { $ne: "cancelled" }
})
```

**Explanation:**

| Condition | Operator Used | Reason |
|-----------|---------------|--------|
| `totalAmount` between ₹50,000–₹2,00,000 | `$gte` / `$lte` | Inclusive range — both boundary values should be included |
| `paymentMethod` is `"UPI"` | `$eq` | Exact equality match |
| `status` is NOT `"cancelled"` | `$ne` | Excludes cancelled; keeps pending, shipped, delivered, etc. |

All three conditions are combined with **implicit AND** — a document must satisfy all of them to appear in results. No `$and` array is needed when filtering on separate fields.

</details>

---

## Quick Tips

- **Implicit AND** — when multiple fields are specified in one `find()` object, all conditions must be true simultaneously.
- **Shorthand equality** — `{ field: "value" }` is the same as `{ field: { $eq: "value" } }`.
- **Dot notation** — use `"parent.child"` (in quotes) to query nested fields.
- **`$ne` / `$nin` match missing fields** — these operators also return documents where the field does not exist at all.
- **Prefer `$in` over `$or`** — when checking one field against multiple values, `$in` is more readable and performant.
- **Inclusive vs exclusive** — use `$gte`/`$lte` when boundary values should be included; use `$gt`/`$lt` when they shouldn't.

---

## 📂 Collection Structure (Reference)

```
Orders      → { paymentMethod, totalAmount, status, ... }
Products    → { price, stock, category, ratings: { average, count }, ... }
Customers   → { totalSpent, ... }
Reviews     → { verified, ... }
```

---

> 🙌 **Contributed by:** Vivek Pandey  
> 📅 **Last Updated:** 2026  
> ⭐ If this helped you, consider starring the repo!
