# 🍃 MongoDB Aggregation Pipeline — Advanced Guide

> A practical guide to `$lookup`, `$unwind`, and `$facet` with real-world query examples.

---

## 📚 Table of Contents

- [What is the Aggregation Pipeline?](#what-is-the-aggregation-pipeline)
- [Core Operators](#core-operators)
  - [$lookup — JOIN Collections](#lookup--join-collections)
  - [$unwind — Flatten Arrays](#unwind--flatten-arrays)
  - [$facet — Parallel Aggregations](#facet--parallel-aggregations)
- [Query Examples](#query-examples)
  - [Q1: Get All Orders with Customer Details](#q1-get-all-orders-with-customer-details)
  - [Q2: Convert Customer Array into Object](#q2-convert-customer-array-into-object)
  - [Q3: Get Each Order Item as a Separate Document](#q3-get-each-order-item-as-a-separate-document)
  - [Q4: Find Total Quantity Sold Per Product](#q4-find-total-quantity-sold-per-product)
  - [Q5: Use $facet to Get Multiple Insights](#q5-use-facet-to-get-multiple-insights)
  - [Q6: Get Total Spending Per Customer with Their Name](#q6-get-total-spending-per-customer-with-their-name)
- [When to Use What?](#when-to-use-what)
- [Quick Reference Cheatsheet](#quick-reference-cheatsheet)

---

## What is the Aggregation Pipeline?

MongoDB's **Aggregation Pipeline** is a multi-stage data processing framework. Each stage transforms documents and passes them to the next — similar to piping commands in a terminal.

```
Input Documents → [$match] → [$lookup] → [$unwind] → [$group] → Output
```

Think of it like an assembly line: each stage does one job, and stages are chained together to build complex results.

---

## Core Operators

### `$lookup` — JOIN Collections

> **Use it when:** You need data from two collections together (like SQL's `JOIN`).

`$lookup` fetches related documents from another collection and attaches them as an **array** field.

```js
{
  $lookup: {
    from: "OtherCollection",   // The collection to JOIN with
    localField: "myField",     // Field in the CURRENT collection
    foreignField: "_id",       // Field in the OTHER collection to match against
    as: "resultFieldName"      // Name of the new array field added to each document
  }
}
```

**Key Concept:** `foreignField` is the field in the *other* collection that MongoDB matches against your `localField`. This is how the two collections are linked — like a foreign key relationship in SQL.

**Result:** Each document gets a new array field (specified by `as`) containing all matched documents from the foreign collection.

---

### `$unwind` — Flatten Arrays

> **Use it when:** You want to split one document with an array into *multiple* documents — one per array item.

```js
{
  $unwind: {
    path: "$arrayField",
    preserveNullAndEmptyArrays: true  // Keeps documents even if the array is empty/null
  }
}
```

**Before `$unwind`:**
```json
{ "orderId": 1, "items": ["pen", "notebook", "eraser"] }
```

**After `$unwind`:**
```json
{ "orderId": 1, "items": "pen" }
{ "orderId": 1, "items": "notebook" }
{ "orderId": 1, "items": "eraser" }
```

**`preserveNullAndEmptyArrays: true`** — Without this, documents with `null` or missing arrays are *dropped* from results. Set to `true` to keep them.

`$unwind` is commonly used **after `$lookup`** to convert the result array (which always has exactly one element for a one-to-one relationship) into a plain embedded object.

---

### `$facet` — Parallel Aggregations

> **Use it when:** You need multiple different aggregations on the *same* dataset in a single query pass.

```js
{
  $facet: {
    pipeline1Name: [ /* array of stages */ ],
    pipeline2Name: [ /* array of stages */ ],
    pipeline3Name: [ /* array of stages */ ]
  }
}
```

**Result:** A single document is returned with each pipeline's results as a separate array field — extremely efficient since the data is only scanned once.

Common use cases: dashboards, category breakdowns, price filtering, analytics reports.

---

## Query Examples

### Collection Structure

These examples use two collections:

**`Orders`**
```json
{
  "_id": ObjectId("..."),
  "orderId": 1001,
  "customerId": ObjectId("..."),
  "totalAmount": 4500,
  "items": [
    { "productId": ObjectId("..."), "quantity": 2 },
    { "productId": ObjectId("..."), "quantity": 1 }
  ]
}
```

**`Customers`**
```json
{
  "_id": ObjectId("..."),
  "name": "Ravi Sharma",
  "email": "ravi@example.com",
  "phone": "9876543210"
}
```

---

### Q1: Get All Orders with Customer Details

**Goal:** Fetch every order and attach the full customer document to it.

```js
db.Orders.aggregate([
  {
    $lookup: {
      from: "Customers",      // Join with the Customers collection
      localField: "customerId", // Orders.customerId...
      foreignField: "_id",    // ...matches Customers._id
      as: "customer"          // Result stored as an array called "customer"
    }
  }
])
```

**Output shape:**
```json
{
  "orderId": 1001,
  "customerId": "...",
  "customer": [             // ← Array with one matched customer document
    { "name": "Ravi Sharma", "email": "ravi@example.com" }
  ]
}
```

**Note:** `$lookup` always produces an **array**, even when there's only one matching document.

---

### Q2: Convert Customer Array into Object

**Goal:** Same as Q1, but flatten the `customer` array into a single embedded object, and return only specific fields.

```js
db.Orders.aggregate([
  // Step 1: Join Orders with Customers
  {
    $lookup: {
      from: "Customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  },

  // Step 2: Unwind the customer array → turns array into a single object
  {
    $unwind: {
      path: "$customer",
      preserveNullAndEmptyArrays: true  // Keep orders even if customer not found
    }
  },

  // Step 3: Shape the output — pick only the fields you need
  {
    $project: {
      name: "$customer.name",   // Pull name out of the customer sub-document
      phone: "$customer.phone",
      orderId: 1                // 1 = include this field as-is
    }
  }
])
```

**Output shape:**
```json
{
  "orderId": 1001,
  "name": "Ravi Sharma",
  "phone": "9876543210"
}
```

**Why `$unwind` after `$lookup`?** Because `$lookup` gives you `customer: [{ ... }]`. After `$unwind`, you get `customer: { ... }` — a plain object, not an array. This makes accessing nested fields like `$customer.name` clean and predictable.

---

### Q3: Get Each Order Item as a Separate Document

**Goal:** Explode the `items` array so each item becomes its own document (useful for per-item analytics).

```js
db.Orders.aggregate([
  {
    $unwind: {
      path: "$items",
      preserveNullAndEmptyArrays: true
    }
  }
])
```

**Before:**
```json
{ "orderId": 1001, "items": [ { "productId": "A", "quantity": 2 }, { "productId": "B", "quantity": 1 } ] }
```

**After:**
```json
{ "orderId": 1001, "items": { "productId": "A", "quantity": 2 } }
{ "orderId": 1001, "items": { "productId": "B", "quantity": 1 } }
```

The order metadata is **copied** to each resulting document, and the `items` field becomes a single object instead of an array.

---

### Q4: Find Total Quantity Sold Per Product

**Goal:** Calculate how many units of each product have been sold across all orders.

```js
db.Orders.aggregate([
  // Step 1: Explode items array — one document per item
  {
    $unwind: {
      path: "$items",
      preserveNullAndEmptyArrays: true
    }
  },

  // Step 2: Group by productId and sum up quantities
  {
    $group: {
      _id: "$items.productId",                    // Group key
      totalQuantity: { $sum: "$items.quantity" }  // Accumulate quantities
    }
  }
])
```

**Output:**
```json
{ "_id": ObjectId("productA"), "totalQuantity": 15 }
{ "_id": ObjectId("productB"), "totalQuantity": 8 }
```

**Why `$unwind` first?** You cannot `$group` on individual elements of an array directly — `$unwind` flattens the array so each item becomes a separate document that `$group` can process individually.

---

### Q5: Use `$facet` to Get Multiple Insights

**Goal:** In a single query, find both expensive products (price > 50,000) and budget products (price < 100).

```js
db.Products.aggregate([
  {
    $facet: {
      // Pipeline 1: Filter only expensive products
      expensiveProducts: [
        {
          $match: { price: { $gt: 50000 } }
        }
      ],

      // Pipeline 2: Filter only low-cost products
      lowProducts: [
        {
          $match: { price: { $lt: 100 } }
        }
      ]
    }
  }
])
```

**Output:**
```json
{
  "expensiveProducts": [
    { "name": "MacBook Pro", "price": 120000 },
    { "name": "Gaming PC", "price": 85000 }
  ],
  "lowProducts": [
    { "name": "Pen", "price": 10 },
    { "name": "Eraser", "price": 5 }
  ]
}
```

**Why `$facet`?** Without it, you'd run two separate queries. `$facet` runs all sub-pipelines on the **same input data in one pass** — much more efficient for dashboards and analytics pages.

---

### Q6: Get Total Spending Per Customer with Their Name

**Goal:** Sum up each customer's total spending across all orders, then enrich results with customer name and email.

```js
db.Orders.aggregate([
  // Step 1: Group orders by customer and sum their spending
  {
    $group: {
      _id: "$customerId",                        // Group by customer
      totalSpent: { $sum: "$totalAmount" }       // Sum all order amounts
    }
  },

  // Step 2: Join with Customers to get name/email
  {
    $lookup: {
      from: "Customers",
      localField: "_id",       // After $group, _id = customerId
      foreignField: "_id",
      as: "customer"
    }
  },

  // Step 3: Flatten the customer array into an object
  {
    $unwind: {
      path: "$customer",
      preserveNullAndEmptyArrays: true
    }
  },

  // Step 4: Project only the fields we care about
  {
    $project: {
      totalSpent: 1,
      name: "$customer.name",
      email: "$customer.email"
    }
  }
])
```

**Output:**
```json
{ "totalSpent": 15500, "name": "Ravi Sharma", "email": "ravi@example.com" }
{ "totalSpent": 8200,  "name": "Priya Mehta", "email": "priya@example.com" }
```

**Pipeline logic:** `$group` first collapses many order documents into one per customer. Then `$lookup` enriches those grouped results with customer details. This pattern — **aggregate first, enrich after** — is very common and efficient.

---

## When to Use What?

| Operator | Use When | Avoid When |
|---|---|---|
| `$lookup` | You need data from another collection (like a JOIN) | Data is already embedded in the document |
| `$unwind` | You need to process or group by individual array elements | Array is large and you only need the whole array |
| `$facet` | You need multiple different aggregations on the same data | You only need one type of result (overkill) |

### Common Patterns

```
Lookup + Unwind        → Enrich documents with related data (one-to-one join)
Unwind + Group         → Aggregate on array items (e.g., total sales per product)
Group + Lookup + Unwind → Aggregate first, then enrich with names/labels
Facet                  → Dashboard stats, multi-category filters, analytics
```

---

## Quick Reference Cheatsheet

```js
// $lookup — Join with another collection
{ $lookup: { from, localField, foreignField, as } }

// $unwind — Flatten array field into multiple documents
{ $unwind: { path: "$field", preserveNullAndEmptyArrays: true } }

// $facet — Run multiple pipelines in parallel
{ $facet: { result1: [...stages], result2: [...stages] } }

// $group — Group and aggregate
{ $group: { _id: "$field", total: { $sum: "$amount" } } }

// $project — Shape output fields
{ $project: { fieldToKeep: 1, renamed: "$nested.field", fieldToHide: 0 } }

// $match — Filter documents (like WHERE in SQL)
{ $match: { price: { $gt: 1000 } } }
```

---

## 🛠 Tips & Best Practices

- **Put `$match` as early as possible** in the pipeline to reduce the number of documents that subsequent stages need to process.
- **`$lookup` is expensive** — always filter with `$match` before joining if you can.
- **`preserveNullAndEmptyArrays: true`** on `$unwind` is your safety net — without it, documents with missing arrays silently disappear from results.
- **After `$lookup`, use `$unwind`** to convert the resulting array to an object before accessing its fields with dot notation.
- **`$facet` locks the input** — you cannot use `$facet` after `$out` or `$geoNear`.

---

