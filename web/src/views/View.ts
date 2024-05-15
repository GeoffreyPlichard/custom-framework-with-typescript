import { User } from "../models/User";

export abstract class View {
  constructor(
    public parent: HTMLElement,
    public model: User
  ) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string]: () => void};
  abstract template(): string;

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

  render(): void {
    // Avoid duplicating the element each time we render
    this.parent.innerHTML = '';

    const templateElement: HTMLTemplateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    const fragment: DocumentFragment = templateElement.content;

    this.bindEvents(fragment);
    this.parent.append(fragment);
  }
}