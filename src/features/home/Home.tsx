import { Link } from "react-router-dom";

export default function Home() {
    return (
      <>
        <main>
          <h2>Welcome to the Man-hash games!</h2>
          <p>Enjoy the games. Games are in beta</p>
        </main>
        <nav>
          <Link to="/bottle">Tube filling game</Link>
        </nav>
      </>
    );
  }