import logging
import pickle
import os
import numpy as np


class AbstractClassifier:

    def __init__(self):
        self.classificator = None
        self.logger = logging.getLogger(__name__)

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
        return accuracy

    def predict(self, text):
        if not self.classificator:
            raise Exception("Model not trained!")
        result = self.classificator.predict([text])[0]
        return result

    def predict_all(self, texts):
        if not self.classificator:
            raise Exception("Model not trained!")
        result = self.classificator.predict(texts)
        return result

    def save(self, filename):
        self.logger.debug("Saving model...")
        my_path = os.path.abspath(os.path.dirname(__file__))
        my_path = os.path.join(my_path, "trained_models/"+filename)
        if self.classificator:
            pickle.dump(self.classificator, open(my_path, "wb"))
            self.logger.debug("Model saved.")

    def load(self, filename):
        my_path = os.path.abspath(os.path.dirname(__file__))
        my_path = os.path.join(my_path, "trained_models/"+filename)
        if not os.path.isfile(my_path):
            raise Exception("File not found: "+my_path)
        with open(my_path, "rb") as pickle_file:
            self.classificator = pickle.load(pickle_file)