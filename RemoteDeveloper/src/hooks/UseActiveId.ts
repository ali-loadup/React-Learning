import { useEffect } from "react";
import { setActiveJobId } from "../state/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { AppDispatch } from "../state/store";

export default function useActiveId() {
  const activeId = useSelector((state: RootState) => state.job.activeJobId);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (window.location.hash && !activeId) {
      dispatch(setActiveJobId(parseInt(window.location.hash.slice(1))));
    }

    const handleHashChange = () => {
      const id = window.location.hash.slice(1);
      dispatch(setActiveJobId(id ? parseInt(id) : null));
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}
