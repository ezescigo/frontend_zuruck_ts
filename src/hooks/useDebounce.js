import React, { useCallback, useState } from "react";
import _ from "lodash";

const useDebounce = (obj = null, wait = 1000) => {
  const [state, setState] = useState(obj);

  const setDebouncedState = (_val) => {
    debounce(_val);
  };

  const debounce = useCallback(
    _.debounce((_prop) => {
      console.log("updating search");
      setState(_prop);
    }, wait),
    []
  );

  return [state, setDebouncedState];
};

export default useDebounce;