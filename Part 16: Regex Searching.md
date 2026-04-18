# 🔍 MongoDB Pattern-Based Searching with `$regex`

> **Master pattern matching in MongoDB** — search smarter, not harder.

---

## 📖 Table of Contents

- [What is Pattern-Based Searching?](#what-is-pattern-based-searching)
- [When to Use `$regex`](#when-to-use-regex)
- [Regex Syntax Cheatsheet](#regex-syntax-cheatsheet)
- [Query Examples](#query-examples)
  - [Q1: Starts With](#q1-find-customers-whose-name-starts-with-m)
  - [Q2: Contains](#q2-find-customers-whose-email-contains-hotmail)
  - [Q3: Ends With](#q3-find-customers-whose-name-ends-with-a)
  - [Q4: Case Insensitive](#q4-find-products-where-category-contains-fashion-case-insensitive)
  - [Q5: Starts & Ends With](#q5-find-products-where-name-starts-with-i-and-ends-with-s)
  - [Q6: Digits Only](#q6-find-customers-whose-phone-number-contains-only-digits)
- [Practice Problem & Answer](#-practice-problem--answer)
- [Performance Tips](#-performance-tips)

---

## What is Pattern-Based Searching?

Instead of querying for **exact values**, pattern-based searching lets you match documents based on **patterns** within strings.

```
Exact Match  →  name: "Maria"          ✅ only "Maria"
Pattern Match →  name: /^M/            ✅ "Maria", "Mike", "Mohammed", ...
```

MongoDB uses **Regular Expressions (Regex)** for this via the `$regex` operator.

---

## When to Use `$regex`

| ✅ Use `$regex` when...                            | ❌ Avoid `$regex` when...                              |
|----------------------------------------------------|-------------------------------------------------------|
| You don't know the exact value                     | You need exact matches (use `{ field: value }`)       |
| Searching for partial text (e.g., email domains)   | You have a large collection without text indexes      |
| Filtering by string format (e.g., digits only)     | Performance is critical — use `$text` index instead   |
| Case-insensitive searches are needed               | Matching structured data like dates or numbers        |
| Building search/autocomplete features              | The field has very high cardinality with no index     |

> 💡 **Pro Tip:** `$regex` without an index performs a **full collection scan**. For production search features, consider MongoDB **Atlas Search** or a `text` index.

---

## Regex Syntax Cheatsheet

| Symbol   | Meaning                        | Example         | Matches                        |
|----------|--------------------------------|-----------------|--------------------------------|
| `^`      | Starts with                    | `^M`            | "Maria", "Mike"                |
| `$`      | Ends with                      | `a$`            | "Maria", "Sandra"              |
| `.*`     | Any characters in between      | `^I.*s$`        | "iPhones", "Items"             |
| `i`      | Case insensitive option        | `/fashion/i`    | "Fashion", "FASHION", "fashion"|
| `[0-9]`  | Any digit                      | `^[0-9]+$`      | "1234567890"                   |
| `[a-zA-Z]` | Any letter                   | `^[a-zA-Z]+$`   | "John", "Maria"                |
| `+`      | One or more of preceding char  | `[0-9]+`        | "9", "42", "100"               |

---

## Query Examples

### Q1: Find customers whose name starts with "M"

> **Use case:** Autocomplete dropdowns, name filtering in admin panels.

The `^` anchor asserts the pattern must match at the **start** of the string.

```js
// Using $regex operator
db.Customers.find({
  name: { $regex: "^M" }
})

// Using shorthand regex literal
db.Customers.find({
  name: /^M/
})
```

**Matches:** `"Maria"`, `"Mike"`, `"Mohammed"` — but **not** `"Emma"` or `"Sam"`

---

### Q2: Find customers whose email contains "hotmail"

> **Use case:** Filtering users by email provider, migration campaigns, analytics segmentation.

When no `^` or `$` anchors are used, the pattern matches **anywhere** in the string.

```js
// Using $regex operator
db.Customers.find({
  email: { $regex: "hotmail" }
})

// Using shorthand regex literal
db.Customers.find({
  email: /hotmail/
})
```

**Matches:** `"john@hotmail.com"`, `"sara.k@hotmail.co.uk"` — but **not** `"john@gmail.com"`

---

### Q3: Find customers whose name ends with "a"

> **Use case:** Linguistic filtering, name-based grouping, localization features.

The `$` anchor asserts the pattern must match at the **end** of the string.

```js
// Using $regex operator
db.Customers.find({
  name: { $regex: "a$" }
})

// Using shorthand regex literal
db.Customers.find({
  name: /a$/
})
```

**Matches:** `"Maria"`, `"Sandra"`, `"Priya"` — but **not** `"Michael"` or `"John"`

---

### Q4: Find products where category contains "fashion" (case insensitive)

> **Use case:** User-facing search bars where casing is unpredictable. Users may type "FASHION", "Fashion", or "fashion" — treat them all the same.

The `$options: "i"` flag (or `/pattern/i` shorthand) makes the match **case-insensitive**.

```js
// Using $regex with $options
db.Products.find({
  category: { $regex: "fashion", $options: "i" }
})

// Using shorthand regex with 'i' flag
db.Products.find({
  category: /fashion/i
})
```

**Matches:** `"fashion"`, `"Fashion"`, `"FASHION"`, `"High-Fashion"` — all valid ✅

---

### Q5: Find products where name starts with "I" and ends with "s"

> **Use case:** Filtering specific product naming conventions or SKU patterns. Combine `^`, `.*`, and `$` for complex pattern rules.

`^I` = starts with "I" | `.*` = anything in between | `s$` = ends with "s"

```js
db.Products.find({
  name: { $regex: "^I.*s$" }
})
```

**Matches:** `"iPhones"`, `"Items"`, `"Interfaces"` — but **not** `"iPad"` or `"Shoes"`

---

### Q6: Find customers whose phone number contains only digits (valid format)

> **Use case:** Data validation — identify records with clean/dirty phone data before processing payments or sending SMS.

`^[0-9]+$` means: from start to end, allow **only digits**, at least one.

```js
// Only digits — valid phone format
db.Customers.find({
  phone: { $regex: "^[0-9]+$" }
})

// Bonus: Only letters — valid name format
db.Customers.find({
  name: { $regex: "^[a-zA-Z]+$" }
})
```

**Matches for phone:** `"9876543210"`, `"1234567890"` — but **not** `"+91-9876543210"` or `"98765 43210"`

---

## 🧩 Practice Problem & Answer

### ❓ Problem

> **Find all customers whose name contains the word "an" (case insensitive)**

This matches names where `"an"` appears **anywhere** — beginning, middle, or end — regardless of uppercase or lowercase.

```js
// ✅ Solution 1: Using $regex with $options
db.Customers.find({
  name: { $regex: "an", $options: "i" }
})

// ✅ Solution 2: Using shorthand regex literal
db.Customers.find({
  name: /an/i
})
```

**What it matches:**

| Name        | Matches? | Reason                          |
|-------------|----------|---------------------------------|
| `"Sandra"`  | ✅ Yes   | Contains "an" → S**an**dra      |
| `"Ananya"`  | ✅ Yes   | Starts with "An" → **An**anya   |
| `"Jordan"`  | ✅ Yes   | Contains "an" → Jord**an**      |
| `"ANNIE"`   | ✅ Yes   | Case insensitive → **AN**NIE    |
| `"Maria"`   | ❌ No    | Does not contain "an"           |
| `"John"`    | ❌ No    | Does not contain "an"           |

---

## ⚡ Performance Tips

```
1. 📌 Anchored patterns like /^M/ can use indexes efficiently
2. 🐢 Unanchored patterns like /hotmail/ always scan the full collection
3. 📦 For large collections, prefer MongoDB Atlas Search or $text indexes
4. 🔍 Use .explain("executionStats") to check if your regex uses an index
5. ⚠️  Avoid regex on very large string fields (like long descriptions)
```

```js
// Check query performance
db.Customers.find({ name: /^M/ }).explain("executionStats")
```

---

## 📚 References

- [MongoDB `$regex` Documentation](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)
- [MongoDB Atlas Search](https://www.mongodb.com/docs/atlas/atlas-search/)
- [Regular Expressions 101 (Tester)](https://regex101.com/)

---

> 🙌 **Contributed by:** Vivek Pandey  
> 📅 **Last Updated:** 2026  
> ⭐ If this helped you, consider starring the repo!
