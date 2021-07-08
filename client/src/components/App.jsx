import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard.jsx';
import Gallery from './Gallery.jsx';
import Information from './Information.jsx';
import Login from './Login.jsx';

const App = () => {
  const dispatch = useDispatch();

  // temporary token storage
  const [token, setToken] = useState();

  const getBidTable = () => {
    axios.get('/api/homes/1/bids')
      .then((res) => {
        dispatch({
          type: 'SET_BIDS',
          bids: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get('/api/homes/1')
      .then((res) => {
        console.log(res.data);
        getBidTable();
        dispatch({
          type: 'SET_HOME',
          home: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Container>
              <Row>
                <Col>
                  <Gallery />
                </Col>
                <Col>
                  <Information />
                </Col>
              </Row>
            </Container>
          </Route>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>

    </div>
  );
};

export default App;
