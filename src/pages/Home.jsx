import { useState, useEffect } from 'react'
import '../styles/Home.css'
import '../styles/footer.css'


function Home() {
    return (
        <>
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
