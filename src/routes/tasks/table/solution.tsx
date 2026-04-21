import {
  type ChangeEvent,
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

export interface TTableDataSource<T> {
  pageSize: number
  pages: number
  next: (page: number, pageSize: number) => Promise<T[]>
}

export type TTableColumn<T> = {
  id: string
  name: string
  renderer: (item: T) => ReactNode
  sort?: 'asc' | 'desc' | 'none'
}

type TableProps<T extends { id: string }> = {
  columns: TTableColumn<T>[]
  datasource: TTableDataSource<T>
  search?: (query: string, data: T[]) => T[]
  comparator?: (columnId: keyof T, direction: 'asc' | 'desc') => (a: T, b: T) => number
}

const nextDir = { none: 'asc', asc: 'desc', desc: 'none' } as const

export function Table<T extends { id: string }>({
  search,
  columns,
  datasource,
  comparator,
}: TableProps<T>) {
  const [query, setQuery] = useState('')
  const [data, setData] = useState<T[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [sort, setSort] = useState<{
    columnId: keyof T
    direction: 'asc' | 'desc' | 'none'
  } | null>(null)

  useEffect(() => {
    setData([])
    setCurrentPage(0)
    datasource.next(0, datasource.pageSize).then(setData)
  }, [datasource])

  const next = () => {
    if (currentPage >= datasource.pages - 1) return
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    if (data.length <= nextPage * datasource.pageSize) {
      datasource.next(nextPage, datasource.pageSize).then((d) => setData((prev) => [...prev, ...d]))
    }
  }

  const prev = () => setCurrentPage((p) => Math.max(p - 1, 0))

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setCurrentPage(0)
  }

  const onSort: MouseEventHandler<HTMLTableSectionElement> = ({ target }) => {
    if (!(target instanceof HTMLElement)) return
    const columnId = target.dataset['columnId']
    if (!columnId) return
    const column = columns.find((c) => c.id === columnId)
    if (!column) return
    setSort((prevSort) => {
      const dir = prevSort?.columnId === columnId ? prevSort.direction : (column.sort ?? 'none')
      return { columnId: columnId as keyof T, direction: nextDir[dir] }
    })
  }

  const slice = useMemo(() => {
    const filtered = query
      ? search
        ? search(query, data)
        : data.filter((item) => item.id.includes(query))
      : data
    const sorted =
      sort && comparator && sort.direction !== 'none'
        ? [...filtered].sort(comparator(sort.columnId, sort.direction))
        : filtered
    const start = currentPage * datasource.pageSize
    return sorted.slice(start, start + datasource.pageSize)
  }, [data, query, search, sort, comparator, currentPage, datasource])

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted" onClickCapture={onSort}>
            <tr>
              {columns.map((c) => {
                const currentSort = sort?.columnId === c.id ? sort.direction : c.sort
                const arrow = currentSort === 'asc' ? ' ↑' : currentSort === 'desc' ? ' ↓' : ''
                return (
                  <th
                    key={c.id}
                    data-column-id={c.id}
                    className="text-left px-3 py-2 font-medium cursor-pointer select-none"
                  >
                    {c.name}
                    {arrow}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {slice.map((item) => (
              <tr key={item.id} className="border-t border-border">
                {columns.map((col) => (
                  <td key={col.id} className="px-3 py-2">
                    {col.renderer(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          disabled={currentPage === 0}
          onClick={prev}
          className="px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        <span className="text-sm text-muted-foreground">
          {currentPage + 1} / {datasource.pages}
        </span>
        <button
          type="button"
          disabled={currentPage === datasource.pages - 1}
          onClick={next}
          className="px-3 py-1.5 text-sm rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
        <input
          type="search"
          placeholder="Filter"
          onChange={onSearch}
          className="ml-auto rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  )
}
