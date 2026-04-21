# 🍃 MongoDB Atlas Search — Part 3: Custom Search Index, Autocomplete & Stored Source

> A complete guide to building powerful, production-ready search experiences using MongoDB Atlas Search with custom index mappings, autocomplete, compound queries, and stored source optimization.

---

## 📚 Table of Contents

- [Custom Search Index](#-custom-search-index)
- [Autocomplete](#-autocomplete)
  - [Basic Autocomplete Query](#basic-autocomplete-query)
  - [Compound Autocomplete + Text Query](#compound-autocomplete--text-query)
- [Stored Source](#-stored-source)
  - [Index with storedSource](#index-with-storedsource)
  - [Query with returnStoredSource](#query-with-returnstoredsource)
- [When to Use vs When NOT to Use](#-when-to-use-vs-when-not-to-use)
- [Quick Reference Cheatsheet](#-quick-reference-cheatsheet)

---

## 🗂 Custom Search Index

### Index Definition

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "brand": {
        "type": "string"
      },
      "category": {
        "type": "string"
      },
      "name": [
        {
          "type": "string"
        },
        {
          "type": "autocomplete"
        }
      ]
    }
  }
}
```

### 🔍 What's Happening Here?

| Setting | Value | Purpose |
|---|---|---|
| `dynamic` | `false` | Only indexed fields you explicitly define are searchable |
| `brand` | `string` | Full-text search on brand name |
| `category` | `string` | Full-text search on category |
| `name` | `[string, autocomplete]` | **Dual mapping** — supports both full-text AND autocomplete on the same field |

### 💡 Why `dynamic: false`?

Setting `dynamic: false` gives you **precise control**. Only the fields you list are indexed — nothing more. This keeps your index lean and your search results predictable.

> ⚠️ If you set `dynamic: true`, Atlas will auto-index *all* fields, which can bloat the index size and include fields you never intend to search.

### 💡 Why dual-map the `name` field?

The `name` field uses **two types simultaneously** — `string` and `autocomplete`. This is intentional:

- `string` → powers full-text `$search` with scoring, fuzzy matching, etc.
- `autocomplete` → powers prefix/partial-word matching as users type

You cannot use autocomplete on a `string`-only field, and you cannot do rich full-text search on an `autocomplete`-only field. **Dual mapping gives you both.**

---

## 🔤 Autocomplete

### Basic Autocomplete Query

```js
[
  {
    $search: {
      index: 'products_search',
      autocomplete: {
        query: 'vive ne',
        path: 'name',
        tokenOrder: "any"
      }
    }
  },
  {
    $project: {
      score: { $meta: "searchScore" },
      name: 1
    }
  }
]
```

#### 🔍 Breaking It Down

| Option | Value | Meaning |
|---|---|---|
| `index` | `products_search` | The custom Atlas Search index to query |
| `autocomplete.query` | `'vive ne'` | What the user has typed so far (partial input) |
| `autocomplete.path` | `'name'` | The field to run autocomplete on (must be mapped as `autocomplete`) |
| `tokenOrder` | `"any"` | Matches tokens in **any order** — `"ne vive"` also matches |
| `$meta: "searchScore"` | — | Returns the relevance score alongside each document |

#### `tokenOrder` Options

| Value | Behavior |
|---|---|
| `"any"` | Tokens can appear in any order in the document (more flexible) |
| `"sequential"` | Tokens must appear in the same order as typed (more precise) |

> ✅ **Use `"any"`** when you want forgiving search (e.g., "ne vive" still finds "Vive Neo")  
> ✅ **Use `"sequential"`** when word order matters (e.g., product codes, names like "John Smith")

---

### Compound Autocomplete + Text Query

```js
[
  {
    $search: {
      index: "products_search",
      compound: {
        must: [
          {
            autocomplete: {
              path: "name",
              query: "viv"
            }
          },
          {
            text: {
              path: "name",
              query: "viv"
            }
          }
        ]
      }
    }
  },
  {
    $project: {
      score: { $meta: "searchScore" },
      name: 1
    }
  }
]
```

#### 🔍 What's Happening Here?

This query uses a **`compound`** operator with **`must`** clauses combining two search strategies:

| Clause | Type | Purpose |
|---|---|---|
| First `must` | `autocomplete` | Matches partial input as user types (prefix matching) |
| Second `must` | `text` | Full-text relevance match on the same query |

#### Why Combine Both?

Using `autocomplete` alone gives partial matches — but the relevance scoring isn't as rich as `text`. Combining them means:

- ✅ You still get **prefix matching** (autocomplete)
- ✅ You also get **better relevance scoring** (text)
- ✅ Documents that satisfy **both** conditions rank higher

> 💡 Think of it as: autocomplete narrows the candidate set, while `text` boosts the confidence/score.

#### `compound` Operators at a Glance

| Operator | Behavior |
|---|---|
| `must` | Document **must** match — acts like AND |
| `should` | Document **should** match — boosts score if it does |
| `mustNot` | Document **must not** match — acts like NOT |
| `filter` | Must match, but **does not affect score** |

---

## 💾 Stored Source

### Index with `storedSource`

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "brand": {
        "type": "string"
      },
      "category": {
        "type": "string"
      },
      "name": [
        {
          "type": "string"
        },
        {
          "type": "autocomplete"
        }
      ]
    }
  },
  "storedSource": {
    "include": [
      "name",
      "brand"
    ]
  }
}
```

#### 🔍 What is `storedSource`?

By default, when Atlas Search finds matching documents, MongoDB must do a **second lookup** back to the original collection to fetch the document fields you want to return. This is called a **collection scan fetch**.

`storedSource` tells Atlas to **pre-store specific fields directly on the search index**. When you query with `returnStoredSource: true`, Atlas can return those fields **without going back to the collection** — much faster.

| Setting | Effect |
|---|---|
| `"include": ["name", "brand"]` | Only `name` and `brand` are stored on the index |
| `"exclude": [...]` | You can also exclude specific fields and store everything else |

---

### Query with `returnStoredSource`

```js
[
  {
    $search: {
      index: "products_search",
      returnStoredSource: true,
      compound: {
        must: [
          {
            autocomplete: {
              path: "name",
              query: "viv"
            }
          },
          {
            text: {
              path: "name",
              query: "viv"
            }
          }
        ]
      }
    }
  }
]
```

#### 🔍 What's Different?

The addition of **`returnStoredSource: true`** tells Atlas Search to:

1. Find matching documents using the index
2. Return only the **pre-stored fields** (`name`, `brand`) directly from the index
3. **Skip the collection lookup entirely** ← This is the performance win

#### Performance Impact

```
Without storedSource:
  Search Index → finds doc IDs → fetch from collection → return fields

With storedSource + returnStoredSource:
  Search Index → finds doc IDs → return stored fields directly ✅ (no collection fetch)
```

> 🚀 This can **significantly reduce query latency**, especially when you only need a subset of fields (e.g., for a search suggestions dropdown).

---

## ✅ When to Use vs When NOT to Use

### Custom Index Mappings (`dynamic: false`)

| ✅ Use When | ❌ Don't Use When |
|---|---|
| You know exactly which fields will be searched | Your schema is evolving rapidly |
| You want to keep index size small | You want to search any/all fields without maintaining the index |
| You need type-specific mappings (e.g., autocomplete on one field) | You're prototyping and don't care about precision yet |

---

### Autocomplete

| ✅ Use When | ❌ Don't Use When |
|---|---|
| Building a **search-as-you-type** UI | The user always submits a complete query |
| Users search with **partial terms** | You need exact phrase matching on full words |
| You want **forgiving search UX** | You need highly precise, scored full-text results (use `text` instead) |
| Building a **suggestions dropdown** | You're searching large blobs of text (use `text` for paragraphs) |

---

### Compound Queries (Autocomplete + Text Together)

| ✅ Use When | ❌ Don't Use When |
|---|---|
| You want **both prefix match AND relevance scoring** | A simple autocomplete alone is sufficient |
| You need documents to satisfy **multiple conditions** | The compound logic adds unnecessary complexity for simple lookups |
| Combining autocomplete with filters (e.g., brand, category) | You're just doing a basic keyword search |

---

### `storedSource` + `returnStoredSource`

| ✅ Use When | ❌ Don't Use When |
|---|---|
| You only need **a few fields** returned (e.g., name, brand for suggestions) | You need **all fields** from the document in the result |
| You want to **reduce query latency** on high-traffic search | The collection is small and fetch overhead is negligible |
| Building **autocomplete dropdowns** where only name/thumbnail matters | Your documents are small and performance isn't a concern |
| You have a **large collection** where re-fetching is costly | You frequently update stored fields (index must be resynced) |

> ⚠️ **Important:** `storedSource` only contains the snapshot at index time. If your documents change frequently, the stored data may be **stale** until the index re-syncs. Always consider your update frequency before relying on `returnStoredSource` for critical fields.

---

## 📋 Quick Reference Cheatsheet

```
Index Mapping
├── dynamic: false     → Only search fields you define
├── type: "string"     → Full-text search
├── type: "autocomplete" → Prefix/partial matching (as-you-type)
└── Dual mapping       → Combine both on the same field

Autocomplete Query
├── tokenOrder: "any"        → Flexible word order
└── tokenOrder: "sequential" → Strict word order

Compound Operator
├── must    → All conditions required (AND)
├── should  → Boosts score (OR-like)
├── mustNot → Exclude matches (NOT)
└── filter  → Must match, no score impact

storedSource
├── include: [fields] → Pre-store only these fields on index
├── exclude: [fields] → Store everything EXCEPT these
└── returnStoredSource: true → Skip collection fetch, use stored data
```
