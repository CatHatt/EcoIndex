import CameraIcon from './assets/CameraIcon'
import HamburgerMenu from './assets/HamburgerMenu'
import natureBackground from '/nature background.jpg'
import './App.scss'
import { useState } from 'react'

function App() {
    async function openCamera() {
        const vid = document.getElementById('video')! as HTMLVideoElement

        await navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                vid.srcObject = stream
                vid.onloadedmetadata = () => {
                    vid.play()
                }
            })
    }

    const root = document.querySelector(':root') as HTMLHtmlElement

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <div className={`navbar-wrapper ${menuOpen ? 'menu-open' : ''}`}>
                <nav className='navbar'>
                    {[
                        <button
                            className='button'
                            onClick={() => {
                                setMenuOpen(!menuOpen)
                                const navbarRect = (
                                    document.querySelector(
                                        '.navbar'
                                    ) as HTMLElement
                                ).getBoundingClientRect()
                                root.style.setProperty(
                                    '--navbar-width',
                                    navbarRect.width.toString()
                                )
                                root.style.setProperty(
                                    '--navbar-height',
                                    navbarRect.height.toString()
                                )
                            }}
                        >
                            <CameraIcon />
                        </button>,
                        <button className='button'>
                            <HamburgerMenu />
                        </button>,
                    ].map((item, index, array) => [
                        item,
                        index != array.length - 1 && (
                            <div className='spacer'></div>
                        ),
                    ])}
                </nav>
                <div className='navbar-menu'></div>
            </div>
            <div className='hero'>
                <div className='background-wrapper'>
                    <img src={natureBackground} className='background' />
                </div>
                <h1 className='header'>EcoIndex</h1>
            </div>
            <main className='main'></main>
        </>
    )
}

export default App
