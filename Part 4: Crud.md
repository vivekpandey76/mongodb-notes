# 🍃 MongoDB CRUD Operations

A hands-on reference guide for MongoDB CRUD (Create, Read, Update, Delete) operations using real-world examples across four collections: **Customers**, **Products**, **Orders**, and **Reviews**.

---

## 🎬 Video Tutorial

<div align="center">

[![MongoDB Logical Operators - Video Tutorial](https://img.youtube.com/vi/Hvwvz54WhNI/maxresdefault.jpg)](https://www.youtube.com/watch?v=Hvwvz54WhNI)

### 📺 [Watch This Video](https://www.youtube.com/watch?v=Hvwvz54WhNI) &nbsp;|&nbsp; 🎵 [Full MongoDB Playlist](https://www.youtube.com/playlist?list=PLkFShEMrLia0s46qqN4CykmOrkGoPyHnW) &nbsp;|&nbsp; 🔔 Subscribe for more!

> 💛 **Support me** — If this helped you, please **like 👍**, **share 🔗**, **subscribe 🔔**, and follow the full playlist to learn MongoDB from scratch!

</div>

---

---

## 📦 Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- MongoDB running locally or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation

```bash
npm init -y
npm install mongodb @faker-js/faker
```

Then run the main script:

```bash
node index.js
```

---

## 🗂️ Collections Overview

| Collection | Description |
|------------|-------------|
| `Customers` | Registered users with address and spending info |
| `Products` | Inventory with pricing, stock, and ratings |
| `Orders` | Customer orders with statuses |
| `Reviews` | Product reviews submitted by customers |

---

## 🟢 CREATE — `insertOne` & `insertMany`

### 1. Insert One Customer — `insertOne`

```js
db.Customers.insertOne({
  name: "Vivek Pandey",
  email: "vivek.pandey@gmail.com",
  phone: "9876543210",
  address: {
    street: "MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  },
  registeredDate: { $date: "2024-01-10T10:00:00Z" },
  totalSpent: 20000
})
```

**📤 Response:**
```json
{
  "acknowledged": true,
  "insertedId": "ObjectId('64a1b2c3d4e5f60001234567')"
}
```

> 💡 **`insertedId`** — This is the auto-generated unique `_id` (ObjectId) assigned to the new document.  
> Use it to immediately fetch the inserted customer:
> ```js
> db.Customers.findOne({ _id: ObjectId("64a1b2c3d4e5f60001234567") })
> ```

---

### 2. Insert Multiple Products — `insertMany`

```js
db.Products.insertMany([
  {
    name: "iPhone 14",
    brand: "Apple",
    category: "Mobile",
    price: 70000,
    stock: 50,
    tags: ["premium", "popular"],
    ratings: { average: 4.5, count: 120 },
    createdAt: { $date: "2024-02-01T10:00:00Z" }
  },
  {
    name: "Samsung Smart TV",
    brand: "Samsung",
    category: "Electronics",
    price: 45000,
    stock: 30,
    tags: ["new", "discount"],
    ratings: { average: 4.3, count: 80 },
    createdAt: { $date: "2024-02-05T12:00:00Z" }
  },
  {
    name: "Nike Running Shoes",
    brand: "Nike",
    category: "Sports",
    price: 5000,
    stock: 100,
    tags: ["popular"],
    ratings: { average: 4.6, count: 200 },
    createdAt: { $date: "2024-02-10T08:30:00Z" }
  }
])
```

**📤 Response:**
```json
{
  "acknowledged": true,
  "insertedCount": 3,
  "insertedIds": {
    "0": "ObjectId('64b1c2d3e4f5a60001111111')",
    "1": "ObjectId('64b1c2d3e4f5a60002222222')",
    "2": "ObjectId('64b1c2d3e4f5a60003333333')"
  }
}
```

> 💡 **`insertedIds`** — A map of array index → `ObjectId` for each inserted product.  
> Use any of these IDs to immediately fetch a specific product:
> ```js
> db.Products.findOne({ _id: ObjectId("64b1c2d3e4f5a60001111111") })
> ```

---

## 🔵 READ — `find` & `findOne`

### 3. Find All Customers — `find`

```js
db.Customers.find()
```

> Returns a **cursor** over all documents in the Customers collection.  
> Each document will contain its unique `_id`, which can be used for targeted updates or deletes.

---

### 4. Find Products with Price > ₹10,000 — `find` with filter

```js
db.Products.find({ price: { $gt: 10000 } })
```

> 💡 `$gt` = **greater than**. Matches only documents where `price` exceeds 10000.  
> Other comparison operators: `$lt` (less than), `$gte` (≥), `$lte` (≤), `$eq` (equal), `$ne` (not equal).

---

### 5. Find Cancelled Orders — `find` with exact match

```js
db.Orders.find({ status: "cancelled" })
```

> Returns all orders where the `status` field exactly equals `"cancelled"`.

---

### 6. Find a Customer by Email — `findOne`

```js
db.Customers.findOne({ email: "etha23@yahoo.com" })
```

**📤 Response:**
```json
{
  "_id": "ObjectId('69da1c3f26cccb65e2c0fc65')",
  "name": "Etha Example",
  "email": "etha23@yahoo.com",
  "phone": "9876500000",
  ...
}
```

> 💡 **`_id`** from `findOne` — Once you have this ObjectId, you can use it for precise `updateOne` or `deleteOne` operations instead of filtering by email again.

---

## 🟡 UPDATE — `updateOne` & `updateMany`

### 7. Update Customer Phone by `_id` — `updateOne`

```js
db.Customers.updateOne(
  { _id: ObjectId("69da1c3f26cccb65e2c0fc65") },
  { $set: { phone: "98765441212" } }
)
```

**📤 Response:**
```json
{
  "acknowledged": true,
  "matchedCount": 1,
  "modifiedCount": 1
}
```

> 💡 **`_id` as filter** — Using the ObjectId (from `insertedId` or `findOne`) guarantees you update exactly one specific document, with zero chance of affecting others.  
> - `matchedCount: 1` → found the document  
> - `modifiedCount: 1` → the value actually changed

---

### 8. Increase Stock for a Product — `updateMany` with `$inc`

```js
db.Products.updateMany(
  { name: "Handmade Concrete Sausages" },
  { $inc: { stock: 10 } }
)
```

**📤 Response:**
```json
{
  "acknowledged": true,
  "matchedCount": 2,
  "modifiedCount": 2
}
```

> 💡 **`$inc`** — Increments the field value by the given amount (use negative to decrement).  
> `updateMany` affects **all** documents matching the filter — useful for bulk stock adjustments.

---

### 9. Update Order Status — `updateOne`

```js
db.Orders.updateOne(
  { _id: ObjectId("69da1c3f26cccb65e2c0fcf1") },
  { $set: { status: "shipped" } }
)
```

**📤 Response:**
```json
{
  "acknowledged": true,
  "matchedCount": 1,
  "modifiedCount": 1
}
```

> 💡 **`$set`** — Only updates the specified field(s). All other fields in the document remain unchanged.

---

## 🔴 DELETE — `deleteOne` & `deleteMany`

### 10. Delete One Review by `_id` — `deleteOne`

```js
db.Reviews.deleteOne({ _id: ObjectId("69da1c3f26cccb65e2c0fd69") })
```

**📤 Response:**
```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

> 💡 **`deletedCount: 1`** — Confirms exactly one document was removed.  
> Always prefer filtering by `_id` for `deleteOne` to avoid accidentally deleting a wrong document.

---

### 11. Delete Products with Low Stock — `deleteMany`

```js
db.Products.deleteMany({ stock: { $lt: 10 } })
```

**📤 Response:**
```json
{
  "acknowledged": true,
  "deletedCount": 7
}
```

> 💡 **`$lt`** = **less than**. This removes all products where stock has fallen below 10.  
> `deletedCount` tells you how many documents were actually removed — always review before running in production!

---

### 12. Delete Pending Orders — `deleteMany`

```js
db.Orders.deleteMany({ status: "pending" })
```

**📤 Response:**
```json
{
  "acknowledged": true,
  "deletedCount": 14
}
```

> ⚠️ **Caution** — `deleteMany` is irreversible. Always run a `find` with the same filter first to preview what will be deleted.

---

## 🧠 Key Concepts Summary

| Concept | Description |
|--------|-------------|
| `insertedId` | Auto-generated `ObjectId` returned after `insertOne` — use it to fetch the new document immediately |
| `insertedIds` | Map of index → `ObjectId` returned after `insertMany` |
| `ObjectId("...")` | 12-byte unique identifier used to precisely target a single document |
| `$set` | Update operator — sets specific fields without touching others |
| `$inc` | Update operator — increments (or decrements) a numeric field |
| `$gt / $lt` | Comparison query operators — greater than / less than |
| `matchedCount` | How many documents matched the filter |
| `modifiedCount` | How many documents were actually changed |
| `deletedCount` | How many documents were removed |

---

> 🙌 **Contributed by:** Vivek Pandey  
> 📅 **Last Updated:** 2026  
> ⭐ If this helped you, consider starring the repo!
