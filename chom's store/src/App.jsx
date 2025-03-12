import LayoutMain from './components/Layouts/LayoutMain'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <LayoutMain />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
