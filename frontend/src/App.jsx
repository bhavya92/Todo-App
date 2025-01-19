import './App.css'
import MainComponent from './components/mainComponent'
import { TopicProvider } from './context/topicsContext'
function App() {

  return (
    <>
    <TopicProvider>
      <MainComponent/>
    </TopicProvider>
    </>
  )
}

export default App
