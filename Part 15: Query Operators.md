# 🍃 MongoDB Query Operators — `$exists` & `$type`

> A beginner-friendly guide to field existence checking and data type validation in MongoDB.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Operators Covered](#operators-covered)
- [Query Examples](#query-examples)
  - [Q1 — Find customers where `phone` exists](#q1--find-customers-where-phone-exists)
  - [Q2 — Find products where `discount` does NOT exist](#q2--find-products-where-discount-does-not-exist)
  - [Q3 — Find customers where `age` is stored as a string](#q3--find-customers-where-age-is-stored-as-a-string)
  - [Q4 — Combine `$exists` and `$type` together](#q4--combine-exists-and-type-together)
- [Quick Reference Table](#quick-reference-table)
- [Common `$type` Values](#common-type-values)
- [When to Use Each Operator](#when-to-use-each-operator)
- [Summary](#summary)

---

## Overview

In MongoDB, documents in the same collection **don't have to follow a fixed schema**. This means:

- Some documents may have a field that others **don't have at all**
- The same field might be stored as a **string in one document** and a **number in another**

MongoDB provides two powerful query operators to handle these scenarios:

| Operator | Purpose |
|----------|---------|
| `$exists` | Check whether a field **is present or absent** in a document |
| `$type`   | Check what **data type** a field's value is |

---

## Operators Covered

### `$exists`

```js
{ field: { $exists: <boolean> } }
```

- `true` → returns documents **where the field exists**
- `false` → returns documents **where the field is missing**

---

### `$type`

```js
{ field: { $type: <BSON type> } }
```

Matches documents where the field's value is of the specified BSON data type (e.g., `"string"`, `"int"`, `"double"`, `"bool"`, etc.)

---

## Query Examples

### Q1 — Find customers where `phone` exists

**Goal:** Retrieve all customer documents that have a `phone` field (regardless of its value).

```js
db.Customers.find(
  {
    phone: { $exists: true }
  }
)
```

**Explanation:**
- `$exists: true` matches every document that **has the `phone` field present**
- Documents without a `phone` field are excluded
- The value of `phone` doesn't matter — it could be `null`, an empty string, or a valid number

**Example match:**
```json
{ "_id": 1, "name": "Alice", "phone": "9876543210" }  ✅ included
{ "_id": 2, "name": "Bob" }                            ❌ excluded (no phone field)
```

---

### Q2 — Find products where `discount` does NOT exist

**Goal:** Retrieve all product documents that **do not have** a `discount` field.

```js
db.Products.find(
  {
    discount: { $exists: false }
  }
)
```

**Explanation:**
- `$exists: false` matches documents where the `discount` field is **completely absent**
- Useful for finding products that were added before a `discount` field was introduced
- Note: A product with `"discount": null` still **has** the field — it would **not** match this query

**Example match:**
```json
{ "_id": 10, "name": "Pen", "price": 20 }                     ✅ included
{ "_id": 11, "name": "Notebook", "price": 50, "discount": 5 } ❌ excluded
{ "_id": 12, "name": "Eraser", "price": 10, "discount": null } ❌ excluded (field exists, even if null)
```

---

### Q3 — Find customers where `age` is stored as a string

**Goal:** Retrieve customers where the `age` field exists **and** its value is stored as a string (e.g., `"25"` instead of `25`).

```js
db.Customers.find(
  {
    age: { $type: "string" }
  }
)
```

**Explanation:**
- This is useful for **data quality checks** — `age` should ideally be a number, but sloppy inserts might save it as a string
- `$type: "string"` only matches if the value is of BSON string type
- Documents where `age` is `25` (integer) or `25.0` (double) will **not** match

**Example match:**
```json
{ "_id": 3, "name": "Charlie", "age": "28" }  ✅ included  (age is a string)
{ "_id": 4, "name": "Diana",   "age": 30 }    ❌ excluded  (age is an integer)
{ "_id": 5, "name": "Eve" }                   ❌ excluded  (age field doesn't exist)
```

---

### Q4 — Combine `$exists` and `$type` together

**Goal:** Find customers where the `email` field **both exists AND is a string**.

```js
db.Customers.find(
  {
    email: { $exists: true, $type: "string" }
  }
)
```

**Explanation:**
- Multiple operators on the same field act as an **implicit AND**
- `$exists: true` → the field must be present
- `$type: "string"` → the value must be of string type
- Together, this ensures `email` is a **real, usable string value** — not missing, not `null`, not a number
- Great for **validation queries** before sending emails or performing string operations

**Example match:**
```json
{ "_id": 6, "name": "Frank",  "email": "frank@example.com" }  ✅ included
{ "_id": 7, "name": "Grace" }                                  ❌ excluded  (no email field)
{ "_id": 8, "name": "Hank",   "email": null }                  ❌ excluded  (null, not a string)
{ "_id": 9, "name": "Iris",   "email": 9876543210 }            ❌ excluded  (number, not a string)
```

---

## Quick Reference Table

| Query | Operator Used | What It Does |
|-------|--------------|--------------|
| `{ phone: { $exists: true } }` | `$exists` | Field must be present |
| `{ discount: { $exists: false } }` | `$exists` | Field must be absent |
| `{ age: { $type: "string" } }` | `$type` | Field value must be a string |
| `{ email: { $exists: true, $type: "string" } }` | `$exists` + `$type` | Field must exist and be a string |

---

## Common `$type` Values

| Type Name | Alias | Description |
|-----------|-------|-------------|
| `"double"` | `1` | Floating point number |
| `"string"` | `2` | UTF-8 string |
| `"object"` | `3` | Embedded document |
| `"array"` | `4` | Array |
| `"bool"` | `8` | Boolean |
| `"date"` | `9` | Date |
| `"null"` | `10` | Null value |
| `"int"` | `16` | 32-bit integer |
| `"long"` | `18` | 64-bit integer |

> You can use either the string alias or the numeric BSON type code in your query.

---

## When to Use Each Operator

| Scenario | Recommended Operator |
|----------|---------------------|
| Check if a field is missing (schema migration) | `$exists: false` |
| Ensure a field is present before processing | `$exists: true` |
| Audit inconsistent data types | `$type` |
| Validate data before operations | `$exists` + `$type` together |
| Find documents with a specific field populated | `$exists: true` |

---

## Summary

- Use **`$exists: true`** to find documents where a field is present
- Use **`$exists: false`** to find documents where a field is missing
- Use **`$type`** to filter by the BSON data type of a field's value
- Combine both on the same field to perform strict validation queries

> 💡 **Pro Tip:** These operators are especially helpful in schema-less or mixed-schema collections where data consistency cannot be assumed.

---

*Made with ❤️ for MongoDB learners*
