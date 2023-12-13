class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(p1) {
        return (p1.x === this.x && p1.y === this.y);
    }

    draw(ctx, size = 18, color = "black") {
        const rad = size / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fill();
    }
}