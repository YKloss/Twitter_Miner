# -*- coding: utf-8 -*-
import logging
from dataloader import Dataloader
from algorithems.svd import SupportVectorMachine


def train():
    #Loading Data
    dataloader = Dataloader()
    train_texts, train_classes, test_texts, test_classes = dataloader.load_all_datasets()

    #Train a support vector machine
    svd = SupportVectorMachine()
    svd.train(train_texts, train_classes)
    #Evaluate it, how good is my model?
    svd.eval(test_texts, test_classes)
    #Save trained model
    svd.save()


def main():
    logging.basicConfig(format='%(asctime)s:%(name)s:%(levelname)s:%(message)s', level=logging.DEBUG)
    train()


if __name__ == '__main__':
    main()
