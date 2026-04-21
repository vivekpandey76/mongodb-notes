# 🔔 MongoDB Atlas Triggers — Complete Guide

> Automate workflows, maintain consistency, and build event-driven architectures with MongoDB Atlas Triggers.

---

## 📑 Table of Contents

- [What is a MongoDB Trigger?](#what-is-a-mongodb-trigger)
- [Types of Triggers](#types-of-triggers)
- [When to Use Triggers](#when-to-use-triggers)
- [When NOT to Use Triggers](#when-not-to-use-triggers)
- [How to Create a Trigger on Atlas](#how-to-create-a-trigger-on-atlas)
- [Real-World Example — Update Customer totalSpent](#real-world-example--update-customer-totalspent)
- [changeEvent Object Reference](#changeevent-object-reference)
- [Best Practices](#best-practices)
- [Common Errors & Debugging](#common-errors--debugging)
- [Summary](#summary)

---

## What is a MongoDB Trigger?

A **MongoDB Trigger** is a server-side function that **automatically executes** when a specific event occurs in your database — such as an insert, update, or delete.

Think of it like a **database listener**:

```
User places order  →  Order inserted into DB  →  Trigger fires  →  Customer's totalSpent updated automatically
```

Instead of writing this logic manually in your Node.js/Express backend on every order endpoint, the trigger handles it **automatically and consistently**, regardless of how or where the data was inserted.

### Why Use Triggers Instead of Backend Logic?

| Concern | Backend (Node.js) | MongoDB Trigger |
|---|---|---|
| Consistency | Only runs if your API is called | Always runs on any DB change |
| Maintenance | Scattered across endpoints | Centralized in one place |
| Real-time reaction | Manual implementation | Built-in event-driven |
| Missed updates | Possible (direct DB writes bypass it) | Impossible to bypass |

---

## Types of Triggers

MongoDB Atlas supports **three types** of triggers:

### 1. 🗃️ Database Triggers
React to changes in a collection (insert, update, delete, replace).

```
Collection change → Trigger fires → Run your function
```

> **Most common.** Used for syncing data, audit logs, analytics, etc.

---

### 2. 🔐 Authentication Triggers
React to user authentication events (login, signup, logout).

```
User signs up → Trigger fires → Create user profile in DB
```

> Useful for initializing user data on registration.

---

### 3. ⏰ Scheduled Triggers
Run on a cron schedule — no event required.

```
Every day at midnight → Trigger fires → Generate daily report
```

> Useful for cleanup jobs, report generation, expiry checks.

---

## When to Use Triggers

✅ **Good Use Cases:**

| Use Case | Why It's a Good Fit |
|---|---|
| Update `totalSpent` on new order | Automatic aggregation, no backend change needed |
| Reduce product stock after order | Consistent across all order sources |
| Send email/notification after event | Decoupled from business logic |
| Maintain analytics/stats collections | Real-time counters without extra API calls |
| Audit logs (who changed what, when) | Can't be bypassed even by direct DB access |
| Sync data between collections | Keeps derived data always up to date |
| Welcome email on user signup | Auth trigger, perfectly scoped |

---

## When NOT to Use Triggers

❌ **Avoid Triggers When:**

| Situation | Why to Avoid |
|---|---|
| Heavy computations (ML, image processing) | Triggers have execution time limits (~180s) |
| High-frequency writes (millions/sec) | Can cause performance bottlenecks and throttling |
| Complex multi-step business logic | Better handled in your backend where you have full control |
| Transactions requiring rollback | Triggers don't participate in ACID transactions |
| Tight latency requirements | Triggers add asynchronous overhead |
| Logic that depends on request context | Triggers don't have access to HTTP request/session data |

> **Rule of thumb:** If the logic is simple, automatic, and data-centric → Trigger. If it's complex, conditional, or user-context-aware → Backend.

---

## How to Create a Trigger on Atlas

### Step 1 — Open MongoDB Atlas
Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and log in.

---

### Step 2 — Navigate to Triggers
In the left sidebar, click **"App Services"** → Select or create an App → Click **"Triggers"**.

---

### Step 3 — Create a New Trigger

Click **"+ Add a Trigger"** and fill in:

| Field | Value (for our example) |
|---|---|
| Trigger Type | Database |
| Name | `onOrderInsert_updateCustomerSpent` |
| Cluster | `Cluster0` |
| Database | `ecommerce` |
| Collection | `Orders` |
| Operation Type | ✅ Insert |
| Full Document | ✅ Enable (required to access `changeEvent.fullDocument`) |

---

### Step 4 — Write the Function

Paste your trigger function in the **Function Editor** (shown in the example below).

---

### Step 5 — Save and Deploy

Click **"Save"** → Atlas will deploy the trigger. It becomes **active immediately**.

---

### Step 6 — Test It

Insert a document manually via Atlas UI or your app:
```js
db.Orders.insertOne({
  customerId: ObjectId("665f1b2e3c4d5e6f7a8b9c0d"),
  totalAmount: 1500,
  items: ["shirt", "jeans"],
  createdAt: new Date()
});
```

Then check the `Customers` collection — `totalSpent` should have increased by `1500`.

---

## Real-World Example — Update Customer `totalSpent`

### 🧩 Scenario

You have two collections:

**`Orders`** collection:
```json
{
  "_id": "order_001",
  "customerId": "cust_abc123",
  "totalAmount": 1500,
  "items": ["shirt", "jeans"],
  "createdAt": "2024-06-01T10:00:00Z"
}
```

**`Customers`** collection:
```json
{
  "_id": "cust_abc123",
  "name": "Riya Sharma",
  "email": "riya@example.com",
  "totalSpent": 4500
}
```

**Goal:** Every time a new order is placed, automatically add `totalAmount` to the customer's `totalSpent`.

---

### 🔧 Trigger Function

```js
exports = async function(changeEvent) {
  try {
    // ✅ Step 1: Guard — only run on insert operations
    if (changeEvent.operationType !== "insert") return;

    // ✅ Step 2: Extract the newly inserted order document
    const order = changeEvent.fullDocument;

    const customerId = order.customerId;    // e.g. ObjectId("cust_abc123")
    const totalAmount = order.totalAmount;  // e.g. 1500

    // ✅ Step 3: Get a reference to the Customers collection
    const customersCollection = context.services
      .get("Cluster0")       // Your Atlas cluster name
      .db("ecommerce")       // Database name
      .collection("Customers");

    // ✅ Step 4: Atomically increment totalSpent using $inc
    await customersCollection.updateOne(
      { _id: customerId },
      { $inc: { totalSpent: totalAmount } }
    );

    console.log(`✅ Customer ${customerId} totalSpent updated by ${totalAmount}`);

  } catch (err) {
    console.log("❌ Trigger Error:", err.message);
  }
};
```

---

### 📊 How It Works — Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Places Order                    │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│        Order Inserted into Orders Collection            │
│   { customerId, totalAmount, items, createdAt }         │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│            MongoDB Atlas Trigger Fires 🔔               │
│         operationType === "insert"  →  proceed          │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│     updateOne on Customers Collection                   │
│   { $inc: { totalSpent: order.totalAmount } }           │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│       Customer totalSpent Updated Automatically ✅      │
└─────────────────────────────────────────────────────────┘
```

---

### 🔍 Why `$inc` and not `$set`?

| Operator | Effect | Safe for concurrent updates? |
|---|---|---|
| `$set: { totalSpent: 1500 }` | Replaces value → loses previous total | ❌ No |
| `$inc: { totalSpent: 1500 }` | Adds to existing value atomically | ✅ Yes |

Always use `$inc` for counters and accumulators. It's **atomic** — no race conditions.

---

## changeEvent Object Reference

The `changeEvent` object is passed automatically to every database trigger function.

```js
{
  operationType: "insert",         // "insert" | "update" | "delete" | "replace"
  fullDocument: { ... },           // The full inserted/updated document (enable in settings)
  documentKey: { _id: "..." },     // The _id of the affected document
  updateDescription: {             // Only for "update" operations
    updatedFields: { ... },
    removedFields: [ ... ]
  },
  ns: {
    db: "ecommerce",               // Database name
    coll: "Orders"                 // Collection name
  }
}
```

### Accessing Fields by Operation Type

```js
// INSERT — use fullDocument
const newOrder = changeEvent.fullDocument;

// UPDATE — use updateDescription to see what changed
const changedFields = changeEvent.updateDescription.updatedFields;

// DELETE — fullDocument is null; use documentKey
const deletedId = changeEvent.documentKey._id;
```

---

## Best Practices

### 1. Always Guard by `operationType`
```js
// Only process inserts
if (changeEvent.operationType !== "insert") return;
```
Prevents unintended executions when multiple operation types are enabled.

---

### 2. Always Wrap in `try/catch`
```js
try {
  // your logic
} catch (err) {
  console.log("Trigger error:", err.message);
}
```
Uncaught errors in triggers are silently swallowed — always log them.

---

### 3. Enable "Full Document" Only When Needed
Enabling `fullDocument` increases event payload size. For delete triggers, you only need `documentKey._id`, so disable it.

---

### 4. Use Atomic Operators
- Use `$inc` for counters, not `$set`
- Use `$push` for appending to arrays, not replacing
- Use `$addToSet` to avoid duplicates in arrays

---

### 5. Keep Functions Focused
One trigger → one responsibility. Don't bundle stock update + email notification + analytics in one function. Split them.

---

### 6. Name Triggers Descriptively
```
✅ onOrderInsert_updateCustomerSpent
✅ onUserSignup_createProfile
❌ trigger1
❌ myTrigger
```

---

## Common Errors & Debugging

| Error | Likely Cause | Fix |
|---|---|---|
| `context is not defined` | Running locally instead of Atlas | Only works in Atlas Function editor |
| `fullDocument is null` | "Full Document" not enabled in trigger settings | Enable it in trigger config |
| `totalSpent not updating` | `customerId` type mismatch (String vs ObjectId) | Ensure types match between collections |
| Trigger fires but no update | Wrong cluster/db/collection name | Double-check `context.services.get("Cluster0")` name |
| Trigger not firing at all | Operation type not selected | Check Insert/Update/Delete checkboxes in settings |

### How to View Trigger Logs

Atlas UI → **App Services** → **Logs** → Filter by **Trigger** → See execution history, errors, and console output.

---

## Summary

```
MongoDB Trigger = Event + Condition + Action
```

| Concept | Description |
|---|---|
| **Event** | Insert / Update / Delete / Auth / Schedule |
| **Condition** | `operationType`, field checks, etc. |
| **Action** | Update another collection, send notification, etc. |

**Our Example in One Line:**
> When an order is inserted → read `customerId` and `totalAmount` → increment `totalSpent` on the matching customer.

This keeps your backend clean, your data consistent, and your architecture event-driven.

---

## 📚 Further Reading

- [MongoDB Atlas Triggers Docs](https://www.mongodb.com/docs/atlas/app-services/triggers/)
- [Database Trigger Events](https://www.mongodb.com/docs/atlas/app-services/triggers/database-triggers/)
- [Atlas Functions Context](https://www.mongodb.com/docs/atlas/app-services/functions/context/)
- [Change Events Reference](https://www.mongodb.com/docs/manual/reference/change-events/)

---

> Made with ❤️ for developers learning MongoDB Atlas event-driven architecture.
