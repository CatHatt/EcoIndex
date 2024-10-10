import CameraIcon from "./assets/CameraIcon";
import HamburgerMenu from "./assets/HamburgerMenu";
import natureBackground from "/nature background.jpg";
import "./App.scss";
import { useEffect, useState } from "react";
import Quagga from "quagga";
import { quaggaConfig } from "./quaggaConfig";

function App() {
    const [stream, setStream] = useState<boolean>(false);

    useEffect(() => {
        getPermission();

        async function getPermission() {
            try {
                const allowed = await navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then(() => true);
                setStream(allowed);
            } catch (error) {
                console.log(
                    `The scanner did not respond due to the following error: ${error}`
                );
                setStream(false);
            }
        }
    }, []);

    Quagga.onDetected((data: unknown) => {
        console.log(1);
        console.log(data);
    });

    return (
        <>
            <div className="hero">
                <div className="background-wrapper">
                    <img src={natureBackground} className="background" />
                </div>
                <h1 className="header">EcoIndex</h1>
            </div>
            <main className="main">
                <div
                    id="video"
                    style={{
                        height: "100px",
                        width: "100px",
                        // position: "absolute",
                        // zIndex: "10",
                    }}
                ></div>
                <div className="navbar-wrapper">
                    <nav className="navbar">
                        <button
                            onClick={() => {
                                if (stream) {
                                    Quagga.init(
                                        quaggaConfig,
                                        function (err: Error) {
                                            if (err) {
                                                console.log(err);
                                                return;
                                            }
                                            console.log(
                                                "Initialization finished. Ready to start"
                                            );
                                            Quagga.start();
                                            console.log("started");
                                        }
                                    );
                                }
                            }}
                            className="button"
                        >
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
