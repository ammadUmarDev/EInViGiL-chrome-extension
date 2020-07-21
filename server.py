import io
import os
import tempfile
import uuid
import zipfile
import json
from os import environ
from datetime import datetime, time
from flask import Flask, request, make_response, jsonify, send_file, Response
from io import BytesIO
import pandas as pd

app = Flask(__name__)


@app.route('/api/uploadCaputureBlob', methods=['POST'])
def upload_capture_blob():
    try:
        print("Server invoked..")
        # Fetch files attached
        video_blob = request.files['video-blob']
        print("Fetching blob..")
        print(video_blob)

        # Save files locally
        handle, filename = tempfile.mkstemp()
        os.close(handle)
        print("Saving blob to server directory..")
        video_blob.save("video.mp4")

        # Return response
        data = {"status": 'Video retrieved!'}
        response = make_response(jsonify(data), 500)
        response.headers.set('Content-type', "application/json")
        return response

    except Exception as e:
        print('Exception:', e)
        data = {'status': 'error', 'exception': str(e)}
        response = make_response(jsonify(data), 500)
        response.headers.set('Content-type', "application/json")
        return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9585)