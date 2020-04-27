export const invScale = (scale, base) => (Math.pow(base, scale) - 1) / (base - 1);

const getBin = (coord, start, range, bins) => Math.floor((coord - start) * bins / range);
const getBinCoords = (bin, start, range, bins) => [start + bin * range / bins, start + (bin + 1) * range / bins];

export const blobify = (pulsars, shownArea, xbins=16, ybins=9, nToBlob=20) => {
    const bins = [];
    for (var i = 0; i < ybins; i++) {
        const row = [];
        for (var j = 0; j < xbins; j++) {
            row.push([]);
        }
        bins.push(row);
    }

    const xStart = shownArea.bottomLeft.x;
    const xRange = shownArea.topRight.x - xStart;
    const yStart = shownArea.bottomLeft.y;
    const yRange = shownArea.topRight.y - yStart;
    pulsars.forEach(p => {
        const xBin = getBin(p.raj, xStart, xRange, xbins);
        const yBin = getBin(p.decj, yStart, yRange, ybins);
        bins[yBin][xBin].push(p);
    });

    return bins.reduce((acc, row, y) => {
        const reducedBins = row.reduce((binAcc, bin, x) => {
            if(bin.length >= nToBlob)
                binAcc.blobs.push({
                    x: getBinCoords(x, xStart, xRange, xbins),
                    n: bin.length,
                });
            else
                binAcc.pulsars.push(...bin);
            return binAcc;
        }, {pulsars: [], blobs: []});
        acc.pulsars.push(...reducedBins.pulsars);
        acc.blobs.push(...reducedBins.blobs.map(blob => {
            return {
                ...blob,
                y: getBinCoords(y, yStart, yRange, ybins),
            };
        }));
        return acc;
    }, {pulsars: [], blobs: []});
}