import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { merge, pickBy } from "lodash";
import { useCallback, useMemo } from "react";

import qs from "qs";

const useReflectionSearchParams = (initialValues) => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;

  const isTrue = (a) => a !== "" && a !== null && a !== undefined;

  const searchParams = useMemo(() => {
    const params = {
      ...initialValues,
      ...qs.parse(search.replace("?", "")),
    };

    return {
      ...params,
      ...(params?.filters && { filters: pickBy(params?.filters, isTrue) }),
    };
  }, [search, initialValues]);

  const setSearchParams = useCallback(
    (params) => {
      const newParams = merge(searchParams, params);
      navigate({
        search: createSearchParams(qs.stringify(newParams)).toString(),
      });
    },
    [navigate, searchParams]
  );

  return [searchParams, setSearchParams];
};

export default useReflectionSearchParams;
