import TasksComponent from "./component/Tasks/Tasks.component";
import "./App.css";


function App() {
 

  return (
    <div className="App">
      <div className="AppContainer">
        <h1 className="heading">Welcome to Notes App</h1>
        <TasksComponent />
      </div>
    </div>
  );
}

export default App;

