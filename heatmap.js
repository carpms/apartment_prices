var overlay;
TQOverlay.prototype = new google.maps.OverlayView();

function initialize() {
    var latlng = new google.maps.LatLng(0.5*(swLat+neLat), 0.5*(swLng+neLng));
    var myOptions = {
        zoom: theZoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    var swBound = new google.maps.LatLng(swLat, swLng);
    var neBound = new google.maps.LatLng(neLat, neLng);
    var bounds = new google.maps.LatLngBounds(swBound, neBound);
    overlay = new TQOverlay(bounds, srcImage, map);
}

function TQOverlay(bounds, image, map) {
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;
    this.div_ = null;
    this.setMap(map);
}
TQOverlay.prototype.onAdd = function () {
    var div = document.createElement('DIV');
    div.style.border = "none";
    div.style.borderWidth = "0px";
    div.style.position = "absolute";
    var img = document.createElement("img");
    img.src = this.image_;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.opacity = .5;
    img.style.filter = 'alpha(opacity=50)';
    div.appendChild(img);
    this.div_ = div;
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
}
TQOverlay.prototype.draw = function () {
    var overlayProjection = this.getProjection();
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
}
TQOverlay.prototype.onRemove = function () {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
}
