import { createContext, useContext } from "react";

const CMSContext = createContext({
  cmsContext: {},
});

export const getGlobalContent = () => {
  return useContext(CMSContext).globalContent;
};

export default function CMSProvider({ globalContent, children }) {
  return (
    <CMSContext.Provider value={{ globalContent }}>
      {children}
    </CMSContext.Provider>
  );
}
