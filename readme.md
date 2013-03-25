# Usage

    $('#element').kolibriLogo({
        height:         1000,   // sets the height of the logo
        width:          1000,   // sets width. Defaults to height if ommitted
        color:          '#fff', // choose a color
    });

If <code>#element</code> is a canvas element, logo will be drawn to it.

If not, a new canvas is created, and added as background to the element.

(Only tested with id-selector)

# License

http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en