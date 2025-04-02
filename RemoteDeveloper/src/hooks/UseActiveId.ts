import React, { useEffect } from 'react'

export default function useActiveId() {
  const [activeId, setActiveId] = React.useState<number | null>(null);
  
  useEffect(() => {
      const handleHashChange = () => {
        const id = window.location.hash.slice(1);
        setActiveId(id ? parseInt(id) : null);
      };
  
      window.addEventListener("hashchange", handleHashChange);
  
      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }, []);

    return activeId;
}
