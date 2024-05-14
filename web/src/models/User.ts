import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

interface UserProps {
  id?: string;
  name?: string;
  age?: number;
}

export class User {
  // Use composition to add an Eventing reference
  events: Eventing = new Eventing();

  constructor(private data: UserProps) {}
  
  get(propName: string): (string | number) {
    return this.data[propName];
  }

  set(update: UserProps): void {
    // Override this.data with new data
    Object.assign(this.data, update);
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');

    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}
