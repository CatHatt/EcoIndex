import CameraIcon from "./assets/CameraIcon";
import HamburgerMenu from "./assets/HamburgerMenu";
import natureBackground from "/nature background.jpg";
import "./App.scss";
import { useScanner } from "./hooks/useScanner";
import { useEffect } from "react";
import Quagga from "quagga";

function App() {
    useEffect(() => {
        Quagga.init(
            {
                numOfWorkers: 6,
                locate: true,
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector("#video"), // Or '#yourElement' (optional)
                    constraints: {
                        width: 300,
                        height: 300,
                    },
                },
                frequency: 10,
                decoder: {
                    readers: [
                        "code_128_reader",
                        "ean_reader",
                        "ean_8_reader",
                        "code_39_reader",
                        "code_39_vin_reader",
                        "codabar_reader",
                        "upc_reader",
                        "upc_e_reader",
                        "i2of5_reader",
                        "2of5_reader",
                        "code_93_reader",

                        // {
                        //     format: "ean_reader",
                        //     config: {
                        //         supplements: ["ean_5_reader", "ean_13_reader"],
                        //     },
                        // },
                    ],
                },
                locator: {
                    halfSample: true,
                    patchSize: "x-large",
                },
                debug: true,
            },
            function (err: Error) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Initialization finished. Ready to start");
            }
        );
    }, []);

    Quagga.onDetected((data: unknown) => {
        console.log(1);
        console.log(data);
    });

    // Quagga.onProcessed((data: unknown) => {
    //     console.log(2);
    //     console.log(data);
    // });
    // const activateScanner = useScanner("#video");

    // activateScanner();

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
                                Quagga.start();
                                console.log("started");
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
