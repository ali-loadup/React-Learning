import { useEffect, useState } from "react";
import { FeedbackType } from "../types/FeedbackType";
import Feedback from "./Feedback";
import Spinner from "./Spinner";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok" + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setFeedbacks(data.feedbacks);
      })
      .finally(() => setLoading(false));
  }, []);

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
