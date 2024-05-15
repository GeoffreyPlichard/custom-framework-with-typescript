import { User } from '../models/User';

export class UserForm {
  constructor(
    public parent: HTMLElement,
    public model: User
  ) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  eventsMap(): { [key: string]: () => void} {
    return {
      'mouseenter:h1': this.onHeaderHover,
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick
    };
  }

  onHeaderHover(): void {
    console.log('h1 was hover')
  }

  // Use arrow function to keep this context
  onSetAgeClick = (): void => {
    console.log('button was clicked');
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input') as HTMLInputElement;

    const name = input.value;

    this.model.set({ name });
  };

  template(): string {
    return `
      <div>
        <h1>User form</h1>
        <div>User name: ${this.model.get('name')}</div>
        <div>User age: ${this.model.get('age')}</div>
        <input />
        <button class="set-name">Change name</button>
        <button class="set-age">Set random age</button>
      </div>
    `;
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