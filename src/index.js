import React, { Component } from 'react';
import Index from './page/index.jsx';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
        <Index />
    )
  }
}
render(<App />, document.getElementById('root'));