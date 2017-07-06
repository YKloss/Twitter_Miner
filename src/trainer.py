# -*- coding: utf-8 -*-
import logging
from dataloader import Dataloader
from algorithems.classifier import CombinedClassifier


def train(datalimit = 0):
    #Loading Data
    dataloader = Dataloader(datalimit)
    train_texts, train_classes, test_texts, test_classes = dataloader.load_all_datasets()
    #train_texts, train_classes, test_texts, test_classes = dataloader.load_small_fake_data()

    model = CombinedClassifier()
    model.train_and_save(train_texts, train_classes)
    model.eval(test_texts, test_classes)
    
    # model.tune_parameters(train_texts, train_classes)



def main():
    logging.basicConfig(format='%(asctime)s:%(name)s:%(levelname)s:%(message)s', level=logging.DEBUG)
    train(0)


if __name__ == '__main__':
    main()
