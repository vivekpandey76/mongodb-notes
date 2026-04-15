# 🍃 MongoDB Advanced Update Operators

> A complete reference guide for advanced MongoDB update operators with real-world examples and practice questions.

---

## 📌 Operators Covered

| Operator | Description |
|----------|-------------|
| `$inc` | Increment or decrement a numeric field |
| `$rename` | Rename a field across documents |
| `$unset` | Remove a field from documents |
| `$addToSet` | Add to array without duplicates |
| `$setOnInsert` | Set fields only when a document is inserted (upsert) |

---

## 📂 Collections Used

- `Customers` — customer profiles with address, phone, totalSpent
- `Products` — product catalog with category, tags, stock
- `Reviews` — product reviews with verified flag
- `Orders` — order records with paymentMethod, totalAmount, status

---

## ✅ Q1 — `$inc` : Increment totalSpent

**Task:** Increase `totalSpent` by ₹2000 for customers whose state is `"North Carolina"`

```js
db.Customers.updateMany(
  { "address.state": "North Carolina" },
  { $inc: { totalSpent: 2000 } }
)
```

**💡 Explanation:**
- `$inc` adds the specified value to the existing field value
- Use a **negative number** to decrement (e.g., `$inc: { totalSpent: -500 }`)
- If the field doesn't exist, MongoDB creates it with the given value
- Works **only on numeric fields**

---

## ✅ Q2 — `$rename` : Rename a Field

**Task:** Rename field `phone` → `contactNumber` for all customers

```js
db.Customers.updateMany(
  {},
  { $rename: { phone: "contactNumber" } }
)
```

**💡 Explanation:**
- `$rename` renames the field without changing its value
- Empty filter `{}` targets **all documents** in the collection
- Documents that don't have the field are **silently skipped**
- Cannot rename to a field name that already exists

---

## ✅ Q3 — `$addToSet` : Add Tag Without Duplicates

**Task:** Add `"featured"` tag to all products in `"Fashion"` category (avoid duplicates)

```js
db.Products.updateMany(
  { category: "Fashion" },
  { $addToSet: { tags: "featured" } }
)
```

**💡 Explanation:**
- `$addToSet` adds a value to an array **only if it doesn't already exist**
- Unlike `$push`, it **prevents duplicate entries**
- If the field doesn't exist, it creates a new array with the value

---

## ✅ Q4 — `$unset` : Remove a Field

**Task:** Remove the `verified` field from all reviews

```js
db.Reviews.updateMany(
  {},
  { $unset: { verified: "" } }
)
```

**💡 Explanation:**
- `$unset` completely removes the specified field from documents
- The value `""` is just a convention — the actual value doesn't matter
- Documents that don't have the field are **silently skipped**

---

## ✅ Q5 — `$setOnInsert` + Upsert

**Task:** Update `lastLogin` for `"vivek.pandey@pink.com"`. If not found, insert a new document.

```js
db.Customers.updateOne(
  { email: "vivek.pandey@pink.com" },
  {
    $set: {
      lastLogin: new Date()
    },
    $setOnInsert: {
      email: "vivek.pandey@pink.com",
      phone: "9881212121",
      orders: 4,
      createdAt: new Date()
    }
  },
  { upsert: true }
)
```

**💡 Explanation:**
- `$set` runs on **both update and insert**
- `$setOnInsert` runs **only when a new document is inserted** (upsert scenario)
- `{ upsert: true }` creates the document if no match is found
- Useful for **seeding default values** on first-time inserts

| Scenario | `$set` runs? | `$setOnInsert` runs? |
|----------|:------------:|:--------------------:|
| Document found (update) | ✅ | ❌ |
| Document not found (insert) | ✅ | ✅ |

---

## ✅ Q6 — Multiple Update Operators Together

**Task:** For all products — increase stock by 10, add `"sale"` tag, remove `oldPrice` field

```js
db.Products.updateMany(
  {},
  {
    $inc:      { stock: 10 },
    $addToSet: { tags: "sale" },
    $unset:    { oldPrice: "" }
  }
)
```

**💡 Explanation:**
- Multiple operators can be **combined in a single update**
- All three operators execute **atomically** in one operation
- More efficient than running three separate `updateMany()` calls

---

## 🧪 Practice Question — Your Turn!

**Task:** Update all orders where `paymentMethod = "UPI"`:
- Increase `totalAmount` by `500`
- Add field `updatedAt` with current date
- Rename field `status` → `orderStatus`

<details>
<summary>💬 Click to reveal the answer</summary>

```js
db.Orders.updateMany(
  { paymentMethod: "UPI" },
  {
    $inc:    { totalAmount: 500 },
    $set:    { updatedAt: new Date() },
    $rename: { status: "orderStatus" }
  }
)
```

**Explanation:**
- `$inc` increases `totalAmount` by 500 for all UPI orders
- `$set` adds/updates `updatedAt` with the current timestamp
- `$rename` renames `status` to `orderStatus` across matched documents
- All three operators run in a **single atomic updateMany call**

</details>

---

## ⚠️ Common Mistakes

```js
// ❌ Wrong — $rename and $set cannot target the same field
{ $rename: { status: "orderStatus" }, $set: { status: "paid" } }

// ✅ Correct — operate on different fields
{ $rename: { status: "orderStatus" }, $set: { updatedAt: new Date() } }
```

```js
// ❌ Wrong — $inc on a string field will throw an error
{ $inc: { name: 1 } }

// ✅ Correct — $inc only works on numeric fields
{ $inc: { totalAmount: 500 } }
```

---

## 🚀 Quick Reference Cheat Sheet

```js
// Increment
{ $inc: { field: value } }

// Rename
{ $rename: { oldName: "newName" } }

// Remove field
{ $unset: { field: "" } }

// Add to array (no duplicates)
{ $addToSet: { arrayField: value } }

// Set on insert only (with upsert: true)
{ $setOnInsert: { field: value } }

// Combine multiple operators
{
  $inc:      { numericField: 10 },
  $set:      { dateField: new Date() },
  $addToSet: { arrayField: "tag" },
  $unset:    { oldField: "" }
}
```

---


> 📝 **Note:** Always test update queries on a **dev/staging database** before running on production. Use `.find()` with the same filter first to verify which documents will be affected.
