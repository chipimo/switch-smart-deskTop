import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import { HashRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Grommet } from "grommet";

import { remote } from "electron";
import Accapp from "./app";
const win = remote.getCurrentWindow();

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

const Main = props => {
  const [Main_Win_View, setMain_Win_View] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      win.setFullScreen(true);
    }, 100);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      <Accapp/>
    </div>
  );
};

render(
  <Provider store={configureStore}>
    <HashRouter>
      <Grommet theme={theme}>
        <SnackbarProvider>
          <Main />
        </SnackbarProvider>
      </Grommet>
    </HashRouter>
  </Provider>,
  document.querySelector("main")
);
