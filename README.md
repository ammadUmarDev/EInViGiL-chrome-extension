<h1>EInViGiL Chrome Extension</h1>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/1mSr1mr/2.jpg" alt="2" border="0"></a>
<p>Vitual Invigilation Assisstant that records Screen Activity, Camera, Microphone and Speakers (optional) in 4K HD video (H264) using WebRTC JavaScript Library.</p>
<h2>Browsers Support</h2>
<p>Browser --- Operating System</br>
Google Chrome --- Windows + macOS + Ubuntu + Android</p></br>
<b>Give Permission</b>
<a href="https://ibb.co/0XNHhv1"><img src="https://i.ibb.co/DbX05Tm/3.jpg" alt="3" border="0"></a></br>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/KVPbpD8/4.jpg" alt="4" border="0"></a></br>
<b>Recording Starts</b>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/LdF1VJw/5.jpg" alt="5" border="0"></a></br>

<h2>Server Handler</h2>
<h3>Prerequisites</h3>
<p>blueprint==3.4.2 | Flask==1.1.2 | jsonify==0.5 | make-response==1 | pyparsing==2.4.7 | request==2019.4.13 | requests==2.23.0</p>
<h3>Implementation</h3>
<p>Chrome extension records Screen Activity, Camera, Microphone and sends video to a flask server every 10 seconds(configurable). Each recording session is assigned a unique id. Server creates a folder for each session where video blobs are saved and log file is maintained. Log file contains a list of video blob names recieved in a session and can later be used to concatenate video blobs to one file using FFmpeg.Server is requested via @app.route('/api/uploadCaputureBlob', methods=['POST']) endpoint.</p>
<h3>Concatenate Video Blobs Using FFmpeg (To be integrated upon clarity)</h3>
<p>FFmpeg is the leading multimedia framework, able to decode, encode, transcode, mux, demux, stream, filter and play pretty much anything that humans and machines have created. It supports the most obscure ancient formats up to the cutting edge.</p>
</br>Download FFMPEG https://ffmpeg.org/download.html#build-windows and add add path to environment variable
<h4>Command to concatenate</h4>
<p>ffmpeg -f concat -i fileWithBlobNames.txt -c copy outputVideo.mp4</p>
