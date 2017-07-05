import logging
import pickle
import os
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from preprocessing.preprocessing import Tokenizer
import io
from sklearn import metrics

class AbstractClassifier:

    def __init__(self):
        self.classificator = None
        self.logger = logging.getLogger(__name__)
        this_path = os.path.abspath(os.path.dirname(__file__))
        stopwords_path = os.path.join(this_path, "../preprocessing/stopwords.txt")
        stopword_list = set(line.strip() for line in io.open(stopwords_path, "r", encoding="utf-8"))
        self.vectorizer = TfidfVectorizer(max_df=0.95,
                                          min_df=2,
                                          max_features=6000,
                                          decode_error='ignore',
                                          stop_words=stopword_list,
                                          tokenizer=Tokenizer())

    def train(self, texts, classes):
        # implement it in the derived class
        pass

    def eval(self, texts, classes):
        self.logger.debug("Start evaluating...")
        if not self.classificator:
            raise Exception("Model not trained!")
        predicted = self.classificator.predict(texts)
        accuracy = np.mean(predicted == classes)
        self.logger.info("Accuracy: %f" % accuracy)
        self.logger.info(metrics.confusion_matrix(classes, predicted))
        self.logger.info(metrics.classification_report(predicted, classes))
        return accuracy

    def predict(self, text):
        if not self.classificator:
            raise Exception("Model not trained!")
        result = self.classificator.predict([text])[0]
        return result

    def predict_all(self, texts):
        if not self.classificator:
            raise Exception("Model not trained!")
        result = self.classificator.predict(texts).astype(np.int).tolist()
        return result

    def save(self):
        self.logger.debug("Saving model...")
        my_path = os.path.abspath(os.path.dirname(__file__))
        my_path = os.path.join(my_path, "trained_models", self.get_name()+".p")
        if self.classificator:
            pickle.dump(self.classificator, open(my_path, "wb"))
            self.logger.debug("Model saved.")

    def load(self):
        my_path = os.path.abspath(os.path.dirname(__file__))
        my_path = os.path.join(my_path, "trained_models" , self.get_name()+".p")
        if not os.path.isfile(my_path):
            raise Exception("File not found: "+my_path)
        with open(my_path, "rb") as pickle_file:
            self.classificator = pickle.load(pickle_file)

    def get_name(self):
        raise NotImplementedError("override this method")