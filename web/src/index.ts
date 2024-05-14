import { User } from "./models/User";

const user = new User({});

user.set({
  name: 'John',
});

console.log(user.get('name'));
console.log(user.get('age'));

user.on('change', () => {
  console.log('Hi there !');
});

user.on('change', () => {
  console.log('Hi again !');
});

user.on('save', () => {
  console.log('Save was triggered !');
});

user.trigger('fessave');

// npm install json-server@0
// "start:parcel": "npx parcel index.html"