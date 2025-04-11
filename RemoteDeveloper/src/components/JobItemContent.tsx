import { useSelector } from "react-redux";
import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";
import { RootState } from "../state/store";
import { JobExpanded } from "../models/jobExpanded";
import { BASE_API_URL } from "../lib/constant";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "../utils/errorHandler";

export default function JobItemContent() {
  const activeId = useSelector((state: RootState) => state.job.activeJobId);

  const {
    data: jobItem,
    isInitialLoading,
    isError,
  } = useQuery<JobExpanded>({
    queryKey: ["job", activeId],
    queryFn: async () => {
      if (!activeId) {
        return;
      }

      const res = await fetch(`${BASE_API_URL}/${activeId}`);
      if (!res.ok) {
        const errorData = await res.json();
        handleError(errorData);
        throw new Error(errorData.description);
      }
      const data = await res.json();
      return data.jobItem;
    },
    enabled: activeId !== null, // only run if there's an active ID
  });

  if (isInitialLoading) {
    return (
      <section className="job-details">
        <div>
          <Spinner />
        </div>
      </section>
    );
  }

  if (!jobItem || isError) {
    return <EmptyJobContent />;
  }

  return (
    <section className="job-details">
      <div>
        <img src={jobItem.coverImgURL} alt="#" />
        <a className="apply-btn" href={jobItem.companyUrl} target="_blank">
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{jobItem.badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{jobItem.daysAgo}d</time>
              <BookmarkIcon jobId={jobItem.id} />
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{jobItem.title}</h2>
            <p className="job-info__company">{jobItem.company}</p>
            <p className="job-info__description">{jobItem.description}</p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {jobItem.duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {jobItem.salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i>
                {jobItem.location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">
                Other qualifications may apply
              </p>
            </div>
            <ul className="qualifications__list">
              {jobItem.qualifications.map((qualification, index) => (
                <li key={index} className="qualifications__item">
                  {qualification}
                </li>
              ))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">
                Recent things people are saying
              </p>
            </div>
            <ul className="reviews__list">
              {jobItem.reviews.map((review, index) => (
                <li key={index} className="reviews__item">
                  {review}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{" "}
            <span className="u-bold">rmtDev</span>, we would really appreciate
            it!
          </p>
        </footer>
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}
