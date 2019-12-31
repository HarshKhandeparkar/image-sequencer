const testModule = require('../templates/module-test'),
  image = require('../images/IS-QR'),
  benchmark = 'data:image/png;base64,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',
  options = {
    x: '20',
    y: '15',
    w: '80',
    h: '90'
  };

testModule('crop', options, benchmark, image);