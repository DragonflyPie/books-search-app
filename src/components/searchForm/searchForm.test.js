import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SearchForm from "./SearchForm";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("SearchForm", () => {
  it("Inputs render", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByTestId("category")).toBeInTheDocument();
    expect(screen.getByTestId("orderBy")).toBeInTheDocument();
  });

  it("Search validates with existing query", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );

    userEvent.type(screen.getByRole("textbox"), "javascript");
    userEvent.click(screen.getByRole("button"));

    expect(screen.queryByTestId("error")).toBeNull();
  });

  it("Search not validates when query is missing", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );

    userEvent.click(screen.getByRole("button"));

    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("Matches snapshot", () => {
    const form = render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm />
        </Provider>
      </BrowserRouter>
    );
    expect(form).toMatchSnapshot();
  });
});
