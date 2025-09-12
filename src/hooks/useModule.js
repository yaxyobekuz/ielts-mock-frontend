import { useSelector, useDispatch } from "react-redux";
import {
  setModuleData,
  resetAllModuleData,
} from "../store/features/moduleSlice";

// Custom hook for accessing store and dispatch
const useModule = (module, moduleId) => {
  const dispatch = useDispatch();

  // Get entire state
  const getModuleData = () => {
    return useSelector((state) => {
      const data = state.module[module];
      return data ? data[moduleId] : null;
    });
  };

  // Add module part
  const setModule = (data, id = moduleId, type = module) => {
    dispatch(setModuleData({ type, id, data }));
  };

  // Add module part
  const resetAllModule = () => {
    dispatch(resetAllModuleData());
  };

  return { dispatch, setModule, getModuleData, resetAllModule };
};

export default useModule;
