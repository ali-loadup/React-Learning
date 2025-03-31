import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";
import FeedbackForm from "../Feedback/FeedbackForm";

export default function Header({ handleAddFeedback }) {
  return (
    <>
      <header>
        <Pattern></Pattern>
        <Logo></Logo>
        <PageHeading></PageHeading>

        <FeedbackForm handleAddFeedback={handleAddFeedback}></FeedbackForm>
      </header>
    </>
  );
}
