import DataContextProvider from "../context/DataContextProvider";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  return (
    <>
      <DataContextProvider>
        <Background />

        <Header />

        <Container />

        <Footer />
      </DataContextProvider>
    </>
  );
}

export default App;
