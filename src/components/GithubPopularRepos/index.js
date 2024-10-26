import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStausConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeFilterLanguageId: languageFiltersData[0].id,
    reposList: [],
    apiStatus: apiStausConstants.inProgress,
  }

  componentDidMount() {
    this.getReposList()
  }

  getReposList = async () => {
    this.setState({apiStatus: apiStausConstants.inProgress})
    const {activeFilterLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterLanguageId}`
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const reposData = await response.json()
      console.log(reposData)
      const updatedData = reposData.popular_repos.map(data => ({
        id: data.id,
        name: data.name,
        issuesCount: data.issues_count,
        forksCount: data.forks_count,
        starsCount: data.stars_count,
        avatarUrl: data.avatar_url,
      }))
      this.setState({
        reposList: updatedData,
        apiStatus: apiStausConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStausConstants.failure})
    }
  }

  updateActiveFilterLanguage = selectedId => {
    this.setState({activeFilterLanguageId: selectedId}, this.getReposList)
  }

  renderHeader = () => {
    const {activeFilterLanguageId} = this.state
    return (
      <ul className="header-filter-container">
        {languageFiltersData.map(item => (
          <LanguageFilterItem
            key={item.id}
            item={item}
            activeFilterLanguageId={activeFilterLanguageId}
            updateActiveFilterLanguage={this.updateActiveFilterLanguage}
          />
        ))}
      </ul>
    )
  }

  renderReposList = () => {
    const {reposList} = this.state
    return (
      <ul className="repos-container">
        {reposList.map(repo => (
          <RepositoryItem key={repo.id} repo={repo} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" width={80} height={80} />
    </div>
  )

  renderBottomView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStausConstants.success:
        return this.renderReposList()
      case apiStausConstants.failure:
        return this.renderFailureView()
      case apiStausConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-home-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderHeader()}
        {this.renderBottomView()}
      </div>
    )
  }
}
export default GithubPopularRepos
