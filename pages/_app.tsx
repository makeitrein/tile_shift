import { AuthProvider } from "../components/auth/auth-context";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
