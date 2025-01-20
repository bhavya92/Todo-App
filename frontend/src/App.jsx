import "./App.css";
import MainComponent from "./components/mainComponent";
import { TopicProvider } from "./context/topicsContext";
import "@fontsource/roboto";
import "@fontsource/bungee-shade";
import "@fontsource/comic-neue";
import "@fontsource/rampart-one";

function App() {
  return (
    <>
      <TopicProvider>
        <MainComponent />
      </TopicProvider>
    </>
  );
}

export default App;
