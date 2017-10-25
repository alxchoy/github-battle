const React = require('react');
const PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map(function (item) {
        return (
          <li
            style={item === props.selectedLanguage ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, item)}
            key={item}>
              {item}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map( (repo, index) => {
        return(
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img className='avatar' src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login}/>
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

// Validación de los props para SelectLanguage Component
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}


class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.handleLanguage = this.handleLanguage.bind(this);
  }

  componentDidMount() {
    // En este método del lifecycle podemos hacer llamadas AJAX para cambiar el state del component
    this.handleLanguage(this.state.selectedLanguage);
  }

  handleLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function(repos) {
        this.setState(function() {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.handleLanguage}/>
        {!this.state.repos ? <p>LOADING...</p> : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

module.exports = Popular;