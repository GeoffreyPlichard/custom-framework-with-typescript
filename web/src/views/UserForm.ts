import { User } from '../models/User';
import { View } from './View';

export class UserForm extends View {

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
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
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

  
}