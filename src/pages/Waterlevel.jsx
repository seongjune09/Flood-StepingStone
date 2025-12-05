import { useNavigate } from 'react-router-dom'
import '../styles/WaterLevel.css'
import '../styles/footer.css'

function WaterLevel() {
    const navigate = useNavigate()

    const handleCarClick = () => {
        navigate('/')
    }

    const handleBellClick = () => {
        navigate('/water-level-notification')
    }

    const handleSettingClick = () => {
        navigate('/setting')
    }

    return (
        <>
            <h1 className="Page-Title">
                <span className="highlight-gray">현재 차 수위</span>
                <span className="highlight-blue"> 시각화</span>
            </h1>

            <div className="water-level-image-container">
                <img src="water-level0.png" className="water-level-image" />
            </div>

            <footer className="footer-container">
                <img className="Car-On" src="/Car-On.svg" onClick={handleCarClick}/>
                <img className="Bell-Off" src="/Bell-Off.svg" onClick={handleBellClick} />
                <img className="Setting-Off" src="/Setting-Off.svg" onClick={handleSettingClick} />
            </footer>
        </>
    )
}

export default WaterLevel
