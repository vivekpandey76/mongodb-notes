# 🗂️ MongoDB Projection

> **Projection** = *"Return only what you need"*

Projection in MongoDB lets you select **specific fields** from a document instead of fetching the entire document — making your queries faster, leaner, and more secure.

---

## 📌 Table of Contents

- [Why Use Projection?](#-why-use-projection)
- [Syntax](#-syntax)
- [Include vs Exclude](#-include-vs-exclude)
- [The Golden Rule](#-the-golden-rule)
- [Query Examples](#-query-examples)
- [Practice Problem](#-practice-problem)

---

## ✅ Why Use Projection?

| Benefit | Description |
|---|---|
| ⚡ **Faster Queries** | Smaller result sets = faster response time |
| 💾 **Saves Memory** | Less data fetched = less RAM consumed |
| 📉 **Reduces Bandwidth** | Less data transferred over the network |
| 🔒 **Better Security** | Hide sensitive fields like `password`, `phone`, `email` |
| 🧹 **Cleaner API Responses** | Only return fields that consumers actually need |

---

## 🔧 Syntax

```js
db.CollectionName.find(filter, projection)
```

| Parameter | Description |
|---|---|
| `filter` | The query condition (like `WHERE` in SQL) |
| `projection` | Fields to include (`1`) or exclude (`0`) |

---

## 🔢 Include vs Exclude

### ✅ Include Mode — Whitelist (use `1`)
Return **only** the specified fields.

```js
db.Customers.find({}, { name: 1, email: 1, _id: 0 })
```

### ❌ Exclude Mode — Blacklist (use `0`)
Return **everything except** the specified fields.

```js
db.Customers.find({}, { phone: 0, address: 0 })
```

---

## ⚠️ The Golden Rule

> You **cannot mix** `1` and `0` in the same projection — except for `_id`.

```js
// ❌ INVALID — mixing include and exclude
db.Customers.find({}, { name: 1, phone: 0 })

// ✅ VALID — _id is the only exception
db.Customers.find({}, { name: 1, email: 1, _id: 0 })
```

| Field | Default Behavior |
|---|---|
| `_id` | **Always included** unless explicitly set to `0` |
| Other fields | Follow include/exclude mode you choose |

---

## 📋 Query Examples

### Q1 — Get only `name` and `email` of customers

```js
db.Customers.find({}, { name: 1, email: 1, _id: 0 })
```
> `_id: 0` suppresses the auto-included `_id` field.

---

### Q2 — Get shipped orders and return only `orderId` & `totalAmount`

```js
db.Orders.find(
  { status: "shipped" },
  { orderId: 1, totalAmount: 1, _id: 0 }
)
```

---

### Q3 — Customers who spent > ₹3,00,000 — hide `phone` and `address`

```js
db.Customers.find(
  { totalSpent: { $gt: 300000 } },
  { phone: 0, address: 0 }
)
```
> Exclude mode: all fields returned **except** `phone` and `address`.

---

### Q4 — Nested Projection — Customers from "North Carolina", return `name` + `city` only

```js
db.Customers.find(
  { "address.state": "North Carolina" },
  { name: 1, "address.city": 1 }
)
```
> Use **dot notation** (`"address.city"`) to project nested fields.

---

### Q5 — Products with stock > 100, return `name`, `price`, `ratings`

```js
db.Products.find(
  { stock: { $gt: 100 } },
  { name: 1, price: 1, ratings: 1 }
)
```

---

### Q6 — Orders paid via UPI — return `orderId` + `productName` from `items` array

```js
db.Orders.find(
  { paymentMethod: "UPI" },
  { orderId: 1, "items.productName": 1 }
)
```
> Works on **array of objects** — dot notation projects a specific field from each element.

---

## 🧪 Practice Problem

**Get products where `category` is `"Fashion"` and `price > 50000`. Return only `name`, `price`, and `stock`.**

<details>
<summary>💡 Click to reveal solution</summary>

<br>

```js
db.Products.find(
  {
    category: "Fashion",
    price: { $gt: 50000 }
  },
  {
    name: 1,
    price: 1,
    stock: 1,
    _id: 0
  }
)
```

**Breakdown:**
- `category: "Fashion"` — exact match filter
- `price: { $gt: 50000 }` — comparison operator filter
- `name: 1, price: 1, stock: 1` — include only these three fields
- `_id: 0` — suppress the default `_id` field

</details>

---

## 📚 Quick Reference Cheatsheet

```js
// Include specific fields
db.Col.find({}, { field1: 1, field2: 1, _id: 0 })

// Exclude specific fields
db.Col.find({}, { field1: 0, field2: 0 })

// Nested field projection
db.Col.find({}, { "nested.field": 1 })

// Array field projection
db.Col.find({}, { "arrayField.subField": 1 })

// With filter + projection
db.Col.find({ status: "active" }, { name: 1, _id: 0 })
```

---

## 🧠 Key Takeaways

- Projection is the **second argument** to `.find()`
- `1` = include, `0` = exclude — **never mix** (except `_id`)
- Use **dot notation** for nested documents and array fields
- Always hide sensitive fields in production APIs
- No projection = entire document returned (wasteful at scale)

---

<p align="center">Made with 🍃 for MongoDB learners</p>
