import logging
from dataloader import Dataloader
from algorithems.svd import SupportVectorMachine
from algorithems.bayes import NaiveBayes


def train():
    #Loading Data
    dataloader = Dataloader()
    train_texts, train_classes, test_texts, test_classes = dataloader.load_sentiment_analysis_dataset()

    #SVM:
    #Train a support vector machine
    svd = SupportVectorMachine()
    svd.train(train_texts, train_classes)
    #Evaluate it, how good is my model?
    svd.eval(test_texts, test_classes)
    #Save trained model
    svd.save()
    #Predict a sample text
    print(svd.predict("This movie is bullshit!"))
    
    #BAYES:
    bayes = NaiveBayes()
    bayes.train(train_texts, train_classes)
    bayes.eval(test_texts, test_classes)
    bayes.save()
    print(bayes.predict("This movie is bullshit!"))


def main():
    logging.basicConfig(format='%(asctime)s:%(name)s:%(levelname)s:%(message)s', level=logging.DEBUG)
    train()


if __name__ == '__main__':
    main()
