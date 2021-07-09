import { Params, RouterStateSnapshot } from "@angular/router";
import { RouterStateSerializer } from "@ngrx/router-store";

export interface RouterStateInterface {
    url: string;
    params: Params;
    queryParams: Params;
}

export class RouterState implements RouterStateSerializer<RouterStateInterface>{
    serialize(routerState: RouterStateSnapshot): RouterStateInterface {
        let route = routerState.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        const {
          url,
          root: { queryParams },
        } = routerState;
        const { params } = route;
        return { url, params, queryParams };
    }
}
