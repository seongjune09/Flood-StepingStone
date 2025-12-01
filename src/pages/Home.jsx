import { useState } from 'react'
import '../styles/Home.css'
import '../styles/footer.css'
import '../styles/modal.css'


function Home() {
    const [showModal, setShowModal] = useState(true)

    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowModal(false)}>
                            ×
                        </button>
                        <h2>
                            <span className="modal-title-flood">홍수</span>
                            <span className="modal-title-stone">디딤이란?</span>
                        </h2>
                        <div className="modal-description">
                            <p>홍수디딤이는 홍수 상황에서 안전하게 대피할 수 있도록 도와주는 서비스입니다.</p>
                            <p>실시간 홍수 정보를 확인하고, 안전한 대피로를 안내받을 수 있습니다.</p>
                            <ul>
                                <li>실시간 홍수 알림</li>
                                <li>안전한 대피로 안내</li>
                                <li>긴급 상황 대처 방법</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="Main-Title">
                <span>홍수</span>
                <span>디딤이</span>
            </div>

            <footer className = "footer-container">
                <img className="Car-Off" src="/Car-Off.svg" />
                <img className="Bell-Off" src="/Bell-Off.svg" />
                <img className="Setting-Off" src="/Setting-Off.svg" />
            </footer>
        </>
    )
}
export default Home
