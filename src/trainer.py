# -*- coding: utf-8 -*-
import logging
from dataloader import Dataloader
from algorithems.classifier import CombinedClassifier


def train():
    #Loading Data
    dataloader = Dataloader()
    train_texts, train_classes, test_texts, test_classes = dataloader.load_all_datasets()
    #train_texts, train_classes, test_texts, test_classes = dataloader.load_small_fake_data()

    model = CombinedClassifier()
    model.train(train_texts, train_classes)
    model.eval(test_texts, test_classes)
    model.save()



def main():
    logging.basicConfig(format='%(asctime)s:%(name)s:%(levelname)s:%(message)s', level=logging.DEBUG)
    train()


if __name__ == '__main__':
    main()
