import "./App.css";
import MainComponent from "./components/mainComponent";
import { TopicProvider } from "./context/topicsContext";
import "@fontsource/roboto";
import "@fontsource/bungee-shade";
import "@fontsource/comic-neue";
import "@fontsource/rampart-one";
import "@fontsource/cherry-cream-soda";
import { AuthProvider } from "./context/authcontext";
import { LoadingProvider } from "./context/loadingContext";

function App() {
  return (
    <>
      <AuthProvider>
        <LoadingProvider>
          <MainComponent />
        </LoadingProvider>
      </AuthProvider>
    </>
  );
}

export default App;
