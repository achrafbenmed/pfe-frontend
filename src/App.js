import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import Navigateur from "./Navigateur";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Navigateur />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
