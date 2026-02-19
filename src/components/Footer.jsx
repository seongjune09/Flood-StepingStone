import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import '../styles/footer.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE === 'true'

function Footer({ currentPage }) {
    const navigate = useNavigate()
    const [unreadCount, setUnreadCount] = useState(0)

    // 🔹 unread 계산 함수 (재사용 가능하도록 분리)
    const checkUnreadNotifications = useCallback(async () => {
        const lastReadLogId = parseInt(localStorage.getItem('lastReadLogId') || '0', 10)

        if (MOCK_MODE) {
            const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')

            const latestLogId = notifications.reduce(
                (max, n) => Math.max(max, n.log_id ?? 0),
                lastReadLogId
            )

            localStorage.setItem('latestLogId', String(latestLogId))

            const unread = notifications.filter(n => (n.log_id ?? 0) > lastReadLogId).length
            setUnreadCount(unread)
            return
        }

        try {
            const response = await fetch(`${API_BASE_URL}/notifications`)
            if (!response.ok) throw new Error('알림 조회 실패')

            const data = await response.json()

            const latestLogId = data.reduce(
                (max, n) => Math.max(max, n.log_id ?? 0),
                lastReadLogId
            )

            localStorage.setItem('latestLogId', String(latestLogId))

            const unread = data.filter(n => (n.log_id ?? 0) > lastReadLogId).length
            setUnreadCount(unread)

        } catch (error) {
            console.error('알림 개수 조회 실패:', error)
        }
    }, [])

    useEffect(() => {
        checkUnreadNotifications()

        const interval = setInterval(checkUnreadNotifications, 2000)

        // 🔹 페이지 돌아올 때 즉시 동기화
        window.addEventListener('focus', checkUnreadNotifications)

        return () => {
            clearInterval(interval)
            window.removeEventListener('focus', checkUnreadNotifications)
        }
    }, [checkUnreadNotifications])

    // 🔴 여기서만 읽음 처리
    const handleBellClick = () => {
        const latestLogId = localStorage.getItem('latestLogId') || '0'
        localStorage.setItem('lastReadLogId', latestLogId)
        setUnreadCount(0)
        navigate('/water-level-notification')
    }

    const handleCarClick = () => {
        navigate(currentPage === 'water-level' ? '/' : '/water-level')
    }

    const handleSettingClick = () => {
        if (currentPage !== 'setting') navigate('/setting')
    }

    const handleHomeClick = () => {
        if (currentPage !== 'home') navigate('/')
    }

    return (
        <footer className="footer-container">
            <img
                className={currentPage === 'water-level' ? 'Car-On' : 'Car-Off'}
                src={currentPage === 'water-level' ? '/Car-On.png' : '/Car-Off.png'}
                alt="Car"
                onClick={handleCarClick}
            />

            <div className="bell-wrapper" onClick={currentPage === 'water-level-notification' ? handleHomeClick : handleBellClick}>
                <img
                    className={currentPage === 'water-level-notification' ? 'Bell-On' : 'Bell-Off'}
                    src={currentPage === 'water-level-notification' ? '/Bell-On.png' : '/Bell-Off.png'}
                    alt="Bell"
                />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>

            <img
                className={currentPage === 'setting' ? 'Setting-On' : 'Setting-Off'}
                src={currentPage === 'setting' ? '/Setting-On.png' : '/Setting-Off.png'}
                alt="Setting"
                onClick={currentPage === 'setting' ? handleHomeClick : handleSettingClick}
            />
        </footer>
    )
}

export default Footer