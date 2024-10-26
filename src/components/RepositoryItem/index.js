// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repo} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repo
  return (
    <li className="repo">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-stats-container">
        <div className="repo-stats">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stats-img"
          />
          <p className="stats-count">{starsCount} stars</p>
        </div>
        <div className="repo-stats">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="stats-img"
          />
          <p className="stats-count">{forksCount} stars</p>
        </div>
        <div className="repo-stats">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="stats-img"
          />
          <p className="stats-count">{issuesCount} stars</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
