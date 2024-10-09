import { useEffect, useState } from "react";
import Quagga from "quagga";

export function useQuagga(id: string) {
    const [stream, setStream] = useState<boolean>(false);

    useEffect(() => {
        if (stream) {
            Quagga.init(
                {
                    inputStream: {
                        name: "Live",
                        type: "LiveStream",
                        target: document.querySelector(id), // Or '#yourElement' (optional)
                    },
                    decoder: {
                        readers: ["code_128_reader"],
                    },
                },
                function (err: Error) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Initialization finished. Ready to start");
                }
            );
        }
    }, [id, stream]);

    getCameraPermission();

    async function getCameraPermission() {
        try {
            const allowed = await navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(() => true);
            return () => setStream(allowed);
        } catch (error) {
            console.log(
                `The scanner did not respond due to the following error: ${error}`
            );
            return () => setStream(false);
        }
    }

    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        setStream(false);
    }

    return stream ? Quagga.start : undefined;
}
