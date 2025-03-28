import Counter from "./Counter";
import Logo from "./Logo";

export default function Header({items}) {
  return (
    <header>
      <Logo />
      <Counter items={items} />
    </header>
  );
}
