const React = require('react');

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };
    this.handleLanguage = this.handleLanguage.bind(this);
  }

  handleLanguage(el) {
    const language = el.target.textContent;
    this.setState({selectedLanguage: language})
  }

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    const li = languages.map( (item) => {
      return (
        <li 
          style={item === this.state.selectedLanguage ? {color: '#d0021b'} : null}
          key={item} 
          onClick={this.handleLanguage}>
          {item}
        </li>
      )
    })

    return (
      <ul className="languages">
        {li}
      </ul>
    )
  }
}

module.exports = Popular;