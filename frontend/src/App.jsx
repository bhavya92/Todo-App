import "./App.css";
import MainComponent from "./components/mainComponent";
import { TopicProvider } from "./context/topicsContext";
import "@fontsource/roboto";
import "@fontsource/bungee-shade";
import "@fontsource/comic-neue";
import "@fontsource/rampart-one";
import '@fontsource/cherry-cream-soda';
import { AuthProvider } from "./context/authcontext";

function App() {

  return (
    <>
    <AuthProvider>
        <MainComponent />
    </AuthProvider>

    </>
  );
}

export default App;
