function coordsToPxls(data) {

    let minLat = Math.min(...data.map(set => Math.min(...set.points.map(p => p.lat))));
    let maxLat = Math.max(...data.map(set => Math.max(...set.points.map(p => p.lat))));

    let minLon = Math.min(...data.map(set => Math.min(...set.points.map(p => p.lon))));
    let maxLon = Math.max(...data.map(set => Math.max(...set.points.map(p => p.lon))));



    let deltaLat = maxLat - minLat;
    let deltaLon = maxLon - minLon;

    let wRatio = w / deltaLon;
    let hRatio = h / deltaLat;
    let ratio = wRatio < hRatio ? wRatio : hRatio;

    let maxWidth = (deltaLon * ratio) - (padding * 2)
    let maxHeight = (deltaLat * ratio) - (padding * 2)

    let left = (w - maxWidth) / 2
    let right = left + maxWidth
    let top = (h - maxHeight) / 2
    let bottom = top + maxHeight

    data = data.map(set => {
        let newPoints = set.points.map(p => {
            let newP = {
                x: (map(p.lon, minLon, maxLon, left, right)).toFixed(2),
                y: (map(p.lat, minLat, maxLat, bottom, top)).toFixed(2),
                date: p.date
            };
            return newP;
        });
        let newSet = {
            name: set.name,
            points: newPoints,
            date: set.date
        };
        return newSet
    });

    drawableData = data.sort((a, b) => a.points[0].date > b.points[0].date).map(set => new Gpx(set));
}
