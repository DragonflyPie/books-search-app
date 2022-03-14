import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SearchForm from "./SearchForm";
import { store } from "../../redux/store";

describe("SearchForm", () => {
  it("Inputs render", () => {
    render(
      <Provider store={store}>
        <SearchForm />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
