import { useNavigate } from 'react-router-dom'
import '../styles/WaterLevelNotification.css'
import '../styles/footer.css'

function WaterLevelNiotification() {
    const navigate = useNavigate()

    const handleCarClick = () => {
        navigate('/water-level')
    }

    const handleBellClick = () => {
        navigate('/')
    }

    const handleSettingClick = () => {
        navigate('/setting')
    }

    return (
        <>
            <h1 className="Page-Title">
                <span>내 차 </span>
                <span className="highlight-blue">알림</span>
            </h1>

            <footer className="footer-container">
                <img className="Car-On" src="/Car-Off.svg" onClick={handleCarClick} />
                <img className="Bell-Off" src="/Bell-On.svg" onClick={handleBellClick}/>
                <img className="Setting-Off" src="/Setting-Off.svg" onClick={handleSettingClick} />
            </footer>
        </>
    )
}

export default WaterLevelNiotification
