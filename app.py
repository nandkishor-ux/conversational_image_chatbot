import os
import io
import base64
import torch
from flask import Flask, request, jsonify, render_template
from PIL import Image
from transformers import BlipProcessor, BlipForQuestionAnswering

app = Flask(__name__)

MODEL_PATH = "my_finetuned_blip_model"

print("Loading model...")
processor = BlipProcessor.from_pretrained(MODEL_PATH)
model = BlipForQuestionAnswering.from_pretrained(MODEL_PATH)
device = "cpu"
model.to(device)
model.eval()
print(f"Model loaded on device: {device}")


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        image_data = base64.b64decode(data['image'])
        image = Image.open(io.BytesIO(image_data)).convert('RGB')
        question = data['question']

        print(f"Question: {question}")

        inputs = processor(image, question, return_tensors="pt").to(device)

        with torch.no_grad():
            out = model.generate(**inputs, max_new_tokens=30)

        answer = processor.decode(out[0], skip_special_tokens=True)
        print(f"Answer: {answer}")

        return jsonify({'answer': answer})

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)