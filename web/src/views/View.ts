import { Model, HasId } from "../models/Model";

export abstract class View<T extends Model<P>, P extends HasId> {
  regions: { [key: string]: HTMLElement } = {};

  constructor(
    public parent: Element,
    public model: T
  ) {
    this.bindModel();
  }

  abstract template(): string;

  // remove abstract and return an empty object so it doesn't 
  // need to be implemented anymore
  regionsMap(): { [key: string]: string} {
    return {};
  }

  // remove abstract and return an empty object so it doesn't 
  // need to be implemented anymore
  eventsMap(): { [key: string]: () => void} {
    return {};
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  // Bind the events to the documents fragment elements
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      // find all the element in fragment that match the selector
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector) as HTMLElement;

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  render(): void {
    // Avoid duplicating the element each time we render
    this.parent.innerHTML = '';

    const templateElement: HTMLTemplateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    const fragment: DocumentFragment = templateElement.content;

    this.bindEvents(fragment);
    this.mapRegions(fragment);


    this.parent.append(fragment);
  }
}