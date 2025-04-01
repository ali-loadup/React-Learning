import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FeedbackType } from "./types/FeedbackType";

export type TFeedbackContext = {
  feedbacks: FeedbackType[];
  loading: boolean;
  fileteredFeedbacks: FeedbackType[];
  handleAddFeedback: (feedbackText: string) => void;
  onHashtagSelected: (company: string) => void;
};

type FeedbackContextProviderProps = {
  children: React.ReactNode;
};

export const FeedbackItemsContext = createContext<TFeedbackContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackContextProviderProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const fileteredFeedbacks = useMemo(() => {

    return selectedCompany !== ""
      ? feedbacks.filter((feedback) => feedback.company === selectedCompany)
      : feedbacks;
  }, [feedbacks, selectedCompany]);

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

  const onHashtagSelected = (company: string) => {
    // const clickedCompany = e.target.innerText.replace("#", "");
    if (company === selectedCompany) {
      setSelectedCompany("");
    } else {
      setSelectedCompany(company);
    }
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
    <FeedbackItemsContext.Provider
      value={{
        feedbacks,
        loading,
        handleAddFeedback,
        fileteredFeedbacks,
        onHashtagSelected,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error("FeedbackContext is not provided");
  }
  return context;
}
