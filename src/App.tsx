import { MainContainer } from "./components/MainContainer/mainContainer";
import { Header } from "./components/Header/header";
import { Footer } from "./components/Footer/footer";
import "./styles/global.css";

function App() {
  return (
    <div className="app-container">
      <Header title="My Portfolio" />
      <MainContainer/>
      <Footer />
    </div>
  );
}

export default App;
