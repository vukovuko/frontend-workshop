import { useMemo } from 'react'
import { Table, type TTableColumn, type TTableDataSource } from './solution'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  joined: string
}

const SAMPLE: User[] = Array.from({ length: 47 }, (_, i) => ({
  id: String(i + 1),
  name: [
    'Ava Hart',
    'Noah Lee',
    'Mia Patel',
    'Liam Fox',
    'Zoe Ng',
    'Ethan Cole',
    'Lily Park',
    'Owen Tran',
    'Chloe Kim',
    'Aaron Reed',
  ][i % 10]!,
  email: `user${i + 1}@example.com`,
  role: (['admin', 'editor', 'viewer'] as const)[i % 3]!,
  joined: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

const PAGE_SIZE = 10

function search(query: string, data: User[]): User[] {
  const q = query.toLowerCase()
  return data.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
}

function comparator(columnId: keyof User, direction: 'asc' | 'desc') {
  return (a: User, b: User) => {
    const av = a[columnId]
    const bv = b[columnId]
    if (av === bv) return 0
    const cmp = av < bv ? -1 : 1
    return direction === 'asc' ? cmp : -cmp
  }
}

export function Demo() {
  const datasource = useMemo<TTableDataSource<User>>(
    () => ({
      pageSize: PAGE_SIZE,
      pages: Math.ceil(SAMPLE.length / PAGE_SIZE),
      next: async (page, pageSize) => {
        await new Promise((r) => setTimeout(r, 150))
        return SAMPLE.slice(page * pageSize, (page + 1) * pageSize)
      },
    }),
    [],
  )

  const columns: TTableColumn<User>[] = [
    { id: 'name', name: 'Name', renderer: (u) => u.name },
    { id: 'email', name: 'Email', renderer: (u) => u.email },
    { id: 'role', name: 'Role', renderer: (u) => u.role },
    { id: 'joined', name: 'Joined', renderer: (u) => u.joined },
  ]

  return (
    <Table<User>
      columns={columns}
      datasource={datasource}
      search={search}
      comparator={comparator}
    />
  )
}
