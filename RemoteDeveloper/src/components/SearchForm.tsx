import { useDataContext } from "../context/DataContextProvider";

export default function SearchForm() {
  const { getData } = useDataContext();

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
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={(e) => {
          getData(e.target.value);
        }}
      />
    </form>
  );
}
