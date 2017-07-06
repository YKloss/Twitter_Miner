from algorithems.bayes import NaiveBayes
from algorithems.svm import SupportVectorMachine
from algorithems.tree import DecisionTree
import logging

logger = logging.getLogger(__name__)


class CombinedClassifier:
    def __init__(self):
        self.models = [SupportVectorMachine(), NaiveBayes(), DecisionTree()]

    def train(self, texts, classes):
        for model in self.models:
            model.train(texts, classes)

    def eval(self, texts, classes):
        for model in self.models:
            try:
                model.eval(texts, classes)
            except Exception as e:
                logger.error(e.message)

    def predict(self, text):
        results = {}
        for model in self.models:
            try:
                results[model.get_name()] = model.predict(text)
            except Exception as e:
                logger.error(e.message)
        return results

    def predict_all(self, texts):
        results = {}
        for model in self.models:
            try:
                results[model.get_name()] = model.predict_all(texts)
            except Exception as e:
                #logger.error(e.message)
                logger.error("Fehler bei predict_all")
                raise e
        return results

    def save(self):
        for model in self.models:
            try:
                model.save()
            except Exception as e:
                logger.error(e.message)


    def train_and_save(self,texts, classes):
        for model in self.models:
            try:
                model.train(texts, classes)
                model.save()
            except Exception as e:
                raise e
                #logger.error(e.message)

    def load(self):
        for model in self.models:
            try:
                model.load()
            except Exception as e:
                logger.error(e.message)

