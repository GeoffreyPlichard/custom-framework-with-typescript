import { User } from "./models/User";

const user = new User({ id: '16de', name: 'coucou', age: 43 });


user.on('save', () => {
  console.log(user);
});

user.save();

