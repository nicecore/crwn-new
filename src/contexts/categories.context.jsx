import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../shop-data.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  /* 
  Our firebase getCategoriesAndDocuments method is async, which means it returns a promise which doesn't resolve until the getDocs call is complete.
  You don't want to pass an async callback to useEffect. It's better to
  create a new function inside of useEffect and make that function async and call the function you wanted to call originally. Then call the method right there outside the func definition.
  
  */
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    
    getCategoriesMap();
  }, []);

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
