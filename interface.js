/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

browser.tabs.executeScript({ file: "src/js/interface.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);

function reportExecuteScriptError(error) {
    console.error(`Failed to execute interface content script: ${error.message}`);
}

function listenForClicks() {
    document.addEventListener("click", (e) => {

        //---------------------------------------------------------------------------------------------
        // Video Audio Recording START-----------------------------------------------------------------
        //---------------------------------------------------------------------------------------------

        let recorder; // globally accessible
        let blob;
        function captureCamera(callback) {
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            }).then(function (camera) {
                callback(camera);
            }).catch(function (error) {
                alert('Unable to capture your camera. Please check console logs.');
                console.error(error);
            });
        }

        document.getElementById('btn-start-recording-video').onclick = function () {
            this.disabled = true;
            captureCamera(function (camera) {
                recorder = RecordRTC(camera, {
                    type: 'video',
                    mimeType: 'video/mp4',
                    recorderType: MediaStreamRecorder,
                    timeSlice: 10000,
                    ondataavailable: function (blob) {
                        var timestamp = (new Date()).valueOf();
                        fileName = timestamp + '.mp4';

                        //replace with post to server
                        invokeSaveAsDialog(blob, fileName);
                    }
                });

                recorder.startRecording();
                // release camera on stopRecording
                recorder.camera = camera;
                document.getElementById('btn-stop-recording-video').disabled = false;
            });
        };

        document.getElementById('btn-stop-recording-video').onclick = function () {
            this.disabled = true;
            recorder.stopRecording(stopRecordingVideoCallback);
        };

        function stopRecordingVideoCallback() {
            recorder.camera.stop();
            blob = recorder.getBlob();
            var timestamp = (new Date()).valueOf();
            fileName = timestamp + '.mp4';
            invokeSaveAsDialog(blob, fileName);
            recorder.destroy();
            recorder = null;
        }

        //---------------------------------------------------------------------------------------------
        // Video Audio Recording END-------------------------------------------------------------------
        //---------------------------------------------------------------------------------------------

    });
} 
