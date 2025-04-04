import { createContext, useContext } from "react";
import { ReactNode } from "react";
import useActiveId from "../hooks/UseActiveId";

type ActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}

export function useAvtiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useAvtiveIdContext must be used within a AvtiveIdContextProvider"
    );
  }
  return context;
}
