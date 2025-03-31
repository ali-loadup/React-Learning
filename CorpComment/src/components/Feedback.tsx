import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackTypeProp } from "../types/FeedbackTypeProp";

export default function Feedback({ item }: FeedbackTypeProp) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{item.upvoteCount}</span>
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
