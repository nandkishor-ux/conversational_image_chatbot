from transformers import BlipProcessor, BlipForQuestionAnswering

print("Downloading BLIP VQA model... (~1GB, please wait)")

processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base")

processor.save_pretrained("my_finetuned_blip_model")
model.save_pretrained("my_finetuned_blip_model")

print("Done! Model saved to my_finetuned_blip_model folder")