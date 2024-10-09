import { useEffect, useState } from "react";
import Quagga from "quagga";

export function useScanner(id: string) {
    const [stream, setStream] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
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
        })()

        if (stream) {
            Quagga.init(
                {
                    locate: false,
                    numOfWorkers: 4,
                    frequency: 10,
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: document.querySelector(id), // Or '#yourElement' (optional)
                        constraints: {
                            width: 300,
                            height: 300,
                        }
                    },
                    decoder: {
                        readers: ["code_128_reader"],
                        debug: {
                            drawBoundingBox: true,
                            showFrequency: true,
                            drawScanline: true,
                            showPattern: true
                        }
                    },
                },
                function (err: Error) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Initialization finished. Ready to start");
                    Quagga.start()

                    Quagga.onDetected((data: any) => {
                        console.log(1)
                        console.log(data)
                    })
                }
            );

        }

    }, [id, stream]);


    // async function getCameraPermission() {
    //     try {
    //         const allowed = await navigator.mediaDevices
    //             .getUserMedia({ video: true })
    //             .then(() => true);
    //         setStream(allowed);
    //     } catch (error) {
    //         console.log(
    //             `The scanner did not respond due to the following error: ${error}`
    //         );
    //         setStream(false);
    //     }
    // }

    // if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    //     setStream(false);
    // }

    // function start() {
    //     Quagga.start()
    // }

    // return start;
}
