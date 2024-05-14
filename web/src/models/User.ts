import { Attributes } from "./Attributes";
import { Model } from "./Model";
import { Eventing} from './Eventing';
import { ApiSync } from './ApiSync';

export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }
  
}
