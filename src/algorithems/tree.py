# -*- coding: utf-8 -*-
from sklearn import tree
from sklearn.pipeline import Pipeline
import logging
from algorithems.abstractclassifier import AbstractClassifier
from sklearn.model_selection import GridSearchCV 
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import uniform as sp_rand

logger = logging.getLogger(__name__)


class DecisionTree(AbstractClassifier):

    def __init__(self):
        AbstractClassifier.__init__(self)
        self.logger = logging.getLogger(__name__)

    def train(self, texts, classes):
        logger.debug("Start training...")
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', tree.DecisionTreeClassifier(max_depth=15, max_leaf_nodes=500)),
                          ])
        self.classificator = model.fit(texts, classes)
        logger.debug("Finished training.")
        
    def tune_parameters(self, texts, classes):
        self.logger.debug("Start parameter tuning...")
        model = Pipeline([('vect', self.vectorizer),
                          ('clf', tree.DecisionTreeClassifier(max_depth=15, max_leaf_nodes=500)),
                          ])
        self.classificator = model.fit(texts, classes)
        parameters = {'clf__max_depth': list(range(5, 25)),
                      'clf__max_leaf_nodes': list(range(100, 1000))}
        # create and fit a ridge regression model, testing random alpha values

        # use all Cores!
        gs_clf = RandomizedSearchCV(model, parameters, 40, n_jobs=-1)
        gs_clf = gs_clf.fit(texts, classes)
        
        self.logger.info("Best Score: " + str(gs_clf.best_score_))
        self.logger.info("Best fitting Parameters: " )
        for param_name in sorted(parameters.keys()):
            self.logger.info("%s: %r" % (param_name, gs_clf.best_params_[param_name]))
        self.logger.debug("Finished parameter tuning...")

    def get_name(self):
        return "tree"

