import os
import tempfile
from flask import Flask, request
from realesrgan import RealESRGAN
from PIL import Image

app = Flask(__name__)

@app.route('/.netlify/functions/process-media', methods=['POST'])
def process_media():
    # Handle file upload
    file = request.files['file']
    temp_dir = tempfile.mkdtemp()
    input_path = os.path.join(temp_dir, file.filename)
    file.save(input_path)

    output_path = os.path.join(temp_dir, f"processed_{file.filename}")

    # Perform media enhancement (example: upscaling with RealESRGAN)
    try:
        # Upscaling example
        model = RealESRGAN('weights/RealESRGAN_x4.pth')
        image = Image.open(input_path)
        result = model.enhance(image)
        result.save(output_path)

        # Return the processed file URL
        return {
            "output": f"/{output_path}"
        }
    except Exception as e:
        print("Error processing file:", e)
        return {
            "error": "Processing failed!"
        }, 500

if __name__ == "__main__":
    app.run(debug=True)
