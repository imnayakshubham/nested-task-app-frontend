
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Login } from './components/Login/Login';
import { Signup } from './components/Signup/Signup';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { TaskApp } from './components/TaskApp/TaskApp';
import { Header } from './components/Header/Header';


export type Task = {
  task_id: string;
  task: string;
  sub_task: Task[];
}

function App() {
  return (
    <div className="App">
      <Header />

      <div className='main__app__container'>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='/dashboard' element={
              <div className="app__container">
                <TaskApp />
              </div>
            } />
          </Route>

          <Route path="*" element={
            <PageNotFound />
          } />
        </Routes>
      </div>

    </div >
  );
}

export default App;
