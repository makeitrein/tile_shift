import { RecoilRoot } from "recoil";
import { AuthProvider } from "../components/auth/auth-context";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
