import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import Navigateur from "./Navigateur";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigateur />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
