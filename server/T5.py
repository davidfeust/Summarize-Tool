from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


class T5:

    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained('t5-large')
        self.model = AutoModelForSeq2SeqLM.from_pretrained('t5-large', return_dict=True)
        # self.tokenizer = AutoTokenizer.from_pretrained('t5-base')
        # self.model = AutoModelForSeq2SeqLM.from_pretrained('t5-base', return_dict=True)

    def summarizer(self, text, max_l):
        input_ids = self.tokenizer.encode("summarize: " + text, truncation=True, return_tensors='pt')
        # , max_length=len(text.split()))

        # summary_ids = self.model.generate(input_ids, max_length=max_l, length_penalty=2.0, num_beams=4, early_stopping=True)
        print('max=', max_l, 'min=', max_l - int(0.2 * max_l))
        summary_ids = self.model.generate(input_ids, max_length=max_l, min_length=max_l - int(0.1 * max_l), top_k=100,
                                          top_p=0.95)

        summary = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)

        summary = summary.strip()
        # summary = (summary + '.') if not summary.endswith('.') else summary

        return summary
