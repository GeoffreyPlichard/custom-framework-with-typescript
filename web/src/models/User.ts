import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
}

export class User {
  // Use composition to add an Eventing reference
  events: Eventing = new Eventing();
  sync: Sync<UserProps> = new Sync<UserProps>('http://localhost:3000/users');

  constructor(private data: UserProps) {}
  
  get(propName: string): (string | number) {
    return this.data[propName];
  }

  set(update: UserProps): void {
    // Override this.data with new data
    Object.assign(this.data, update);
  }
  
}
