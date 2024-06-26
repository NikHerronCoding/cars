class CrossingEditor{
    constructor(viewport, world) {
        this.viewport = viewport;
        this.world = world;

        this.canvas = viewport.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.mouse = null;
        this.intent = null;
        this.markings = world.markings;

    }

    enable() {
        this.#addEventListeners();
    }

    disable() {
        this.#removeEventListeners();
    }

    #addEventListeners() {
        this.boundMouseDown = (event)=>this.#handleMouseDown(event);
        this.boundMouseMove = (event)=> this.#handleMouseMove(event);
        this.boundContextMenu = (event)=> event.preventDefault();

        this.canvas.addEventListener('mousedown', this.boundMouseDown);
        this.canvas.addEventListener('mousemove', this.boundMouseMove);
        this.canvas.addEventListener('mouseup', this.boundMouseUp);
        this.canvas.addEventListener('contextmenu',this.boundContextMenu);
    }

    #removeEventListeners() {
        this.canvas.removeEventListener('mousedown', this.boundMouseDown);
        this.canvas.removeEventListener('mousemove', this.boundMouseMove);
        this.canvas.removeEventListener('mouseup', this.boundMouseUp);
        this.canvas.removeEventListener('contextmenu',this.boundContextMenu);
    }

    #handleMouseMove(event) {
        this.mouse = this.viewport.getMouse(event, true);
        const seg = getNearestSegment(this.mouse, this.world.graph.segments, 10 * this.viewport.zoom);

        if (seg) {
             this.intent = seg
             const proj = seg.projectPoint(this.mouse);
             if (proj.offset >= 0 && proj.offset <= 1) {
                this.intent = new Crossing(
                    proj.point,
                    seg.directionVector(),
                    world.roadWidth,
                    world.roadWidth / 2
                );
             } else {
                this.intent = null;
             }
        } else {
            this.intent = null;
        }

        if (this.dragging) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    #handleMouseDown(event) {
        if (event.button == 0) { // left click
            if (this.intent) {
                this.markings.push(this.intent);
                this.intent = null;
            }
        }
        if(event.button == 2) { // right click
            for (let i = 0; i < this.markings.length; i++) {
                const poly = this.markings[i].poly;
                if (poly.containsPoint(this.mouse)) {
                    this.markings.splice(i, 1);
                    return;
                }

            }
        }
    }

    display() {
        if (this.intent) {
            this.intent.draw(this.ctx);
        }

    }


}