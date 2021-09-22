import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChatRoom from './components/ChatRoom';
import ChatRoomsList from './components/ChatRoomsList';
import { Route, Switch } from 'react-router';
function App() {
  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
