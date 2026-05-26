# C# Data Structures & Algorithms — Complete Course

A self-paced, browser-based DSA course written entirely in C#. Zero setup required — open any HTML file directly in a browser or visit the live site.

**Live site:** https://dslearn.wasmer.app

---

## Overview

| | |
|---|---|
| **Language** | C# (.NET) |
| **Modules** | 20 |
| **HTML Files** | 90 |
| **Phases** | 10 |
| **Practice Problems** | 80+ |
| **Real-World Challenges** | 20 |
| **Estimated Study Time** | ~100 hours |
| **Level** | Beginner → Advanced |

**Features:**
- 🌙 Dark/Light theme toggle on all pages
- 📋 One-click code copy buttons
- ✅ Progress tracking with localStorage
- 📱 Responsive design for all devices

---

## Course Structure

### Phase 1 — Foundations (~8–10 hrs · Beginner)
- **Module 1:** Big O Notation, Arrays, Strings, `List<T>`

### Phase 2 — Linear Data Structures (~12–15 hrs · Beginner–Intermediate)
- **Module 2:** Singly, Doubly & Circular Linked Lists
- **Module 3:** Stacks, Queues, Deque, Priority Queue, Monotonic Stack & Queue

### Phase 3 — Recursion & Sorting (~15–18 hrs · Intermediate)
- **Module 4:** Recursion Fundamentals, Backtracking Preview
- **Module 5:** O(n²) Sorts, Merge Sort, Quick Sort, Linear Sorts, .NET Sorting APIs

### Phase 4 — Trees (~22–28 hrs · Intermediate–Advanced)
- **Module 6:** Binary Trees, Traversals, Binary Search Trees
- **Module 7:** AVL Trees, Red-Black Trees, Heaps, Trie, B-Trees, LCA & Binary Lifting

### Phase 5 — Hashing (~7–9 hrs · Intermediate)
- **Module 8:** Hash Functions, Dictionary / HashSet, LRU Cache, Bloom Filters

### Phase 6 — Graphs (~22–28 hrs · Intermediate–Advanced)
- **Module 9:** Graph Theory, BFS, DFS
- **Module 10:** Dijkstra, Bellman-Ford, Floyd-Warshall, MST (Prim's & Kruskal's), Topological Sort, SCC, Max Flow

### Phase 7 — Advanced Data Structures (~8–10 hrs · Advanced)
- **Module 11:** Segment Trees, Fenwick Trees (BIT), Union-Find, Sparse Tables

### Phase 8 — Algorithm Design Paradigms (~22–28 hrs · Advanced)
- **Module 12:** Dynamic Programming (1D, 2D, Trees/Graphs)
- **Module 13:** Greedy Algorithms, Huffman, Interval Scheduling
- **Module 14:** Divide & Conquer, Binary Search Deep Dive, Master Theorem

### Phase 9 — String, Bit & Backtracking Algorithms (~18–22 hrs · Advanced)
- **Module 15:** KMP, Rabin-Karp, Z-Algorithm, Manacher's, Suffix Array
- **Module 16:** Bit Manipulation & Classic Bit Problems
- **Module 17:** Backtracking — N-Queens, Sudoku, Permutations & Combinations

### Phase 10 — Interview Preparation (~18–22 hrs · Advanced)
- **Module 18:** Two Pointers, Sliding Window, Intervals, Top-K, Binary Search Patterns
- **Module 19:** Top 50 Interview Problems (Arrays, Trees, Graphs, DP)
- **Module 20:** Complexity Cheat Sheet & Final Roadmap

---

## How to Use

1. **Follow phases in order.** Each phase builds on the last.
2. **Read every diagram.** ASCII art diagrams show how memory and algorithms work step by step.
3. **Type the code yourself.** Create a `.cs` file and run every example.
4. **Attempt practice problems blind.** Try each problem before clicking "Reveal Solution".

---

## Repository Structure

```
study/
├── index.html                  ← Course master index (start here)
├── real_world_challenges.html  ← 20 real-world algorithm applications
├── styles.css                  ← Shared stylesheet (dark/light themes)
├── dsa.js                      ← Shared JavaScript (theme, copy, progress)
├── phase1/  – phase10/         ← Module HTML files per phase
Staticfile                      ← Wasmer static site config
```

---

## Deployment

Deployed automatically to [Wasmer Edge](https://wasmer.io) on every push to `main` via the Wasmer GitHub integration. Configuration is driven by `Staticfile`.
