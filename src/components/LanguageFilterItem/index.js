// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {item, activeFilterLanguageId, updateActiveFilterLanguage} = props
  const {id, language} = item
  const itemClass = activeFilterLanguageId === id ? 'selected-item' : ''
  const onClickItem = () => {
    updateActiveFilterLanguage(id)
  }

  return (
    <li className="header-item" onClick={onClickItem}>
      <button className={`header-button ${itemClass}`} type="button">
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
