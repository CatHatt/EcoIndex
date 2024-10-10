export const quaggaConfig = {
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
};
