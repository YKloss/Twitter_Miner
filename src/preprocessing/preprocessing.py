import re
import string

import nltk
from bs4 import BeautifulSoup
from nltk.stem.snowball import SnowballStemmer
from nltk.tokenize import TweetTokenizer

from preprocessing.contractions import CONTRACTION_MAP


class TextPreprocessing:
    def __init__(self):
        self.stopword_list = nltk.corpus.stopwords.words('english')
        self.stopword_list = [x for x in self.stopword_list if x != 'not']
        self.stopword_list.extend(('rt', 'via', '…'))
        self.tknzr = TweetTokenizer(preserve_case=False)
        self.stemmer = SnowballStemmer("english")

    def tokenize_text(self, text):
        tokens = self.tknzr.tokenize(text)
        tokens = [token.strip() for token in tokens]
        return tokens

    def remove_html_tags(self, text):
        text_without_html_tags = BeautifulSoup(text, "html.parser").get_text()
        return text_without_html_tags

    def stem_text(self, text):
        tokens = self.tokenize_text(text)
        stemmed_tokens = [self.stemmer.stem(token) for token in tokens]
        filtered_text = ' '.join(stemmed_tokens)

        return filtered_text

    def expand_contractions(self, text, contraction_mapping):
        contractions_pattern = re.compile('({})'.format('|'.join(contraction_mapping.keys())),
                                          flags=re.IGNORECASE | re.DOTALL)

        def expand_match(contraction):
            match = contraction.group(0)
            first_char = match[0]
            expanded_contraction = contraction_mapping.get(match) \
                if contraction_mapping.get(match) \
                else contraction_mapping.get(match.lower())
            expanded_contraction = first_char + expanded_contraction[1:]
            return expanded_contraction

        expanded_text = contractions_pattern.sub(expand_match, text)
        expanded_text = re.sub("'", "", expanded_text)
        return expanded_text


# from pattern.en import tag
# from nltk.corpus import wordnet as wn
#
#
# # Annotate text tokens with POS tags
# def pos_tag_text(text):
#     def penn_to_wn_tags(pos_tag):
#         if pos_tag.startswith('J'):
#             return wn.ADJ
#         elif pos_tag.startswith('V'):
#             return wn.VERB
#         elif pos_tag.startswith('N'):
#             return wn.NOUN
#         elif pos_tag.startswith('R'):
#             return wn.ADV
#         else:
#             return None
#
#     tagged_text = tag(text)
#     tagged_lower_text = [(word.lower(), penn_to_wn_tags(pos_tag))
#                          for word, pos_tag in
#                          tagged_text]
#     return tagged_lower_text
#
#
# # lemmatize text based on POS tags
# def lemmatize_text(text):
#     pos_tagged_text = pos_tag_text(text)
#     lemmatized_tokens = [wnl.lemmatize(word, pos_tag) if pos_tag
#                          else word
#                          for word, pos_tag in pos_tagged_text]
#     lemmatized_text = ' '.join(lemmatized_tokens)
#     return lemmatized_text


    def remove_special_characters(self, text):
        tokens = self.tokenize_text(text)
        # pattern = re.compile('[{}]'.format(re.escape(string.punctuation)))
        # filtered_tokens = filter(None, [pattern.sub('', token) for token in tokens])
        # filtered_text = ' '.join(filtered_tokens)

        filtered_tokens = [token for token in tokens if token not in string.punctuation]
        filtered_text = ' '.join(filtered_tokens)

        return filtered_text

    def remove_stopwords(self, text):
        tokens = self.tokenize_text(text)
        filtered_tokens = [token for token in tokens if token not in self.stopword_list]
        filtered_text = ' '.join(filtered_tokens)
        return filtered_text

    def preprocess_text(self, corpus, tokenize=False):
        normalized_corpus = []
        for text in corpus:
            text = self.remove_html_tags(text)
            text = self.expand_contractions(text, CONTRACTION_MAP)
            text = self.stem_text(text)
            text = self.remove_special_characters(text)
            text = self.remove_stopwords(text)
            normalized_corpus.append(text)
            if tokenize:
                text = self.tokenize_text(text)
                normalized_corpus.append(text)

        return normalized_corpus


# preprocess = TextPreprocessing()
#
# normalized_text = preprocess.preprocess_text(["RT This is a <b>text!</b> Is that great? @-User -> :) $199, that's good. You can't win. I'm hoping you're in a good mood :P !!!"])
# print(normalized_text)
