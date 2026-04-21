import { myExtends } from './solution'

type Row = { label: string; value: string; ok: boolean }

function buildRows(): Row[] {
  try {
    function Animal(this: any, name: string) {
      this.name = name
    }
    Animal.prototype.speak = function (this: any) {
      return `${this.name} makes a sound`
    }

    function Dog(this: any) {
      this.breed = 'unknown'
    }
    Dog.prototype.bark = function () {
      return 'Woof!'
    }

    const ExtendedDog = myExtends(Animal, Dog) as any
    const dog = new ExtendedDog('Buddy')

    return [
      { label: 'dog.name', value: String(dog.name), ok: true },
      { label: 'dog.breed', value: String(dog.breed), ok: true },
      { label: 'dog.speak()', value: String(dog.speak()), ok: true },
      { label: 'dog.bark()', value: String(dog.bark()), ok: true },
      { label: 'dog instanceof Dog', value: String(dog instanceof Dog), ok: true },
      { label: 'dog instanceof Animal', value: String(dog instanceof Animal), ok: true },
    ]
  } catch (err) {
    return [{ label: 'error', value: err instanceof Error ? err.message : String(err), ok: false }]
  }
}

const rows = buildRows()

export function Demo() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Expression</th>
            <th className="text-left px-3 py-2 font-medium">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-border">
              <td className="px-3 py-2 font-mono text-xs">{r.label}</td>
              <td
                className={`px-3 py-2 font-mono text-xs ${
                  r.ok ? 'text-foreground' : 'text-destructive'
                }`}
              >
                {r.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
