import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/footer.css'

const MOCK_MODE = true

function Footer({ currentPage }) {
    const navigate = useNavigate()
    const [unreadCount, setUnreadCount] = useState(0)

    // 읽지 않은 알림 개수 계산
    useEffect(() => {
        const checkUnreadNotifications = () => {
            if (MOCK_MODE) {
                const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
                const lastReadTime = parseInt(localStorage.getItem('lastReadTime') || '0')
                const unread = notifications.filter(n => n.log_id > lastReadTime).length
                setUnreadCount(unread)
            }
        }

        checkUnreadNotifications()
        const interval = setInterval(checkUnreadNotifications, 1000)
        return () => clearInterval(interval)
    }, [])

    const handleCarClick = () => {
        if (currentPage === 'water-level') {
            navigate('/')
        } else {
            navigate('/water-level')
        }
    }

    const handleBellClick = () => {
        localStorage.setItem('lastReadTime', Date.now().toString())
        navigate('/water-level-notification')
    }

    const handleSettingClick = () => {
        if (currentPage !== 'setting') {
            navigate('/setting')
        }
    }

    const handleHomeClick = () => {
        if (currentPage !== 'home') {
            navigate('/')
        }
    }

    return (
        <footer className="footer-container">
            <img
                className={currentPage === 'water-level' ? 'Car-On' : 'Car-Off'}
                src={currentPage === 'water-level' ? '/Car-On.svg' : '/Car-Off.svg'}
                onClick={handleCarClick}
            />
            <div className="bell-wrapper">
                <img className="Bell-Off" src="/Bell-Off.svg" onClick={handleBellClick} />
                {unreadCount > 0 && (
                    <div className="notification-badge">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                )}
            </div>
            <img
                className={currentPage === 'setting' ? 'Setting-On' : 'Setting-Off'}
                src={currentPage === 'setting' ? '/Setting-On.svg' : '/Setting-Off.svg'}
                onClick={currentPage === 'setting' ? handleHomeClick : handleSettingClick}
            />
        </footer>
    )
}

export default Footer
