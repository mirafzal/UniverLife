const Color = require("tns-core-modules/color").Color;

// Don't use any global variables here that can change.

exports.onLoaded = function (args) {
    const component = args.object;
    const label = component.getChildAt(0);
    if (component.placeholder) {
        label.text = component.placeholder;
    }
    const textField = component.getChildAt(1);
    if (component.secure) {
        textField.secure = component.secure;
    }
};

exports.onFocus = function (args) {
    const parent = args.object.parent;
    const label = parent.getChildAt(0);
    const textField = parent.getChildAt(1);

    console.log('focusing on', label.text);

    // animate the label sliding up and less transparent.
    label.animate({
        translate: { x: 0, y: - 25 },
        opacity: 1,
    }).then(() => { }, () => { });

    // set the border bottom color to green to indicate focus
    textField.borderBottomColor = new Color('#00b47e');
};

exports.onBlur = function (args) {
    const parent = args.object.parent;
    const label = parent.getChildAt(0);
    const textField = parent.getChildAt(1);

    // if there is text in our input then don't move the label back to its initial position.
    if (!textField.text) {
        label.animate({
            translate: { x: 0, y: 0 },
            opacity: 0.4
        }).then(() => { }, () => { });
    }
    // reset border bottom color.
    textField.borderBottomColor = new Color('#cec8c8');
};


