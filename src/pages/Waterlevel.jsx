import { useState, useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import '../styles/WaterLevel.css'

// Mock 모드 설정 (백엔드 준비되면 false로 변경)
const MOCK_MODE = true

function WaterLevel() {
    const [sensor1Active, setSensor1Active] = useState(false)
    const [sensor2Active, setSensor2Active] = useState(false)
    const [bothSensorsStartTime, setBothSensorsStartTime] = useState(null)
    const bothSensorsTimeoutRef = useRef(null)

    // 새로고침 시에만 알림 초기화
    useEffect(() => {
        if (MOCK_MODE) {
            // performance.navigation.type으로 새로고침 감지
            // 또는 performance.getEntriesByType('navigation')[0].type 사용
            const navEntries = performance.getEntriesByType('navigation')
            const isReload = navEntries.length > 0 && navEntries[0].type === 'reload'

            if (isReload) {
                // 새로고침인 경우에만 초기화
                localStorage.removeItem('notifications')
                localStorage.removeItem('lastReadTime')
            }
        }
    }, [])

    // 센서 데이터 폴링
    useEffect(() => {
        const fetchSensorData = async () => {
            if (MOCK_MODE) {
                // Mock 모드: 여기서는 수동으로 센서 상태를 변경하므로 아무것도 하지 않음
                return
            }

            try {
                // 센서 1 데이터 가져오기
                const response1 = await fetch('http://localhost:8080/api/logs/latest?sensor_id=1')
                const data1 = await response1.json()

                // 센서 2 데이터 가져오기
                const response2 = await fetch('http://localhost:8080/api/logs/latest?sensor_id=2')
                const data2 = await response2.json()

                // 센서 1: value가 1이면 물 감지
                const isSensor1Detected = data1.value === 1
                // 센서 2: value가 1이면 물 감지
                const isSensor2Detected = data2.value === 1

                setSensor1Active(isSensor1Detected)
                setSensor2Active(isSensor2Detected)

            } catch (error) {
                console.error('센서 데이터를 가져오는데 실패했습니다:', error)
            }
        }

        // 초기 데이터 가져오기
        fetchSensorData()

        // 2초마다 센서 데이터 폴링
        const interval = setInterval(fetchSensorData, 2000)

        return () => clearInterval(interval)
    }, [])

    // 센서 상태에 따른 알림 생성
    useEffect(() => {
        const createNotification = async (stage) => {
            if (MOCK_MODE) {
                // Mock 모드: localStorage에 알림 저장
                const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
                const newNotification = {
                    log_id: Date.now(),
                    stage: stage,
                    status: stage === 3 ? 'critical' : 'warning',
                    created_at: new Date().toISOString()
                }
                notifications.unshift(newNotification) // 최신 알림을 맨 위에
                localStorage.setItem('notifications', JSON.stringify(notifications))
                console.log('알림 생성:', newNotification)
            } else {
                // 실제 API 호출
                try {
                    await fetch('http://localhost:8080/api/notifications', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            sensor_id: stage === 1 ? 1 : 2,
                            value: 1,
                            recorded_at: new Date().toISOString(),
                        }),
                    })
                } catch (error) {
                    console.error('알림 생성 실패:', error)
                }
            }
        }

        // 센서 1만 감지된 경우
        if (sensor1Active && !sensor2Active) {
            createNotification(1)
        }

        // 센서 2가 감지된 경우
        if (sensor2Active) {
            createNotification(2)
        }

        // 두 센서 모두 감지된 경우 - 5초 타이머 시작
        if (sensor1Active && sensor2Active) {
            if (!bothSensorsStartTime) {
                setBothSensorsStartTime(Date.now())

                // 5초 후 창문 열기 알림
                bothSensorsTimeoutRef.current = setTimeout(async () => {
                    await createNotification(3)
                    // TODO: 여기에 창문 열기 API 호출 추가
                    // await fetch('http://localhost:8080/api/window/open', { method: 'POST' })
                }, 5000)
            }
        } else {
            // 센서 중 하나라도 비활성화되면 타이머 초기화
            if (bothSensorsTimeoutRef.current) {
                clearTimeout(bothSensorsTimeoutRef.current)
                bothSensorsTimeoutRef.current = null
            }
            setBothSensorsStartTime(null)
        }

        return () => {
            if (bothSensorsTimeoutRef.current) {
                clearTimeout(bothSensorsTimeoutRef.current)
            }
        }
    }, [sensor1Active, sensor2Active, bothSensorsStartTime])


    return (
        <>
            <h1 className="Page-Title">
                <span className="highlight-gray">현재 내 차 </span>
                <span className="highlight-blue"> 수위</span>
            </h1>

            <div className="water-level-image-container">
                <img src="water-level0.png" className="water-level-image" />
            </div>

            {/* 센서 상태 표시 */}
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                <p>센서 1: {sensor1Active ? '🟢 감지됨' : '🔵 정상'}</p>
                <p>센서 2: {sensor2Active ? '🟢 감지됨' : '🔵 정상'}</p>
            </div>

            {/* Mock 모드 테스트 버튼 */}
            {MOCK_MODE && (
                <div style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    padding: '0 20px'
                }}>
                    <button
                        onClick={() => setSensor1Active(!sensor1Active)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: sensor1Active ? '#FF4444' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        센서 1 {sensor1Active ? 'OFF' : 'ON'}
                    </button>
                    <button
                        onClick={() => setSensor2Active(!sensor2Active)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: sensor2Active ? '#FF4444' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        센서 2 {sensor2Active ? 'OFF' : 'ON'}
                    </button>
                    <button
                        onClick={() => {
                            setSensor1Active(false)
                            setSensor2Active(false)
                        }}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#808080',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        모두 OFF
                    </button>
                </div>
            )}

            <Footer currentPage="water-level" />
        </>
    )
}

export default WaterLevel
