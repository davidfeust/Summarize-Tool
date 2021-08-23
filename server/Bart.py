from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


class Bart:

    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
        self.model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    def summarizer(self, text, max_l):
        input_ids = self.tokenizer.encode("summarize: " + text, truncation=True, return_tensors='pt', max_length=1024)

        summary_ids = self.model.generate(input_ids, max_length=max_l, min_length=(max_l - int(0.1 * max_l)),
                                          length_penalty=2.0, num_beams=4, early_stopping=True)
        # summary_ids = self.model.generate(input_ids, max_length=max_l, min_length=max_l - int(0.1 * max_l))

        summary = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        summary = summary.strip()
        # summary = (summary + '.') if not summary.endswith('.') else summary

        return summary
