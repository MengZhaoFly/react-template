import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import './css/name';
class App extends React.Component {
	render () {
		return (
			<div>
				hello webpack
			</div>
		)
	}
}

export default hot(module)(App);
// export default App;