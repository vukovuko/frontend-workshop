export type TAccordionItem = {
  id: string
  title: string
  content: string
}

export function Accordion({ items }: { items: TAccordionItem[] }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {items.map((item) => (
        <details
          key={item.id}
          className="accordion-item group rounded-md border border-border bg-card overflow-hidden"
        >
          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none list-none hover:bg-muted transition-colors [&::-webkit-details-marker]:hidden">
            <span className="font-medium">{item.title}</span>
            <span className="text-muted-foreground text-xl leading-none inline-block transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="px-4 py-3 text-sm text-muted-foreground border-t border-border m-0">
            {item.content}
          </p>
        </details>
      ))}
    </div>
  )
}
