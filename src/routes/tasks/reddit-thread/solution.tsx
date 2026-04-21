export interface IRedditComment {
  id: string
  nickname: string
  text: string
  date: string
  replies: IRedditComment[]
}

export function RedditThread({ comments }: { comments: IRedditComment[] }) {
  return (
    <ul className="list-none p-0 m-0 space-y-2 w-full">
      {comments.map((c) => (
        <li key={c.id}>
          <RedditComment {...c} />
        </li>
      ))}
    </ul>
  )
}

function RedditComment({ nickname, text, date, replies }: IRedditComment) {
  const hasReplies = replies.length > 0

  return (
    <article className="rounded-md border border-border bg-card p-3">
      <header className="flex items-center justify-between text-xs text-muted-foreground mb-1">
        <strong className="text-foreground font-medium">{nickname}</strong>
        <time>{date}</time>
      </header>
      <p className="text-sm m-0">{text}</p>
      {hasReplies && (
        <details className="mt-3 group">
          <summary className="text-xs text-primary cursor-pointer select-none list-none hover:underline [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">
              {`Show ${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`}
            </span>
            <span className="hidden group-open:inline">Hide replies</span>
          </summary>
          <ul className="list-none p-0 m-0 mt-2 space-y-2 pl-4 border-l-2 border-border">
            {replies.map((r) => (
              <li key={r.id}>
                <RedditComment {...r} />
              </li>
            ))}
          </ul>
        </details>
      )}
    </article>
  )
}
