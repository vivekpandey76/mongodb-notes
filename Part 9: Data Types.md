# 🍃 MongoDB Data Types & BSON

> A complete guide to understanding data types in MongoDB, how BSON works, and why it matters for efficient storage and querying.

---

## 📌 Table of Contents

- [What are Data Types?](#what-are-data-types)
- [JSON vs BSON](#json-vs-bson)
- [Basic Data Types](#basic-data-types)
- [Advanced Data Types](#advanced-data-types)
- [Special Data Types](#special-data-types)
- [Quick Reference Table](#quick-reference-table)

---

## 📦 What are Data Types?

Data types define the **kind of values** a variable or field can store.

In MongoDB:
- Data is stored in **BSON** (Binary JSON)
- Each field has a **specific data type**
- Helps MongoDB **store, query, and process** data efficiently

---

## ⚡ JSON vs BSON

| Feature | JSON | BSON |
|---|---|---|
| Full Form | JavaScript Object Notation | Binary JSON |
| Format | Plain text | Binary encoded |
| Speed | Slower to parse | ✅ Faster to parse |
| Data Types | Limited (String, Number, Boolean, Array, Object, Null) | ✅ Extended (Date, ObjectId, Binary, Timestamp, etc.) |
| Human Readable | ✅ Yes | ❌ No (binary format) |
| File Size | Smaller text size | Slightly larger (due to type metadata) |
| Used By | REST APIs, config files | MongoDB internally |

### 🧠 Why MongoDB Uses BSON Instead of JSON

```
JSON  →  Human-readable text  →  MongoDB converts it  →  BSON (stored internally)
```

- **Faster processing** — Binary format is quicker for machines to read/write
- **More data types** — Supports `Date`, `ObjectId`, `Binary Data`, `Timestamp`, etc.
- **Traversable** — BSON is designed to be scanned quickly without full parsing

---

## 🔤 Basic Data Types

### 1. String
Stores text data. Must be UTF-8 encoded.

```json
{
  "name": "Ravi Sharma",
  "city": "Mumbai"
}
```

---

### 2. Integer
Stores whole numbers. MongoDB supports **32-bit** and **64-bit** integers.

```json
{
  "age": 25,
  "pinCode": 400001
}
```

| Type | BSON Type | Range |
|---|---|---|
| `int32` | Integer (32-bit) | −2,147,483,648 to 2,147,483,647 |
| `int64` | Integer (64-bit) | Very large numbers |

---

### 3. Boolean
Stores `true` or `false`.

```json
{
  "isActive": true,
  "isVerified": false
}
```

---

### 4. Double (Float)
Stores decimal / floating-point numbers.

```json
{
  "salary": 75000.50,
  "gpa": 3.85
}
```

---

## 🧩 Advanced Data Types

### 5. Object (Embedded Document)
Stores a nested JSON object inside a field.

```json
{
  "address": {
    "city": "Mumbai",
    "state": "Maharashtra",
    "pin": 400001
  }
}
```

> 💡 Use when a field has multiple sub-properties.

---

### 6. Array
Stores an ordered list of values (can be mixed types).

```json
{
  "skills": ["Java", "MongoDB", "Node.js"],
  "scores": [95, 87, 92]
}
```

> 💡 MongoDB supports querying inside arrays using `$elemMatch`, `$in`, etc.

---

### 7. ObjectId
A **12-byte unique identifier** automatically assigned to every document's `_id` field.

```js
{
  "_id": ObjectId("507f1f77bcf86cd799439011")
}
```

**ObjectId Structure:**

```
507f1f77  bcf86c  d799  439011
  ↑          ↑      ↑     ↑
Timestamp  Machine  PID  Random Counter
(4 bytes)  (3 bytes)(2b)  (3 bytes)
```

> 💡 ObjectId is always unique across documents, even across machines!

---

## 🌟 Special Data Types

### 8. Date
Stores date and time as milliseconds since Unix Epoch (Jan 1, 1970).

```js
{
  "createdAt": new Date(),
  "dob": new Date("2000-05-15")
}
```

> ⚠️ Always use MongoDB's `Date` type — don't store dates as plain strings.

---

### 9. Null
Represents the intentional absence of a value.

```json
{
  "middleName": null,
  "secondPhone": null
}
```

> 💡 Different from a missing field — `null` means the field exists but has no value.

---

### 10. Timestamp
Used **internally by MongoDB** for replication and oplog. Not the same as `Date`.

```js
{
  "ts": Timestamp(1625000000, 1)
}
```

> ⚠️ Use `Date` for application-level timestamps. `Timestamp` is for MongoDB internals.

---

### 11. Binary Data
Used to store raw binary content — like images, videos, or files.

```js
{
  "profilePic": BinData(0, "base64EncodedDataHere==")
}
```

---

### 12. Regular Expression
Stores a regex pattern that can be used for pattern-matching queries.

```js
{
  "pattern": /^ravi/i
}
```

**Query example:**

```js
db.users.find({ name: /^Ravi/i })
```

---

## 📊 Quick Reference Table

| Data Type | Example | Use Case |
|---|---|---|
| `String` | `"Mumbai"` | Names, text fields |
| `Integer` | `25` | Age, count, IDs |
| `Boolean` | `true` | Flags, toggles |
| `Double` | `3.14` | Prices, scores |
| `Object` | `{ city: "Pune" }` | Nested documents |
| `Array` | `["Java", "Python"]` | Lists, tags, skills |
| `ObjectId` | `ObjectId("...")` | Unique document ID |
| `Date` | `new Date()` | Timestamps, DOB |
| `Null` | `null` | Missing/absent values |
| `Timestamp` | `Timestamp(...)` | MongoDB internals |
| `Binary Data` | `BinData(...)` | Files, images |
| `RegExp` | `/^abc/i` | Pattern matching |

---

## 🧪 Practice Example

A complete MongoDB document using multiple data types:

```js
db.students.insertOne({
  "_id": ObjectId(),                        // ObjectId
  "name": "Ravi Sharma",                    // String
  "age": 21,                                // Integer
  "gpa": 8.75,                              // Double
  "isEnrolled": true,                       // Boolean
  "skills": ["Java", "MongoDB", "Node.js"], // Array
  "address": {                              // Object
    "city": "Mumbai",
    "pin": 400001
  },
  "createdAt": new Date(),                  // Date
  "middleName": null,                       // Null
  "profilePic": BinData(0, "abc123==")      // Binary Data
})
```
