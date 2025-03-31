import { useState } from "react";
import { MaxLengthOfText } from "../../constants";
import { FeedbackType } from "../../types/FeedbackType";

export default function FeedbackForm({ handleAddFeedback }) {
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
