# 🗑️ MongoDB — Soft Delete vs Hard Delete

> A simple pattern for handling data deletion in MongoDB safely and recoverably.

---

## 📌 Table of Contents

- [Hard Delete](#-hard-delete)
- [Soft Delete](#-soft-delete)
- [Query 1 — Find All Active Customers](#-query-1--find-all-active-customers)
- [Query 2 — Soft Delete a Customer](#-query-2--soft-delete-a-customer)
- [Query 3 — Restore a Soft Deleted Customer](#-query-3--restore-a-soft-deleted-customer)

---

## ❌ Hard Delete

> 👉 **Permanently removes data from the database.**

```js
db.Customers.deleteOne({ email: "ima_kuphal25@hotmail.com" })
```

**Explanation:**
- The document is **completely removed** from the `Customers` collection.
- There is **no way to recover** this data once deleted.
- No history, no audit trail — it's gone for good.

> ⚠️ Use this only when you are 100% sure the data is no longer needed.

---

## ✅ Soft Delete

> 👉 **Data is NOT deleted, just marked as deleted.**

```js
db.Customers.updateOne(
  { email: "etha23@yahoo.com" },
  {
    $set: {
      isDeleted: true,
      deletedAt: new Date()
    }
  }
)
```

**Explanation:**
- Instead of removing the document, we **add two fields** to it:
  - `isDeleted: true` — flags the document as deleted
  - `deletedAt: new Date()` — records the exact date and time of deletion
- The document **still exists** in the database — it's just hidden from normal queries.
- Data can be **fully restored** at any time.

---

## 🔍 Query 1 — Find All Active Customers

> Fetch only customers who have **not** been soft deleted.

```js
db.Customers.find({ isDeleted: { $ne: true } })
```

**Explanation:**
- `$ne` means **not equal**.
- This query returns all documents where `isDeleted` is **not `true`**.
- It also safely includes documents that don't have the `isDeleted` field at all — backward compatible with older records.
- This is the standard way to **exclude soft-deleted records** from your results.

---

## 🗑️ Query 2 — Soft Delete a Customer

> Mark a customer as deleted without removing them from the database.

```js
db.Customers.updateOne(
  { email: "etha23@yahoo.com" },
  {
    $set: {
      isDeleted: true,
      deletedAt: new Date()
    }
  }
)
```

**Explanation:**
- `updateOne` finds the first document matching the filter (email) and updates it.
- `$set` updates **only the specified fields** — all other fields remain untouched.
- After this query runs, the document is flagged as deleted:

```js
// Before
{ email: "etha23@yahoo.com", isDeleted: false, deletedAt: null }

// After
{ email: "etha23@yahoo.com", isDeleted: true, deletedAt: ISODate("2024-01-15T10:30:00Z") }
```

- The customer will no longer appear in Query 1 results — but the data remains safe in the DB.

---

## ♻️ Query 3 — Restore a Soft Deleted Customer

> Undo a soft delete and bring the customer back to active.

```js
db.Customers.updateOne(
  { email: "etha23@yahoo.com" },
  {
    $set: {
      isDeleted: false,
      deletedAt: null
    }
  }
)
```

**Explanation:**
- This simply **reverses** the soft delete by resetting both fields.
- `isDeleted: false` — marks the customer as active again.
- `deletedAt: null` — clears the deletion timestamp completely.
- The document is **fully restored** and reappears in all normal queries.

```js
// Before restore
{ email: "etha23@yahoo.com", isDeleted: true, deletedAt: ISODate("2024-01-15T10:30:00Z") }

// After restore
{ email: "etha23@yahoo.com", isDeleted: false, deletedAt: null }
```

---

## ⚖️ Quick Comparison

| | Hard Delete | Soft Delete |
|---|---|---|
| Data removed from DB | ✅ Yes | ❌ No |
| Recoverable | ❌ No | ✅ Yes |
| Audit trail (`deletedAt`) | ❌ No | ✅ Yes |
| Safe for production | ⚠️ Risky | ✅ Recommended |

---

> 💬 **Rule of thumb:** If there's any chance you'll need the data back — always go with soft delete.
