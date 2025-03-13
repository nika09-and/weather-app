import './App.css'
import MainLeft from './components/MainLeft'
import MainRight from './components/MainRight'

function App() {

  return (
    <div id='wholeWrap'>
      <div id='contentWrap'>
        <MainLeft />
        <MainRight />
      </div>
    </div>
  )
}

export default App
