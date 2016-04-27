function View (type) {
    this.type = type;
    this.color = "red";
    this.render = function() {
        alert('render 25');
    };
}