# 🍃 MongoDB Aggregation Advanced — Part 3

> Master `$addFields`, `$count`, `$merge`, and `$cond` with real-world order data patterns.

---

## 📦 Core Operators Covered

| Operator | Description |
|---|---|
| `$addFields` | Adds new fields or modifies existing fields in each document |
| `$count` | Counts the number of documents and returns the result as a single doc |
| `$merge` | Writes aggregation results into a collection |
| `$cond` | Applies conditional logic (if/then/else) within aggregation expressions |

---

## 🔣 Special Symbols

```
$field    →  Single $ references a field in your document
$$variable →  Double $$ references aggregation variables (e.g. $$item inside $map)
```

---

## ❓ Q1 — Add `orderCategory` field based on `totalAmount`

**Goal:** Add a field `orderCategory` where:
- `"High"` → if `totalAmount > 50000`
- `"Low"` → otherwise

### 💡 How it works

- `$addFields` computes a new field without replacing the whole document.
- `$cond` acts like an **if/else** — checks the condition, returns `then` or `else`.
- `$merge` writes the result back into the same `Orders` collection.
- `whenMatched: 'merge'` → preserves all existing fields, only adds/updates `orderCategory`.
- `whenNotMatched: 'discard'` → skips documents that don't already exist in the collection.

```js
db.Orders.aggregate([
  {
    $addFields: {
      orderCategory: {
        $cond: {
          if:   { $gt: ["$totalAmount", 50000] },
          then: "High",
          else: "Low"
        }
      }
    }
  },
  {
    $merge: {
      into:           'Orders',
      on:             '_id',
      whenMatched:    'merge',    // keep existing fields, add new one
      whenNotMatched: 'discard'   // skip if doc not found
    }
  }
])
```

### ✅ Result

Each document in `Orders` now has:
```json
{ "orderCategory": "High" }   // totalAmount > 50000
{ "orderCategory": "Low"  }   // totalAmount <= 50000
```

---

## ❓ Q2 — Count total orders with status `"shipped"`

**Goal:** Find how many orders have `status: "shipped"`

### 💡 How it works

- `$match` filters the pipeline — only documents matching the condition pass through.
- `$count` collapses all remaining documents into **one single output document** with the count.

```js
db.Orders.aggregate([
  {
    $match: {
      status: "shipped"
    }
  },
  {
    $count: 'totalNumberOfOrders'
  }
])
```

### ✅ Result

```json
{ "totalNumberOfOrders": 42 }
```

---

## ❓ Q3 — Calculate `totalPrice` per order (quantity × price)

**Goal:** For each order, sum up `quantity × price` for every item in the `items` array.

### 💡 How it works

- `$map` iterates over the `items` array, giving each element the alias `$$item`.
- `$$item.price` and `$$item.quantity` use `$$` because `item` is a **variable**, not a document field.
- `$multiply` computes `price × quantity` for each item.
- `$sum` adds up all the products from `$map` into a single `totalPrice`.
- `$merge` with `whenNotMatched: 'insert'` also creates new documents if they don't exist.

```js
db.Orders.aggregate([
  {
    $addFields: {
      totalPrice: {
        $sum: {
          $map: {
            input: "$items",   // iterate over the items array
            as:    "item",     // alias each element as $$item
            in: {
              $multiply: [
                "$$item.price",     // $$ = variable reference
                "$$item.quantity"
              ]
            }
          }
        }
      }
    }
  },
  {
    $merge: {
      into:           'Orders',
      on:             '_id',
      whenMatched:    'merge',
      whenNotMatched: 'insert'  // create doc if it doesn't exist
    }
  }
])
```

### ✅ Result

```json
{ "totalPrice": 12500 }   // sum of (price × qty) for all items
```

---

## ❓ Q4 — Total spending per customer + categorize them

**Goal:** Group by customer, sum their spending, then label:
- `"Premium"` → if `totalSpent > 200000`
- `"Regular"` → otherwise

### 💡 How it works

- `$group` collapses many documents into **one per unique `_id`** (here: `customerId`).
- `$sum: "$totalAmount"` accumulates the running total across all orders for that customer.
- `$addFields` then runs `$cond` on the grouped result to assign a category.

```js
db.Orders.aggregate([
  {
    $group: {
      _id:        "$customerId",             // group by customer
      totalSpent: { $sum: "$totalAmount" }   // sum all their orders
    }
  },
  {
    $addFields: {
      orderCategory: {
        $cond: {
          if:   { $gt: ["$totalSpent", 200000] },
          then: "Premium",
          else: "Regular"
        }
      }
    }
  }
])
```

### ✅ Result

```json
{ "_id": "C001", "totalSpent": 350000, "orderCategory": "Premium" }
{ "_id": "C002", "totalSpent":  85000, "orderCategory": "Regular" }
```

---

## ❓ Q5 — Create `CustomerAnalytics` collection

**Goal:** Build a new collection with one document per customer containing:
- `customerId`
- `totalSpent`
- `orderCount`

### 💡 How it works

- `$group` aggregates all orders per customer — `$sum: "$totalAmount"` for spending, `$sum: 1` counts documents.
- `$project` reshapes the output:
  - `_id: 0` removes the default `_id` field from output.
  - `customerId: "$_id"` renames `_id` to a friendlier name.
  - `totalSpent: 1` and `orderCount: 1` keep those fields.
- `$merge` with `whenNotMatched: 'insert'` creates the `CustomerAnalytics` collection (and documents) if they don't exist yet.

```js
db.Orders.aggregate([
  {
    $group: {
      _id:        "$customerId",
      totalSpent: { $sum: "$totalAmount" },
      orderCount: { $sum: 1 }              // count each document as 1
    }
  },
  {
    $project: {
      _id:        0,           // hide the default _id
      customerId: "$_id",      // rename _id → customerId
      totalSpent: 1,
      orderCount: 1
    }
  },
  {
    $merge: {
      into:           'CustomerAnalytics',   // target collection
      on:             "_id",
      whenMatched:    'merge',
      whenNotMatched: 'insert'               // create if doesn't exist
    }
  }
])
```

### ✅ Result (CustomerAnalytics collection)

```json
{ "customerId": "C001", "totalSpent": 350000, "orderCount": 12 }
{ "customerId": "C002", "totalSpent":  85000, "orderCount":  5 }
```

---

## 🔁 Pipeline Flow Summary

```
Input Documents
     │
     ▼
 $match        →  Filter documents by condition
     │
     ▼
 $group         →  Collapse into groups (1 doc per unique _id)
     │
     ▼
 $addFields     →  Add or compute new fields per document
     │
     ▼
 $project       →  Reshape output (include/exclude/rename fields)
     │
     ▼
 $count         →  Count remaining documents → single output doc
     │
     ▼
 $merge         →  Write results into a collection
```

---

## 📝 Quick Reference — `$merge` Options

| Option | Value | Meaning |
|---|---|---|
| `into` | `'CollectionName'` | Target collection |
| `on` | `'_id'` | Field to match on |
| `whenMatched` | `'merge'` | Merge fields into existing doc |
| `whenMatched` | `'replace'` | Replace the entire doc |
| `whenNotMatched` | `'insert'` | Create a new doc |
| `whenNotMatched` | `'discard'` | Skip — do nothing |

---

## 📝 Quick Reference — `$cond` Syntax

```js
// Object syntax
$cond: {
  if:   <condition>,
  then: <value-if-true>,
  else: <value-if-false>
}

// Array syntax (shorthand)
$cond: [ <condition>, <value-if-true>, <value-if-false> ]
```

---

