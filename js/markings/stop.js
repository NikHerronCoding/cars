class Stop{
    constructor(center, directionVector, width, height) {
        this.center = center;
        this.directionVector = directionVector;
        this.width = width;
        this.height = height;

        this.support = new Segment(
            translate(center, angle1(directionVector), height / 2),
            translate(center, angle1(directionVector), -height / 2),
        );

        this.poly = new Envelope(this.support, width/2, 0).poly;
        this.border = this.poly.segments[2];
    }

    draw(ctx) {
        this.border.draw(ctx, {width:5, color:"white"});
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(angle1(this.directionVector) - Math.PI / 2);
        ctx.scale(1,3);

        ctx.beginPath();
        ctx.textBaseline = "Middle";
        ctx.textAlign ="center";
        ctx.fillStyle = "white";
        ctx.font = "bold " + this.height * 0.3 + "px Arial";
        ctx.fillText("STOP", 0 , 5);
        ctx.restore();

    }
}