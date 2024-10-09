import CameraIcon from "./assets/CameraIcon";
import HamburgerMenu from "./assets/HamburgerMenu";
import natureBackground from "/nature background.jpg";
import "./App.scss";

function App() {
    return (
        <>
            <div className="hero">
                <div className="background-wrapper">
                    <img src={natureBackground} className="background" />
                </div>
                <h1 className="header">EcoIndex</h1>
            </div>
            <main className="main">
                <div className="navbar-wrapper">
                    <nav className="navbar">
                        <button className="button">
                            <CameraIcon />
                        </button>
                        <div className="spacer"></div>
                        <button className="button">
                            <HamburgerMenu />
                        </button>
                    </nav>
                </div>
            </main>
        </>
    );
}

export default App;
