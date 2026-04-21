// biome-ignore lint/complexity/noBannedTypes: problem signature uses Function
export function myExtends(SuperType: Function, SubType: Function): Function {
  function MyType(this: any, ...args: any[]) {
    SuperType.apply(this, args)
    SubType.apply(this, args)
  }

  Object.setPrototypeOf(SubType.prototype, SuperType.prototype)

  MyType.prototype = Object.create(SubType.prototype)
  MyType.prototype.constructor = MyType

  Object.setPrototypeOf(MyType, SuperType)

  return MyType
}
