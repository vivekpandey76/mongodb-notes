# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Part 28: MongoDB Performance Tuning & Query Optimization
- Part 29: MongoDB Security Best Practices
- MkDocs-based interactive documentation site

---

## [2.0.0] — 2026-05-06

### Changed
- **Repository restructured** for professional readability and navigation
- All 27 parts moved from flat root into categorised `docs/` subdirectories:
  - `docs/01-fundamentals/` — Parts 01–02
  - `docs/02-querying/` — Parts 03–06, 09–11, 15–16
  - `docs/03-data-modelling/` — Parts 07–08
  - `docs/04-advanced-operations/` — Parts 12–14, 17
  - `docs/05-aggregation/` — Parts 18–20
  - `docs/06-atlas-search/` — Parts 21–23
  - `docs/07-production/` — Parts 24–27
- All filenames renamed to **kebab-case** (no spaces, colons, or parentheses)
- Architecture diagrams moved to `assets/images/`
- `index.js` moved to `examples/mongoose-crud-example.js`
- `README.md` fully rewritten with updated links, structured ToC, and cleaner layout

---

## [1.0.0] — 2024-04-01

### Added
- Complete 27-part MongoDB learning guide (Parts 1–27)
- Part 1: Introduction to MongoDB — NoSQL concepts, documents, collections
- Part 2: MongoDB Atlas setup — cloud clusters, connection strings
- Part 3: Basic Queries — `find`, `findOne`
- Part 4: CRUD Operations — `insertOne`, `updateOne`, `deleteOne`, `replaceOne`
- Part 5: Comparison Operators — `$eq`, `$ne`, `$gt`, `$lt`, `$in`, `$nin`
- Part 6: Logical Operators — `$and`, `$or`, `$not`, `$nor`
- Part 7: Soft Delete vs Hard Delete patterns
- Part 8: Embedding vs Referencing data modelling strategies
- Part 9: BSON Data Types — ObjectId, Date, Number, String
- Part 10: Cursor Methods — `skip()`, `limit()`, `sort()`
- Part 11: Projection — include/exclude fields, `$slice`, `$elemMatch`
- Part 12: Array Operators — `$push`, `$pull`, `$addToSet`, `$all`, `$size`
- Part 13: Advanced Update Operators — `$set`, `$unset`, `$inc`, `$rename`
- Part 14: Bulk Write — `bulkWrite`, ordered vs unordered operations
- Part 15: Query Operators — `$exists`, `$type`, `$expr`, `$jsonSchema`
- Part 16: Regex Searching — pattern matching, case-insensitive search
- Part 17: Indexing — single, compound, text, TTL indexes; `explain()`
- Part 18: Aggregation Basics — `$match`, `$group`, `$sort`, `$project`, `$count`
- Part 19: Aggregation Advanced — `$lookup`, `$unwind`, `$facet`
- Part 20: Aggregation Expert — `$addFields`, `$merge`, `$cond`, `$switch`
- Part 21: MongoDB Atlas Search — analyzers, index configuration
- Part 22: Atlas Fuzzy & Compound Search — fuzzy matching, compound queries
- Part 23: Atlas Autocomplete & Custom Search — stored source, custom analyzers
- Part 24: Triggers — database triggers, scheduled triggers, event-driven logic
- Part 25: Transactions — ACID properties, sessions, multi-document writes
- Part 26: Sharding — horizontal scaling, shard keys, mongos, chunks
- Part 27: Replication — replica sets, primary/secondary nodes, failover, oplog
- `index.js` — example Node.js + Mongoose integration scripts
- Architecture diagrams: `Cluster.png`, `Replication.png`, `Sharding.png`, `Transactions.png`, `indexing.png`
- `README.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`

---

[Unreleased]: https://github.com/vivekpandey76/mongodb-notes/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/vivekpandey76/mongodb-notes/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/vivekpandey76/mongodb-notes/releases/tag/v1.0.0
