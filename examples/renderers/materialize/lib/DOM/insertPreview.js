function generatePreview(previewStepName, customValues, path, selector) {

    var previewSequencer = ImageSequencer();
    function insertPreview(src) {
      var img = document.createElement('img');
      img.classList.add('preview-thumbnail');
      img.src = src;
      var stepDiv = $(selector + ' .radio-group').find('div').each(function() {
        if ($(this).find('.radio').attr('data-value') === previewStepName) {
          $(this).find('.radio').append(img);
        }
      });
    }

    function loadPreview() {
      previewSequencer = previewSequencer.addSteps('resize', { resize: "40%" });
      if (previewStepName === "crop") {
        previewSequencer.addSteps(previewStepName, customValues).run(insertPreview);
      }
      else {
        previewSequencer.addSteps(previewStepName, { [previewStepName]: customValues }).run(insertPreview);
      }
    }
    previewSequencer.loadImage(path, loadPreview);
  }

  function updatePreviews(src, selector) {
    $(selector+' img').remove();

    var previewSequencerSteps = {
      "brightness": "20",
      "saturation": "5",
      "rotate": 90,
      "contrast": 90,
      "crop": {
        "x": 0,
        "y": 0,
        "w": "(50%)",
        "h": "(50%)",
        "noUI": true
      }
    }

    Object.keys(previewSequencerSteps).forEach(function (step, index) {
      generatePreview(step, Object.values(previewSequencerSteps)[index], src, selector);
    });
  }

module.exports = {
  generatePreview,
  updatePreviews
}