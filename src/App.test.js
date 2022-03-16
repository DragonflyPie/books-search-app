// import React from "react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
// import { BrowserRouter } from "react-router-dom";
// import { screen, render, getByTestId } from "@testing-library/react";
// import App from "./App";
// import userEvent from "@testing-library/user-event";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";

// let data = {
//   totalItems: 517,
//   items: [
//     {
//       id: "Ef4-EAAAQBAJ",
//       volumeInfo: {
//         title: "JavaScript для глубокого обучения: TensorFlow.js",
//         authors: ["Шолле Франсуа", "Нильсон Эрик", "Байлесчи Стэн"],
//         publishedDate: "2021-06-01",
//         description:
//           "Пора научиться использовать TensorFlow.js для построения моделей глубокого обучения, работающих непосредственно в браузере! Умные веб-приложения захватили мир, а реализовать их в браузере или серверной части позволяет TensorFlow.js. Данная библиотека блестяще портируется, ее модели работают везде, где работает JavaScript. Специалисты из Google Brain создали книгу, которая поможет решать реальные прикладные задачи. Вы не будете скучать над теорией, а сразу освоите базу глубокого обучения и познакомитесь с продвинутыми концепциями ИИ на примерах анализа текста, обработки речи, распознавания образов и самообучающегося игрового искусственного интеллекта.",
//         categories: ["Computers"],
//         imageLinks: {
//           smallThumbnail:
//             "http://books.google.com/books/content?id=Ef4-EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//           thumbnail:
//             "http://books.google.com/books/content?id=Ef4-EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
//         },
//       },
//     },
//   ],
// };

// export const handlers = [
//   rest.get(/\volumes/, (req, res, context) => {
//     return res(context.json(data), context.delay(150));
//   }),
// ];

// const server = setupServer(...handlers);

// beforeAll(() => server.listen());

// afterEach(() => server.resetHandlers());

// afterAll(() => server.close());

// describe("App", () => {
//   it("Fetches and recieves data", async () => {
//     render(
//       <BrowserRouter>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </BrowserRouter>
//     );

//     expect(screen.getByTestId("searchInput")).toBeInTheDocument();

//     userEvent.type(screen.getByTestId("searchInput"), "testtext");
//     userEvent.click(screen.getByRole("button"));

//     expect(await screen.findByText(/глубокого/i)).toBeInTheDocument();
//   });
// });

// // userEvent.type(screen, getByTestId("searchInput"), "test");
// // userEvent.click(screen, getByRole("button"));

// // expect(await screen.findByText(/глубокого/i)).toBeInTheDocument();
