import { Toaster } from 'react-hot-toast'
import './App.css'
import Approuter from './router/Approuter'
function App() {
  return (
    <>
        <div>
          <Approuter/>
          <Toaster position='top-right' reverseOrder={false} />
      </div>
    </>
  )
}
export default App
