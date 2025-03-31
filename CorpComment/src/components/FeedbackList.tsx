import { useEffect, useState } from "react";
import { FeedbackType } from "../types/FeedbackType";
import Feedback from "./Feedback";
import Spinner from "./Spinner";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     setLoading(true);
  //     fetch(
  //       "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
  //     )
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error("Network response was not ok" + res.statusText);
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         setFeedbacks(data.feedbacks);
  //       })
  //       .finally(() => setLoading(false));
  //   }, []);

  useEffect(() => {
    setLoading(true);
    const fetchFeedbacksItems = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!res.ok) {
          throw new Error("Network response was not ok" + res.statusText);
        }

        const data = await res.json();
        setFeedbacks(data.feedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacksItems();
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
