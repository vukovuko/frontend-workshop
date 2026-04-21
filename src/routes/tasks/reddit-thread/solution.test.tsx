import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { type IRedditComment, RedditThread } from './solution'

const mock: IRedditComment[] = [
  {
    id: '1',
    nickname: 'alice',
    text: 'First comment',
    date: '2h ago',
    replies: [
      {
        id: '2',
        nickname: 'bob',
        text: 'Reply to Alice',
        date: '1h ago',
        replies: [
          {
            id: '3',
            nickname: 'carol',
            text: 'Nested reply',
            date: '30m ago',
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    nickname: 'dave',
    text: 'Second top-level',
    date: '3h ago',
    replies: [],
  },
]

describe('RedditThread', () => {
  it('renders every comment nickname', () => {
    const html = renderToString(<RedditThread comments={mock} />)
    expect(html).toContain('alice')
    expect(html).toContain('bob')
    expect(html).toContain('carol')
    expect(html).toContain('dave')
  })

  it('renders every comment text recursively', () => {
    const html = renderToString(<RedditThread comments={mock} />)
    expect(html).toContain('First comment')
    expect(html).toContain('Reply to Alice')
    expect(html).toContain('Nested reply')
    expect(html).toContain('Second top-level')
  })

  it('shows a reply-count summary only when a comment has replies', () => {
    const html = renderToString(<RedditThread comments={mock} />)
    expect(html).toContain('Show 1 reply')
    expect(html.match(/Show \d+ repl/g)?.length ?? 0).toBeGreaterThan(0)
  })

  it('renders nothing for empty comments array', () => {
    const html = renderToString(<RedditThread comments={[]} />)
    expect(html).not.toContain('<article')
  })

  it('pluralizes reply count', () => {
    const withMany: IRedditComment[] = [
      {
        id: '1',
        nickname: 'x',
        text: 'parent',
        date: 'now',
        replies: [
          { id: '2', nickname: 'a', text: 'r1', date: 'now', replies: [] },
          { id: '3', nickname: 'b', text: 'r2', date: 'now', replies: [] },
        ],
      },
    ]
    const html = renderToString(<RedditThread comments={withMany} />)
    expect(html).toContain('Show 2 replies')
  })
})
