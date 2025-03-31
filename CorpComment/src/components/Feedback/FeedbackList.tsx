import Feedback from "./Feedback";
import Spinner from "../Spinner";

export default function FeedbackList({ feedbacks, loading }) {
  return (
    <>
      <ol className="feedback-list">
        {loading === true && <Spinner />}
        {feedbacks.map((item) => (
          <Feedback key={item.id} item={item} />
        ))}
      </ol>
    </>
  );
}
