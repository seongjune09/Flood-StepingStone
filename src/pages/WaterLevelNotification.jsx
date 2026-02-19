import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/WaterLevelNotification.css'
import '../styles/footer.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true'

function WaterLevelNiotification() {
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const fetchNotifications = async () => {
            if (MOCK_MODE) {
                const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
                setNotifications(storedNotifications)
                return
            }

            try {
                const response = await fetch(`${API_BASE_URL}/notifications`)
                if (!response.ok) throw new Error('알림 조회 실패')

                const data = await response.json()
                setNotifications(data)

            } catch (error) {
                console.error('알림 데이터를 가져오는데 실패했습니다:', error)
            }
        }

        fetchNotifications()
        const interval = setInterval(fetchNotifications, 1000)
        return () => clearInterval(interval)
    }, [])

    const handleCarClick = () => navigate('/water-level')
    const handleBellClick = () => navigate('/')
    const handleSettingClick = () => navigate('/setting')

    const getNotificationInfo = (stage) => {
        switch (stage) {
            case 1:
                return { icon: '⚠️', message: '경고! 물이 감지되었습니다!', color: '#97e476' }
            case 2:
                return { icon: '🚨', message: '위험! 바퀴까지 물이차올랐습니다. 안전벨트를 풀고 탈출을 준비하십시오!', color: '#ffbd59' }
            case 3:
                return { icon: '🚨', message: '탈출하세요! 5초간 물이 감지되어 창문이 자동으로 열립니다!', color: '#ff5757' }
            default:
                return { icon: '💧❌', message: '현재 물이 감지되지 않았습니다.', color: '#4A90E2' }
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return `${date.getMonth()+1}월 ${date.getDate()}일 ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`
    }

    return (
        <>
            <h1 className="Page-Title">
                <span className="highlight-gray">내 차 </span>
                <span className="highlight-blue">알림</span>
            </h1>

            <div className="notifications-container">
                {notifications.length === 0 ? (
                    <div className="no-notifications">
                        <p>알림이 없습니다</p>
                    </div>
                ) : (
                    <div className="notifications-list">
                        {notifications.map((notification) => {
                            const info = getNotificationInfo(notification.stage)
                            return (
                                <div
                                    key={notification.log_id}
                                    className="notification-item"
                                    style={{ borderLeft: `4px solid ${info.color}` }}
                                >
                                    <div className="notification-header">
                                        <span className="notification-icon">{info.icon}</span>
                                        <span className="notification-time">
                                            {formatDate(notification.created_at)}
                                        </span>
                                    </div>
                                    <div
                                        className="notification-message"
                                        style={{ color: info.color }}
                                    >
                                        {info.message}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* ✅ PNG로 수정 */}
            <footer className="footer-container">
                <img
                    className="Car-On"
                    src="/Car-Off.png"
                    alt="Car"
                    onClick={handleCarClick}
                />
                <img
                    className="Bell-Off"
                    src="/Bell-On.png"
                    alt="Bell"
                    onClick={handleBellClick}
                />
                <img
                    className="Setting-Off"
                    src="/Setting-Off.png"
                    alt="Setting"
                    onClick={handleSettingClick}
                />
            </footer>
        </>
    )
}

export default WaterLevelNiotification