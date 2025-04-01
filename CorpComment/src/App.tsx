import Container from "./components/Layout/Container";
import Footer from "./components/Layout/Footer";
import HashtagList from "./components/HashtagList";
import FeedbackItemsContextProvider from "./FeedbackItemsContextProvider";

function App() {
  return (
    <>
      <div className="app">
        <Footer />

        <FeedbackItemsContextProvider>
          <Container />
          <HashtagList></HashtagList>
        </FeedbackItemsContextProvider>
      </div>
    </>
  );
}

export default App;
