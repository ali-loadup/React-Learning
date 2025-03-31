import { useEffect, useState } from "react";
import Container from "./components/Container";
import Footer from "./components/Footer";
import HashtagList from "./components/HashtagList";
import { FeedbackType } from "./types/FeedbackType";

function App() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddFeedback = (feedbackText: string) => {
    const companyName = feedbackText
      .split(" ")
      .find((word: string) => word.includes("#"))!
      .substring(1);

    const newFeedback: FeedbackType = {
      id: new Date().getTime(),
      text: feedbackText,
      upvoteCount: 0,
      badgeLetter: companyName.charAt(0).toUpperCase(),
      company: companyName,
      daysAgo: 0,
    };

    setFeedbacks([...feedbacks, newFeedback]);

    //submit to server
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      }
    );
  };

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
      <div className="app">
        <Footer />

        <Container
          feedbacks={feedbacks}
          loading={loading}
          handleAddFeedback={handleAddFeedback}
        />

        <HashtagList></HashtagList>
      </div>
    </>
  );
}

export default App;
