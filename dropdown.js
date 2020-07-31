var runtimePort = chrome.runtime.connect({
    name: location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\r').join('')
});

runtimePort.onMessage.addListener(function(message) {
    if (!message || !message.messageFromContentScript1234) {
        return;
    }
});

var isRecording = false;
chrome.storage.sync.get('isRecording', function(obj) {
    document.getElementById('default-section').style.display = obj.isRecording === 'true' ? 'none' : 'block';
    document.getElementById('stop-section').style.display = obj.isRecording === 'true' ? 'block' : 'none';

    isRecording = obj.isRecording === 'true';

    // auto-stop-recording
    if (isRecording === true) {
        document.getElementById('stop-recording').click();
    }
});

document.getElementById('stop-recording').onclick = function() {
    chrome.storage.sync.set({
        isRecording: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            stopRecording: true,
            dropdown: true
        });
        window.close();
    });
};

document.getElementById('microphone-webcam').onclick = function() {
    chrome.storage.sync.set({
        enableTabCaptureAPI: 'false',
        enableTabCaptureAPIAudioOnly: 'false',
        enableMicrophone: 'true',
        enableCamera: 'true',
        enableScreen: 'true',
        isRecording: 'true',
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
            messageFromContentScript1234: true,
            startRecording: true,
            dropdown: true
        });
        window.close();
    });
};