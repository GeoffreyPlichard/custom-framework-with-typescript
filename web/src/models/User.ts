import axios, { AxiosResponse } from "axios";

interface UserProps {
  id?: string;
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}
  
  get(propName: string): (string | number) {
    return this.data[propName];
  }

  set(update: UserProps): void {
    // Override this.data with new data
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    // Get the corresponding event callback array
    const handlers = this.events[eventName] || [];

    // Add new callback to the array
    handlers.push(callback);

    // Register our new callback function in the events array
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }
}
