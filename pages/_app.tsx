import "@blueprintjs/select/lib/css/blueprint-select.css";
import { AuthProvider } from "../components/auth/auth-context";
import "../styles/globals.scss";

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
