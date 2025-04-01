import { useState } from "react";
import { MaxLengthOfText } from "../../constants";
import { useFeedbackItemsContext } from "../../FeedbackItemsContextProvider";

export default function FeedbackForm() {
  const context = useFeedbackItemsContext();
  if (!context) {
    throw new Error("FeedbackContext is not provided");
  }
  const { handleAddFeedback } = context;

  const [text, setText] = useState<string>("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddFeedback(text);
    setText("");
  };

  return (
    <form className="form">
      <textarea
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck={false}
        value={text}
        onChange={(e) => {
          if (e.target.value.length > MaxLengthOfText) {
            return;
          }
          setText(e.target.value);
        }}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Please leave your feedback here.
      </label>
      <div>
        <p className="u-italic">{MaxLengthOfText - text.length}</p>
        <button onClick={onSubmit}>
          <span>submit</span>
        </button>
      </div>
    </form>
  );
}
