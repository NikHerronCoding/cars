class Graph {
    constructor(points=[], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    static load(object) {
        const segments = []
        const points = []

        for (const point of object.points) {
            points.push(new Point(point.x, point.y))
        }

        for (const segment of object.segments) {
            segments.push(new Segment(
                points.find((p)=>p.equals(segment.p1)),
                points.find((p)=>p.equals(segment.p2))
                ));
        }


        const output = new Graph(points, segments);
        return output;
    }

    hash() {
        return JSON.stringify(graph);
    }

    addPoint(point){
         this.points.push(point);

    }

    removePoint(point) {
        this.points = this.points.filter(pnt=>!pnt.equals(point))
        this.segments = this.segments.filter(seg=>!seg.includes(point))
    }

    addSegment(segment) {
        this.segments.push(segment);
    }

    tryAddSegment(segment) {
        if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)){
            this.addSegment(segment);
            return true;
        } else {
            return false;
        }
    }

    removeSegment(segment) {
        this.segments = this.segments.filter(seg=>!seg.equals(segment));
    }

    containsSegment(segment) {
        return this.segments.find(s=>s.equals(segment));
    }


    containsPoint(point){
        return this.points.find(p=>p.equals(point));
    }



    tryAddPoint(point) {
        if (!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }

    getSegmentsWithPoint(point) {
        const segs = [];
        for (const seg of this.segments) {
            if (seg.includes(point)) {
                segs.push(seg);
            }
        }
        return segs
    }

    draw(ctx) {
        for (const seg of this.segments) {
           seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }

    dispose() {
        this.points = []
        this.segments = []
    }
}