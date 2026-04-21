type SelectionStatus = 'v' | ' ' | 'o'

const SELECTED: SelectionStatus = 'v'
const NOT_SELECTED: SelectionStatus = ' '
const PARTIAL: SelectionStatus = 'o'

class TreeNode {
  children: TreeNode[] = []
  status: SelectionStatus = NOT_SELECTED

  constructor(
    public name: string,
    public parent: TreeNode | null,
  ) {}

  addChild(node: TreeNode): void {
    node.parent = this
    this.children.push(node)
  }

  getSelectedCount(): number {
    return this.children.reduce((acc, node) => acc + (node.status === SELECTED ? 1 : 0), 0)
  }

  toString(level: number = -1): string {
    const dots = Math.max(0, level)
    const root = level === -1 ? '' : `${'.'.repeat(dots)}[${this.status}]${this.name}\n`
    return root.concat(this.children.map((n) => n.toString(level + 1)).join(''))
  }

  updateStatus(): void {
    const selectedCount = this.getSelectedCount()
    const hasPartialChild = this.children.some((c) => c.status === PARTIAL)

    if (selectedCount === this.children.length && !hasPartialChild) {
      this.status = SELECTED
    } else if (selectedCount === 0 && !hasPartialChild) {
      this.status = NOT_SELECTED
    } else {
      this.status = PARTIAL
    }
  }
}

function createTree(paths: string[]): [TreeNode, Map<string, TreeNode>] {
  const root = new TreeNode('', null)
  const store = new Map<string, TreeNode>()

  for (const path of paths) {
    let parent: TreeNode = root
    const tokens = path.split('/')

    for (const token of tokens) {
      let node = store.get(token)
      if (!node) {
        node = new TreeNode(token, parent)
        parent.addChild(node)
        store.set(token, node)
      }
      parent = node
    }
  }

  return [root, store]
}

function* bubble(target: TreeNode): Generator<TreeNode> {
  if (target.parent != null) {
    yield target.parent
    yield* bubble(target.parent)
  }
}

function* propagate(target: TreeNode | null): Generator<TreeNode> {
  if (target == null) return
  for (const ch of target.children) {
    yield ch
    yield* propagate(ch)
  }
}

export function renderTreeSelect(paths: string[], clicks: string[]): string {
  const [root, store] = createTree(paths)

  for (const click of clicks) {
    const node = store.get(click)
    if (!node) continue

    node.status = node.status !== NOT_SELECTED ? NOT_SELECTED : SELECTED

    for (const next of propagate(node)) {
      next.status = node.status
    }

    for (const next of bubble(node)) {
      next.updateStatus()
    }
  }

  return root.toString()
}
