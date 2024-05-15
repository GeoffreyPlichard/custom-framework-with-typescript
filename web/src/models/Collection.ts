import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";

export class Collection<T, J> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    public rootUrl: string,
    public deserialize: (json: J) => T
  ) {}

  // We need to use the getter in this situation (without constructor)
  // or this.events.on will be called before events is instanciated
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl)
      .then((response: AxiosResponse) => {
        response.data.forEach((item: J) => {
          this.models.push(this.deserialize(item));
        });

        this.trigger('change');
      });
  }
}