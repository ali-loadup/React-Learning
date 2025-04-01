import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackTypeProp } from "../../types/FeedbackTypeProp";
import { useState } from "react";

export default function Feedback({ item }: FeedbackTypeProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [upVoteCount, setUpVoteCount] = useState(item.upvoteCount);

  return (
    <li
      className={`feedback ${isOpen === true && "feedback--expand"}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button
        onClick={(e) => {
          setUpVoteCount(upVoteCount + 1);
          e.stopPropagation();
          e.currentTarget.disabled = true;
        }}
      >
        <TriangleUpIcon />
        <span>{upVoteCount}</span>
      </button>

      <div>
        <p>{item.badgeLetter}</p>
      </div>

      <div>
        <p>{item.company}</p>
        <p>{item.text}</p>
      </div>

      <p>{item.daysAgo}d</p>
    </li>
  );
}
