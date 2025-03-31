export default function HashtagList({
  feedbacks,
  setSelectedCompany,
  selectedCompany,
}) {
  const newCompaniesList = Array.from(
    new Map(feedbacks.map((feedback) => [feedback.company, feedback])).values()
  );

  const onHashtagSelected = (e) => {
    const clickedCompany = e.target.innerText.replace("#", "");
    if (clickedCompany === selectedCompany) {
      setSelectedCompany("");
    } else {
      setSelectedCompany(clickedCompany);
    }
  };

  return (
    <ul className="hashtags">
      {newCompaniesList.map((feedback, index) => (
        <li key={index}>
          <button onClick={onHashtagSelected}>#{feedback.company}</button>
        </li>
      ))}
    </ul>
  );
}
