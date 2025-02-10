import { MainContainer } from "./components/MainContainer/mainContainer.tsx";
import { Header } from "./components/Header/header.tsx";
import { Footer } from "./components/Footer/footer.tsx";
import "./styles/global.css";

function App() {
  return (
    <div className="app-container">
      <Header title="Noy Benbenishty" />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default App;
