import { useSelector, useDispatch } from "react-redux";
import {
  resetDataFromStore,
  updatePropertyFromStore,
} from "../store/features/storeSlice";

// Custom hook for accessing store and dispatch
const useStore = (name = "test") => {
  const dispatch = useDispatch();

  // Get entire state
  const getData = () => {
    return useSelector((state) => state.store[name]);
  };

  // Get entire state
  const resetData = () => {
    dispatch(resetDataFromStore({ name }));
  };

  // Get property
  const getProperty = (property) => {
    return useSelector((state) => state.store[name][property]);
  };

  // Update property
  const updateProperty = (property, value) => {
    dispatch(updatePropertyFromStore({ name, value, property }));
  };

  return {
    getData,
    dispatch,
    resetData,
    getProperty,
    updateProperty,
  };
};

export default useStore;
