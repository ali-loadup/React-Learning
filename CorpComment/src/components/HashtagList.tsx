import { useFeedbackItemsContext } from "../FeedbackItemsContextProvider";

export default function HashtagList() {
  const { feedbacks, onHashtagSelected } = useFeedbackItemsContext();

  const newCompaniesList = Array.from(
    new Map(feedbacks.map((feedback) => [feedback.company, feedback])).values()
  );

  return (
    <ul className="hashtags">
      {newCompaniesList.map((feedback, index) => (
        <li key={index}>
          <button onClick={() => onHashtagSelected(feedback.company)}>
            #{feedback.company}
          </button>
        </li>
      ))}
    </ul>
  );
}
