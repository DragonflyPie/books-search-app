import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
});
