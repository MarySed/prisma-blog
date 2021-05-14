import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "../styles/styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
