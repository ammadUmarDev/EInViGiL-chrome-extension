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
from pathlib import Path

app = Flask(__name__)


@app.route('/api/uploadCaputureBlob', methods=['POST'])
def upload_capture_blob():
    try:
        print("\nServer invoked..")
        # Fetch files attached
        print("Fetching blob..")
        default_name = "0"
        print("Requested Files:")
        print (request.files)
        print("Session ID:")
        session_id = request.form.get('session-id', default_name)
        print(session_id)
        print("File Name:")
        file_name = request.form.get('video-blob-id', default_name)
        print(file_name)
        print("Recieved Blob:")
        video_blob = request.files['video-blob']
        print(video_blob)
        
        # Create session directory
        output_path = Path('outputs')
        output_path.mkdir(parents=True, exist_ok=True)

        blob_path_str = 'outputs/'+session_id
        blob_path = Path(blob_path_str)
        blob_path.mkdir(parents=True, exist_ok=True)

        with open(blob_path_str + "/" + session_id + ".txt","a+") as f:
            f.write(file_name)
            f.write("\n")

        # Save in session directory
        handle, filename = tempfile.mkstemp()
        os.close(handle)
        print("Saving blob to server directory..")
        video_blob.save(blob_path_str + "/" + file_name)

        # Return response
        data = {"status": 'Video retrieved!'}
        response = make_response(jsonify(data), 200)
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