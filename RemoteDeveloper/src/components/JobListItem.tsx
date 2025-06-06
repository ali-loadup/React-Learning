import { JobProps } from "../models/job";
import BookmarkIcon from "./BookmarkIcon";

export default function JobListItem({ job, isActive }: JobProps) {
  return (
    <li className={`job-item ${isActive && "job-item--active"}`}>
      <a className="job-item__link" href={`#${job.id.toString()}`}>
        <div className="job-item__badge">{job.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{job.title}</h3>
          <p className="job-item__company">{job.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon jobId={job.id} />
          <time className="job-item__time">{job.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}
