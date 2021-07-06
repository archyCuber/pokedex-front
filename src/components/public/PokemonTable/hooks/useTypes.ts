import { useEffect, useState } from "react";
import InfoOfPokemonsHelper from "../../../../helpers/InfoOfPokemonsHelper";

export const useTypes = () => {
  const [types, setTypes] = useState<string[]>([]);

  const fetch = async () => {
    const res = await InfoOfPokemonsHelper.fetchTypes();
    if (res) {
      setTypes(res);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return types;
};
