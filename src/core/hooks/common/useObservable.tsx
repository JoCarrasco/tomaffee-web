import { useState, useEffect } from "react"
import { Observable } from "rxjs"

export function useObservable(observable: Observable<any>): any {
  const [value, setValue] = useState([]);

  useEffect(() => {
    const subscription = observable.subscribe((val) => setValue(val))
    return () => subscription.unsubscribe();
  }, [observable])

  return value;
}
