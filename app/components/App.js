const React = require('react');
const Popular = require('./Popular.js');

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Popular/>
      </div>
    )
  }
}

module.exports = App;