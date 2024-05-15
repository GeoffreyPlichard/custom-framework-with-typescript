import { NotFoundComponent } from "../components/errors/NotFoundComponent";
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

  getComponent() {
    const pathName = window.location.pathname;

    for (let route of this.routes) {
      if (pathName === route.path) {
        return new route.component();
      }
    }
    
    return new NotFoundComponent();
  }
}