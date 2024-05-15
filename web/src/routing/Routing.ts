import { HomeComponent } from "../components/home/HomeComponent";
import { UsersComponent } from "../components/users/UsersComponent";

interface Route {
  path: string;
  component: new () => void;
}

export class Routing {
  private host = 'http://localhost:1234';

  private routes: Route[] = [
    {
      path: '/',
      component: HomeComponent
    },
    {
      path: '/users',
      component: UsersComponent
    }
  ];

  constructor() {}

  getComponent() {
    const pathName = window.location.pathname;

    for (let route of this.routes) {
      if (pathName === route.path) {
        return new route.component();
      }
    }

    const route = this.routes.find(route => route.path === '/');
    if (route) {
      return new route.component();
    } else {
      throw new Error('No route found');
    }
  }
}