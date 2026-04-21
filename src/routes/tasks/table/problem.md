# Table

## Goal

Build a generic paginated data table that supports async data loading, client-side filtering, and column sorting. The `<Table>` is a fully reusable component parameterized by the shape of its row data.

## Requirements

### Core Functionality

1. **Generic**: `Table<T>` where `T extends { id: string }`.
2. **Pagination**: accepts a `datasource` with `pageSize`, total `pages`, and an async `next(page, pageSize)` fetcher.
3. **Columns**: each column defines `id`, `name`, a `renderer(item)` function, and optional initial `sort`.
4. **Sort**: clicking a column header cycles `none → asc → desc → none`. Event-delegated on `<thead>`.
5. **Filter**: search input filters rows client-side; page resets to 0 on query change.
6. **Accumulating data**: already-fetched pages stay in memory so paging back doesn't re-fetch.

### Pipeline order

```
data ──filter──► filtered ──sort──► sorted ──slice(currentPage)──► visible rows
```

Always filter first, then sort, then paginate.

## API

```ts
interface TTableDataSource<T> {
  pageSize: number
  pages: number
  next: (page: number, pageSize: number) => Promise<T[]>
}

type TTableColumn<T> = {
  id: string
  name: string
  renderer: (item: T) => React.ReactNode
  sort?: 'asc' | 'desc' | 'none'
}

type TableProps<T extends { id: string }> = {
  columns: TTableColumn<T>[]
  datasource: TTableDataSource<T>
  search?: (query: string, data: T[]) => T[]
  comparator?: (columnId: keyof T, direction: 'asc' | 'desc') => (a: T, b: T) => number
}
```

## Walkthrough

### Step 1 — Load the first page

On mount (and when `datasource` changes), reset state and fetch page 0.

### Step 2 — Paging

`next()` increments `currentPage` and fetches the new page only if it's not already loaded. Prev just decrements. Buttons disable at bounds.

### Step 3 — Sort (event delegation)

Attach one `onClickCapture` to `<thead>`. Read `data-column-id` from the clicked `<th>`. Cycle the state machine:

```
{ none: 'asc', asc: 'desc', desc: 'none' }
```

### Step 4 — Filter

Controlled input; when query changes, reset `currentPage = 0`. If `search` prop is provided, delegate to it; else fall back to `item.id.includes(query)`.

### Step 5 — Slice pipeline

`useMemo` over `[data, query, sort, currentPage, ...]`:

1. Filter.
2. Sort (only if `direction !== 'none'` and `comparator` provided).
3. Slice by `currentPage * pageSize`.

## Edge Cases

| Scenario                    | Expected                             |
| --------------------------- | ------------------------------------ |
| `datasource` changes        | State resets, page 0 re-fetched      |
| Sort direction is `'none'`  | Rows render in fetched order         |
| Empty result after filter   | Empty `<tbody>` (no rows)            |
| Datasource returns fewer rows than `pageSize` | Still works, Next disables at last page |

## Verification

1. Pick a column header → sort arrow appears, rows reorder.
2. Click again → flips direction.
3. Third click → no arrow, original order.
4. Type in the filter → rows narrow.
5. Next/Prev → pages advance; Next disabled on last page, Prev on first.
