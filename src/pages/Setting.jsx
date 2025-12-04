import { useNavigate } from 'react-router-dom'
import '../styles/footer.css'
import '../styles/Setting.css'




function Setting() {
    const navigate = useNavigate()

    const handleCarClick = () => {
        navigate('/water-level')
    }

    const handleBellClick = () => {
        navigate('/water-level-notification')
    }

    const handleSettingClick = () => {
        navigate('/')
    }

    return (
        <>
            <h1 className="Page-Title">
                <span className="highlight-blue">설정</span>
            </h1>

            <footer className="footer-container">
            <img className="Car-Off" src="/Car-Off.svg" onClick={handleCarClick} />
                <img className="Bell-Off" src="/Bell-Off.svg" onClick={handleBellClick} />
                <img className="Setting-On" src="/Setting-On.svg" onClick={handleSettingClick}/>
            </footer>
        </>
    )
}

export default Setting
