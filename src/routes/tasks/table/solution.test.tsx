import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Table, type TTableColumn, type TTableDataSource } from './solution'

type Row = { id: string; name: string; age: number }

const rows: Row[] = [
  { id: '1', name: 'Alice', age: 30 },
  { id: '2', name: 'Bob', age: 22 },
]

const datasource: TTableDataSource<Row> = {
  pageSize: 10,
  pages: 1,
  next: async () => rows,
}

const columns: TTableColumn<Row>[] = [
  { id: 'name', name: 'Name', renderer: (r) => r.name },
  { id: 'age', name: 'Age', renderer: (r) => String(r.age) },
]

describe('Table', () => {
  it('renders the column headers', () => {
    const html = renderToString(<Table columns={columns} datasource={datasource} />)
    expect(html).toContain('Name')
    expect(html).toContain('Age')
  })

  it('renders a data-column-id on every header for event delegation', () => {
    const html = renderToString(<Table columns={columns} datasource={datasource} />)
    expect(html).toContain('data-column-id="name"')
    expect(html).toContain('data-column-id="age"')
  })

  it('renders pagination controls', () => {
    const html = renderToString(<Table columns={columns} datasource={datasource} />)
    expect(html).toContain('Prev')
    expect(html).toContain('Next')
    expect(html).toMatch(/1[^0-9]+\/[^0-9]+1/)
  })

  it('renders a search input', () => {
    const html = renderToString(<Table columns={columns} datasource={datasource} />)
    expect(html).toContain('type="search"')
  })
})
