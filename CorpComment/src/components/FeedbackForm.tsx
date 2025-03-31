import { useState } from "react";
import { MaxLengthOfText } from "../constants";

export default function FeedbackForm() {
  const [text, setText] = useState<string>("");

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
        <button>
          <span>submit</span>
        </button>
      </div>
    </form>
  );
}
