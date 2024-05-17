import { NotFoundComponent } from "../components/errors/not-found.component";
import { HomeComponent } from "../components/home/home.component";
import { UsersComponent } from "../components/users/users.component";

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