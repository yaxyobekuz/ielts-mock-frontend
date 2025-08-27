import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="py-28">
      <div className="container">
        <Link to="/tests/test/testId/module/listening/1/1">listening </Link>
        <Link to="/tests/test/testId/module/reading/1/1">reading </Link>
        <Link to="/tests/test/testId/module/writing/1/1">writing</Link>
      </div>
    </div>
  );
};

export default Home;
