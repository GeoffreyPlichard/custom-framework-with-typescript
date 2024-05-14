export class Attributes<T extends object> {
  constructor(private data: T) {} 

  // K can only be one of a key of T
  // If T corresponds to {name: string, age: number, id: number}
  // K can only be name, age or id

  // Need to use arrow function or we will have a context error
  // this.data will be user.data and user is undefined here
  // get<K extends keyof T>(key: K): T[K] {
  //   return this.data[key];
  // }

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  set = (update: T): void => {
    // Override this.data with new data
    Object.assign(this.data, update);
  }
}
