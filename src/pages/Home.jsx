import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="py-28">
      <div className="container">
        <Link to="/listening/listening-id/1/1">Listening</Link>
        <Link to="/editor">Editor</Link>
      </div>
    </div>
  );
};

export default Home;
