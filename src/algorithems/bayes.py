from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import logging
from abstractclassifier import AbstractClassifier

logger = logging.getLogger(__name__)


class NaiveBayes(AbstractClassifier):

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def train(self, texts, classes):
        self.logger.debug("Start training...")
        model = Pipeline([('vect', TfidfVectorizer(max_df=0.95, min_df=2, max_features=6000, decode_error='ignore')),
                          ('bayeszz', MultinomialNB()),
                          ])
        #model = Pipeline([('vect', TfidfVectorizer()),
        #                  ('clf', SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, n_iter=5, random_state=42)),
        #                  ])
        self.classificator = model.fit(texts, classes)
        self.logger.debug("Finished training.")

    def save(self):
        AbstractClassifier.save(self, "bayes.p")

    def load(self):
        AbstractClassifier.load(self, "bayes.p")
