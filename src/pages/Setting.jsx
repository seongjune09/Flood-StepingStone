import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import '../styles/Setting.css'

// Mock 모드 설정
const MOCK_MODE = true

function Setting() {
    const [selectedColor, setSelectedColor] = useState('#75A1E7')
    const [buzzerVolume, setBuzzerVolume] = useState(50)

    const lightColors = [
        { name: '파랑', color: '#75A1E7' },
        { name: '빨강', color: '#FF6B6B' },
        { name: '노랑', color: '#FFD93D' },
        { name: '초록', color: '#6BCF7F' },
        
    ]

    // localStorage에서 설정 불러오기
    useEffect(() => {
        const savedColor = localStorage.getItem('lightColor')
        const savedVolume = localStorage.getItem('buzzerVolume')

        if (savedColor) setSelectedColor(savedColor)
        if (savedVolume) setBuzzerVolume(parseInt(savedVolume))
    }, [])

    // 조명 색상 변경
    const handleColorChange = async (color) => {
        setSelectedColor(color)
        localStorage.setItem('lightColor', color)

        if (!MOCK_MODE) {
            try {
                await fetch('http://localhost:8080/api/device/light/color', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ color: color }),
                })
            } catch (error) {
                console.error('조명 색상 변경 실패:', error)
            }
        } else {
            console.log('조명 색상 변경:', color)
        }
    }

    // 부저 볼륨 변경
    const handleVolumeChange = async (volume) => {
        setBuzzerVolume(volume)
        localStorage.setItem('buzzerVolume', volume.toString())

        if (!MOCK_MODE) {
            try {
                await fetch('http://localhost:8080/api/device/buzzer/volume', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ volume: volume }),
                })
            } catch (error) {
                console.error('부저 볼륨 변경 실패:', error)
            }
        } else {
            console.log('부저 볼륨 변경:', volume)
        }
    }

  
    return (
        <>
            <h1 className="Page-Title">
                <span className="highlight-blue">설정</span>
            </h1>

            <div className="setting-container">
                {/* 조명 색상 설정 */}
                <div className="setting-section">
                    <h2 className="setting-section-title">조명 색상 변경</h2>

                    <div className="light-preview">
                        <div
                            className="light-bulb"
                            style={{ backgroundColor: selectedColor }}
                        >
                            <div className="light-glow" style={{ boxShadow: `0 0 60px ${selectedColor}` }}></div>
                        </div>
                        <p className="selected-color-name">
                            현재 선택된 색상: <span style={{ color: selectedColor }}>
                                {lightColors.find(c => c.color === selectedColor)?.name}
                            </span>
                        </p>
                    </div>

                    <div className="color-grid">
                        {lightColors.map((item) => (
                            <div
                                key={item.color}
                                className={`color-option ${selectedColor === item.color ? 'selected' : ''}`}
                                onClick={() => handleColorChange(item.color)}
                            >
                                <div
                                    className="color-circle"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="color-name">{item.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* 커스텀 색상 선택 */}
                    <div className="custom-color-section">
                        <label htmlFor="customColor" className="custom-color-label">
                            원하는 색상 직접 선택:
                        </label>
                        <div className="custom-color-input-wrapper">
                            <input
                                id="customColor"
                                type="color"
                                value={selectedColor}
                                onChange={(e) => handleColorChange(e.target.value)}
                                className="custom-color-input"
                            />
                            <span className="custom-color-code">{selectedColor}</span>
                        </div>
                    </div>
                </div>
                </div>

            <Footer currentPage="setting" />
        </>
    )
}

export default Setting
