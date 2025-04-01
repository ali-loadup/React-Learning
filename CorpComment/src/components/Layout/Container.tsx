import FeedbackList from "../Feedback/FeedbackList";
import Header from "./Header";

export default function Container() {
  return (
    <main className="container">
      <Header ></Header>
      <FeedbackList></FeedbackList>
    </main>
  );
}
