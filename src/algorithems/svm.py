# -*- coding: utf-8 -*-
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
import logging
from algorithems.abstractclassifier import AbstractClassifier

from sklearn.model_selection import GridSearchCV 


class SupportVectorMachine(AbstractClassifier):

    def __init__(self):
        AbstractClassifier.__init__(self)
        self.logger = logging.getLogger(__name__)

    def train(self, texts, classes):
        self.logger.debug("Start training...")
        
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, n_iter=5, random_state=42)),
                          ])
        self.classificator = model.fit(texts, classes)
        self.logger.debug("Finished training.")
        
    def tune_parameters(self, texts, classes):
        self.logger.debug("Start parameter tuning...")
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', SGDClassifier(loss='hinge', penalty='l2', alpha=1e-3, n_iter=5, random_state=42)),
                          ])
        parameters = {'clf__alpha': (1e-1, 1e-4) }
        gs_clf = GridSearchCV(model, parameters, n_jobs=-1)
        gs_clf = gs_clf.fit(texts, classes)

        
        self.logger.info(gs_clf.best_score_)
        for param_name in sorted(parameters.keys()):
            self.logger.info("%s: %r" % (param_name, gs_clf.best_params_[param_name]))
        self.logger.debug("Finished parameter tuning...")
        
    def get_name(self):
        return "svm"
