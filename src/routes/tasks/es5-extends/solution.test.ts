import { beforeEach, describe, expect, it } from 'vitest'
import { myExtends } from './solution'

describe('myExtends', () => {
  let Animal: any
  let Dog: any

  beforeEach(() => {
    Animal = function (this: any, name: string) {
      this.name = name
    }
    Animal.prototype.speak = function (this: any) {
      return `${this.name} makes a sound`
    }

    Dog = function (this: any) {
      this.breed = 'unknown'
    }
    Dog.prototype.bark = function () {
      return 'Woof!'
    }
  })

  it('applies both constructors to instances', () => {
    const ExtendedDog = myExtends(Animal, Dog) as any
    const dog = new ExtendedDog('Buddy')

    expect(dog.name).toBe('Buddy')
    expect(dog.breed).toBe('unknown')
  })

  it('sets up prototype chain so both method sets are accessible', () => {
    const ExtendedDog = myExtends(Animal, Dog) as any
    const dog = new ExtendedDog('Buddy')

    expect(dog.speak()).toBe('Buddy makes a sound')
    expect(dog.bark()).toBe('Woof!')
  })

  it('instanceof works for both sub and super types', () => {
    const ExtendedDog = myExtends(Animal, Dog) as any
    const dog = new ExtendedDog('Buddy')

    expect(dog instanceof Dog).toBe(true)
    expect(dog instanceof Animal).toBe(true)
  })

  it('static inheritance: ExtendedType.__proto__ === SuperType', () => {
    const ExtendedDog = myExtends(Animal, Dog) as any
    expect(Object.getPrototypeOf(ExtendedDog)).toBe(Animal)
  })
})
