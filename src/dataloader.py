# -*- coding: utf-8 -*-
import csv
import os.path
import logging
import random
import io
import codecs
from preprocessing.preprocessing import TextPreprocessing
import copyreg, types

logger = logging.getLogger(__name__)


def _pickle_method(m):
    if m.im_self is None:
        return getattr, (m.im_class, m.im_func.func_name)
    else:
        return getattr, (m.im_self, m.im_func.func_name)
copyreg.pickle(types.MethodType, _pickle_method)


class Dataloader():

    def __init__(self, datalimit):
        self.home_path = os.path.abspath(os.path.dirname(__file__))
        self.datalimit = datalimit


    def _load_michigan_and_sanders_dataset(self):
        """
        Source: http://thinknook.com/twitter-sentiment-analysis-training-corpus-dataset-2012-09-22/
        1 = positive
        0 = negative
        :return:
        """
        logger.debug("Loading Michigan and Sanders Dataset")
        path = os.path.join(self.home_path, "datasets/michigan_and_sanders.csv")
        if not os.path.isfile(path):
            logger.error("File datasets/michigan_and_sanders.csv not found! Did you may forget to unpack the .zip file?")
        with open(path, encoding='latin-1') as f:
            csvreader = csv.reader(f)
            next(csvreader)  # skip header
            data = [(line[3], line[1]) for line in csvreader]
        logger.debug("Found "+str(len(data))+" entries!")
        return data

    def _load_sentiment140_dataset(self):
        """
        Source: http://help.sentiment140.com/for-students/
        1 = positive
        0 = negative
        :return:
        """
        logger.debug("Loading Sentiment140 Dataset")
        path = os.path.join(self.home_path, "datasets/sentiment140.csv")
        if not os.path.isfile(path):
            logger.error("File datasets/sentiment140.csv not found! Did you may forget to unpack the .zip file?")
        with open(path, encoding='latin-1') as f:
            csvreader = csv.reader(f)
            data = []
            for line in csvreader:
                if line[0] == "0":
                    data.append((line[5], 0))
                elif line[0] == "4":
                    data.append((line[5], 1))
        logger.debug("Found "+str(len(data))+" entries!")
        return data

    def _shuffle_data(self, data):
        random.shuffle(data)  # shuffle in place
        return data

    def _split_dataset(self, data):
        train_data = data[:int((len(data) + 1) * .80)]  # Remaining 80% to training set
        test_data = data[int(len(data) * .80 + 1):]  # Splits 20% data to test set
        train_texts, train_classes = [list(tup) for tup in zip(*train_data)]
        test_texts, test_classes = [list(tup) for tup in zip(*test_data)]

        return train_texts, train_classes, test_texts, test_classes

    def load_all_datasets(self):
        data_1 = self._load_michigan_and_sanders_dataset()
        data_2 = self._load_sentiment140_dataset()
        preprocessor = TextPreprocessing()
        all_data = data_1+data_2
        if self.datalimit != 0:
            all_data = all_data[:self.datalimit]
        data = preprocessor.preprocess_tuples(all_data)
        return self._split_dataset(self._shuffle_data(data))

    def load_small_fake_data(self):
        texts = ["This is super!", "This is very bad.", "Another bad text example.", "Another good text example bla blub."]
        classes = [1, 0, 0, 1]
        return texts, classes, texts, classes
