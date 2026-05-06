# 🔍 MongoDB Atlas Search — Real Life Examples

> **Part 2 of the MongoDB Atlas Series** · Built by **Vivek**  
> A practical guide to full-text search, fuzzy matching, compound queries, and relevance scoring in MongoDB Atlas Search.

---

## 📚 Table of Contents

- [What is Atlas Search?](#-what-is-atlas-search)
- [Setup: Creating a Search Index](#-setup-creating-a-search-index)
- [1. Multi-Field Text Search](#1️⃣-multi-field-text-search)
- [2. Relevance Scoring with `$meta`](#2️⃣-relevance-scoring-with-meta)
- [3. Compound Search (must + filter)](#3️⃣-compound-search-must--filter)
- [4. Fuzzy Search](#4️⃣-fuzzy-search)
- [When to Use Which?](#-when-to-use-which)
- [Quick Reference Cheatsheet](#-quick-reference-cheatsheet)

---

## 🌐 What is Atlas Search?

MongoDB Atlas Search is a **full-text search engine** built directly into MongoDB Atlas, powered by **Apache Lucene** under the hood. Unlike regular MongoDB `find()` queries that do exact matching, Atlas Search enables:

| Feature | Regular Query | Atlas Search |
|---|---|---|
| Exact match | ✅ | ✅ |
| Partial word match | ❌ | ✅ |
| Typo tolerance | ❌ | ✅ (fuzzy) |
| Relevance ranking | ❌ | ✅ |
| Multi-field search | ⚠️ Manual | ✅ Built-in |

---

## ⚙️ Setup: Creating a Search Index

Before running any `$search` aggregation, you need a **Search Index** on your collection.

In Atlas UI → **Search** tab → **Create Search Index**:

```json
{
  "mappings": {
    "dynamic": true
  }
}
```

Or define specific field mappings:

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "name":     { "type": "string" },
      "brand":    { "type": "string" },
      "category": { "type": "string" }
    }
  }
}
```

> 💡 **Index name used in these examples:** `products_search`

---

## 1️⃣ Multi-Field Text Search

### 🔎 What it does
Searches for a query term across **multiple fields** simultaneously — in this case `name`, `brand`, and `category`.

### 📌 When to use it
- When users type into a **search bar** and you want to match across product name, brand, or category
- When you don't know which field contains the relevant data
- Replacing multiple `$or` conditions in regular queries

### 💻 Query

```js
[
  {
    $search: {
      index: 'products_search',
      text: {
        query: 'nest',
        path: ["name", "brand", "category"]  // 🔑 Search across 3 fields at once
      }
    }
  }
]
```

### 🧠 How it works

```
query: 'nest'
        │
        ├── checks → name field      → "Nest Thermostat" ✅
        ├── checks → brand field     → "Nest" ✅
        └── checks → category field  → "Nested Storage" ✅
```

### 📦 Example Documents Matched

```json
{ "name": "Nest Thermostat",   "brand": "Google",  "category": "Smart Home" }
{ "name": "Storage Box",       "brand": "Nest Co.", "category": "Furniture"  }
{ "name": "Bamboo Plant Stand","brand": "HomeX",   "category": "Nested Decor"}
```

---

## 2️⃣ Relevance Scoring with `$meta`

### 🔎 What it does
Returns a **relevance score** for each document, indicating how well it matches your query. Uses fuzzy matching to also catch slight variations.

### 📌 When to use it
- Building a **ranked search results page** (like Google/Amazon)
- When you want to **sort results by relevance**, not just return them
- Debugging search — to understand why certain results appear
- A/B testing different query strategies

### 💻 Query

```js
[
  {
    $search: {
      index: 'products_search',
      text: {
        query: 'nest',
        path: ["name", "brand", "category"],
        fuzzy: {}  // 🔑 Enables typo-tolerant matching
      }
    }
  },
  {
    $project: {
      score: { $meta: "searchScore" },  // 🔑 Expose the relevance score
      name: 1,
      brand: 1,
      category: 1
    }
  }
]
```

### 📊 Example Output

```json
[
  { "score": 4.823, "name": "Nest Thermostat",   "brand": "Google",   "category": "Smart Home" },
  { "score": 3.210, "name": "Nest Cam Outdoor",  "brand": "Google",   "category": "Security"   },
  { "score": 1.105, "name": "Nesta Desk Lamp",   "brand": "LightCo",  "category": "Lighting"   }
]
```

> 📈 **Higher score = more relevant.** The score is calculated by Lucene's BM25 algorithm based on term frequency and field length.

### 💡 Pro Tip: Sort by Score

```js
[
  { $search: { ... } },
  { $project: { score: { $meta: "searchScore" }, name: 1 } },
  { $sort: { score: -1 } }  // Sort highest relevance first
]
```

---

## 3️⃣ Compound Search (must + filter)

### 🔎 What it does
Combines **multiple search conditions** with logical operators — like a powerful WHERE clause for full-text search.

### 📌 When to use it
- E-commerce: search for keyword AND filter by category/brand/price
- When you need **mandatory conditions** (`must`) alongside **non-scoring filters** (`filter`)
- Building faceted search (like filtering on Amazon: "Electronics > Under $50 > 4 stars+")
- When simple `text` search isn't precise enough

### 🔑 Compound Clauses Explained

| Clause | Effect on Score | Document Must Match? |
|--------|----------------|----------------------|
| `must` | ✅ Affects score | ✅ Required |
| `mustNot` | ❌ N/A | ❌ Must NOT match |
| `should` | ✅ Boosts score | Optional (preferred) |
| `filter` | ❌ No score impact | ✅ Required |

> 💡 Use **`filter`** instead of `must` when the condition is binary (match/no-match) and you don't care about boosting score — it's also **faster** since it skips scoring.

### 💻 Query

```js
[
  {
    $search: {
      index: "products_search",
      compound: {
        must: [
          {
            text: {
              query: "newest",      // 🔑 MUST contain "newest" in name — affects score
              path: "name"
            }
          }
        ],
        filter: [
          {
            text: {
              query: "Fashion",    // 🔑 MUST be in Fashion category — no score impact
              path: "category"
            }
          }
        ]
      }
    }
  },
  {
    $project: {
      score: { $meta: "searchScore" },
      name: 1,
      brand: 1,
      category: 1
    }
  }
]
```

### 🧠 Logic Breakdown

```
Result = documents where:
    name CONTAINS "newest"       ← must  (scored)
    AND category IS "Fashion"    ← filter (not scored, but required)
```

### 📦 Example: Real E-Commerce Scenario

```js
// "Show me the newest running shoes under $100"
compound: {
  must: [
    { text: { query: "running shoes", path: ["name", "category"] } }
  ],
  filter: [
    { range: { path: "price", lte: 100 } }
  ],
  should: [
    { text: { query: "newest latest 2024", path: "name" } }  // Boost newer items
  ]
}
```

---

## 4️⃣ Fuzzy Search

### 🔎 What it does
Enables **typo-tolerant** search using edit distance (Levenshtein distance). If a user types `"nset"` instead of `"nest"`, fuzzy search still finds the right results.

### 📌 When to use it
- Any **user-facing search bar** where typos are expected
- Mobile apps where keyboard errors are common
- Voice-to-text input that may have transcription errors
- When user data contains inconsistent spellings

### 💻 Query

```js
[
  {
    $search: {
      index: 'products_search',
      text: {
        query: 'nest',
        path: ["name", "brand", "category"],
        fuzzy: {}  // 🔑 Enable fuzzy matching with default settings
      }
    }
  }
]
```

### ⚙️ Fuzzy Options (Customize it)

```js
fuzzy: {
  maxEdits: 2,          // Max character edits allowed (1 or 2). Default: 2
  prefixLength: 1,      // Exact chars required at start. Higher = faster, less fuzzy
  maxExpansions: 50     // Max variations to consider. Lower = faster
}
```

### 🔤 Edit Distance Examples

| User Types | Matches (maxEdits: 2) | Why |
|---|---|---|
| `"nest"` | "Nest", "Best", "Rest" | Exact + 1 edit |
| `"nset"` | "Nest" | 2 character swaps |
| `"nestt"` | "Nest" | 1 extra character |
| `"nes"` | "Nest" | 1 missing character |

### ⚖️ Fuzzy vs Exact — Performance Trade-off

```
Exact Search:   ████████████████████  Fast  ⚡ — Use for IDs, SKUs, codes
Fuzzy Search:   ████████████░░░░░░░░  Slower 🐢 — Use for product names, descriptions
```

> 💡 **Tip:** Combine `prefixLength: 2` to require the first 2 characters to match exactly — this dramatically improves performance while still catching most typos.

---

## 🗺️ When to Use Which?

```
User searches in a search bar?
        │
        ├── Single field only?
        │         └──► Basic text search (path: "name")
        │
        ├── Multiple fields (name + brand + category)?
        │         └──► Multi-Field Text Search ✅
        │
        ├── Typos expected (mobile / general users)?
        │         └──► Add fuzzy: {} to any text search ✅
        │
        ├── Need to filter by category / price / brand?
        │         └──► Compound Search with filter ✅
        │
        ├── Need ranked results (most relevant first)?
        │         └──► Add $project with $meta: "searchScore" + $sort ✅
        │
        └── All of the above?
                  └──► Compound + fuzzy + scoring — combine them all! 🚀
```

---

## 📋 Quick Reference Cheatsheet

```js
// ✅ Simple multi-field search
{ $search: { index: 'idx', text: { query: 'q', path: ["f1","f2"] } } }

// ✅ With fuzzy (typo-tolerant)
{ $search: { index: 'idx', text: { query: 'q', path: ["f1"], fuzzy: {} } } }

// ✅ Expose relevance score
{ $project: { score: { $meta: "searchScore" }, name: 1 } }

// ✅ Compound: required match + category filter
{ $search: { index: 'idx', compound: {
    must:   [{ text: { query: 'newest', path: 'name' } }],
    filter: [{ text: { query: 'Fashion', path: 'category' } }]
}}}

// ✅ All together: compound + fuzzy + score
[
  { $search: { index: 'products_search', compound: {
      must:   [{ text: { query: 'running shoes', path: ['name','brand'], fuzzy: { maxEdits: 1 } } }],
      filter: [{ text: { query: 'Sports', path: 'category' } }]
  }}},
  { $project: { score: { $meta: "searchScore" }, name: 1, brand: 1, category: 1 } },
  { $sort: { score: -1 } },
  { $limit: 10 }
]
```


