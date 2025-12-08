import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/WaterLevelNotification.css'
import '../styles/footer.css'

// Mock 모드 설정
const MOCK_MODE = true

function WaterLevelNiotification() {
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState([])

    // 알림 데이터 폴링
    useEffect(() => {
        const fetchNotifications = async () => {
            if (MOCK_MODE) {
                // Mock 모드: localStorage에서 알림 가져오기
                const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
                setNotifications(storedNotifications)
            } else {
                // 실제 API 호출
                try {
                    const response = await fetch('http://localhost:8080/api/notifications')
                    const data = await response.json()
                    setNotifications(data)
                } catch (error) {
                    console.error('알림 데이터를 가져오는데 실패했습니다:', error)
                }
            }
        }

        // 알림 페이지 진입 시 읽음 처리
        localStorage.setItem('lastReadTime', Date.now().toString())

        // 초기 데이터 가져오기
        fetchNotifications()

        // 1초마다 알림 데이터 폴링 (실시간 업데이트)
        const interval = setInterval(fetchNotifications, 1000)
        return () => clearInterval(interval)
    }, [])

    const handleCarClick = () => {
        navigate('/water-level')
    }

    const handleBellClick = () => {
        navigate('/')
    }

    const handleSettingClick = () => {
        navigate('/setting')
    }

    // 알림 타입에 따른 메시지와 아이콘 반환
    const getNotificationInfo = (stage) => {
        switch (stage) {
            case 1:
                return {
                    icon: '⚠️',
                    message: '위험! 물이 감지되었습니다!',
                    color: '#FFA500'
                }
            case 2:
                return {
                    icon: '🚨',
                    message: '위험! 안전벨트를 풀고 탈출을 준비하십시오!',
                    color: '#FF4444'
                }
            case 3:
                return {
                    icon: '🚨🚨',
                    message: '경고! 5초간 물이 감지되어 창문이 자동으로 열립니다!',
                    color: '#CC0000'
                }
            default:
                return {
                    icon: 'ℹ️',
                    message: '알림',
                    color: '#4A90E2'
                }
        }
    }

    // 날짜 포맷팅
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${month}월 ${day}일 ${hours}:${minutes}`
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
                                    <div className="notification-message">
                                        {info.message}
                                    </div>
                                    {notification.status && (
                                        <div className="notification-status">
                                            상태: {notification.status}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            <footer className="footer-container">
                <img className="Car-On" src="/Car-Off.svg" onClick={handleCarClick} />
                <img className="Bell-Off" src="/Bell-On.svg" onClick={handleBellClick}/>
                <img className="Setting-Off" src="/Setting-Off.svg" onClick={handleSettingClick} />
            </footer>
        </>
    )
}

export default WaterLevelNiotification
