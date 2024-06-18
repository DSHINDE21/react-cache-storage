import DataDisplay from "./components/DataDisplay";
import LogoutButton from "./components/LogoutButton";

const App = () => {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";

  return (
    <div>
      <LogoutButton url={apiUrl} />
      <DataDisplay url={apiUrl} />
    </div>
  );
};

export default App;
