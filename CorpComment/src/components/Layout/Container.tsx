import FeedbackList from "../Feedback/FeedbackList";
import Header from "./Header";

export default function Container({
  feedbacks,
  loading,
  handleAddFeedback,
  selectedCompany,
}) {
  return (
    <main className="container">
      <Header handleAddFeedback={handleAddFeedback}></Header>
      <FeedbackList feedbacks={feedbacks} loading={loading} ></FeedbackList>
    </main> 
  );
}
