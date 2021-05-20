// export for convenience.
export { ActivatedRoute } from '@angular/router';

/**
 * An ActivateRoute test double with a ActivatedRouteSnapshotStub and `paramMap` observable.
 * Use the `setParam()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {

  snapshot = new  ActivatedRouteSnapshotStub();

}

class ActivatedRouteSnapshotStub {

  /** The mock paramMap observable */
  paramMap = new URLSearchParams();

  setParam(name: string, value: string) {
    this.paramMap.set(name, value);
  }

}