# Reddit Thread

## Goal

Build a Reddit-style threaded comment view. Comments can have nested replies, forming a tree. Each comment shows its author, text, and a toggle to expand/collapse its children.

## Requirements

### Core Functionality

1. Render a tree of comments from nested data.
2. Each comment displays **author**, **text**, and **date**.
3. Comments with replies show a **reply count** that toggles children open/closed.
4. Indentation and a left-border line increase with nesting depth.

### Data Structure

```ts
interface IRedditComment {
  id: string
  nickname: string
  text: string
  date: string
  replies: IRedditComment[] // recursive
}
```

### Component Architecture

```
RedditThread({ comments })
  └─ comments.map(comment =>
       RedditComment({ ...comment })
         ├─ author + date + text
         ├─ toggle button (if has replies)
         └─ comment.replies.map(reply =>
              RedditComment({ ...reply })
            )
     )
```

## Walkthrough

### Step 1 — Recursive component

Create a `RedditComment` component that renders a single comment. If `comment.replies` is non-empty, render a list of `RedditComment` children recursively.

### Step 2 — Expand / collapse

Use native `<details>` / `<summary>` — the browser manages expand/collapse state for free, no `useState` needed.

### Step 3 — Visual nesting

Apply `padding-left` and a left border on the replies container so each nesting level is visually distinct.

## Why `<details>` over manual state

Same argument as the Accordion task — the browser handles toggle on click, toggle on Enter/Space, and proper ARIA. Manual React state adds complexity and no benefit here.

## Edge Cases

| Scenario                   | Expected                                 |
| -------------------------- | ---------------------------------------- |
| No replies                 | No toggle shown                          |
| Deeply nested (10+ levels) | Renders correctly with increasing indent |
| Empty comments array       | Renders nothing                          |
| Collapse parent            | All descendants hidden                   |

## Verification

1. Comments render with correct nesting and indentation.
2. Click reply count → children expand/collapse.
3. Collapsing a parent hides all descendants.
