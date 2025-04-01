import Feedback from "./Feedback";
import Spinner from "../Spinner";
import { useFeedbackItemsContext } from "../../FeedbackItemsContextProvider";

export default function FeedbackList() {
  const { fileteredFeedbacks, loading }  = useFeedbackItemsContext();
  

  return (
    <>
      <ol className="feedback-list">
        {loading === true && <Spinner />}
        {fileteredFeedbacks.map((item) => (
          <Feedback key={item.id} item={item} />
        ))}
      </ol>
    </>
  );
}
