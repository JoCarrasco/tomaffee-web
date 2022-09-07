import { useEffect, useState } from "react";
import { DateHelper, TimeCounter } from "../..";

export function useNow(defaultDate?: Date) {
  const counter = new TimeCounter(onRepeatCounter, () => null);
  const [now, setNow] = useState(DateHelper.getNow().asDate);

  useEffect(() => {
    if (!counter.isActive() && defaultDate === undefined) {
      counter.startCounter(1000);
    }
    return () => counter.stopCounter();
  });

  function onRepeatCounter() {
    setNow(DateHelper.getNow().asDate);
  }

  return now;
}
