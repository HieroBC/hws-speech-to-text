var SpeechToText = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
require('dotenv').config();

var sttCred = {
    username: process.env.STT_USERNAME,
    password: process.env.STT_PASSWORD
};

var stt = new SpeechToText(sttCred);

// stt.listModels(null, function(error, models) {
//     if (error)
//       console.log('Error:', error);
//     else
//       console.log(JSON.stringify(models, null, 2));
// });

// stt.getModel({ model_id: 'pt-BR_BroadbandModel' }, function(error, model){
//     console.log(model);
// });

var files = ['audio-file1.ogg', 'audio-file2.ogg'];
for (var file in files) {
  var params = {
    model_id: 'pt-BR_BroadbandModel',
    audio: fs.createReadStream(files[file]),
    content_type: 'audio/ogg',
    timestamps: true,
    word_alternatives_threshold: 0.9,
    keywords: ['good', 'hello'],
    keywords_threshold: 0.5
  };

  stt.recognize(params, function(error, transcript) {
    if (error)
      console.log('Error:', error);
    else
      console.log(JSON.stringify(transcript, null, 2));
  });
}