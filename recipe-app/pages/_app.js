import "../styles/globals.css";
import { Nav } from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <main>
        <Nav />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
