import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { searchJobs, setDebouncedSearchText } from "../state/jobSlice";

export default function SearchForm() {
  // const context = useSearchTextContext();

  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 250);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setDebouncedSearchText(debouncedText));
    dispatch(searchJobs(debouncedText));
  }, [debouncedText, dispatch]);

  return (
    <form
      action="#"
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={text}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={(e) => {
          // context.handleChangeSearchText(e.target.value);
          setText(e.target.value);
        }}
      />
    </form>
  );
}
