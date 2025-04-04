import { useSearchTextContext } from "../context/searchTextContextProvider";

export default function SearchForm() {
  const context = useSearchTextContext();
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
        value={context.searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={(e) => {
          context.handleChangeSearchText(e.target.value);
        }}
      />
    </form>
  );
}
