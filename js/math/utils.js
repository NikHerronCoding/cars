function distance(p1, p2) {
    return Math.pow(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2), 0.5);
}

function average(p1, p2) {
    return new Point(
        (p1.x + p2.x) / 2, 
        (p1.y + p2.y) / 2
    );
}

function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;

    for (let point of points) {
        const dist = distance(point, loc);
        if (dist < minDist && dist < threshold) {
            minDist = dist;
            nearest = point;
        }
    }

    return nearest
}

function getNearestSegment(loc, segments, threshold = Number.MAX_SAFE_INTEGER) {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;

    for (let seg of segments) {
        const dist = seg.distanceToPoint(loc);
        if (dist < minDist && dist < threshold) {
            minDist = dist;
            nearest = seg;
        }
    }

    return nearest
}



function subtract(p1, p2) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
}

function add(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

function scale(p1, factor) {
    return new Point(p1.x * factor, p1.y * factor);
}

function normalize(p) {
    return scale(p, 1/ magnitude(p));
}

function magnitude(p) {
    return Math.hypot(p.x, p.y);
}

function perpendicular(p) {
    return new Point(-p.y, p.x)
}

function translate(loc, angle, offset) {
    return new Point(
        loc.x + Math.cos(angle) * offset, 
        loc.y + Math.sin(angle) * offset
    );
}

function angle(p1, p2) {
    return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

function angle1(p) {
    return Math.atan2(p.y, p.x);
 }



function lerp(a,b,t) {
    return a + (b - a) * t;
}

function lerp2D(A, B, t) {
    return new Point(lerp(A.x, B.x, t), lerp(A.y, B.y, t));
}

function getIntersection(A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    const eps = 0.001;
 
    if ((Math.abs(bottom) > eps)) {
       const t = tTop / bottom;
       const u = uTop / bottom;
       if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
          return {
             x: lerp(A.x, B.x, t),
             y: lerp(A.y, B.y, t),
             offset: t,
          };
       }
    }
 
    return null;
 }

 function getRandomColor() {
    const hue = 290 + Math.random() * 260;
    return "hsl(" + hue + ", 100%, 60%)";
 }
 
 // this one goes to utils.js
function dot(p1, p2) {
    return p1.x * p2.x + p1.y * p2.y;
 }


